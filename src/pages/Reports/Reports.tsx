/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useGetAccountUserDataQuery } from '@/redux/api/auth/userData';
import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import { format } from 'date-fns'; // Import format from date-fns
import DatePicker from 'react-datepicker'; // Import React Datepicker
import 'react-datepicker/dist/react-datepicker.css'; // Import the Datepicker styles
import { FiCalendar } from 'react-icons/fi'; // Import the calendar icon

const AllAccounts = () => {
  const { user } = useAppSelector((state: RootState) => state.user);
  console.log(user);

  // State to store selected date, default to current date
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date()); // Accept both Date and null
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false); // Control the DatePicker visibility

  // Format selected date as 'YYYY-MM-DD' for the query, handle null
  const formattedDate = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';

  // Fetch data for the employee and specific date
  const { data, error, isLoading } = useGetAccountUserDataQuery({
    employeeId: user?.employeeId,
    date: formattedDate,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading accounts</div>;

  const accounts = data?.data;
  console.log(accounts);

  // Get today's date formatted, will update when the user selects a new date
  const todayDate = selectedDate ? format(selectedDate, 'dd MMM yyyy') : format(new Date(), 'dd MMM yyyy');

  return (
    <div className="overflow-x-auto">
      {/* Container for Daily Report and Today's Date */}
      <div className="flex justify-between items-center px-4 py-2 mb-10">
        {/* Daily Report Title */}
        <h2 className="text-2xl font-bold text-gray-700">Daily Report</h2>

        {/* Date Section */}
        <div className="flex items-center space-x-4">
          {/* Today's Date */}
          <div className="flex items-center space-x-2 text-lg text-gray-600 bg-gray-200 rounded-lg px-3 py-2">
            <div>{todayDate}</div>
          </div>

          {/* Date Picker Icon */}
          <div className="relative flex items-center">
            <DatePicker
              selected={selectedDate}
              onChange={(date: Date | null) => setSelectedDate(date)} // Handle both Date and null
              dateFormat="yyyy-MM-dd" // Date format for the input
              className="hidden" // Hide the default input field
              open={isDatePickerOpen} // Use state to control visibility of the picker
              onClickOutside={() => setIsDatePickerOpen(false)} // Close on outside click
            />
            {/* Calendar Icon */}
            <div
              className="cursor-pointer text-gray-600 bg-gray-200 rounded-lg p-2"
              onClick={() => setIsDatePickerOpen(!isDatePickerOpen)} // Toggle the date picker visibility on icon click
            >
              <FiCalendar size={24} />
            </div>
          </div>
        </div>
      </div>

      <hr className="my-4 border-gray-300 mb-10" />

      {/* Table */}
      <table className="min-w-full divide-y divide-gray-200">
        {/* Table Header */}
        <thead className="bg-gray-50">
          <tr className="text-lg text-gray-600">
            <th className="px-4 py-3 text-left">No.</th>
            <th className="px-4 py-3 text-left">Account Head</th>
            <th className="px-4 py-3 text-left">Date</th>
            <th className="px-4 py-3 text-left">Debit</th>
            <th className="px-4 py-3 text-left">Credit</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="text-black bg-[#EBEBEB]">
          {accounts?.map((item: any, index: number) => (
            <tr key={item._id} className="text-sm text-black lg:text-xl">
              <td className="px-4 py-4 whitespace-nowrap">{index + 1}</td>

              {/* Ensure accountHead is a primitive value */}
              <td className="px-4 py-4 whitespace-nowrap">
                {typeof item.accountHead === 'object'
                  ? item.accountHead?.name || 'Unknown Head' // Access the name or fallback to 'Unknown Head'
                  : item.accountHead}
              </td>

              {/* Format and display the date using date-fns */}
              <td className="px-4 py-4 whitespace-nowrap">
                {format(new Date(item.date), 'MM/dd/yyyy')}
              </td>

              {/* Conditional rendering of Debit and Credit based on accountType */}
              <td className="px-4 py-4 whitespace-nowrap">
                {item.accountType === 'debit' ? item.amount : '-'}
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                {item.accountType === 'credit' ? item.amount : '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllAccounts;
