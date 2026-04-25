import { useState } from "react";
import { Check } from "lucide-react";

const PaymentGateway = () => {
  const [gateways, setGateways] = useState([
    { id: 1, name: "Stripe", enabled: true },
    // { id: 2, name: "Paypal", enabled: false },
  ]);

  const handleToggle = (id: number) => {
    setGateways((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, enabled: !item.enabled } : item
      )
    );
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
      <h2 className="text-xl font-bold text-primary-text mb-4">
        Payment Gateway
      </h2>

      <div className="space-y-3">
        {gateways.map((gateway) => (
          <label
            key={gateway.id}
            className="flex items-center gap-3 cursor-pointer select-none"
          >
            {/* Hidden checkbox */}
            <input
              type="checkbox"
              checked={gateway.enabled}
              onChange={() => handleToggle(gateway.id)}
              className="hidden"
            />

            {/* Custom checkbox UI */}
            <div
              className={`w-5 h-5 rounded flex items-center justify-center border 
              ${
                gateway.enabled
                  ? "bg-primary-green border-primary-green"
                  : "border-gray-300"
              }`}
            >
              {gateway.enabled && <Check size={14} className="text-white" />}
            </div>

            <span className="text-primary-text">{gateway.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default PaymentGateway;
