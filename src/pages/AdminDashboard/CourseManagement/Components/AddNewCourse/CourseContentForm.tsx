import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";

const CourseContentForm = ({
  setThumbnail,
  thumbnail,
  learn = [""],
  setLearn,
}: {
  setThumbnail: (thumbnail: File | null) => void;
  thumbnail?: string | File | null;
  learn?: string[];
  setLearn: (learn: string[]) => void;
}) => {
  const handleOutcomeChange = (index: number, value: string) => {
    const updatedLearn = [...learn];
    updatedLearn[index] = value;
    setLearn(updatedLearn);
  };

  const addOutcome = () => {
    setLearn([...learn, ""]);
  };

  const removeOutcome = (index: number) => {
    if (learn.length > 1) {
      const updatedLearn = learn.filter((_, i) => i !== index);
      setLearn(updatedLearn);
    }
  };

  return (
    <div className="space-y-6 w-full">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-border w-full">
        <h6 className="mb-4">Course Thumbnail</h6>
        <ThumbnailUploadSimple 
          thumbnail={thumbnail} 
          setThumbnail={setThumbnail} 
        />
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
        <h2 className="text-xl font-bold text-primary-text mb-4">
          What User Will Learn
        </h2>

        {learn.map((outcome, index) => (
          <div key={index} className="flex items-center gap-3 mb-3">
            <input
              type="text"
              value={outcome}
              onChange={(e) => handleOutcomeChange(index, e.target.value)}
              placeholder="Add learning outcome..."
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
            />
            {learn.length > 1 && (
              <button
                type="button"
                onClick={() => removeOutcome(index)}
                className="text-primary-red hover:bg-red-50 p-1 rounded transition-colors"
                title="Remove outcome"
              >
                <X size={16} />
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addOutcome}
          className="w-full py-2 border-2 border-dashed border-primary-purple/50 bg-secondary-purple/30 text-light-blue rounded-xl cursor-pointer hover:shadow-md transition-all active:scale-[0.98]"
        >
          + Add More
        </button>
      </div>
    </div>
  );
};

// Simplified Thumbnail Upload to use props directly
const ThumbnailUploadSimple = ({
  thumbnail,
  setThumbnail,
}: {
  thumbnail?: string | File | null;
  setThumbnail: (file: File | null) => void;
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  useEffect(() => {
    if (thumbnail instanceof File) {
      setThumbnailPreview(URL.createObjectURL(thumbnail));
    } else if (typeof thumbnail === "string") {
      setThumbnailPreview(thumbnail);
    } else {
      setThumbnailPreview(null);
    }
  }, [thumbnail]);

  const handleFile = (file: File) => {
    try {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!allowedTypes.includes(file.type))
        throw new Error("Only JPG, JPEG and PNG formats are allowed.");
      if (file.size > 10 * 1024 * 1024)
        throw new Error("Image must be less than 10MB.");

      setThumbnail(file);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to upload image");
    }
  };

  return (
    <div
      className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
        isDragging ? "border-primary-blue bg-blue-50" : "border-border hover:border-primary-blue hover:bg-gray"
      }`}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files?.length) handleFile(e.dataTransfer.files[0]);
      }}
      onClick={() => document.getElementById("thumbnail-input")?.click()}
    >
      <input
        type="file"
        id="thumbnail-input"
        className="hidden"
        accept="image/*"
        onChange={(e) => e.target.files?.length && handleFile(e.target.files[0])}
      />

      {thumbnailPreview ? (
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <img src={thumbnailPreview} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setThumbnail(null);
            }}
            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow"
          >
            <X size={16} className="text-primary-red" />
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="w-10 h-10 bg-gray rounded-lg flex items-center justify-center">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L12 10m-3 10l3-3 3 3" />
            </svg>
          </div>
          <div><span className="text-primary-blue hover:underline">Click</span> to upload or drag & drop</div>
        </div>
      )}
    </div>
  );
};

export default CourseContentForm;
