/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import {
  useCreateModuleMutation,
  useUpdateModuleMutation,
} from "@/store/Api/Module.api";

const CONTENT_TYPES: Record<string, string> = {
  "Video/Image": "video",
  Audio: "audio",
  "Text/PDF": "pdf",
  SCORM: "scorm",
};

const AddModuleModal = ({
  isOpen,
  onClose,
  courseId,
  // onAddModule,
  setModuleId,
  moduleId,
  moduleData,
}: {
  isOpen: boolean;
  onClose: () => void;
  courseId: string;
  setModuleId: Dispatch<SetStateAction<string>>;
  moduleId?: string;
  moduleData?: any;
}) => {
  const [moduleName, setModuleName] = useState(moduleData?.moduleName || "");
  const [lessonName, setLessonName] = useState("");
  const [contentType, setContentType] = useState("Video/Image");
  const [file, setFile] = useState<File | null>(null);
  const [article, setArticle] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const [createModule] = useCreateModuleMutation();
  const [updateModule] = useUpdateModuleMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) validateFile(selectedFile);
  };

  const validateFile = (selectedFile: File) => {
    const maxSize = 500 * 1024 * 1024;

    if (contentType === "SCORM") {
      // Allow .zip files regardless of MIME type
      if (
        selectedFile.type !== "application/zip" &&
        selectedFile.type !== "application/x-zip-compressed" &&
        !selectedFile.name.endsWith(".zip")
      ) {
        setFileError("Invalid file type. Only ZIP files allowed for SCORM.");
        setFile(null);
        return;
      }
    } else if (contentType === "Audio") {
      if (!selectedFile.type.startsWith("audio/")) {
        setFileError("Invalid audio file type.");
        setFile(null);
        return;
      }
    } else if (contentType === "Text/PDF") {
      if (!["application/pdf", "text/plain"].includes(selectedFile.type)) {
        setFileError("Invalid file type. Only PDF or TXT allowed.");
        setFile(null);
        return;
      }
    } else {
      // Video/Image
      const validTypes = [
        "video/mp4",
        "video/avi",
        "video/mov",
        "image/jpeg",
        "image/png",
        "image/gif",
      ];
      if (!validTypes.includes(selectedFile.type)) {
        setFileError(
          "Invalid file type. Only MP4, AVI, MOV, JPG, PNG allowed."
        );
        setFile(null);
        return;
      }
      if (selectedFile.size > maxSize) {
        setFileError("File size exceeds 500MB limit.");
        setFile(null);
        return;
      }
    }

    setFile(selectedFile);
    setFileError(null);
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) validateFile(droppedFile);
  };
  const handleSubmit = async () => {
    const toastId = toast.loading("Please wait...");
    const data = {
      courseId,
      moduleName,
      lessonName,
      article: article,
    };
    const updateData = {
      courseId,
      moduleId,
      moduleName,
    };
    const formData = new FormData();
    formData.append(`${CONTENT_TYPES[contentType]}`, file as File);
    formData.append("data", JSON.stringify(data) as unknown as string);

    try {
      const res = moduleData.moduleName
        ? await updateModule(updateData).unwrap()
        : await createModule(formData).unwrap();
      setModuleId(res?.data?._id);
      toast.success("Module added successfully!", { id: toastId });
      onClose();
    } catch (error: any) {
      const err = error?.data;
      toast.error(err?.message || "Failed to add module. Please try again.", {
        id: toastId,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0">
        <DialogHeader className="p-6 border-b border-border">
          <DialogTitle className="text-xl font-bold">
            {moduleId ? "Edit Module" : "Add Module"}
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">
              Module Name
            </label>
            <Input
              value={moduleName}
              onChange={(e) => setModuleName(e.target.value)}
              className="h-10"
            />
          </div>
          {!moduleData.moduleName && (
            <>
              <div>
                <label className="block text-sm font-medium text-primary-text mb-2">
                  Lesson Name
                </label>
                <Input
                  value={lessonName}
                  onChange={(e) => setLessonName(e.target.value)}
                  className="h-10"
                />
              </div>
              {/* Content Type */}
              <div>
                <label className="block text-sm font-medium text-primary-text mb-2">
                  Content Type
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {["Video/Image", "Audio", "Text/PDF", "SCORM"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      className={`py-2 px-3 rounded-lg text-sm font-medium flex items-center justify-center ${
                        contentType === type
                          ? "bg-primary-blue text-white"
                          : "bg-gray text-primary-text hover:bg-gray/80"
                      }`}
                      onClick={() => setContentType(type)}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              {/* Upload Area */}
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <input
                  type="file"
                  className="hidden"
                  id="file-upload"
                  onChange={handleFileChange}
                  accept={
                    contentType === "SCORM"
                      ? ".zip"
                      : contentType === "Audio"
                      ? "audio/*"
                      : contentType === "Text/PDF"
                      ? ".pdf,.txt"
                      : "video/*,image/*"
                  }
                />
                <label
                  htmlFor="file-upload"
                  className={`block cursor-pointer ${
                    isDragging ? "bg-gray" : ""
                  }`}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <div className="flex flex-col items-center justify-center">
                    <Upload className="w-6 h-6 text-primary-blue mb-2" />
                    <p className="text-sm text-primary-text mb-1">
                      {contentType === "SCORM"
                        ? "Upload SCORM ZIP package"
                        : "Click to upload or drag and drop"}
                    </p>
                    <p className="text-xs text-secondary-text">
                      {contentType === "SCORM"
                        ? "ZIP file only (SCORM package)"
                        : "MP4, AVI, MOV, JPG, PNG (max. 500MB)"}
                    </p>
                  </div>
                </label>
              </div>
              {fileError && (
                <div className="text-xs text-red-500 mt-1">{fileError}</div>
              )}
              {file && (
                <div className="bg-gray p-3 rounded-lg flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-primary-blue/10 flex items-center justify-center mr-2">
                      <Upload className="w-4 h-4 text-primary-blue" />
                    </div>
                    <span className="text-sm text-primary-text">
                      {file.name}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    className="text-primary-red hover:text-primary-red/80"
                  >
                    ✕
                  </button>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-primary-text mb-2">
                  Write Course Article
                </label>
                <Textarea
                  value={article}
                  onChange={(e) => setArticle(e.target.value)}
                  rows={5}
                />
              </div>
            </>
          )}
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button variant="outline" onClick={onClose} className="w-24 h-10">
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="w-28 h-10 border border-border"
            >
              {moduleData.moduleName ? "Update Module" : "Add Module"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddModuleModal;
