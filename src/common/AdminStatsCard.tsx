/* eslint-disable @typescript-eslint/no-explicit-any */

const AdminStatsCard = ({ data }: any) => {
  return (
    <div className="p-6 border border-border rounded-xl bg-white w-full space-y-2">
      <div className="flex items-start justify-between">
        <h6 className="text-light-gray font-normal">{data.title}</h6>
        <span className="grid place-content-center bg-secondary-purple/20 size-10 border border-primary-purple/40 rounded-md">
          <data.icon className={`${data.iconColor}`} size={20} />
        </span>
      </div>
      <h2 className="text-primary-blue">{data.value}</h2>
      {data.trend.isVisible && (
        <div className="p-2 rounded-md bg-secondary-green/10 border border-primary-green/30 w-fit">
          <p
            className={`${
              data.trend.direction === "up"
                ? "text-secondary-green"
                : "text-primary-red"
            }`}
          >
            {data.trend.direction === "up" ? "+" : "-"}
            {data.trend.percentage}%
          </p>
        </div>
      )}
      {data.subText && (
        <p className="text-secondary-text mt-1">{data.subText}</p>
      )}
    </div>
  );
};

export default AdminStatsCard;
