import { useState } from "react";
import { Check } from "lucide-react";

const SecuritySettings = () => {
  const [newRule, setNewRule] = useState("");
  const [rules, setRules] = useState([
    { id: 1, text: "Require special characters in passwords", enabled: true },
    { id: 2, text: "Enable Two-Factor Authentication (2FA)", enabled: true },
    { id: 3, text: "Force password reset every 90 days", enabled: false },
    { id: 4, text: "Minimum 8 Characters", enabled: true }
  ]);

  const handleAddRule = () => {
    if (!newRule.trim()) return;

    setRules((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        text: newRule.trim(),
        enabled: true
      }
    ]);

    setNewRule("");
  };

  const toggleRule = (id: number) => {
    setRules((prev) =>
      prev.map((rule) =>
        rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
      )
    );
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
      <h2 className="text-xl font-bold mb-4">Security Settings</h2>

      {/* Add New Rule */}
      <div className="mb-6">
        <label className="block mb-2 font-medium">Set Rule</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={newRule}
            onChange={(e) => setNewRule(e.target.value)}
            placeholder="Add new security rule..."
            className="flex-1 p-2 border border-border rounded-lg bg-gray focus:outline-none focus:ring-2 focus:ring-primary-blue"
          />
          <button
            onClick={handleAddRule}
            className="px-4 py-2 bg-primary-blue text-white rounded-lg hover:bg-primary-blue/90 transition-colors"
          >
            Add
          </button>
        </div>
      </div>

      {/* Rules List */}
      <div className="space-y-3">
        {rules.map((rule) => (
          <label
            key={rule.id}
            onClick={() => toggleRule(rule.id)}
            className="flex items-start gap-3 cursor-pointer"
          >
            {/* Hidden checkbox for accessibility */}
            <input
              type="checkbox"
              checked={rule.enabled}
              onChange={() => toggleRule(rule.id)}
              className="hidden"
            />

            {/* Custom checkbox */}
            <div
              className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                rule.enabled
                  ? "bg-primary-green border-primary-green"
                  : "border-border bg-white"
              }`}
            >
              {rule.enabled && <Check className="w-3 h-3 text-white" />}
            </div>

            {/* Rule text */}
            <span className="text-primary-text">{rule.text}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default SecuritySettings;
