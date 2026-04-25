import { useGetAllBadgesByAdminQuery } from "@/store/Api/Badges.api";
import { Trophy } from "lucide-react";


// Define TypeScript interfaces
interface TopBadgeUser {
  name: string;
  totalBadges: number;
}

const TopBadgeEarners = () => {
  // API Hook
  const { data: badgesData, isLoading, isError } = useGetAllBadgesByAdminQuery(null);

  const topBadgeUsers: TopBadgeUser[] = badgesData?.data?.topBadgeUsers || [];

  // Determine rank color based on position
  const getRankColors = (rank: number) => {
    if (rank === 1) {
      return {
        bgColor: "bg-yellow-500",
        textColor: "text-white"
      };
    } else if (rank === 2) {
      return {
        bgColor: "bg-gray-400",
        textColor: "text-white"
      };
    } else if (rank === 3) {
      return {
        bgColor: "bg-orange-500",
        textColor: "text-white"
      };
    }
    return {
      bgColor: "bg-gray-200",
      textColor: "text-secondary-text"
    };
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
        <h2 className="mb-4">Top Badge Earners</h2>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-blue"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
        <h2 className="mb-4">Top Badge Earners</h2>
        <div className="text-center py-8 text-red-500">
          <p>Failed to load top badge earners</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
      <h2 className="mb-4">Top Badge Earners</h2>

      <div className="space-y-4">
        {topBadgeUsers.length === 0 ? (
          <div className="text-center py-8 text-secondary-text">
            <p>No badge earners yet</p>
          </div>
        ) : (
          topBadgeUsers.map((earner, index) => {
            const rank = index + 1;
            const { bgColor, textColor } = getRankColors(rank);

            return (
              <div
                key={index}
                className="p-4 bg-primary-white rounded-xl flex justify-between items-center hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full ${bgColor} flex items-center justify-center text-xs font-bold ${textColor}`}>
                    #{rank}
                  </div>
                  <span className="font-medium text-primary-text">{earner.name}</span>
                </div>

                <div className="flex items-center gap-1">
                  <Trophy size={16} className="text-primary-blue" />
                  <span className="text-primary-text">{earner.totalBadges} badges</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default TopBadgeEarners;