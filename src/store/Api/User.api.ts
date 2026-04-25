import baseApi from "./BaseApi/BaseApi";
const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: (params) => ({
        url: "user/get/allUser",
        method: "GET",
        params: params,
      }),
      providesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `user/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: ({ userId, payload }) => ({
        url: `user/update/user/Profile/${userId}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["User"],
    }),
    getMe: builder.query({
      query: () => ({
        url: "user/getMe",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/user/changePassword",
        method: "PATCH",
        body: data
      })
    })
  }),
});
export const {
  useGetAllUserQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetMeQuery,
  useChangePasswordMutation
} = userApi;
export default userApi;
