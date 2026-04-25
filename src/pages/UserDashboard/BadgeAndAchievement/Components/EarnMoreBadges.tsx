import { BookOpen } from "lucide-react";

const EarnMoreBadges = () => {
  return (
         
        <div className="space-y-4 border border-border bg-white rounded-xl p-4">
          <h2 className="">How to Earn More Badges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Complete Courses */}
             <div className="flex items-start gap-3 border border-border bg-primary-white p-4 rounded-xl">
                <div className="size-12 bg-light-blue rounded-md flex items-center justify-center">
                  <BookOpen size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="">Complete Courses</h3>
                  <p className="">Finish courses to unlock achievement badges</p>
                </div>
              </div>
              
              {/* Reach Milestones */}
              <div className="flex items-start gap-3 border border-border bg-primary-white p-4 rounded-xl">
                <div className="size-12 bg-light-blue rounded-md flex items-center justify-center">
                  <BookOpen size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="">Reach Milestones</h3>
                  <p className="">Hit learning goals to unlock special badges</p>
                </div>
              </div>
            </div>
            
            {/* Right Column */}
            <div className="space-y-4">
              {/* Build Streaks */}
              <div className="flex items-start gap-3 border border-border bg-primary-white p-4 rounded-xl">
                <div className="size-12 bg-light-blue rounded-md flex items-center justify-center">
                  <BookOpen size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="">Build Streaks</h3>
                  <p className="">Learn consistently to earn streak badges</p>
                </div>
              </div>
              
              {/* Help Others */}
              <div className="flex items-start gap-3 border border-border bg-primary-white p-4 rounded-xl">
                <div className="size-12 bg-light-blue rounded-md flex items-center justify-center">
                  <BookOpen size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="">Help Others</h3>
                  <p className="">Support fellow learners to earn community badges</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      
  
  );
};

export default EarnMoreBadges;
