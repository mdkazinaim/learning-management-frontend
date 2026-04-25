import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center bg-white p-8 rounded-2xl shadow-sm border">
        <h1 className="text-3xl font-semibold text-gray-900">
          Access Restricted
        </h1>

        <p className="mt-4 text-sm text-gray-600 leading-relaxed">
          You do not have the required permissions to view this page. If you
          believe this is an error, please contact your administrator or return
          to a permitted area.
        </p>

        <div className="mt-6 flex justify-center gap-3">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Go Back
          </Button>

          <Button onClick={() => navigate("/")}>Go to Login</Button>
        </div>
      </div>
    </div>
  );
}
