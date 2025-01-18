// components/Chat.tsx
'use client';
import { useState } from 'react';
import { Send } from 'lucide-react';

const commonQuestions = [
  "How do I book a tour?",
  "What's your cancellation policy?",
  "Do you offer group discounts?",
  "How can I contact customer support?",
  "What payment methods do you accept?"
];

const answers = {
  "How do I book a tour?": "You can book a tour by selecting your desired destination, choosing your dates, and following our simple booking process. Need help? Our support team is available 24/7.",
  "What's your cancellation policy?": "Free cancellation up to 24 hours before your scheduled tour. Cancellations within 24 hours may be subject to fees.",
  "Do you offer group discounts?": "Yes! We offer special rates for groups of 6 or more. Contact our team for custom group pricing.",
  "How can I contact customer support?": "Our support team is available 24/7 via chat, email at support@journygenic.com, or phone at 1-800-JOURNEY.",
  "What payment methods do you accept?": "We accept all major credit cards, PayPal, and bank transfers. All payments are secure and encrypted."
};


export default function Chat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! How can I help you today?",
      sender: 'bot'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSend = (message) => {
    const userMessage = {
      id: messages.length + 1,
      text: message,
      sender: 'user'
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate bot response
    const botResponse = {
      id: messages.length + 2,
      text: answers[message] || "I'm not sure about that. Would you like to speak with a human agent?",
      sender: 'bot'
    };
    
    setTimeout(() => {
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
    
    setInputMessage('');
  };

  return (
    <div className="flex h-[calc(100vh-64px)] bg-gray-100">
      <div className="flex-1 max-w-6xl mx-auto p-4 flex">
        {/* Questions Panel */}
        <div className="w-1/3 bg-white rounded-l-lg p-4 border-r">
          <h3 className="text-lg font-semibold mb-4">Common Questions</h3>
          <div className="space-y-2">
            {commonQuestions.map((question, index) => (
              <button
                key={index}
                className="w-full text-left p-3 rounded hover:bg-gray-100 transition"
                onClick={() => handleSend(question)}
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Panel */}
        <div className="w-2/3 bg-white rounded-r-lg flex flex-col">
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 ${
                  message.sender === 'user' ? 'text-right' : 'text-left'
                }`}
              >
                <div
                  className={`inline-block p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-teal-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && inputMessage.trim()) {
                    handleSend(inputMessage);
                  }
                }}
                className="flex-1 p-2 border rounded-lg"
                placeholder="Type your message..."
              />
              <button
                onClick={() => inputMessage.trim() && handleSend(inputMessage)}
                className="p-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}