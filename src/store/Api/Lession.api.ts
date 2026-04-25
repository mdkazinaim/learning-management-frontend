import baseApi from "./BaseApi/BaseApi";

const lessonApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createLesson: builder.mutation({
      query: (data) => ({
        url: "lession/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (data) => {
        return [{ type: "Courses", id: data.courseId }];
      },
    }),

    updateLesson: builder.mutation({
      query: (data) => ({
        url: "lession/update",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (data) => [{ type: "Courses", id: data.courseId }],
    }),
    deleteLesson: builder.mutation({
      query: (data) => ({
        url: "lession/delete",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: (data) => [{ type: "Courses", id: data.courseId }],
    }),
  }),
});

export const {
  useCreateLessonMutation,
  useUpdateLessonMutation,
  useDeleteLessonMutation,
} = lessonApi;
export default lessonApi;
