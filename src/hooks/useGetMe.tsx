import { useGetMeQuery } from "@/store/Api/User.api";

const useGetMe = () => {
  const { data, isLoading } = useGetMeQuery({});
  const user = !isLoading && data?.data;
  if (!user) return;
  return {
    role: user.role || "",
    fullName: user.fullName || "",
    email: user.email || "",
    isLoading,
  };
};

export default useGetMe;
