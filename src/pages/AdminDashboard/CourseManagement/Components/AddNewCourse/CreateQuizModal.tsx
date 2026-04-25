import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";


const quizSchema = z.object({
  quizzes: z.array(
    z.object({
      question: z.string().min(1, "Quiz question is required"),
      options: z.array(
        z.object({
          text: z.string().min(1, "Option cannot be empty"),
        })
      ).refine(
        (options) => options.filter(option => option.text).length >= 2,
        {
          message: "At least 2 options are required",
          path: [],
        }
      ),
    })
  ),
});

type QuizFormData = z.infer<typeof quizSchema>;

const CreateQuizModal = ({
  isOpen,
  onAddQuiz,
  onClose,
}: {
  isOpen: boolean;
  onAddQuiz: (quiz: QuizFormData) => void;
  onClose: () => void;
}) => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<QuizFormData>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      quizzes: [
        {
          question: "",
          options: [
            { text: "" },
            { text: "" },
            { text: "" },
            { text: "" },
          ],
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "quizzes",
  });

  // ------------------- Submit Handler -------------------
  const onSubmit = (data: QuizFormData) => {
    const toastId = toast.loading("Saving quiz...");
    try {
      // Simulate API call
      setTimeout(() => {
        toast.success("Quiz saved successfully!", { id: toastId });
        onAddQuiz(data); // send quiz data to parent
        reset();
        onClose();
      }, 800);
    } catch {
      toast.error("Failed to save quiz. Please try again.", { id: toastId });
    }
  };

  // ------------------- Render -------------------
  if (!isOpen) return null; // hide modal if not open

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()} // prevent closing on content click
      >
        <div className="p-6">
          <h3 id="modal-title" className="text-xl font-bold text-primary-text mb-4">
            Create Quiz
          </h3>

          <form onSubmit={handleSubmit(onSubmit)}>
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="mb-6 border-b border-border pb-6 last:border-0 last:pb-0"
              >
                {/* Quiz Question */}
                <div className="mb-4">
                  <label className="block text-sm mb-2">Quiz Question</label>
                  <input
                    type="text"
                    {...register(`quizzes.${index}.question`)}
                    className={`w-full p-2 border ${
                      errors.quizzes?.[index]?.question
                        ? "border-red-500"
                        : "border-border"
                    } rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-blue`}
                  />
                  {errors.quizzes?.[index]?.question && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.quizzes[index].question?.message}
                    </p>
                  )}
                </div>

                {/* Quiz Options */}
                <div className="space-y-4">
                  {Array.from({ length: 4 }).map((_, optionIndex) => (
                    <div key={optionIndex} className="flex items-center gap-2">
                      <label className="w-20 text-sm">Option-{optionIndex + 1}</label>
                      <input
                        type="text"
                        {...register(`quizzes.${index}.options.${optionIndex}.text`)}
                        className={`flex-1 p-2 border ${
                          errors.quizzes?.[index]?.options?.[optionIndex]?.text
                            ? "border-red-500"
                            : "border-border"
                        } rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-blue`}
                      />
                      {errors.quizzes?.[index]?.options?.[optionIndex]?.text && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.quizzes[index].options[optionIndex]?.text?.message}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Remove Quiz */}
                {fields.length > 1 && (
                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-primary-red hover:text-primary-red/80 text-sm"
                    >
                      Remove Quiz
                    </button>
                  </div>
                )}
              </div>
            ))}

            {/* Add More Quiz */}
            <div className="flex justify-end mb-4">
              <button
                type="button"
                onClick={() =>
                  append({
                    question: "",
                    options: [
                      { text: "" },
                      { text: "" },
                      { text: "" },
                      { text: "" },
                    ],
                  })
                }
                className="text-primary-blue hover:underline text-sm font-medium"
              >
                + Add More Quiz
              </button>
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-border rounded-lg text-sm hover:bg-gray transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary-blue text-white rounded-lg text-sm hover:bg-primary-blue/90 transition-colors"
              >
                Save Quiz
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateQuizModal;
