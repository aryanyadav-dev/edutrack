import React, { useState } from 'react';
import { ArrowLeft, Mail, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PasswordForm } from './PasswordForm.tsx';
import { sendPasswordChangeEmail } from '../../utils/emailservice';

export function ChangePassword() {
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePasswordChange = async (email: string) => {
    const emailSent = await sendPasswordChangeEmail(email);
    setIsSuccess(emailSent);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-blue-400 to-teal-400 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-poppins">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-lg">
        <div className="flex flex-col mb-8">
          <Link 
            to="/login" 
            className="mb-4 flex items-center text-indigo-600 hover:text-indigo-500 -ml-1"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Login
          </Link>
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Change Password
            </h2>
            <p className="mt-2 text-lg text-gray-600">
              Enter your email and new password
            </p>
          </div>
        </div>

        <PasswordForm onSubmit={handlePasswordChange} />

        {isSuccess && (
          <div className="mt-4 p-4 bg-green-50 rounded-lg text-green-700 text-sm">
            Password changed successfully! Check your email for confirmation.
          </div>
        )}
      </div>
    </div>
  );
}