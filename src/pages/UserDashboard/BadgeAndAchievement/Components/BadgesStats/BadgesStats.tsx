import { Trophy, Star, Target } from "lucide-react";

const BadgesStats = () => {
  return (
    <div className="">
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Total Badges Card */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-border col-span-2">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-sm font-medium text-secondary-text">Total Badges</h3>
                <p className="text-2xl font-bold text-primary-text mt-1">6/12</p>
              </div>
              <div className="w-10 h-10 bg-secondary-purple rounded-lg flex items-center justify-center">
                <Trophy size={20} className="text-primary-blue" />
              </div>
            </div>
            <div className="w-full bg-gray rounded-full h-2">
              <div 
                className="bg-primary-green h-2 rounded-full"
                style={{ width: '50%' }}
              ></div>
            </div>
            <p className="text-xs text-secondary-text mt-1">50% Unlocked</p>
          </div>
          
          {/* Badge Points Card */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-border">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-sm font-medium text-secondary-text">Badge Points</h3>
                <p className="text-2xl font-bold text-primary-text mt-1">1150</p>
              </div>
              <div className="w-10 h-10 bg-secondary-yellow rounded-lg flex items-center justify-center">
                <Star size={20} className="text-primary-yellow" />
              </div>
            </div>
            <p className="text-xs text-secondary-text">Earned from badges</p>
          </div>
          
          {/* Next Milestone Card */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-border">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-sm font-medium text-secondary-text">Next Milestone</h3>
                <p className="text-xl font-bold text-primary-text mt-1">10 Course Champion</p>
              </div>
              <div className="w-10 h-10 bg-secondary-purple rounded-lg flex items-center justify-center">
                <Target size={20} className="text-primary-purple" />
              </div>
            </div>
            <p className="text-xs text-secondary-text">Complete 2 more courses to unlock</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BadgesStats;
