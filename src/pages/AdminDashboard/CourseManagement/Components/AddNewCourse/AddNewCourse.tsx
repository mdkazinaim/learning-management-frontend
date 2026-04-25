import Header from "@/common/Header";
import AddCourseForm from "./AddCourseForm";



const AddNewCourse = () => {

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="w-2/3">
      <Header title="Add New Course" description="In the realm of education, crafting and overseeing courses is essential. This process involves both creation and management to ensure quality learning experiences."/>
      </div>
      <AddCourseForm/>
    </div>
  );
};

export default AddNewCourse;