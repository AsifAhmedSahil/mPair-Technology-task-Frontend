import { useSignUpMutation } from "@/redux/api/auth/authApi";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Lottie from 'lottie-react';
import loginGif from '@/assets/Animation - 1736309007662.json';

type FormData = {
  name: string;
  gender: string;
  dateOfBirth: string;
  email: string;
  employeeId: string;
  position: string;
  password: string;
  image: string; // Add image field
};

const RegistrationForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const [signup] = useSignUpMutation()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setFile(selectedFile);
    if (!selectedFile) {
      setFileError("Please select an image file.");
    } else {
      setFileError(null);
    }
  };

  const onSubmit = async (data: FormData) => {
    if (!file) {
      setFileError("Please select an image file.");
      return;
    }

    const loadingToastId = "uploading-toast";
    toast.loading("Uploading photo, please wait...", {
      id: loadingToastId,
    });

    // Preparing FormData for Cloudinary
    const formData = new FormData();
    formData.append("file", file as File);
    formData.append("upload_preset", "myCloud");
    formData.append("cloud_name", "djbpo9xg5");

    try {
      // Upload image to Cloudinary
      const response = await fetch("https://api.cloudinary.com/v1_1/djbpo9xg5/image/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const dataFromCloud = await response.json();
      const image = dataFromCloud.secure_url;

      // Now submit the form with the image URL included
      // console.log({ ...data, image });
      const userInfo = {
        ...data,image
      }
      console.log(userInfo,"user info")
      const res = await signup(userInfo).unwrap()
      console.log(res)
      if(res.success){
        navigate("/login")
      }

      // You can replace this with actual form submission logic, for example, calling an API to save the user
      toast.success("Registration successful", {
        id: loadingToastId,
      });

    } catch (error) {
      console.error("Image upload failed: ", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 sm:px-6 lg:px-8">
  {/* Registration Form Section */}
  {/* Animation or Image Section */}
  <div className="hidden sm:block sm:w-1/2 ">
    <Lottie animationData={loginGif} />
  </div>
  <div className="w-full max-w-md space-y-6 rounded-lg bg-[#F4FAFC] p-6 shadow-lg sm:p-8">
    <div className="space-y-2 text-center mb-12">
      <h1 className="text-xl text-start sm:text-2xl font-semibold text-[#2397C8]">
        Welcome to PureLedger
      </h1>
      <p className="text-[16px] text-start text-gray-500">
        Fill up this form to Register
      </p>
    </div>

    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1">
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          {...register("name", { required: "Full name is required" })}
          id="name"
          type="text"
          placeholder="Enter your full name"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm sm:text-base placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
            Gender
          </label>
          <select
            {...register("gender", { required: "Gender is required" })}
            id="gender"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm sm:text-base text-gray-700 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && (
            <p className="text-sm text-red-500">{errors.gender.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
            Date of Birth
          </label>
          <input
            {...register("dateOfBirth", { required: "Date of birth is required" })}
            id="dateOfBirth"
            type="date"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm sm:text-base text-gray-700 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
          {errors.dateOfBirth && (
            <p className="text-sm text-red-500">{errors.dateOfBirth.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-1">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          id="email"
          type="email"
          placeholder="Enter your email"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm sm:text-base placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700">
          Employee ID
        </label>
        <input
          {...register("employeeId", { required: "Employee ID is required" })}
          id="employeeId"
          type="text"
          placeholder="Enter your employee ID"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm sm:text-base placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
        />
        {errors.employeeId && (
          <p className="text-sm text-red-500">{errors.employeeId.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="position" className="block text-sm font-medium text-gray-700">
          Position in Organization
        </label>
        <input
          {...register("position", { required: "Position is required" })}
          id="position"
          type="text"
          placeholder="Enter your position"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm sm:text-base placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
        />
        {errors.position && (
          <p className="text-sm text-red-500">{errors.position.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="relative">
          <input
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters" },
            })}
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm sm:text-base placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.862 4.438C14.712 3.662 13.343 3 12 3c-1.344 0-2.713.662-3.862 1.438L12 7l3.862-2.562zM12 5L8.862 7.438c-.174-.054-.358-.085-.532-.085-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5c.293 0 .573-.043.85-.126L12 17l2.788-6.206c.269-.083.548-.126.85-.126 1.38 0 2.5-1.12 2.5-2.5s-1.12-2.5-2.5-2.5c-.174 0-.358.031-.532.085L12 5z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 10-6 0 3 3 0 006 0z" />
              </svg>
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
          Profile Image
        </label>
        <input
          type="file"
          id="image"
          onChange={handleFileChange}
          className="block w-full rounded-md text-sm text-gray-700 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
        />
        {fileError && <p className="text-sm text-red-500">{fileError}</p>}
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-[#2397C8] py-2 text-white font-semibold text-sm hover:bg-[#1a7c99] focus:outline-none"
      >
        Register
      </button>
    </form>
  </div>

  
</div>

  );
};

export default RegistrationForm;
