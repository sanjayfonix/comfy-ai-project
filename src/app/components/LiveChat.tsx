import { useState, useEffect, useRef } from 'react';
import { X, Send, MessageCircle, Minimize2, User, Bot } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hallo! 👋 Willkommen bei Comify AI. Wie kann ich Ihnen heute helfen?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleOpenChat = () => {
      setIsOpen(true);
      setIsMinimized(false);
    };

    window.addEventListener('openLiveChat', handleOpenChat);
    return () => window.removeEventListener('openLiveChat', handleOpenChat);
  }, []);

  const quickReplies = [
    'Größenberatung',
    'Versand & Lieferung',
    'Rückgabe & Umtausch',
    'Produktfragen'
  ];

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(text),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('größe') || lowerMessage.includes('size')) {
      return 'Unsere KI-gestützte Größenberatung hilft Ihnen, die perfekte Größe zu finden! Gehen Sie zu "Virtuelle Anprobe" und laden Sie ein Foto hoch. Unser System analysiert Ihre Körpermaße und empfiehlt die optimale Größe mit 98% Genauigkeit. 📏✨';
    }
    
    if (lowerMessage.includes('versand') || lowerMessage.includes('lieferung') || lowerMessage.includes('shipping')) {
      return 'Versandoptionen:\n• Standard (5-7 Werktage): Kostenlos ab 50€\n• Express (2-3 Werktage): 14,99€\n\nSie erhalten eine Tracking-Nummer per E-Mail! 📦';
    }
    
    if (lowerMessage.includes('rückgabe') || lowerMessage.includes('umtausch') || lowerMessage.includes('return')) {
      return 'Sie haben 14 Tage Zeit für kostenlose Rücksendungen! Melden Sie die Rücksendung in Ihrem Dashboard an, drucken Sie das Etikett aus und senden Sie es zurück. Die Erstattung erfolgt innerhalb von 5-7 Werktagen. 🔄';
    }
    
    if (lowerMessage.includes('virtuelle anprobe') || lowerMessage.includes('virtual try')) {
      return 'Unsere revolutionäre virtuelle Anprobe verwendet KI, um Kleidung realistisch auf Ihrem Körper zu zeigen! Laden Sie einfach ein Foto hoch und probieren Sie Tausende von Produkten virtuell an. 🎯👗';
    }
    
    if (lowerMessage.includes('preis') || lowerMessage.includes('kosten') || lowerMessage.includes('price')) {
      return 'Die Preise variieren je nach Produkt und Marke. Besuchen Sie unseren Shop für aktuelle Angebote! Wir haben derzeit bis zu 30% Rabatt auf ausgewählte Artikel. 💰';
    }
    
    if (lowerMessage.includes('konto') || lowerMessage.includes('account') || lowerMessage.includes('registrierung')) {
      return 'Sie können sich kostenlos registrieren, um alle Features zu nutzen:\n• Virtuelle Anprobe mit KI\n• Personalisierte Größenempfehlungen\n• Styling-Assistent\n• Bestellverfolgung\n\nKlicken Sie auf "Sign Up" um loszulegen! 🚀';
    }

    return 'Vielen Dank für Ihre Nachricht! Unser Support-Team steht Ihnen gerne zur Verfügung. Für spezifische Fragen können Sie uns auch per E-Mail erreichen: ifexstan@yahoo.com oder Mo-Fr von 9-20 Uhr telefonisch unter +49 (0) 421-70911311. 💬';
  };

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <button
              onClick={() => setIsOpen(true)}
              className="relative group"
            >
              {/* Animated blob background */}
              <div className="absolute inset-0 bg-gradient-to-r from-black to-[#666666] rounded-full blur-xl opacity-75 group-hover:opacity-100 transition-opacity animate-pulse"></div>
              
              {/* Main button */}
              <div className="relative bg-gradient-to-r from-black to-[#666666] text-white rounded-full p-5 shadow-2xl hover:shadow-black/50 transition-all hover:scale-110">
                <MessageCircle className="w-7 h-7" />
              </div>
              
              {/* Notification badge */}
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-bounce">
                1
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? 'auto' : '600px'
            }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-6 right-6 w-96 bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-black to-[#666666] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold">Comify AI Support</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs opacity-90">Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="hover:bg-white/20 p-1.5 rounded-lg transition-colors"
                >
                  <Minimize2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-white/20 p-1.5 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start gap-2 ${
                        message.sender === 'user' ? 'flex-row-reverse' : ''
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.sender === 'user'
                            ? 'bg-black text-white'
                            : 'bg-[#eeeeee] text-gray-700'
                        }`}
                      >
                        {message.sender === 'user' ? (
                          <User className="w-4 h-4" />
                        ) : (
                          <Bot className="w-4 h-4" />
                        )}
                      </div>
                      <div
                        className={`max-w-[75%] rounded-2xl p-3 ${
                          message.sender === 'user'
                            ? 'bg-black text-white'
                            : 'bg-white text-gray-800 shadow-sm border border-gray-100'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-line leading-relaxed">
                          {message.text}
                        </p>
                        <p
                          className={`text-xs mt-1 ${
                            message.sender === 'user'
                              ? 'text-white/70'
                              : 'text-gray-500'
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString('de-DE', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex items-start gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-gray-700" />
                      </div>
                      <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Replies */}
                {messages.length === 1 && (
                  <div className="px-4 py-3 bg-white border-t border-gray-100">
                    <p className="text-xs text-gray-500 mb-2">Schnellantworten:</p>
                    <div className="flex flex-wrap gap-2">
                      {quickReplies.map((reply, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuickReply(reply)}
                          className="text-xs px-3 py-1.5 bg-[#eeeeee] text-black rounded-full hover:bg-[#979797] hover:text-white transition-colors border border-[#979797]"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input */}
                <div className="p-4 bg-white border-t border-gray-200">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendMessage(inputValue);
                    }}
                    className="flex gap-2"
                  >
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Nachricht eingeben..."
                      className="flex-1"
                    />
                    <Button
                      type="submit"
                      size="icon"
                      className="bg-black hover:bg-[#666666]"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </form>
                  <p className="text-xs text-gray-400 mt-2 text-center">
                    Powered by Comify AI
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}