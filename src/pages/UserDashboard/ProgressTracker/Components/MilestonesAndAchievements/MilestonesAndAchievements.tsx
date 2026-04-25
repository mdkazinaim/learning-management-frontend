/* eslint-disable @typescript-eslint/no-explicit-any */

import { CheckCircle, Trophy } from "lucide-react";

const MilestonesAndAchievements = () => {
  const milestones = [
    {
      id: "first_course_completed",
      title: "First Course Completed",
      description: "Complete your first course",
      status: "achieved",
      achieved_on: "2024-01-15",
      icon: "check"
    },
    {
      id: "five_courses_master",
      title: "5 Courses Master",
      description: "Complete 5 courses",
      status: "achieved",
      achieved_on: "2024-02-10",
      icon: "check"
    },
    {
      id: "level_2_achiever",
      title: "Level 2 Achiever",
      description: "Reach Level 2",
      status: "achieved",
      achieved_on: "2024-02-28",
      icon: "check"
    },
    {
      id: "ten_course_champion",
      title: "10 Course Champion",
      description: "Complete 10 courses",
      status: "in_progress",
      progress: 80,
      icon: "trophy"
    },
    {
      id: "level_3_expert",
      title: "Level 3 Expert",
      description: "Reach Level 3",
      status: "in_progress",
      progress: 62,
      icon: "trophy"
    }
  ];

  const MilestoneCard = ({ milestone } : any) => {
    const isAchieved = milestone.status === "achieved";
    const date = new Date(milestone.achieved_on);
    const formattedDate = isAchieved ? date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }) : null;

    return (
      <div 
        className={`p-4 rounded-xl mb-4 border ${
          isAchieved 
            ? 'bg-primary-green/10 border-secondary-green' 
            : 'bg-gray border-gray-200'
        }`}
      >
        <div className="flex items-start gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isAchieved 
              ? 'bg-green-500 text-white' 
              : 'bg-primary-white text-secondary-text'
          }`}>
            {milestone.icon === "check" ? (
              <CheckCircle size={20} />
            ) : (
              <Trophy size={20} />
            )}
          </div>
          
          <div className="flex-1">
            <h6 className="font-semibold text-primary-text">{milestone.title}</h6>
            <p className="mt-1 text-secondary-text!">{milestone.description}</p>
            
            {isAchieved ? (
              <p className=" text-primary-green mt-2">Achieved on {formattedDate}</p>
            ) : (
              <div className="mt-3">
                <div className="flex justify-between text-xs text-secondary-text mb-1">
                  <span>{milestone.progress}% Complete</span>
                </div>
                <div className="w-full bg-secondary-purple rounded-full h-2">
                  <div 
                    className="bg-secondary-green h-2 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${milestone.progress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className=" p-6 bg-white border border-border rounded-xl">
      <div className="space-y-6">
        <h3 className="">Milestones & Achievements</h3>
        <div className="space-y-2">
          {milestones.map((milestone) => (
            <MilestoneCard key={milestone.id} milestone={milestone} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MilestonesAndAchievements;
