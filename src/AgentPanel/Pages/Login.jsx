import React, { useState, useRef } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isForgetPassword, setIsForgetPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false); // State for OTP sent
  const [otp, setOtp] = useState(new Array(6).fill('')); // OTP array
  const [otpConfirmed, setOtpConfirmed] = useState(false); // State for OTP confirmation
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const otpRefs = useRef([]);

  // Handle sending OTP
  const handleForgetPassword = (e) => {
    e.preventDefault();
    setOtpSent(true);
    alert('OTP sent to ' + email);
  };

  // Handle OTP input change
  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to the next input if available
      if (index < 5) {
        otpRefs.current[index + 1].focus();
      }
    } else if (value === '') {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
    }
  };

  // Handle OTP confirmation
  const handleSubmitOtp = (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length === 6) {
      setOtpConfirmed(true);
      alert('OTP confirmed');
    } else {
      setError('Please enter a valid 6-digit OTP');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="w-full flex justify-center">
          <img src="./AgentPanel/Logo.png" alt="Next Level" />
        </div>

        {!otpSent ? (
          !isForgetPassword ? (
            <form className="mt-6">
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="agent@nextlevel.com"
                  className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#DA931D]"
                />
              </div>

              <div className="mb-4 relative">
                <label className="block text-gray-700">Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="********"
                  className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#DA931D]"
                />
                <div
                  className="absolute inset-y-0 top-1/2 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash className="text-gray-700" /> : <FaEye className="text-gray-700" />}
                </div>
              </div>
              <p
                className="text-[#8A7C72] my-4 cursor-pointer w-fit"
                onClick={() => setIsForgetPassword(true)}
              >
                Forget Password?
              </p>
              {error && <p className="my-6 text-red-700">{error}</p>}

              <button
                type="submit"
                className="w-full bg-[#222222] text-white py-2 rounded-lg hover:bg-[#8F8F8F] transition duration-300"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleForgetPassword} className="mt-6">
              <div className="mb-4">
                <label className="block text-gray-700">Enter your email to receive an OTP</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="agent@nextlevel.com"
                  className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#DA931D]"
                />
              </div>
              {error && <p className="my-6 text-red-700">{error}</p>}

              <button
                type="submit"
                className="w-full bg-[#222222] text-white py-2 rounded-lg hover:bg-[#8F8F8F] transition duration-300"
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>

              <p
                className="text-[#8A7C72] mt-4 cursor-pointer w-fit"
                onClick={() => setIsForgetPassword(false)}
              >
                Back to Login
              </p>
            </form>
          )
        ) : !otpConfirmed ? (
          <form onSubmit={handleSubmitOtp} className="mt-6">
            <label className="block text-gray-700 mb-4">Enter the OTP sent to your email</label>
            <div className="flex justify-between">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={data}
                  onChange={(e) => handleOtpChange(e, index)}
                  ref={(el) => (otpRefs.current[index] = el)}
                  className="w-10 px-2 py-2 border text-center rounded-lg focus:outline-none focus:ring-1 focus:ring-[#DA931D]"
                />
              ))}
            </div>

            {error && <p className="my-6 text-red-700">{error}</p>}

            <button
              type="submit"
              className="w-full bg-[#222222] text-white py-2 rounded-lg hover:bg-[#8F8F8F] transition duration-300 mt-6"
            >
              {loading ? 'Verifying OTP...' : 'Submit OTP'}
            </button>
          </form>
        ) : (
          <form className="mt-6">
            <div className="mb-4">
              <label className="block text-gray-700">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                placeholder="********"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#DA931D]"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="********"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#DA931D]"
              />
            </div>

            {error && <p className="my-6 text-red-700">{error}</p>}

            <button
              type="submit"
              className="w-full bg-[#222222] text-white py-2 rounded-lg hover:bg-[#8F8F8F] transition duration-300"
            >
              {loading ? 'Updating Password...' : 'Change Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
