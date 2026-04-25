import AdminStatsCard from "@/common/AdminStatsCard";
import data from "./ReportCard";

const ReportCardStats = () => {
  console.log(data);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 w-full">
      {data!.map((item, index) => (
        <AdminStatsCard key={index} data={item} />
      ))}
    </div>
  );
};

export default ReportCardStats;
