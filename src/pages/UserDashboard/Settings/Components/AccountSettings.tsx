import { Bell, Globe, Clock } from "lucide-react";

const AccountSettings = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-secondary-purple rounded-lg flex items-center justify-center">
          <Bell size={20} className="text-primary-blue" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-primary-text">Account Settings</h2>
          <p className="text-sm text-secondary-text">Manage your language and timezone preferences</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border">
        {/* Language Setting */}
        <div>
          <label className="block text-sm font-medium text-primary-text mb-2">Language</label>
          <div className="relative">
            <select className="w-full p-2 pl-8 border border-border rounded-lg bg-gray focus:outline-none focus:ring-2 focus:ring-primary-blue appearance-none">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
              <option>Japanese</option>
            </select>
            <Globe className="absolute left-2 top-2.5 text-secondary-text" size={16} />
          </div>
        </div>
        
        {/* Timezone Setting */}
        <div>
          <label className="block text-sm font-medium text-primary-text mb-2">Timezone</label>
          <div className="relative">
            <select className="w-full p-2 pl-8 border border-border rounded-lg bg-gray focus:outline-none focus:ring-2 focus:ring-primary-blue appearance-none">
              <option>Eastern Time (ET)</option>
              <option>Pacific Time (PT)</option>
              <option>Central Time (CT)</option>
              <option>Mountain Time (MT)</option>
              <option>UTC</option>
            </select>
            <Clock className="absolute left-2 top-2.5 text-secondary-text" size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
