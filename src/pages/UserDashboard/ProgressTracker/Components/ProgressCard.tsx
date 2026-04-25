/* eslint-disable @typescript-eslint/no-explicit-any */

import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

const ProgressCard = ({ data }: any) => {
  return (
    <div className="grid grid-cols-4 items-center justify-center h-full gap-6">
      {data.map((card: any) => {
        return (
          <div
            key={card.id}
            className="flex-1 bg-white border-gray border p-4 rounded-xl space-y-4 h-full"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3>{card.title}</h3>

              <div
                className={`${card.icon.colorClass} border-1.5 border-border p-2.5 rounded-xl`}
              >
                {card.icon.icon} 
              </div>
            </div>

            {/* Main Value */}
            <div className="space-y-4">
              <h1 className="text-2xl font-semibold">{card.value}</h1>

              {/* Footer Handling */}
              {card.footer?.type === "progress" && (
                <div className="space-y-2">
                  <Progress
                    value={(card.footer.current / card.footer.target) * 100}
                  />
                  <p className="text-sm">{card.footer.label}</p>
                </div>
              )}

              {card.footer?.type === "text" && (
                <p className="text-sm">{card.footer.content}</p>
              )}

              {card.footer?.type === "link" && (
                <Link
                  to={card.footer.linkUrl}
                  className="text-primary-blue underline cursor-pointer text-sm"
                >
                  {card.footer.content}
                </Link>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProgressCard;
