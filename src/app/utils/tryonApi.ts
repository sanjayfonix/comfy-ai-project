/**
 * Comify AI – Try-On API Service
 * ================================
 * Connects the frontend to the backend via two possible paths:
 *   1. n8n webhooks (preferred – orchestrates Colab GPU / local fallback)
 *   2. FastAPI direct (fallback if n8n is not configured)
 *
 * Virtual Try-On:  IDM-VTON (diffusion model on Colab GPU via n8n)
 * Size Recommendation: MediaPipe Pose (local FastAPI or Colab)
 *
 * Falls back to local simulation if no backend is reachable.
 */

// Backend URLs – set via env vars or defaults
const API_BASE = (import.meta as any).env?.VITE_TRYON_API_URL || 'http://localhost:8001';
const N8N_BASE = (import.meta as any).env?.VITE_N8N_WEBHOOK_URL || 'http://localhost:5678/webhook';

export interface AIAnalysis {
    bodyDetected: boolean;
    confidence: number;
    bodyMeasurements: {
        shoulders: number;
        chest: number;
        waist: number;
        hips: number;
        height: number;
    };
    poseDetection: {
        detected: boolean;
        pose: string;
        landmarks: Array<{ name: string; x: number; y: number }>;
    };
    recommendedSize: string;
    clothingFitPrediction: {
        tops: string;
        bottoms: string;
        dresses: string;
    };
}

export interface TryOnResult {
    try_on_image_url?: string;
    try_on_image_b64?: string;
    recommended_size: string;
    bodyMeasurements?: Record<string, number>;
    confidence?: number;
    model?: string;          // 'IDM-VTON' | 'local-composite'
    gpu?: boolean;
    inference_time_s?: number;
}

/**
 * Check if the backend (or n8n) is reachable.
 */
export async function checkBackendHealth(): Promise<boolean> {
    // Try n8n first if configured
    if (N8N_BASE) {
        try {
            const resp = await fetch(`${N8N_BASE}/comify-health`, { signal: AbortSignal.timeout(3000) });
            if (resp.ok) return true;
        } catch { /* fall through to FastAPI */ }
    }
    try {
        const resp = await fetch(`${API_BASE}/api/health`, { signal: AbortSignal.timeout(3000) });
        return resp.ok;
    } catch {
        return false;
    }
}

/**
 * Analyze a person photo: detect pose, estimate body measurements, recommend size.
 * Route: n8n webhook → Colab/FastAPI MediaPipe Pose, or direct FastAPI fallback.
 */
export async function analyzePersonPhoto(photoDataUri: string): Promise<AIAnalysis> {
    const b64 = dataURItoBase64(photoDataUri);

    // Try n8n webhook first (routes to MediaPipe Pose on Colab or local)
    if (N8N_BASE) {
        try {
            const resp = await fetch(`${N8N_BASE}/comify-size`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ person_image: b64 }),
            });
            if (resp.ok) {
                let data = await resp.json();
                // n8n "Respond to Webhook" may wrap the result in an array
                if (Array.isArray(data)) data = data[0];
                return data as AIAnalysis;
            }
        } catch { /* fall through to direct FastAPI */ }
    }

    // Direct FastAPI call (multipart upload)
    const blob = dataURItoBlob(photoDataUri);
    const formData = new FormData();
    formData.append('person_image', blob, 'person.jpg');

    const resp = await fetch(`${API_BASE}/api/size-recommendation`, {
        method: 'POST',
        body: formData,
    });

    if (!resp.ok) {
        const err = await resp.json().catch(() => ({ detail: 'Backend error' }));
        throw new Error(err.detail || `Server error: ${resp.status}`);
    }

    return resp.json();
}

/**
 * Generate a virtual try-on image.
 * Route: n8n webhook → IDM-VTON on Colab GPU, or direct FastAPI local composite fallback.
 */
export async function generateTryOn(
    personPhotoDataUri: string,
    garmentImageUrl: string,
    category: string = 'tops',
): Promise<TryOnResult> {
    // Try n8n webhook first (routes to IDM-VTON on Colab GPU)
    if (N8N_BASE) {
        try {
            const personB64 = dataURItoBase64(personPhotoDataUri);
            const garmentBlob = await urlToBlob(garmentImageUrl);
            const garmentB64 = await blobToBase64(garmentBlob);

            const resp = await fetch(`${N8N_BASE}/comify-tryon`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    person_image: personB64,
                    garment_image: garmentB64,
                    category,
                    num_steps: 30,
                }),
            });

            if (resp.ok) {
                let data = await resp.json();
                // n8n "Respond to Webhook" may wrap the result in an array
                if (Array.isArray(data)) data = data[0];
                // Prefer base64 image data (always contains the actual pixels)
                if (data.try_on_image_b64) {
                    data.try_on_image_url = `data:image/jpeg;base64,${data.try_on_image_b64}`;
                } else if (data.try_on_image_url && !data.try_on_image_url.startsWith('http') && !data.try_on_image_url.startsWith('data:')) {
                    // Convert relative path to absolute backend URL
                    data.try_on_image_url = `${API_BASE}${data.try_on_image_url}`;
                }
                return data as TryOnResult;
            }
        } catch { /* fall through to direct FastAPI */ }
    }

    // Direct FastAPI call (multipart upload – local composite fallback)
    const [personBlob, garmentBlob] = await Promise.all([
        dataURItoBlob(personPhotoDataUri),
        urlToBlob(garmentImageUrl),
    ]);

    const formData = new FormData();
    formData.append('person_image', personBlob, 'person.jpg');
    formData.append('garment_image', garmentBlob, 'garment.jpg');
    formData.append('category', category);

    const resp = await fetch(`${API_BASE}/api/generate-tryon`, {
        method: 'POST',
        body: formData,
    });

    if (!resp.ok) {
        const err = await resp.json().catch(() => ({ detail: 'Backend error' }));
        throw new Error(err.detail || `Server error: ${resp.status}`);
    }

    const data: TryOnResult = await resp.json();

    // Convert relative image URL to absolute
    if (data.try_on_image_url && !data.try_on_image_url.startsWith('http') && !data.try_on_image_url.startsWith('data:')) {
        data.try_on_image_url = `${API_BASE}${data.try_on_image_url}`;
    }

    return data;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function dataURItoBase64(dataURI: string): string {
    if (dataURI.includes(',')) {
        return dataURI.split(',')[1];
    }
    return dataURI;
}

function dataURItoBlob(dataURI: string): Blob {
    const [header, b64] = dataURI.split(',');
    const mime = header.match(/:(.*?);/)?.[1] || 'image/jpeg';
    const binary = atob(b64);
    const array = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        array[i] = binary.charCodeAt(i);
    }
    return new Blob([array], { type: mime });
}

function blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result as string;
            resolve(result.includes(',') ? result.split(',')[1] : result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

async function urlToBlob(url: string): Promise<Blob> {
    // If it's already a data URI, convert directly
    if (url.startsWith('data:')) {
        return dataURItoBlob(url);
    }
    const resp = await fetch(url);
    if (!resp.ok) {
        throw new Error(`Failed to fetch garment image: ${resp.status}`);
    }
    return resp.blob();
}
