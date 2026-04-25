import PrimaryButton from "@/common/PrimaryButton";
import { BsFire } from "react-icons/bs";

const KeepGoing = () => {

  return (
    <div className="w-full p-4 space-y-4 border border-primary-yellow/40 rounded-xl bg-linear-to-b from-secondary-yellow/60  to-primary-yellow/50 ">
      <div className="flex items-center justify-between">
        <span className="p-3 bg-primary-yellow rounded-full">
        <BsFire className="size-8 text-white"/>
        </span>
        <PrimaryButton
        type="Badge"
        title="7 Days Streak"
        className="text-light-blue bg-border"
        />
      </div>
      <div className="space-y-1">
        <h3>Keep Going!</h3>
        <p className="text-secondary-text">You're on a 7-day learning streak. Complete one more course this week to earn a bonus badge!</p>
      </div>
    </div>
  );
};

export default KeepGoing;