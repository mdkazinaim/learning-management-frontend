import baseApi from "./BaseApi/BaseApi";

const moduleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createModule: builder.mutation({
      query: (data) => ({
        url: "module/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (arg) => {
        return [{ type: "Courses", id: arg.courseId }];
      },
    }),
    getModuleById: builder.query({
      query: (id) => `/module/${id}`,
    }),
    updateModule: builder.mutation({
      query: (data) => {
        return {
          url: "module/update/moduleName",
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: (arg) => {
        return [{ type: "Courses", id: arg.courseId }];
      },
    }),
    deleteModule: builder.mutation({
      query: (data) => ({
        url: `/module/delete`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: (arg) => {
        return [{ type: "Courses", id: arg.courseId }];
      },
    }),
  }),
});
export const {
  useCreateModuleMutation,
  // useGetAllModuleQuery,
  useGetModuleByIdQuery,
  useUpdateModuleMutation,
  useDeleteModuleMutation,
} = moduleApi;
export default moduleApi;
