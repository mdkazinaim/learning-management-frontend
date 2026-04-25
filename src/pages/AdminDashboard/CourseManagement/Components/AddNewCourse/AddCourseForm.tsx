/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import PrimaryButton from "@/common/PrimaryButton";
import { Edit, Trash2 } from "lucide-react";
import AddModuleModal from "./AddModuleModal";
import CreateQuizModal from "./CreateQuizModal";
import CourseContentForm from "./CourseContentForm";
import { useNavigate } from "react-router-dom";
import AddLessons from "./AddLessons";
import {
  useCreateCourseMutation,
  useLazyGetCourseByIdQuery,
  useUpdateCourseMutation,
} from "@/store/Api/Course.api";
import { useDeleteModuleMutation } from "@/store/Api/Module.api";
import Swal from "sweetalert2";
// Define form validation schema
const courseSchema = z.object({
  title: z.string().min(1, "Course title is required"),
  description: z.string().min(1, "Course description is required"),
  category: z.string().min(1, "Category is required"),
  prices: z.number().min(0, "Price must be valid"),
  courseTag: z.string().min(1, "Course tag is required"),
  instructorName: z.string().min(1, "Instructor name is required"),
  instructorTitle: z.string().min(1, "Instructor title is required"),
  instructorDescription: z
    .string()
    .min(1, "Instructor description is required"),
});
type CourseFormData = z.infer<typeof courseSchema>;

