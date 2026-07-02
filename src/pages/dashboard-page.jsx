import { Plus } from "lucide-react";
import { toast } from "sonner";

import Stats from "../components/dashboard/stats";
import Spend from "../components/dashboard/spend";
import QuickActions from "../components/dashboard/quick-actions";
import RecentOrders from "../components/dashboard/recent-orders";
import Sidecards from "../components/dashboard/sidecards";

import useAuth from "../hooks/UseAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";

export default function DashboardHome() {
  const { user } = useAuth();
  const axiosSecure=useAxiosSecure()
   const { data: parcels, isLoading, isError, error: queryError, refetch } = useQuery({
        queryKey: ['parcels', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user?.email}`)
            return res.data
        },

    })
    console.log(parcels);
    

  return (
    <>
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-3xl font-extrabold">
            Good evening, {user?.displayName || "Alex"} 👋
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            You've saved <span className="font-semibold">$42</span> this month.
          </p>
        </div>

        <button
          onClick={() => toast.success("Starting new order...")}
          className="inline-flex h-11 items-center gap-2 rounded-full bg-gradient-brand px-5 text-white"
        >
          <Plus className="h-4 w-4" />
          New Order
        </button>
      </div>

      <Stats />

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Spend />
        <QuickActions />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <RecentOrders />
        <Sidecards />
      </div>
    </>
  );
}