/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useGetAccountUserYearleDataQuery,
  useGetUserDataQuery,
} from "@/redux/api/auth/userData";

import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { useState } from "react";

import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts";

const Overview = () => {
  const [selectedYear, setSelectedYear] = useState("2025");
  const { user } = useAppSelector((state: RootState) => state.user);

  const {
    data: userData,
    error,
    isLoading,
  } = useGetUserDataQuery(user?.employeeId);

  const { data: yearlyData } = useGetAccountUserYearleDataQuery({
    employeeId: user?.employeeId,
    year: selectedYear,
  });

  console.log(yearlyData);
  console.log(selectedYear, "***************");

  if (yearlyData?.success === false || yearlyData?.data.length === 0) {
    return (
      <div className="container mx-auto p-4 space-y-6">
        <div className="alert alert-warning">
          <strong>No data found for this year.</strong>
        </div>
      </div>
    );
  }

  const chartData =
    yearlyData?.data.map((item: any) => {
      const [year, month] = item.monthYear.split("-");
      return {
        month: new Date(`${year}-${month}-01`).toLocaleString("default", {
          month: "long",
        }),
        debit: item.debitTotal,
        credit: item.creditTotal,
      };
    }) || [];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-red-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-red-500">
              {userData?.data.totalDebit} TK
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium">Total Debit</p>
            <p className="text-xs text-muted-foreground">This Month</p>
          </CardContent>
        </Card>
        <Card className="bg-green-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-green-500">
              {userData?.data.totalCredit} TK
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium">Total Credit</p>
            <p className="text-xs text-muted-foreground">This Month</p>
          </CardContent>
        </Card>
        <Card className="bg-orange-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-orange-500">
              {userData?.data.totalAmount} TK
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium">Total Amount</p>
            <p className="text-xs text-muted-foreground">This Month</p>
          </CardContent>
        </Card>
      </div>

      <div className="overflow-x-auto ">
        <Card className="min-w-[800px]">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Yearly Account Analysis</CardTitle>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2025">Year 2025</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                debit: {
                  label: "Debit",
                  color: "hsl(15, 100%, 55%)",
                },
                credit: {
                  label: "Credit",
                  color: "hsl(142, 76%, 36%)",
                },
              }}
              className="h-[400px] flex justify-center w-full mt-12"
            >
              <BarChart data={chartData} width={800} height={400}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="month"
                  tickFormatter={(value) => value.slice(0, 3)}
                  axisLine={false}
                  tickLine={false}
                  tickMargin={10}
                  interval={0}
                  padding={{ left: 20, right: 20 }}
                />
                <YAxis axisLine={false} tickLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="debit"
                  fill="var(--color-debit)"
                  radius={[4, 4, 0, 0]}
                  barSize={30}
                />
                <Bar
                  dataKey="credit"
                  fill="var(--color-credit)"
                  radius={[4, 4, 0, 0]}
                  barSize={30}
                />
                <Legend
                  layout="horizontal"
                  align="center"
                  verticalAlign="bottom"
                  wrapperStyle={{ paddingTop: "20px" }}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Overview;
