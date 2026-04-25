import { useState } from "react";

// Define TypeScript interfaces
interface LoginHistoryItem {
  id: number;
  name: string;
  lastLogin: string;
  status: "Active" | "Inactive";
}

// Mock data for the login history
const mockLoginHistory: LoginHistoryItem[] = [
  {
    id: 1,
    name: "Admin User",
    lastLogin: "2 hours ago",
    status: "Active"
  },
  {
    id: 2,
    name: "Dr. Sarah Mitchell",
    lastLogin: "5 hours ago",
    status: "Active"
  },
  {
    id: 3,
    name: "Dr. James Cooper",
    lastLogin: "1 day ago",
    status: "Inactive"
  }
];

const LoginHistory = () => {
  const [loginHistory] = useState<LoginHistoryItem[]>(mockLoginHistory);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
      <h2 className="mb-4">Login History</h2>
      
      <div className="space-y-4">
        {loginHistory.map((entry) => (
          <div 
            key={entry.id}
            className="flex justify-between items-center p-4 bg-gray rounded-xl"
          >
            <div>
              <h3 className="mb-1">{entry.name}</h3>
              <p className="">Last login: {entry.lastLogin}</p>
            </div>
            
            <div className="flex items-center">
              <span className={`px-2 py-1 rounded-md text-base font-normal ${
                entry.status === "Active" 
                  ? "bg-primary-green text-white" 
                  : "bg-light-gray text-white"
              }`}>
                {entry.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoginHistory;