const AddCourseForm = () => {
  const localCourseId = localStorage.getItem("courseId");
  const [getCourseById, { data: course }] = useLazyGetCourseByIdQuery();
  const [moduleId, setModuleId] = useState("");
  const [lessonModuleId, setLessonModuleId] = useState("");
  const [courseId, setCourseId] = useState(localCourseId || "");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [instructorProfile, setInstructorProfile] = useState<File | null>(null);
  const [instructorPreview, setInstructorPreview] = useState<string | null>(
    null,
  );
  const [learn, setLearn] = useState<string[]>([]);
  const [moduleModal, setModuleModal] = useState(false);
  const [quizModal, setQuizModal] = useState(false);
  const [lessonModal, setLessonModal] = useState(false);
  const [moduleData, setModuleData] = useState([]);
  const [certificate, setCertificate] = useState(false);
  const [createCourse, { isLoading: isCreating }] = useCreateCourseMutation();
  const [updateCourse, { isLoading: isUpdating }] = useUpdateCourseMutation();
  const [deleteModule] = useDeleteModuleMutation();
  useEffect(() => {
    if (courseId) {
      getCourseById(courseId);
    }
  }, [courseId, getCourseById]);

  // Track the last initialized courseId to prevent repeated resets
  const lastInitializedId = useRef<string | null>(null);

  const courseData = course?.data;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      prices: 0,
      instructorName: "",
      instructorTitle: "",
      instructorDescription: "",
      courseTag: "",
    },
  });
  useEffect(() => {
    if (!courseData) return;

    // Only reset the form if we haven't initialized for this course data yet
    // This prevents wiping out unsaved changes during background refetches
    if (lastInitializedId.current === courseData._id) return;

    reset({
      title: courseData.title ?? "",
      description: courseData.description ?? "",
      category: courseData.category ?? "",
      prices: courseData.prices ?? 0,
      instructorName: courseData.instructorName ?? "",
      instructorTitle: courseData.instructorTitle ?? "",
      instructorDescription: courseData.instructorDescription ?? "",
      courseTag: courseData.courseTag ?? "",
    });

    setLearn(courseData.whatsUserLearn ?? []);

    if (courseData?.thumbnail) {
      setThumbnail(courseData.thumbnail);
    }
    if (courseData?.instructorProfile) {
      setInstructorPreview(courseData.instructorProfile);
      setInstructorProfile(null);
    }

    lastInitializedId.current = courseData._id;
  }, [courseData, reset]);

  // Memoize props to prevent unnecessary rerenders in child component
  const memoizedThumbnail = useMemo(
    () => thumbnail || courseData?.thumbnail || null,
    [thumbnail, courseData?.thumbnail],
  );
  const memoizedLearn = useMemo(() => learn, [learn]);
  const handleInstructorProfileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setInstructorProfile(file);
    setInstructorPreview(URL.createObjectURL(file));
  };
  const onSubmit = async (data: CourseFormData) => {
    const toastId = toast.loading("Saving course details...");
    const payload = {
      ...data,
      whatsUserLearn: learn,
      certificate,
    };
    try {
      const formData = new FormData();
      formData.append("thumbnail", thumbnail!);
      formData.append("instructorProfile", instructorProfile!);
      formData.append(
        "data",
        JSON.stringify({
          ...payload,
          ...(courseId ? { courseId } : {}),
        }),
      );
      const res = courseId
        ? await updateCourse(formData).unwrap()
        : await createCourse(formData).unwrap();
        console.log(res,"Res")
      if (res.success) {
        setCourseId(res.data._id);
        localStorage.setItem("courseId", res.data._id);
        toast.success("Course created successfully!", { id: toastId });
      }
    } catch (error){
      console.log(error)
      toast.error("Failed to create course. Please try again.", {
        id: toastId,
      });
    }
  };
  // const handleAddModule = () => {
  //   // In a real implementation, this would open a module creation form
  //   const newModuleId =
  //     modules.length > 0 ? Math.max(...modules.map((m) => m.id)) + 1 : 1;
  //   setModules([
  //     ...modules,
  //     { id: newModuleId, title: `Module ${newModuleId}` },
  //   ]);

  //   toast.info("New module added. Configure module details in the next step.");
  // };
  const handleAddQuiz = (data: any) => {
    console.log(data);
  };
  const DeleteModule = async (moduleId: number) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    const toastId = toast.loading("Deleting module...");
    try {
      const res = await deleteModule({ moduleId, courseId }).unwrap();
      if (res.success) {
        toast.success("Module deleted successfully!", { id: toastId });

        await Swal.fire({
          title: "Deleted!",
          text: "The module has been removed successfully.",
          icon: "success",
        });
      }
    } catch {
      toast.error("Failed to delete module. Please try again.", {
        id: toastId,
      });
    }
  };
  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 grid">
        {/* Course Title */}
        <div className=" space-y-6">
          <div className="lg:flex items-start space-y-6 md:space-y-0 md:gap-6  w-full">
            <div className="md:min-w-2/3 space-y-6">
              <div className="bg-white p-6 shadow-sm border border-border rounded-xl">
                <div className="mb-6">
                  <label className="block text-sm mb-2">Course Title</label>
                  <input
                    type="text"
                    {...register("title")}
                    className={`w-full p-2 border ${
                      errors.title ? "border-red-500" : "border-border"
                    } rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-blue`}
                  />
                  {errors.title && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.title.message}
                    </p>
                  )}
                </div>
                {/* Course Description */}
                <div className="mb-6">
                  <label className="block text-sm mb-2">
                    Course Description
                  </label>
                  <textarea
                    {...register("description")}
                    rows={5}
                    className={`w-full p-2 border ${
                      errors.description ? "border-red-500" : "border-border"
                    } rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-blue`}
                  />
                  {errors.description && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.description.message}
                    </p>
                  )}
                </div>
                {/* Category and Instructor */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm mb-2">Category</label>
                    <input
                      type="text"
                      {...register("category")}
                      className={`w-full p-2 border ${
                        errors.category ? "border-red-500" : "border-border"
                      } rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-blue`}
                    />
                    {errors.category && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.category.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Price</label>
                    <input
                      type="number"
                      {...register("prices", { valueAsNumber: true })}
                      className={`w-full p-2 border ${
                        errors.prices ? "border-red-500" : "border-border"
                      } rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-blue`}
                    />
                    {errors.prices && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.prices.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Add Course Tag</label>
                    <input
                      type="string"
                      {...register("courseTag")}
                      className={`w-full p-2 border ${
                        errors.courseTag ? "border-red-500" : "border-border"
                      } rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-blue`}
                    />
                    {errors.courseTag && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.courseTag.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="pt-6 space-y-6">
                  <h4 className="font-semibold">Instructor Information</h4>

                  <div
                    className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl border-border bg-white cursor-pointer hover:bg-gray-50 transition-colors"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      const file = e.dataTransfer.files?.[0];
                      if (file)
                        handleInstructorProfileChange({
                          target: { files: [file] },
                        } as any);
                    }}
                    onClick={() => {
                      document
                        .getElementById("instructorProfileInput")
                        ?.click();
                    }}
                  >
                    {instructorPreview ? (
                      <div className="w-24 h-24 rounded-full overflow-hidden border border-border">
                        <img
                          src={instructorPreview}
                          alt="Instructor Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="text-center">
                        <p className="text-sm text-light-gray mb-1">
                          Drag & drop or click to upload
                        </p>
                        <p className="text-xs text-light-gray">
                          Recommended: square image, max 2MB
                        </p>
                      </div>
                    )}

                    <input
                      type="file"
                      id="instructorProfileInput"
                      accept="image/*"
                      onClick={(e) => e.stopPropagation()} // ✅ Prevent double open
                      onChange={(e) => handleInstructorProfileChange(e)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-2">
                      Instructor Name
                    </label>
                    <input
                      {...register("instructorName")}
                      className={`w-full p-2 border ${
                        errors.instructorName
                          ? "border-red-500"
                          : "border-border"
                      } rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-blue`}
                    />
                    {errors.instructorName && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.instructorName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm mb-2">
                      Instructor Title
                    </label>
                    <input
                      {...register("instructorTitle")}
                      className={`w-full p-2 border ${
                        errors.instructorTitle
                          ? "border-red-500"
                          : "border-border"
                      } rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-blue`}
                    />
                    {errors.instructorTitle && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.instructorTitle.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm mb-2">
                      Instructor Description
                    </label>
                    <textarea
                      {...register("instructorDescription")}
                      rows={4}
                      className={`w-full p-2 border ${
                        errors.instructorDescription
                          ? "border-red-500"
                          : "border-border"
                      } rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-blue`}
                    />
                    {errors.instructorDescription && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.instructorDescription.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="certificate"
                    checked={certificate}
                    onChange={(e) => setCertificate(e.target.checked)}
                    className="h-4 w-4 text-primary-blue border-gray rounded"
                  />
                  Certificate of Completion
                  <label
                    htmlFor="certificate"
                    className="text-sm text-primary-text"
                  ></label>
                </div>
                {/* Submit Button */}
                {!courseId ? (
                  <button
                    type="submit"
                    disabled={isCreating}
                    className={`place-self-end py-3 px-10 bg-primary-blue text-white rounded-xl font-medium hover:bg-primary-blue/90 transition-colors ${
                      isCreating ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isCreating
                      ? "Saving Course Details..."
                      : "Save Course Details"}
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className={`place-self-end py-3 px-10 bg-primary-blue text-white rounded-xl font-medium hover:bg-primary-blue/90 transition-colors ${
                      isUpdating ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isUpdating
                      ? "Updating Course Details..."
                      : "Update Course Details"}
                  </button>
                )}
              </div>
            </div>
            <CourseContentForm
              setThumbnail={setThumbnail}
              thumbnail={memoizedThumbnail}
              learn={memoizedLearn}
              setLearn={setLearn}
            />
          </div>
        </div>
      </form>
      <div className="space-y-6">
        <button
          type="button"
          onClick={() => {
            setModuleModal(true);
            setModuleId("");
            setModuleData([]);
          }}
          disabled={!courseId}
          className="w-full py-2 border-2 border-dashed border-primary-purple/50 bg-secondary-purple/30 text-light-blue rounded-xl cursor-pointer hover:shadow-md"
        >
          Add Module
        </button>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
          {courseData?.modules?.length > 0 ? (
            <div className="space-y-3">
              {courseData?.modules?.map((module: any, index: number) => {
                return (
                  <div
                    key={module._id}
                    className="p-4 bg-white border-border border rounded-xl flex items-center justify-between"
                  >
                    <div className="w-full">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary-blue text-white flex items-center justify-center">
                          {index + 1}
                        </div>
                        <span className="font-medium text-primary-text">
                          {module.moduleName}
                        </span>
                      </div>
                      <div className="">
                        {module.lessons?.length > 0
                          ? module.lessons?.map(
                              (lesson: any, index: number) => {
                                return (
                                  <div
                                    key={lesson.id}
                                    className="flex items-center gap-2 ml-4 py-2"
                                  >
                                    <div className=" text-gray-500 flex items-center text-sm justify-center">
                                      Lessons {index + 1} :
                                    </div>
                                    <span className="font-medium text-sm text-primary-text">
                                      {lesson.lessonName}
                                    </span>
                                  </div>
                                );
                              },
                            )
                          : ""}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-5">
                      <div className="space-x-2">
                        <button
                          onClick={() => {
                            setModuleModal(true);
                            setModuleId(module._id as string);
                            setModuleData(module);
                          }}
                          className="text-light-blue hover:text-light-gray"
                        >
                          <Edit size={20} />
                        </button>
                        <button
                          onClick={() => DeleteModule(module._id)}
                          className="text-primary-red hover:text-primary-red/80"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                      <PrimaryButton
                        type="Primary"
                        title="Create Lesson"
                        onClick={() => {
                          setLessonModal(true);
                          setLessonModuleId(module._id);
                        }}
                        className="bg-secondary-green text-sm text-white"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-secondary-text text-center">
              No modules added yet.
            </p>
          )}
        </div>
        <PrimaryButton
          type="Primary"
          title="See Preview"
          onClick={() =>
            navigate(`/admin/course-management/course-preview/${courseId}`)
          }
          className="bg-primary-blue text-base text-white w-full"
        />
      </div>

      {moduleModal && (
        <AddModuleModal
          isOpen={moduleModal}
          onClose={() => {
            setModuleModal(false);
            setModuleId("");
            setModuleData([]);
          }}
          // onAddModule={handleAddModule}
          setModuleId={setModuleId}
          moduleId={moduleId}
          courseId={courseId}
          moduleData={moduleData}
        />
      )}
      {quizModal && (
        <CreateQuizModal
          isOpen={quizModal}
          onClose={() => setQuizModal(false)}
          onAddQuiz={handleAddQuiz}
        />
      )}
      {lessonModal && (
        <AddLessons
          isOpen={lessonModal}
          onClose={() => setLessonModal(false)}
          moduleId={lessonModuleId as string}
          courseId={courseId}
        />
      )}
    </div>
  );
};

export default AddCourseForm;
