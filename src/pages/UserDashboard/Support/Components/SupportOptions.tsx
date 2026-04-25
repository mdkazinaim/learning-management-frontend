import { MessageSquare, Mail, Phone } from "lucide-react";

const SupportOptions = () => {
  return (
    <div className="">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Live Chat */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-secondary-purple rounded-lg flex items-center justify-center">
                <MessageSquare size={20} className="text-primary-blue" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-primary-text mb-2">Live Chat</h3>
            <p className="text-sm text-secondary-text mb-6">Chat with our support team in real-time</p>
            <button className="w-full py-2 px-4 border border-primary-green text-primary-green rounded-lg text-sm font-medium hover:bg-primary-green/10 transition-colors">
              Start Chat
            </button>
          </div>
          
          {/* Email Support */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-secondary-purple rounded-lg flex items-center justify-center">
                <Mail size={20} className="text-primary-blue" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-primary-text mb-2">Email Support</h3>
            <p className="text-sm text-secondary-text mb-6">Send us an email and we'll respond within 24 hours</p>
            <button className="w-full py-2 px-4 border border-primary-green text-primary-green rounded-lg text-sm font-medium hover:bg-primary-green/10 transition-colors">
              Email Us
            </button>
          </div>
          
          {/* Phone Support */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-secondary-purple rounded-lg flex items-center justify-center">
                <Phone size={20} className="text-primary-blue" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-primary-text mb-2">Phone Support</h3>
            <p className="text-sm text-secondary-text mb-6">Call us during business hours for immediate assistance</p>
            <button className="w-full py-2 px-4 border border-primary-green text-primary-green rounded-lg text-sm font-medium hover:bg-primary-green/10 transition-colors">
              (555) 987-6543
            </button>
          </div>
        </div>
      
    </div>
  );
};

export default SupportOptions;
