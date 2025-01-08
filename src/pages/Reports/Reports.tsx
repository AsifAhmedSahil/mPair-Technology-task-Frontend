/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAccountUserDataQuery } from '@/redux/api/auth/userData';
import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import { format } from 'date-fns'; // Import format from date-fns

const AllAccounts = () => {
  const { user } = useAppSelector((state: RootState) => state.user);
  console.log(user);

  const { data, error, isLoading } = useGetAccountUserDataQuery(user?.employeeId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading accounts</div>;

  const accounts = data?.data;
  console.log(accounts);

  // Get today's date formatted
  const todayDate = format(new Date(), 'dd MMM yyyy');

  return (
    <div className="overflow-x-auto">
      {/* Container for Daily Report and Today's Date */}
      <div className="flex justify-between items-center  px-4 py-2  mb-10">
        {/* Daily Report Title */}
        <h2 className="text-2xl font-bold text-gray-700">Daily Report</h2>

        {/* Today's Date */}
        <div className="text-lg text-gray-600 ">{todayDate}</div>
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
        <tbody className=" text-black bg-[#EBEBEB]">
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
