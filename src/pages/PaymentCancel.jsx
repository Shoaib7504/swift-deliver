import { XCircle, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";

const PaymentCancel = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl text-center">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
          <XCircle className="text-red-600" size={50} />
        </div>

        <h1 className="mt-6 text-3xl font-bold text-gray-800">
          Payment Cancelled
        </h1>

        <p className="mt-3 text-gray-500">
          Your payment was cancelled. No money has been charged.
        </p>

        <div className="mt-8 space-y-3">

          <Link
            to="/dashboard/my-parcels"
            className="btn btn-primary w-full"
          >
            <RotateCcw size={18} />
            Try Again
          </Link>

          <Link
            to="/dashboard"
            className="btn btn-outline w-full"
          >
            Back to Dashboard
          </Link>

        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;