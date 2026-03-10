import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { CheckCircle, Package, Truck, Home } from 'lucide-react';

export default function OrderConfirmationPage() {
  const orderNumber = `ORD-${Date.now().toString().slice(-8)}`;
  const estimatedDelivery = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
              <p className="text-gray-600">Thank you for your purchase</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <p className="text-sm text-gray-600 mb-1">Order Number</p>
              <p className="text-2xl font-bold text-black">{orderNumber}</p>
            </div>

            <div className="text-left space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <Package className="w-5 h-5 text-black mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Order Processing</p>
                  <p className="text-sm text-gray-600">
                    We're preparing your items for shipment. You'll receive a confirmation email shortly.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-black mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Estimated Delivery</p>
                  <p className="text-sm text-gray-600">{estimatedDelivery}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/shop">
                <Button size="lg" variant="outline">
                  Continue Shopping
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" className="bg-black hover:bg-[#666666]">
                  <Home className="w-4 h-4 mr-2" />
                  Go to Dashboard
                </Button>
              </Link>
            </div>

            <p className="text-sm text-gray-600 mt-8">
              A confirmation email has been sent to your email address with order details and tracking information.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
