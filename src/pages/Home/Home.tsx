import CommonWrapper from "@/common/CommonWrapper";
import PrimaryButton from "@/common/PrimaryButton";
import { Link } from "react-router-dom";

const Home = () => {

  return (
    <CommonWrapper>
      <div className="h-screen bg-website-color-lightGreen">
        <div className="flex gap-4 items-center justify-center min-h-screen ">
          <Link to="/user">
         <PrimaryButton title="User Dashboard" type="Primary" />
          </Link>
          <Link to="/admin">
         <PrimaryButton title="Admin Dashboard" type="Primary" />
          </Link>
        </div>
      </div>
    </CommonWrapper>
  );
};

export default Home;
