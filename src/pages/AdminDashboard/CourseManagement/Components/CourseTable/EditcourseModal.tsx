import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { X, Plus, Trash2, ImageIcon, User } from "lucide-react";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { useUpdateCourseMutation } from "@/store/Api/Course.api";

export type Course = {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  prices: number;
  courseTag: string;
  courseStatus: "Published" | "Draft";
  whatsUserLearn: string[];
  instructorName: string;
  instructorTitle: string;
  instructorDescription: string;
  instructorProfile: string;
  certificate?: boolean;
};

export type CourseFormData = {
  title: string;
  description: string;
  category: string;
  prices: number;
  courseTag: string;
  courseStatus: "Published" | "Draft";
  whatsUserLearn: { value: string }[];
  instructorName: string;
  instructorTitle: string;
  instructorDescription: string;
  certificate: boolean;
  thumbnail?: FileList;
  instructorProfile?: FileList;
};

const editCourseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Category is required"),
  prices: z.number().min(0, "Price must be at least 0"),
  courseTag: z.string().min(1, "Course tag is required"),
  courseStatus: z.enum(["Published", "Draft"]),
  whatsUserLearn: z
    .array(
      z.object({
        value: z.string().min(1, "Learning outcome cannot be empty"),
      }),
    )
    .min(1, "At least one learning outcome is required"),
  instructorName: z.string().min(1, "Instructor name is required"),
  instructorTitle: z.string().min(1, "Instructor title is required"),
  instructorDescription: z
    .string()
    .min(1, "Instructor description is required"),
  certificate: z.boolean().default(false),
});

