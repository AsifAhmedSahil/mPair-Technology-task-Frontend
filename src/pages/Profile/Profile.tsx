import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import React from "react";

const Profile = () => {
  // Sample profile data
//   const user = {
//     name: "John Doe",
//     email: "sahil.com",
//     dateOfBirth: "1990-05-15T00:00:00.000Z",
//     gender: "male",
//     image: "https://res.cloudinary.com/djbpo9xg5/image/upload/v1728977224/zjaila4tzsyv287cnmuk.png",
//     employeeId: "123456",
//     position: "Software Engineer"
//   };
  const { user } = useAppSelector((state: RootState) => state.user);
    console.log(user);

  // Convert date of birth to a readable format
  const dateOfBirth = user?.dateOfBirth ? new Date(user.dateOfBirth) : null;

  const formattedDate = dateOfBirth
    ? `${dateOfBirth.getDate()}-${dateOfBirth.getMonth() + 1}-${dateOfBirth.getFullYear()}`
    : "Date not available"; // or any fallback text
  

  return (
    <div className="min-h-screen bg-white p-6">
        <h1 className="font-semibold text-[20px] leading-5 text-[#494949] tracking-tight ">Profile Information</h1>
      {/* Profile card container */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-2 lg:p-6 mt-12">
        {/* Profile content */}
        <div className="flex flex-col gap-6">
          {/* Profile Image */}
          <div className="flex justify-center">
            <img
              src={user?.image}
              alt="Profile"
              className="h-40 w-40 rounded-full object-cover border-4 border-blue-500"
            />
          </div>

          {/* Profile Details */}
          <div className="flex flex-col leading-8 ">
          <p className="font-[400] text-[16px] text-[#3E3E3E80]">Full Name</p>
            <h3 className="text-[16px] font-bold text-[#3E3E3EBF]">{user?.name}</h3>
            <p className="font-[400] text-[16px] text-[#3E3E3E80]">Position</p>
            <h3 className="text-[16px] font-bold text-[#3E3E3EBF]">{user?.position}</h3>
            <p className="font-[400] text-[16px] text-[#3E3E3E80]">Gender</p>
            <h3 className="text-[16px] font-bold text-[#3E3E3EBF]">{user?.gender}</h3>
            <p className="font-[400] text-[16px] text-[#3E3E3E80]">Date Of Birth</p>
            <h3 className="text-[16px] font-bold text-[#3E3E3EBF]">{formattedDate}</h3>
            <p className="font-[400] text-[16px] text-[#3E3E3E80]">Email</p>
            <h3 className="text-[16px] font-bold text-[#3E3E3EBF]">{user?.email}</h3>
            <p className="font-[400] text-[16px] text-[#3E3E3E80]">Employee ID</p>
            <h3 className="text-[16px] font-bold text-[#3E3E3EBF]">{user?.employeeId}</h3>

            

              
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
