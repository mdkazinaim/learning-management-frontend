/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const FAQSection = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const faqData = [
    {
      id: 1,
      question: "How do I schedule a new appointment?",
      answer: "You can schedule a new appointment by navigating to the 'Appointments' section in your dashboard, clicking 'Schedule New', and selecting your preferred date and time. You'll receive a confirmation email once your appointment is confirmed."
    },
    {
      id: 2,
      question: "How do I start a session?",
      answer: "To start a session, go to your upcoming appointments, find the session you want to start, and click the 'Start Session' button. This will launch our secure video platform where you can connect with your client."
    },
    {
      id: 3,
      question: "What happens when I mark a session as a crisis alert?",
      answer: "When you mark a session as a crisis alert, our system immediately notifies our emergency response team. They will contact you within 5 minutes to provide support and guidance. Additionally, the client's emergency contacts will be notified according to our safety protocol."
    },
    {
      id: 4,
      question: "How do I export client reports?",
      answer: "To export client reports, navigate to the 'Reports' section, select the client and date range, then click 'Export'. You can choose between PDF or CSV format. All exported reports are encrypted for security and will be available for download for 7 days."
    },
    {
      id: 5,
      question: "Can I customize my session duration?",
      answer: "Yes, you can customize your session duration. Go to 'Settings' > 'Session Preferences' and adjust the default session length. You can also set different durations for different types of sessions (individual, group, etc.). Custom durations must be multiples of 15 minutes."
    },
    {
      id: 6,
      question: "How do I manage inactive clients?",
      answer: "To manage inactive clients, go to the 'Clients' section and use the filter to show inactive clients. You can then send automated re-engagement emails, archive clients, or mark them for follow-up. Our system will also suggest clients who may benefit from re-engagement based on their activity patterns."
    }
  ];

  const toggleQuestion = (id : any) => {
    setOpenQuestion(openQuestion === id ? null : id);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
      <h2 className="text-xl font-bold text-primary-text mb-6">Frequently Asked Questions</h2>
      
      <div className="space-y-2">
        {faqData.map((faq) => (
          <div key={faq.id} className="border-b border-border pb-2">
            <button
              onClick={() => toggleQuestion(faq.id)}
              className="w-full flex justify-between items-center py-3 text-left hover:bg-gray/50 transition-colors"
            >
              <span className="font-medium text-primary-text">{faq.question}</span>
              {openQuestion === faq.id ? (
                <ChevronUp size={16} className="text-secondary-text" />
              ) : (
                <ChevronDown size={16} className="text-secondary-text" />
              )}
            </button>
            
            {openQuestion === faq.id && (
              <div className="pb-4 pt-2">
                <p className="text-sm text-secondary-text">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
