/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useGetAccountUserDataQuery } from "@/redux/api/auth/userData";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiCalendar } from "react-icons/fi";

const AllAccounts = () => {
  const { user } = useAppSelector((state: RootState) => state.user);
  console.log(user);

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);

  const formattedDate = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";

  const { data, error, isLoading } = useGetAccountUserDataQuery({
    employeeId: user?.employeeId,
    date: formattedDate,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading accounts</div>;

  const accounts = data?.data;
  console.log(accounts);

  const todayDate = selectedDate
    ? format(selectedDate, "dd MMM yyyy")
    : format(new Date(), "dd MMM yyyy");

  return (
    <div className="overflow-x-auto max-w-7xl mx-auto">
      <div className="flex justify-between items-center px-4 py-2 mb-10">
        <h2 className="text-2xl font-bold text-gray-700">Daily Report</h2>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-lg text-gray-600 bg-gray-200 rounded-lg px-3 py-2">
            <div>{todayDate}</div>
          </div>

          <div className="relative flex items-center ">
            <DatePicker
              selected={selectedDate}
              onChange={(date: Date | null) => setSelectedDate(date)}
              dateFormat="yyyy-MM-dd"
              className="hidden"
              open={isDatePickerOpen}
              onClickOutside={() => setIsDatePickerOpen(false)}
            />

            <div
              className="cursor-pointer text-gray-600 bg-gray-200 rounded-lg p-2 lg:mr-16"
              onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
            >
              <FiCalendar size={24} />
            </div>
          </div>
        </div>
      </div>

      <hr className="my-4 border-gray-300 mb-10" />

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr className="text-lg text-gray-600">
            <th className="px-4 py-3 text-left">No.</th>
            <th className="px-4 py-3 text-left">Account Head</th>
            <th className="px-4 py-3 text-left">Date</th>
            <th className="px-4 py-3 text-left">Debit</th>
            <th className="px-4 py-3 text-left">Credit</th>
          </tr>
        </thead>

        <tbody className="text-black bg-[#EBEBEB]">
          {accounts?.map((item: any, index: number) => (
            <tr key={item._id} className="text-sm text-black lg:text-xl">
              <td className="px-4 py-4 whitespace-nowrap">{index + 1}</td>

              <td className="px-4 py-4 whitespace-nowrap">
                {typeof item.accountHead === "object"
                  ? item.accountHead?.name || "Unknown Head"
                  : item.accountHead}
              </td>

              <td className="px-4 py-4 whitespace-nowrap">
                {format(new Date(item.date), "MM/dd/yyyy")}
              </td>

              <td className="px-4 py-4 whitespace-nowrap">
                {item.accountType === "debit" ? item.amount : "-"}
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                {item.accountType === "credit" ? item.amount : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllAccounts;
