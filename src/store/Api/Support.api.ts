
import baseApi from "./BaseApi/BaseApi";


interface SupportQueryParams {
    searchTerm?: string;
    page?: number;
    limit?: number;
    solveStatus?: string;
}

interface UpdateSupportStatusPayload {
    supportId: string;
    solveStatus: "Pending" | "Resolve";
    replay: string;
}

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllSupport: builder.query({
            query: (params: SupportQueryParams = {}) => {
                const queryParams = new URLSearchParams();

                if (params.searchTerm) queryParams.append('searchTerm', params.searchTerm);
                if (params.page) queryParams.append('page', params.page.toString());
                if (params.limit) queryParams.append('limit', params.limit.toString());
                if (params.solveStatus) queryParams.append('solveStatus', params.solveStatus);

                return {
                    url: `support/getAllSupport?${queryParams.toString()}`
                };
            },
            providesTags: ["Support"]
        }),
        updateSupportStatus: builder.mutation({
            query: ({ supportId, solveStatus, replay }: UpdateSupportStatusPayload) => ({
                url: `support/update/${supportId}`,
                method: "PATCH",
                body: { solveStatus, replay }
            }),
            invalidatesTags: ["Support"]
        }),
        createSupport: builder.mutation({
            query: (problemDescription) => ({
                url: `support/create`,
                method: "POST",
                body: problemDescription
            })
        })
    })
})

export const { useGetAllSupportQuery, useUpdateSupportStatusMutation, useCreateSupportMutation } = userApi
export default userApi