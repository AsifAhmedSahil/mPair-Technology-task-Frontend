import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

type FormData = {
  fullName: string;
  gender: string;
  dateOfBirth: string;
  email: string;
  employeeId: string;
  position: string;
  password: string;
};

const RegistrationForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-[#F4FAFC] p-6 shadow-lg sm:p-8">
        <div className="space-y-2 text-center">
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
              {...register('fullName', { required: "Full name is required" })}
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm sm:text-base placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
            {errors.fullName && (
              <p className="text-sm text-red-500">{errors.fullName.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                {...register('gender', { required: "Gender is required" })}
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
                {...register('dateOfBirth', { required: "Date of birth is required" })}
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
              {...register('email', { 
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
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
              {...register('employeeId', { required: "Employee ID is required" })}
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
              {...register('position', { required: "Position is required" })}
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
                {...register('password', { 
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" }
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
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-sky-500 py-2 text-sm sm:text-base font-semibold text-white shadow-sm hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          >
            Register
          </button>
        </form>

        <div className="text-center text-sm text-[#9E9E9E]">
          {"Already have an account? "}
          <a
            href="/login"
            className="font-semibold text-sky-500 hover:text-sky-600"
          >
            Login here
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;

