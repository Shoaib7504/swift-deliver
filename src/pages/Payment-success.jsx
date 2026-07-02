import { CheckCircle2, ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
const axiosSecure=useAxiosSecure()
  const sessionId = searchParams.get("session_id");
useEffect(() => {
  const updatePayment = async () => {
    if (!sessionId) return;

    try {
      const res = await axiosSecure.patch(
        `/payment-success?session_id=${sessionId}`
      );

      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  updatePayment();
}, [sessionId, axiosSecure]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl text-center">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="text-green-600" size={50} />
        </div>

        <h1 className="mt-6 text-3xl font-bold text-gray-800">
          Payment Successful 🎉
        </h1>

        <p className="mt-3 text-gray-500">
          Thank you! Your parcel payment has been completed successfully.
        </p>

        {sessionId && (
          <div className="mt-6 rounded-lg bg-gray-100 p-3">
            <p className="text-sm text-gray-500">Session ID</p>
            <p className="mt-1 break-all text-xs font-medium">
              {sessionId}
            </p>
          </div>
        )}

        <div className="mt-8 flex items-center justify-center">
          <Link
            to="/dashboard/my-parcels"
            className="btn btn-primary w-full"
          >
            View My Parcels
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;