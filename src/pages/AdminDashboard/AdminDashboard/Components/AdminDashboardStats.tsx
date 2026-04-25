import AdminStatsCard from "@/common/AdminStatsCard";

import { generateCardData } from "./AdminCardData";
import { useAdminAnalyticsQuery } from "@/store/Api/Analytics.api";

const AdminDashboardStats = () => {
  const { data, isLoading } = useAdminAnalyticsQuery(null);
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 w-full">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white rounded-xl p-6 shadow-sm border border-border animate-pulse"
          >
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  const cardData = generateCardData(data?.data);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 w-full">
      {cardData.map((item, index) => (
        <AdminStatsCard key={index} data={item} />
      ))}
    </div>
  );
};

export default AdminDashboardStats;
