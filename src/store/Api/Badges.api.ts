import baseApi from "./BaseApi/BaseApi";

const BadgesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getUserBadges: builder.query({
            query: () => ({
                url: "badges/getAllBadgesByUser",
                method: "GET",
            }),
            providesTags: ["Badges"],
        }),

        getAllBadgesByAdmin: builder.query({
            query: () => ({
                url: "badges/getAllBadgesByAdmin",
                method: "GET",
            }),
            providesTags: ["Badges"],
        }),

        updateBadge: builder.mutation({
            query: ({ id, formData }) => ({
                url: `badges/updateBadges/${id}`,
                method: "PATCH",
                body: formData,
            }),
            invalidatesTags: ["Badges"],
        }),

    }),
});

export const {
    useGetUserBadgesQuery,
    useGetAllBadgesByAdminQuery,
    useUpdateBadgeMutation,
} = BadgesApi;

export default BadgesApi;
