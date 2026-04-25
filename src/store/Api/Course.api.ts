import baseApi from "./BaseApi/BaseApi";

const courseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data) => ({
        url: "/course/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Courses"],
    }),

    getAllCourse: builder.query({
      query: () => `/course/allCourse`,
      providesTags: ["Courses"],
    }),

    getCourseById: builder.query({
      query: (id: string) => `/course/get/coursebasicInfo/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Courses", id }],
    }),

    getEnrolledCourseById: builder.query({
      query: (id: string) => `/course/course/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Courses", id }],
    }),

    updateCourse: builder.mutation({
      query: (data) => ({
        url: "/course/update/course",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Courses"],
    }),
    deleteCourse: builder.mutation({
      query: (id: string) => ({
        url: `/course/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Courses"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateCourseMutation,
  useGetAllCourseQuery,
  useGetCourseByIdQuery,
  useLazyGetCourseByIdQuery,
  useGetEnrolledCourseByIdQuery,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} = courseApi;

export default courseApi;
