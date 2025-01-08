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
import { useGetUserDataQuery } from "@/redux/api/auth/userData";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts";

const monthlyData = [
  { month: "January", debit: 220, credit: 180 },
  { month: "February", debit: 180, credit: 200 },
  { month: "March", debit: 170, credit: 160 },
  { month: "April", debit: 190, credit: 180 },
  { month: "May", debit: 160, credit: 210 },
  { month: "June", debit: 150, credit: 190 },
  { month: "July", debit: 170, credit: 200 },
  { month: "August", debit: 210, credit: 180 },
  { month: "September", debit: 200, credit: 160 },
  { month: "October", debit: 170, credit: 150 },
  { month: "November", debit: 180, credit: 170 },
  { month: "December", debit: 190, credit: 200 },
];


const Overview = () => {
  const [selectedYear, setSelectedYear] = useState("2025");

  const { user } = useAppSelector((state: RootState) => state.user);

const {data: userData} = useGetUserDataQuery(user?.employeeId)

console.log(userData?.data.totalAmount,user?.employeeId);

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

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Yearly Account Analysis</CardTitle>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025">Year 2025</SelectItem>
              <SelectItem value="2026">Year 2026</SelectItem>
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
            <BarChart data={monthlyData} width={800} height={400}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="month"
                tickFormatter={(value) => value.slice(0, 3)} // Display first 3 characters of month
                axisLine={false}
                tickLine={false}
                tickMargin={10} // Adjust margin between ticks and labels
                interval={0} // Show every tick (month)
                padding={{ left: 20, right: 20 }} // Adjust the padding between labels
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
  );
};

export default Overview;
