import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";

const Profile = () => {
  const { user } = useAppSelector((state: RootState) => state.user);
  console.log(user);

  const dateOfBirth = user?.dateOfBirth ? new Date(user.dateOfBirth) : null;

  const formattedDate = dateOfBirth
    ? `${dateOfBirth.getDate()}-${
        dateOfBirth.getMonth() + 1
      }-${dateOfBirth.getFullYear()}`
    : "Date not available";

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="font-semibold text-[20px] leading-5 text-[#494949] tracking-tight ">
        Profile Information
      </h1>

      <div className=" lg:max-w-4xl mx-auto bg-white rounded-lg shadow-md p-2 lg:p-6 mt-12">
        <div className="flex flex-col gap-6">
          <div className="flex justify-center">
            <img
              src={user?.image}
              alt="Profile"
              className="h-40 w-40 rounded-full object-cover border-4 border-blue-500"
            />
          </div>

          <div className="flex flex-col leading-8 ">
            <p className="font-[400] text-[16px] text-[#3E3E3E80]">Full Name</p>
            <h3 className="text-[16px] font-bold text-[#3E3E3EBF]">
              {user?.name}
            </h3>
            <p className="font-[400] text-[16px] text-[#3E3E3E80]">Position</p>
            <h3 className="text-[16px] font-bold text-[#3E3E3EBF]">
              {user?.position}
            </h3>
            <p className="font-[400] text-[16px] text-[#3E3E3E80]">Gender</p>
            <h3 className="text-[16px] font-bold text-[#3E3E3EBF]">
              {user?.gender}
            </h3>
            <p className="font-[400] text-[16px] text-[#3E3E3E80]">
              Date Of Birth
            </p>
            <h3 className="text-[16px] font-bold text-[#3E3E3EBF]">
              {formattedDate}
            </h3>
            <p className="font-[400] text-[16px] text-[#3E3E3E80]">Email</p>
            <h3 className="text-[16px] font-bold text-[#3E3E3EBF]">
              {user?.email}
            </h3>
            <p className="font-[400] text-[16px] text-[#3E3E3E80]">
              Employee ID
            </p>
            <h3 className="text-[16px] font-bold text-[#3E3E3EBF]">
              {user?.employeeId}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
