import { Link } from "react-router-dom";
import PublicAuthLayout from "../../layouts/PublicAuthLayout";

const VerifyEmailNotice = () => {
  return (
    <PublicAuthLayout>
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
          <svg
            className="h-6 w-6 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="mt-3 text-xl font-bold text-gray-800">
          Verify Your Email Address
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          We've sent a verification link to your email address. Please click the
          link to complete your registration.
        </p>
        <div className="mt-6">
          <Link
            to="/login"
            className="text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    </PublicAuthLayout>
  );
};

export default VerifyEmailNotice;
