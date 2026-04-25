import { SlCalender, SlGraph } from "react-icons/sl";
import { FiUsers } from "react-icons/fi";
import { useGetAllSupportQuery } from "@/store/Api/Support.api";

const SupportCard = () => {
  const { data, isLoading } = useGetAllSupportQuery({ limit: 1 });

  const totalPending = data?.data?.totalPending || 0;
  const totalResolve = data?.data?.totalResolve || 0;
  const totalTickets = data?.meta?.total || 0;

  const metrics = [
    {
      id: 1,
      title: "Pending",
      value: totalPending,
      icon: <SlCalender className="text-primary-purple" size={24}/>,
      iconBg: "bg-secondary-purple/30",
      iconBorder: "border-primary-purple/30",
    },
    {
      id: 2,
      title: "Total Tickets",
      value: totalTickets,
      icon: <SlGraph className="text-primary-purple" size={24}/>,
      iconBg: "bg-secondary-purple/30",
      iconBorder: "border-primary-purple/30",
    },
    {
      id: 3,
      title: "Resolved Tickets",
      value: totalResolve,
      icon: <FiUsers className="text-primary-purple" size={24}/>,
      iconBg: "bg-secondary-purple/30",
      iconBorder: "border-primary-purple/30",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white rounded-xl p-6 border border-border animate-pulse">
            <div className="flex flex-col items-start gap-4">
              <div className="size-12 bg-gray-200 rounded-lg"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-8 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return ( 
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {metrics.map(metric => (
        <div key={metric.id} className="bg-white rounded-xl p-6 border border-border">
          <div className="flex flex-col items-start gap-4">
            <div
              className={`size-12 ${metric.iconBg} ${metric.iconBorder} border rounded-lg flex items-center justify-center`}
            >
              {metric.icon}
            </div>
            <h6 className="text-light-gray font-normal">{metric.title}</h6>
            <p className="text-2xl font-semibold text-primary-text">{metric.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SupportCard;