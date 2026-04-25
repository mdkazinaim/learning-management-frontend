import { User, BookOpen, Trophy } from "lucide-react";

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: "new_user",
      title: "New User Registration",
      description: "John Doe joined the platform",
      timeAgo: "5 min",
      icon: "user",
    },
    {
      id: 2,
      type: "enrollment",
      title: "Course Enrolment",
      description: "Sarah Smith enrolled in Leadership Training",
      timeAgo: "15 min",
      icon: "book",
    },
    {
      id: 3,
      type: "enrollment",
      title: "Course Enrolment",
      description: "Sarah Smith enrolled in Leadership Training",
      timeAgo: "15 min",
      icon: "trophy",
    },
    {
      id: 4,
      type: "enrollment",
      title: "Course Enrolment",
      description: "Sarah Smith enrolled in Leadership Training",
      timeAgo: "15 min",
      icon: "user",
    },
  ];
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-border sticky top-0">
      <h2 className="mb-4">Recent Activity</h2>

      <div className="space-y-3">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="p-4 bg-primary-white rounded-xl flex items-center gap-3 hover:bg-gray/80 transition-colors border border-border"
          >
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                activity.icon === "user"
                  ? "bg-primary-blue text-white"
                  : activity.icon === "book"
                  ? "bg-primary-green text-white"
                  : "bg-primary-yellow text-white"
              }`}
            >
              {activity.icon === "user" && <User size={20} />}
              {activity.icon === "book" && <BookOpen size={20} />}
              {activity.icon === "trophy" && <Trophy size={20} />}
            </div>

            <div className="flex-1">
              <div className="flex justify-between">
                <h6 className="text-primary-blue">{activity.title}</h6>
                <span className="text-xs text-secondary-text">
                  {activity.timeAgo}
                </span>
              </div>
              <p className="text-sm text-secondary-text mt-1">
                {activity.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