export function EditCourseModal({
  course,
  onClose,
}: {
  course: Course;
  onClose: () => void;
}) {
  const [editCourse] = useUpdateCourseMutation();
  const [thumbnailPreview, setThumbnailPreview] = useState(course.thumbnail);
  const [profilePreview, setProfilePreview] = useState(
    course.instructorProfile,
  );
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [profileFile, setProfileFile] = useState<File | null>(null);

  const form = useForm<CourseFormData>({
    resolver: zodResolver(editCourseSchema),
    defaultValues: {
      title: course.title,
      description: course.description,
      category: course.category,
      prices: course.prices,
      courseTag: course.courseTag,
      courseStatus: course.courseStatus,
      whatsUserLearn: Array.isArray(course.whatsUserLearn)
        ? course.whatsUserLearn.map((v) => ({ value: v }))
        : [],
      instructorName: course.instructorName,
      instructorTitle: course.instructorTitle,
      instructorDescription: course.instructorDescription,
      certificate: !!course.certificate,
    },
  });

  const { fields, append, remove } = useFieldArray<CourseFormData>({
    control: form.control,
    name: "whatsUserLearn",
  });

  const submitHandler = async (data: CourseFormData) => {
    const toastId = toast.loading("Updating course...");
    try {
      const formData = new FormData();
      if (thumbnailFile) formData.append("thumbnail", thumbnailFile);
      if (profileFile) formData.append("instructorProfile", profileFile);

      // Prepare payload for all non-file fields
      const payload = {
        courseId: course._id,
        title: data.title,
        description: data.description,
        category: data.category,
        prices: data.prices,
        courseTag: data.courseTag,
        courseStatus: data.courseStatus,
        instructorName: data.instructorName,
        instructorTitle: data.instructorTitle,
        instructorDescription: data.instructorDescription,
        whatsUserLearn: data.whatsUserLearn.map((i) => i.value),
        certificate: data.certificate,
      };

      // Append JSON payload as a string
      formData.append("data", JSON.stringify(payload));

      // Call your API
      const response = await editCourse(formData);

      if (response.data) {
        toast.success("Course updated successfully", { id: toastId });
        onClose();
      }
    } catch {
      toast.error("Failed to update course", { id: toastId });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col border border-border">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-border bg-gray/30">
          <div>
            <h2 className="text-xl font-bold text-primary-text">Edit Course</h2>
            <p className="text-sm text-secondary-text">
              Update the course information and content details.
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full hover:bg-gray/50 h-10 w-10"
          >
            <X size={20} className="text-secondary-text" />
          </Button>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitHandler)}
            className="p-8 space-y-10 overflow-y-auto max-h-[calc(90vh-130px)] custom-scrollbar"
          >
            {/* Course Info */}
            <section className="space-y-6">
              <div className="pb-2 border-b border-border">
                <h3 className="text-base font-semibold text-primary-text uppercase tracking-wider">
                  Course Information
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-primary-text">
                        Course Title
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="rounded-lg h-11 border-border focus:ring-primary-blue bg-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-primary-text">
                        Category
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="rounded-lg h-11 border-border focus:ring-primary-blue bg-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="prices"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-primary-text">
                        Price
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          className="rounded-lg h-11 border-border focus:ring-primary-blue bg-white"
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="courseTag"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-primary-text">
                        Course Tag
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="rounded-lg h-11 border-border focus:ring-primary-blue bg-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-primary-text">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="min-h-[120px] rounded-lg border-border focus:ring-primary-blue bg-white resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <FormLabel className="text-sm font-medium text-primary-text">
                  What users will learn
                </FormLabel>
                <div className="space-y-4">
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="flex items-center gap-4 bg-gray/10 p-2 rounded-xl border border-border/50"
                    >
                      <div className="w-8 h-8 rounded-lg bg-primary-blue/10 text-primary-blue flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>
                      <FormField
                        control={form.control}
                        name={`whatsUserLearn.${index}.value`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="e.g. Master the basics of React components"
                                className="border-none shadow-none focus-visible:ring-0 bg-transparent h-9 placeholder:text-secondary-text/50"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {fields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="text-primary-red hover:bg-red-50 p-2 rounded-lg transition-colors border border-transparent hover:border-red-100"
                          title="Remove outcome"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => append({ value: "" })}
                    className="w-full py-3 border-2 border-dashed border-primary-blue/30 bg-primary-blue/5 text-primary-blue rounded-xl font-medium hover:bg-primary-blue/10 hover:border-primary-blue/50 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <Plus size={18} /> Add Learning Outcome
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                <FormField
                  control={form.control}
                  name="courseStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-primary-text">
                        Status
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="rounded-lg h-11 border-border focus:ring-primary-blue bg-white">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-xl border-border shadow-lg">
                          <SelectItem value="Published">Published</SelectItem>
                          <SelectItem value="Draft">Draft</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="certificate"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-3 space-y-0 h-11 px-4 border border-border rounded-lg bg-gray/20 cursor-pointer hover:bg-gray/40 transition-colors">
                      <FormControl>
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                          className="h-4 w-4 rounded border-border text-primary-blue focus:ring-primary-blue cursor-pointer"
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-medium text-primary-text cursor-pointer leading-none">
                        Certificate of Completion
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            </section>

            <Separator />

            {/* Instructor */}
            <section className="space-y-6">
              <div className="pb-2 border-b border-border">
                <h3 className="text-base font-semibold text-primary-text uppercase tracking-wider">
                  Instructor Information
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="instructorName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-primary-text">
                        Instructor Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="rounded-lg h-11 border-border focus:ring-primary-blue bg-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="instructorTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-primary-text">
                        Title
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="rounded-lg h-11 border-border focus:ring-primary-blue bg-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="instructorDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-primary-text">
                      Biography
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="min-h-[100px] rounded-lg border-border focus:ring-primary-blue bg-white resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>

            <Separator />

            {/* Media */}
            <section className="space-y-6">
              <div className="pb-2 border-b border-border">
                <h3 className="text-base font-semibold text-primary-text uppercase tracking-wider">
                  Media Content
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <FormLabel className="text-sm font-medium text-primary-text">
                    Course Thumbnail
                  </FormLabel>
                  <div
                    className="relative group aspect-video rounded-xl overflow-hidden border-2 border-dashed border-border flex items-center justify-center bg-gray/10 hover:bg-gray/20 transition-all cursor-pointer"
                    onClick={() =>
                      document.getElementById("thumbnail-edit-input")?.click()
                    }
                  >
                    {thumbnailPreview ? (
                      <img
                        src={thumbnailPreview}
                        className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
                        alt="Thumbnail"
                      />
                    ) : (
                      <div className="text-center p-4">
                        <ImageIcon className="mx-auto h-10 w-10 text-secondary-text/30" />
                        <p className="mt-2 text-xs text-secondary-text">
                          Upload Thumbnail
                        </p>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white text-xs font-semibold px-4 py-2 bg-primary-blue rounded-lg">
                        Change Image
                      </span>
                    </div>
                  </div>
                  <input
                    id="thumbnail-edit-input"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0] ?? null;
                      setThumbnailFile(file);
                      if (file) setThumbnailPreview(URL.createObjectURL(file));
                    }}
                  />
                </div>

                <div className="space-y-4">
                  <FormLabel className="text-sm font-medium text-primary-text">
                    Instructor Profile
                  </FormLabel>
                  <div
                    className="relative group aspect-video rounded-xl overflow-hidden border-2 border-dashed border-border flex items-center justify-center bg-gray/10 hover:bg-gray/20 transition-all cursor-pointer"
                    onClick={() =>
                      document.getElementById("profile-edit-input")?.click()
                    }
                  >
                    {profilePreview ? (
                      <img
                        src={profilePreview}
                        className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
                        alt="Profile"
                      />
                    ) : (
                      <div className="text-center p-4">
                        <User className="mx-auto h-10 w-10 text-secondary-text/30" />
                        <p className="mt-2 text-xs text-secondary-text">
                          Upload Profile
                        </p>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white text-xs font-semibold px-4 py-2 bg-primary-blue rounded-lg">
                        Change Photo
                      </span>
                    </div>
                  </div>
                  <input
                    id="profile-edit-input"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0] ?? null;
                      setProfileFile(file);
                      if (file) setProfilePreview(URL.createObjectURL(file));
                    }}
                  />
                </div>
              </div>
            </section>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-8 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="rounded-xl h-11 px-8 border-border text-secondary-text hover:bg-gray/50 font-medium"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="rounded-xl h-11 px-10 bg-primary-blue hover:bg-primary-blue/90 text-white font-semibold shadow-lg shadow-primary-blue/20 transition-all active:scale-[0.98]"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
