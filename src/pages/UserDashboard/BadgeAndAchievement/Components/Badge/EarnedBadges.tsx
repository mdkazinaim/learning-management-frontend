/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Trophy,
  Flame,
  Star,
  Users,
  Award,
  BookOpen,
  Clock,
  Target,
  Lock,
} from "lucide-react";

const EarnedBadges = () => {
  const badgesData = {
    earned: [
      {
        id: "first_step",
        title: "First Step",
        description: "Complete your first course",
        points: 100,
        earned_on: "2024-01-15",
        icon: "book",
        status: "earned",
        bgColor: "bg-[#2B7FFF]",
      },
      {
        id: "quick_learner",
        title: "Quick Learner",
        description: "Complete a course within 3 days",
        points: 150,
        earned_on: "2024-01-20",
        icon: "flame",
        status: "earned",
        bgColor: "bg-[#FF6900]",
      },
      {
        id: "five_course_master",
        title: "5 Course Master",
        description: "Complete 5 courses",
        points: 250,
        earned_on: "2024-02-10",
        icon: "star",
        status: "earned",
        bgColor: "bg-[#F0B100]",
      },
      {
        id: "streak_champion",
        title: "Streak Champion",
        description: "Maintain a 7-day learning streak",
        points: 100,
        earned_on: "2024-02-28",
        icon: "flame",
        status: "earned",
        bgColor: "bg-[#FB2C36]",
      },
      {
        id: "level_2_achiever",
        title: "Level 2 Achiever",
        description: "Reach Level 2",
        points: 300,
        earned_on: "2024-03-15",
        icon: "award",
        status: "earned",
        bgColor: "bg-[#AD46FF]",
      },
      {
        id: "team_player",
        title: "Team Player",
        description: "Complete a group learning session",
        points: 200,
        earned_on: "2024-03-20",
        icon: "users",
        status: "earned",
        bgColor: "bg-[#00C950]",
      },
    ],
    locked: [
      {
        id: "ten_course_champion",
        title: "10 Course Champion",
        description: "Complete 10 courses",
        points: 500,
        progress: 80,
        icon: "trophy",
        status: "locked",
      },
      {
        id: "perfect_score",
        title: "Perfect Score",
        description: "Score 100% on any quiz",
        points: 200,
        progress: 65,
        icon: "target",
        status: "locked",
      },
      {
        id: "knowledge_sharer",
        title: "Knowledge Sharer",
        description: "Help 5 other learners",
        points: 300,
        progress: 40,
        icon: "users",
        status: "locked",
      },
      {
        id: "level_3_expert",
        title: "Level 3 Expert",
        description: "Reach Level 3",
        points: 500,
        progress: 62,
        icon: "award",
        status: "locked",
      },
      {
        id: "thirty_day_streak",
        title: "30 Day Streak",
        description: "Maintain a 30-day learning streak",
        points: 500,
        progress: 30,
        icon: "clock",
        status: "locked",
      },
      {
        id: "category_master",
        title: "Category Master",
        description: "Complete all courses in one category",
        points: 500,
        progress: 75,
        icon: "book",
        status: "locked",
      },
    ],
  };

  const BadgeCard = ({ badge }: any) => {
    const getIcon = (iconName: string) => {
      switch (iconName) {
        case "book":
          return <BookOpen size={32} />;
        case "flame":
          return <Flame size={32} />;
        case "star":
          return <Star size={32} />;
        case "award":
          return <Award size={32} />;
        case "users":
          return <Users size={32} />;
        case "trophy":
          return <Trophy size={32} />;
        case "target":
          return <Target size={32} />;
        case "clock":
          return <Clock size={32} />;
        default:
          return <BookOpen size={32} />;
      }
    };

    const isEarned = badge.status === "earned";
    const date = new Date(badge.earned_on);
    const formattedDate = isEarned
      ? date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : null;

    return (
      <div
        className={`p-6 rounded-xl  ${isEarned ? "bg-white" : "bg-gray-50"}`}
      >
        <div className="space-y-4 relative">
          <div
            className={`size-14 rounded-lg flex items-center justify-center ${
              isEarned ? `${badge.bgColor} text-white` : "bg-gray text-gray-500"
            }`}
          >
            {isEarned ? (
              getIcon(badge.icon)
            ) : (
              <div className="">
                {/* Lock Overlay */}
                <span className="absolute top-0 left-0 flex items-center justify-center bg-black/40 text-white rounded-xl z-10 size-14">
                  <Lock size={24} />
                </span>

                {/* Icon behind lock */}
                <div className="opacity-40">{getIcon(badge.icon)}</div>
              </div>
            )}
          </div>

          <div className="flex-1 space-y-2">
            <h3 className="font-semibold text-gray-800">{badge.title}</h3>
            <p className="text-xs text-gray-600 mt-1">{badge.description}</p>

            {isEarned ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 mt-3">
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                    Earned
                  </span>
                  <span className="text-xs text-gray-500">
                    Earned on {formattedDate}
                  </span>
                </div>
                <span className="inline-block mt-2 px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded">
                  +{badge.points} pts
                </span>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 mt-3">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    Locked
                  </span>
                  <span className="text-xs text-gray-500">
                    Progress: {badge.progress}%
                  </span>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-blue-500 h-1.5 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${badge.progress}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between">
                <span className="inline-block mt-2 px-2 py-1 bg-gray text-primary-text text-xs font-medium rounded">
                  Locked
                </span>
                <span className="inline-block mt-2 px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded">
                  +{badge.points} pts
                </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="">
      <div className=" space-y-8">
        {/* Earned Badges Section */}
        <div className=" space-y-6">
          <h2 className="">Earned Badges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {badgesData.earned.map((badge) => (
              <BadgeCard key={badge.id} badge={badge} />
            ))}
          </div>
        </div>
        {/* Locked Badges Section */}
        <div>
          <h2 className="text-gray-800 mb-6">
            Locked Badges
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {badgesData.locked.map((badge) => (
              <BadgeCard key={badge.id} badge={badge} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarnedBadges;
