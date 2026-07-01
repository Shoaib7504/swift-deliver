import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Package, Eye, CreditCard, Trash2, Loader2, SearchX } from "lucide-react";
import useAuth from "../../hooks/UseAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

// ── Status badge (same config as ParcelDetails) 
const STATUS_CONFIG = {
    unpaid: { label: "Unpaid", color: "text-warning", bg: "bg-warning/10" },
    paid: { label: "Paid", color: "text-info", bg: "bg-info/10" },
    "ready-to-pickup": { label: "Ready to Pickup", color: "text-brand", bg: "bg-brand/10" },
    "in-transit": { label: "In Transit", color: "text-brand-2", bg: "bg-brand-2/10" },
    "reached-service-center": { label: "Reached Service Center", color: "text-brand-3", bg: "bg-brand-3/10" },
    shipped: { label: "Shipped", color: "text-brand-4", bg: "bg-brand-4/10" },
    "ready-for-delivery": { label: "Ready for Delivery", color: "text-info", bg: "bg-info/10" },
    delivered: { label: "Delivered", color: "text-success", bg: "bg-success/10" },
};

function StatusBadge({ status }) {
    const cfg = STATUS_CONFIG[status] ?? {
        label: status,
        color: "text-muted-foreground",
        bg: "bg-muted",
    };
    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${cfg.color} ${cfg.bg}`}>
            {cfg.label}
        </span>
    );
}

function fmtDate(iso) {
    if (!iso) return "—";
    return new Date(iso).toLocaleDateString("en-BD", {
        year: "numeric", month: "short", day: "numeric",
    });
}

// ── Main component 
export default function MyParcels() {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate();
    const [deletingId, setDeletingId] = useState(null);

    // Fetch once on mount (or when the user changes)
    const { data: parcels, isLoading, isError, error: queryError, refetch } = useQuery({
        queryKey: ['parcels', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user?.email}`)
            return res.data
        },

    })


    const handleDelete = async id => {
        const result = await Swal.fire({
            title: "Delete Parcel?",
            text: "You won't be able to recover this parcel after deletion.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
            reverseButtons: true,
        });

        if (!result.isConfirmed) return;

        setDeletingId(id);

        try {
            const res = await axiosSecure.delete(`/parcels/${id}`);

            if (res.data.deletedCount > 0) {
                await Swal.fire({
                    title: "Deleted!",
                    text: "Your parcel has been deleted successfully.",
                    icon: "success",
                    timer: 1800,
                    showConfirmButton: false,
                });

                refetch();
            }
        } catch (err) {
            console.error(err);

            Swal.fire({
                title: "Error!",
                text: "Something went wrong while deleting the parcel.",
                icon: "error",
                confirmButtonText: "OK",
            });
        } finally {
            setDeletingId(null);
        }
    };


    // async function handleDelete(id) {
    //     const confirmed = window.confirm("Delete this parcel? This cannot be undone.");
    //     if (!confirmed) return;
    //     setDeletingId(id);
    //     try {
    //         const res = await fetch(`${import.meta.env.VITE_API_URL}/parcels/${id}`, {
    //             method: "DELETE",
    //         });
    //         if (!res.ok) throw new Error("Delete failed");
    //         // Optimistically remove from state
    //         setParcels((prev) => prev.filter((p) => p._id !== id));
    //     } catch (err) {
    //         alert("Could not delete parcel. It may already be paid.");
    //     } finally {
    //         setDeletingId(null);
    //     }
    // }

    // ── Loading 
    if (isLoading) {
        return (
            <div className="flex min-h-[40vh] items-center justify-center gap-2 text-muted-foreground">
                <Loader2 size={18} className="animate-spin" />
                <span className="text-sm">Loading your parcels…</span>
            </div>
        );
    }

    // ── Error 
    if (isError) {
        return (
            <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3">
                <p className="text-sm text-destructive">{error}</p>
                <button
                    onClick={refetch}
                    className="rounded-xl bg-gradient-brand px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-90"
                >
                    Try again
                </button>
            </div>
        );
    }

    // ── Empty
    if (parcels.length === 0) {
        return (
            <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                    <SearchX size={26} />
                </span>
                <div>
                    <p className="font-display font-semibold text-foreground">No parcels yet</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Add your first parcel and it will appear here.
                    </p>
                </div>
                <button
                    onClick={() => navigate("/dashboard/add-parcel")}
                    className="rounded-xl bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-90"
                >
                    Add a parcel
                </button>
            </div>
        );
    }

    // ── Table 
    return (
        <div className="mx-auto max-w-7xl px-4 py-10">
            {/* Header */}
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">
                        Shipment Dashboard
                    </p>

                    <h1 className="mt-2 text-3xl font-bold text-foreground">
                        My <span className="text-gradient-brand">Parcels</span>
                    </h1>

                    <p className="mt-2 text-sm text-muted-foreground">
                        Track, manage and pay for your parcel deliveries.
                    </p>
                </div>

                <div className="flex items-center gap-4 rounded-3xl border border-border bg-gradient-to-r from-brand/10 via-brand/5 to-transparent px-6 py-5 shadow-lg">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-white">
                        <Package size={24} />
                    </div>

                    <div>
                        <p className="text-3xl font-bold text-foreground">
                            {parcels.length}
                        </p>
                        <p className="text-xs uppercase tracking-widest text-muted-foreground">
                            Total Parcels
                        </p>
                    </div>
                </div>
            </div>

            {/* Table Card */}
            <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-xl">
                {/* Card Header */}
                <div className="flex items-center justify-between border-b border-border bg-gradient-to-r from-brand/10 via-transparent to-brand/5 px-6 py-5">
                    <div>
                        <h2 className="text-lg font-semibold text-foreground">
                            Parcel History
                        </h2>

                        <p className="text-sm text-muted-foreground">
                            View all created parcel requests.
                        </p>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[820px] text-sm">
                        <thead>
                            <tr className="border-b border-border bg-muted/40">
                                {[
                                    "Parcel",
                                    "Receiver",
                                    "Route",
                                    "Cost",
                                    "Created",
                                    "Status",
                                    "Actions",
                                ].map((head) => (
                                    <th
                                        key={head}
                                        className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground"
                                    >
                                        {head}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {parcels.map((parcel) => (
                                <tr
                                    key={parcel._id}
                                    className="group border-b border-border transition-all duration-300 hover:bg-brand/5"
                                >
                                    {/* Parcel */}
                                    <td className="px-6 py-5">
                                        <div>
                                            <h3 className="font-semibold text-foreground">
                                                {parcel.title}
                                            </h3>

                                            <span className="mt-1 inline-flex rounded-full bg-brand/10 px-3 py-1 text-xs font-medium capitalize text-brand">
                                                {parcel.type}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Receiver */}
                                    <td className="px-6 py-5">
                                        <p className="font-semibold text-foreground">
                                            {parcel.receiverName}
                                        </p>

                                        <p className="text-xs text-muted-foreground">
                                            {parcel.receiverContact}
                                        </p>
                                    </td>

                                    {/* Route */}
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2">
                                            <span className="rounded-full bg-muted px-3 py-1 text-xs">
                                                {parcel.senderServiceCenter}
                                            </span>

                                            <span className="font-bold text-brand">→</span>

                                            <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
                                                {parcel.receiverServiceCenter}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Cost */}
                                    <td className="px-6 py-5">
                                        <span className="text-base font-bold text-foreground">
                                            ৳{parcel.deliveryCost}
                                        </span>
                                    </td>

                                    {/* Date */}
                                    <td className="px-6 py-5 text-muted-foreground">
                                        {fmtDate(parcel.createdAt)}
                                    </td>

                                    {/* Status */}
                                    <td className="px-6 py-5">
                                        <StatusBadge status={parcel.status} />
                                    </td>

                                    {/* Actions */}
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2 opacity-80 transition group-hover:opacity-100">
                                            {/* View */}
                                            <button
                                                onClick={() =>
                                                    navigate(`/dashboard/parcel/${parcel._id}`)
                                                }
                                                title="View Details"
                                                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background transition-all hover:border-brand hover:bg-brand hover:text-white"
                                            >
                                                <Eye size={17} />
                                            </button>

                                            {/* Pay */}
                                            {parcel.status === "unpaid" && (
                                                <button
                                                    onClick={() =>
                                                        navigate(`/dashboard/pay/${parcel._id}`)
                                                    }
                                                    title="Pay Now"
                                                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background text-green-600 transition-all hover:border-green-500 hover:bg-green-500 hover:text-white"
                                                >
                                                    <CreditCard size={17} />
                                                </button>
                                            )}

                                            {/* Delete */}
                                            {parcel.status === "unpaid" && (
                                                <button
                                                    disabled={deletingId === parcel._id}
                                                    onClick={() => handleDelete(parcel._id)}
                                                    title="Delete Parcel"
                                                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background text-red-500 transition-all hover:border-red-500 hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                                                >
                                                    {deletingId === parcel._id ? (
                                                        <Loader2 size={17} className="animate-spin" />
                                                    ) : (
                                                        <Trash2 size={17} />
                                                    )}
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {parcels.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="px-6 py-16 text-center text-muted-foreground"
                                    >
                                        <div className="flex flex-col items-center gap-4">
                                            <Package
                                                size={50}
                                                className="rounded-full bg-muted p-3 text-muted-foreground"
                                            />

                                            <div>
                                                <h3 className="text-lg font-semibold text-foreground">
                                                    No Parcels Found
                                                </h3>

                                                <p className="mt-1 text-sm text-muted-foreground">
                                                    You haven't created any parcel yet.
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}