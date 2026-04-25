import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <h1 className="text-6xl font-bold text-gray-900">404</h1>
      <h2 className="mt-2 text-2xl font-semibold text-gray-800">
        Page Not Found
      </h2>
      <p className="mt-4 text-gray-600 text-center max-w-sm">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <div className="mt-6 flex gap-3">
        <Button onClick={() => navigate(-1)} variant="outline">
          Go Back
        </Button>
        <Button onClick={() => navigate("/")}>Go Home</Button>
      </div>
    </div>
  );
}
