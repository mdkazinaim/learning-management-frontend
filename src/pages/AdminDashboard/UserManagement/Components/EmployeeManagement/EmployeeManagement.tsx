import Header from "@/common/Header";
import EmployeeManagementTable from "./EmployeeManagementTable";



const EmployeeManagement = () => {

  return (
    <div className="space-y-6">
      <Header title="Employee Management" description="Manage all employees, invite new"/>
      <EmployeeManagementTable/>
    </div>
  );
};

export default EmployeeManagement;