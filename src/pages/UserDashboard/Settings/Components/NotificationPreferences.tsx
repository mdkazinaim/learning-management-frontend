import { Bell } from "lucide-react";

const NotificationPreferences = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-border mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-secondary-purple rounded-lg flex items-center justify-center">
          <Bell size={20} className="text-primary-blue" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-primary-text">Notification Preferences</h2>
          <p className="text-sm text-secondary-text">Choose what notifications you want to receive</p>
        </div>
      </div>
      
      <div className="space-y-4 pt-4 border-t border-border">
        {/* Course Updates */}
        <div className="flex items-center justify-between py-3">
          <div>
            <h3 className="font-semibold text-primary-text">Course Updates</h3>
            <p className="text-xs text-secondary-text">Notifications about new courses and updates to enrolled courses</p>
          </div>
          <div className="relative inline-block w-10 align-middle select-none">
            <input 
              type="checkbox" 
              id="course-updates" 
              className="sr-only"
              defaultChecked
            />
            <label 
              htmlFor="course-updates" 
              className="block overflow-hidden h-5 rounded-full cursor-pointer transition-colors duration-200 bg-primary-blue"
            >
              <span className="block w-5 h-5 rounded-full bg-white transform translate-x-5 transition-transform duration-200"></span>
            </label>
          </div>
        </div>
        
        {/* Achievements & Badges */}
        <div className="flex items-center justify-between py-3">
          <div>
            <h3 className="font-semibold text-primary-text">Achievements & Badges</h3>
            <p className="text-xs text-secondary-text">Get notified when you earn new badges or complete milestones</p>
          </div>
          <div className="relative inline-block w-10 align-middle select-none">
            <input 
              type="checkbox" 
              id="achievements-badges" 
              className="sr-only"
              defaultChecked
            />
            <label 
              htmlFor="achievements-badges" 
              className="block overflow-hidden h-5 rounded-full cursor-pointer transition-colors duration-200 bg-primary-blue"
            >
              <span className="block w-5 h-5 rounded-full bg-white transform translate-x-5 transition-transform duration-200"></span>
            </label>
          </div>
        </div>
        
        {/* Weekly Digest */}
        <div className="flex items-center justify-between py-3">
          <div>
            <h3 className="font-semibold text-primary-text">Weekly Digest</h3>
            <p className="text-xs text-secondary-text">Receive a weekly summary of your learning progress</p>
          </div>
          <div className="relative inline-block w-10 align-middle select-none">
            <input 
              type="checkbox" 
              id="weekly-digest" 
              className="sr-only"
            />
            <label 
              htmlFor="weekly-digest" 
              className="block overflow-hidden h-5 rounded-full cursor-pointer transition-colors duration-200 bg-gray"
            >
              <span className="block w-5 h-5 rounded-full bg-white transition-transform duration-200"></span>
            </label>
          </div>
        </div>
        
        {/* Promotions & Updates */}
        <div className="flex items-center justify-between py-3">
          <div>
            <h3 className="font-semibold text-primary-text">Promotions & Updates</h3>
            <p className="text-xs text-secondary-text">Marketing emails about new features and special offers</p>
          </div>
          <div className="relative inline-block w-10 align-middle select-none">
            <input 
              type="checkbox" 
              id="promotions-updates" 
              className="sr-only"
            />
            <label 
              htmlFor="promotions-updates" 
              className="block overflow-hidden h-5 rounded-full cursor-pointer transition-colors duration-200 bg-gray"
            >
              <span className="block w-5 h-5 rounded-full bg-white transition-transform duration-200"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPreferences;