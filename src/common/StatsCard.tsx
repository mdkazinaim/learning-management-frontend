/* eslint-disable @typescript-eslint/no-explicit-any */
import { Progress } from "@/components/ui/progress";
import { useGetMeQuery } from "@/store/Api/User.api";
import { Loader } from "lucide-react";
import { Link } from "react-router-dom";
import { Suspense } from "react";

const StatsCardContent = ({ data, user }: any) => {
  return (
    <div className="w-full space-y-6 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 items-center justify-center h-full gap-6">
      {data.map((card: any) => {
        return (
          <div
            key={card.id}
            className="w-full flex-1 bg-white border-gray border p-4 rounded-xl space-y-4 h-full"
          >
            <div className="w-full flex items-center justify-between">
              <h3>{card.title}</h3>
              <div className="bg-border/50 border-1.5 border-border p-2.5 rounded-xl">
                <img src={card.img} alt="" className="" />
              </div>
            </div>
            <div className="w-full">
              {card.level ? (
                <div className="space-y-4">
                  <h6>
                    Level : {card.level.number} {card.level.name}
                  </h6>
                  <Progress value={card.level.progress_percentage} />
                  <h6>{card.level.progress_percentage}% Completed</h6>
                </div>
              ) : card.points ? (
                <div className="w-full space-y-4">
                  <h1>{user.totalPoints}</h1>
                  <p>{card.points.description}</p>
                </div>
              ) : card.badges ? (
                <div className="space-y-4 w-full">
                  <div className="flex items-center gap-2">
                    {card.badges.list.map((item: any, index: number) => (
                      <div
                        key={index}
                        className={`${item.bg} border-1.5 border-border rounded-xl p-4`}
                      >
                        <img src={item.img} alt="" />
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center">
                      <p>{user?.earnedBadges?.length}</p> /{" "}
                      <p>{card?.badges?.total}</p>
                    </div>
                    <Link to={"/user/badges"}>
                      <p className="underline text-primary-blue cursor-pointer">
                        View All Badges
                      </p>
                    </Link>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const StatsCard = ({ data }: any) => {
  const { data: userData, isLoading } = useGetMeQuery({});
  const user = userData?.data;
  console.log(user);
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-96">
          <Loader className="animate-spin text-primary-blue" size={48} />
        </div>
      }
    >
      {!isLoading && user ? <StatsCardContent data={data} user={user} /> : null}
    </Suspense>
  );
};

export default StatsCard;
