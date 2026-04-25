import Header from "@/common/Header";
import UserManagementTable from "./UserManagementTable";
const UserManagement = () => {
  return (
    <div className="space-y-6">
      <Header
        title="User Management"
        description="Manage all users, roles, and permissions"
      />
      <UserManagementTable />
    </div>
  );
};

export default UserManagement;
