import baseApi from "./BaseApi/BaseApi";

const analyticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    adminAnalytics: builder.query({
      query: () => ({
        url: "analytics/admin/analytics",
        method: "GET",
      }),
    }),
    userAnalytics: builder.query({
      query: () => ({
        url: `analytics/user/analytics`,
        method: "GET",
      }),
    }),
  }),
});

export const { useAdminAnalyticsQuery, useUserAnalyticsQuery } = analyticsApi;
export default analyticsApi;
