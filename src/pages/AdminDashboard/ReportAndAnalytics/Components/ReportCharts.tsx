/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, Suspense } from "react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  PieLabelRenderProps,
} from "recharts";
import { useAdminAnalyticsQuery } from "@/store/Api/Analytics.api";

const COLORS: Record<string, string> = {
  management: "#3853EA",
  technology: "#121B60",
  customerService: "#FF6B6B",
  productivity: "#00C950",
  other: "#FFB300",
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: PieLabelRenderProps) => {
  if (!cx || !cy || !innerRadius || !outerRadius) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = Number(cx) + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const y = Number(cy) + radius * Math.sin(-(midAngle ?? 0) * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="var(--labelColor)"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={12}
      fontWeight={500}
    >
      {`${((percent ?? 0) * 100).toFixed(0)}%`}
    </text>
  );
};

const ReportChartsContent = () => {
  // const [timePeriod, setTimePeriod] = useState("2Months");
  const { data } = useAdminAnalyticsQuery({}); // Suspense will handle loading

  const weeklyAnalytics = data?.data?.weeklyAnalytics || [];
  const courseCategoryData = data?.data?.courseCategoryData || [];
  const topSellingCourses = data?.data?.topSellingCourses || [];

  const userGrowthData = useMemo(
    () =>
      weeklyAnalytics.map((w: any) => ({ name: w.weekLabel, value: w.users })),
    [weeklyAnalytics]
  );

  const courseEnrolmentsData = useMemo(
    () =>
      weeklyAnalytics.map((w: any) => ({
        name: w.weekLabel,
        value: w.enrollments,
      })),
    [weeklyAnalytics]
  );

  const categoriesData = useMemo(
    () =>
      courseCategoryData.map((c: any) => ({
        name: c.category,
        value: c.percentage,
        color: COLORS[c.category.toLowerCase()] || COLORS.other,
      })),
    [courseCategoryData]
  );

  const topCoursesData = useMemo(
    () =>
      topSellingCourses.map((c: any) => ({
        name: c.courseName,
        value: c.totalEnrollCount,
        color: COLORS.other,
      })),
    [topSellingCourses]
  );

  // const getTimePeriodLabel = () => {
  //   switch (timePeriod) {
  //     case "1Month":
  //       return "1 Month";
  //     case "2Months":
  //       return "2 Months";
  //     case "3Months":
  //       return "3 Months";
  //     case "6Months":
  //       return "6 Months";
  //     default:
  //       return "2 Months";
  //   }
  // };

  return (
    <div className="grid gap-6">
      {/* User Growth & Course Enrollments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth */}
        <Card className="bg-white rounded-xl p-6 shadow-sm border border-border">
          <div className="flex justify-between items-start mb-4">
            <CardHeader className="p-0 w-full">
              <CardTitle className="font-normal text-xl w-full">
                User Growth
              </CardTitle>
            </CardHeader>
            {/* <Select value={timePeriod} onValueChange={setTimePeriod}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder={getTimePeriodLabel()} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1Month">1 Month</SelectItem>
                <SelectItem value="2Months">2 Months</SelectItem>
                <SelectItem value="3Months">3 Months</SelectItem>
                <SelectItem value="6Months">6 Months</SelectItem>
              </SelectContent>
            </Select> */}
          </div>
          <CardContent className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userGrowthData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--color-border)"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tick={{ fill: "var(--color-secondary-text)", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tick={{ fill: "var(--color-secondary-text)", fontSize: 12 }}
                  tickFormatter={(v) => v.toLocaleString()}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid var(--color-border)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="var(--color-primary-green)"
                  strokeWidth={3}
                  dot={{ r: 6, fill: "var(--color-primary-green)" }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Course Enrollments */}
        <Card className="bg-white rounded-xl p-6 shadow-sm border border-border">
          <div className="flex justify-between items-start mb-4">
            <CardHeader className="p-0 w-full">
              <CardTitle className="font-normal text-xl w-full">
                Course Enrollments
              </CardTitle>
            </CardHeader>
            {/* <Select value={timePeriod} onValueChange={setTimePeriod}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder={getTimePeriodLabel()} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1Month">1 Month</SelectItem>
                <SelectItem value="2Months">2 Months</SelectItem>
                <SelectItem value="3Months">3 Months</SelectItem>
                <SelectItem value="6Months">6 Months</SelectItem>
              </SelectContent>
            </Select> */}
          </div>
          <CardContent className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={courseEnrolmentsData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--color-border)"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tick={{ fill: "var(--color-secondary-text)", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tick={{ fill: "var(--color-secondary-text)", fontSize: 12 }}
                  tickFormatter={(v) => v.toLocaleString()}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid var(--color-border)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Bar
                  dataKey="value"
                  fill="var(--color-primary-blue)"
                  radius={[4, 4, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Course Categories & Top Courses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Course Categories */}
        <Card className="bg-white rounded-xl p-6 shadow-sm border border-border">
          <CardHeader className="p-0 mb-4 w-full">
            <CardTitle className="font-normal text-xl w-full">
              Course Categories
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col h-full">
            <div
              className="w-full"
              style={
                {
                  height: 260,
                  "--labelColor": "var(--color-primary-yellow)",
                } as React.CSSProperties
              }
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoriesData}
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    dataKey="value"
                    paddingAngle={3}
                    labelLine={false}
                    label={renderCustomizedLabel}
                  >
                    {categoriesData.map((entry: any, idx: number) => (
                      <Cell key={idx} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid var(--color-border)",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                    formatter={(value, name) => [`${value}%`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top Selling Courses */}
        <Card className="bg-white rounded-xl p-6 shadow-sm border border-border">
          <CardHeader className="p-0 mb-4 w-full">
            <CardTitle className="font-normal text-xl w-full">
              Top Selling Courses
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[280px] flex flex-col justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={topCoursesData}
                layout="vertical"
                margin={{ left: 30 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--color-border)"
                />
                <XAxis
                  type="number"
                  axisLine={false}
                  tick={{ fill: "var(--color-secondary-text)", fontSize: 12 }}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  axisLine={false}
                  tick={{ fill: "var(--color-secondary-text)", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid var(--color-border)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Bar
                  dataKey="value"
                  fill="var(--color-primary-purple)"
                  radius={[4, 4, 0, 0]}
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Wrap in Suspense at export
const ReportCharts = () => {
  return (
    <Suspense
      fallback={<div className="text-center py-20">Loading charts...</div>}
    >
      <ReportChartsContent />
    </Suspense>
  );
};

export default ReportCharts;
