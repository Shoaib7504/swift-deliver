import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    ArrowLeft, Lock, Package, MapPin,
    CheckCircle2, Loader2, Copy, AlertCircle, ShieldCheck,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/UseAuth";
// Success overlay
function SuccessOverlay({ tracking_no, transactionId, onDone }) {
    const [copied, setCopied] = useState(false);
    function copy(txt) {
        navigator.clipboard.writeText(txt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 px-4 backdrop-blur-sm">
            <div className="surface-glass w-full max-w-md rounded-2xl p-8 text-center shadow-glow">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-success/15">
                    <CheckCircle2 size={32} className="text-success" />
                </div>

                <h2 className="font-display text-2xl font-bold text-foreground">Payment confirmed!</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                    Your parcel is now queued for pickup. Save your tracking number.
                </p>

                <div className="mt-6 rounded-xl border border-border bg-background p-4">
                    <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                        Tracking number
                    </p>
                    <div className="mt-2 flex items-center justify-center gap-2">
                        <span className="font-display text-3xl font-bold text-gradient-brand tracking-widest">
                            {tracking_no}
                        </span>
                        <button
                            onClick={() => copy(tracking_no)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground"
                        >
                            {copied ? <CheckCircle2 size={15} className="text-success" /> : <Copy size={15} />}
                        </button>
                    </div>
                </div>

                {transactionId && (
                    <p className="mt-3 text-xs text-muted-foreground">
                        Transaction ID: <span className="font-mono text-foreground">{transactionId}</span>
                    </p>
                )}

                <button
                    onClick={onDone}
                    className="mt-6 w-full rounded-xl bg-gradient-brand py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-90"
                >
                    View parcel details
                </button>
            </div>
        </div>
    );
}

export default function PaymentPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } =useAuth()
    const axiosSecure = useAxiosSecure();
    const [paying, setPaying] = useState(false);
    const [success, setSuccess] = useState(null); // { tracking_no, transactionId }

    // Fetch parcel
    const { data: parcel, isLoading, isError, error: queryError } = useQuery({
        queryKey: ["parcel", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${id}`);
            return res.data;
        },
    });

    // Pay handler
    async function handlePay() {
        try {
            setPaying(true);
            const parcelInfo = {
                _id: parcel._id,
                price: parcel.deliveryCost,
                productName: parcel.title,
                productDescription: `Parcel delivery from ${parcel.senderServiceCenter} to ${parcel.receiverServiceCenter}`,

                email: user.email,
                senderServiceCenter: parcel.senderServiceCenter,
                receiverServiceCenter: parcel.receiverServiceCenter,
            };

            const res = await axiosSecure.post('/create-checkout-session', parcelInfo)
            console.log(res.data)
            // Redirect to Stripe Checkout
            window.location.href = res.data.url;
        }
        catch (error) {
            console.error(error);
            toast.error("Payment failed");
        } finally {
            setPaying(false);
        }

    }

    // Loading / error states
    if (isLoading) return (
        <div className="flex min-h-[60vh] items-center justify-center gap-2 text-muted-foreground">
            <Loader2 size={18} className="animate-spin" />
            <span className="text-sm">Loading payment details…</span>
        </div>
    );

    if (isError || !parcel) return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
            <AlertCircle size={28} className="text-destructive" />
            <p className="text-sm text-muted-foreground">{queryError?.message || "Parcel not found."}</p>
            <button onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-secondary">
                <ArrowLeft size={14} /> Go back
            </button>
        </div>
    );

    if (parcel.status !== "unpaid") return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
            <CheckCircle2 size={32} className="text-success" />
            <div>
                <p className="font-display font-semibold text-foreground">Already paid</p>
                <p className="mt-1 text-sm text-muted-foreground">This parcel has already been paid for.</p>
            </div>
            <button onClick={() => navigate(`/dashboard/parcel/${id}`)}
                className="rounded-xl bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-90">
                View parcel
            </button>
        </div>
    );

    return (
        <>
            {/* {success && (
                <SuccessOverlay
                    tracking_no={success.tracking_no}
                    transactionId={success.transactionId}
                    onDone={() => navigate(`/dashboard/parcel/${id}`)}
                />
            )} */}

            <div className="mt-8 mx-auto max-w-md space-y-4">

                {/* Top heading section */}
                <div className="text-center mb-2">
                    <h1 className="font-display text-2xl font-bold text-foreground">Complete Your Payment</h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Review your parcel details below and confirm payment to schedule pickup. Your delivery will be dispatched as soon as the payment is verified.
                    </p>
                </div>

                <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                    <h2 className="mb-4 font-display text-xs font-semibold text-foreground uppercase tracking-wider">Order summary</h2>

                    <div className="flex items-center gap-3 pb-4 border-b border-border/60">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                            <Package size={18} />
                        </span>
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-foreground">{parcel.title}</p>
                            <p className="text-[11px] capitalize text-muted-foreground">{parcel.type}</p>
                        </div>
                    </div>

                    {/* Route Badge Layout */}
                    <div className="mt-4 flex items-center justify-between rounded-xl bg-muted/40 p-3 text-xs">
                        <div>
                            <span className="block text-[9px] uppercase tracking-wider text-muted-foreground font-medium">From</span>
                            <span className="font-semibold text-foreground">{parcel.senderServiceCenter}</span>
                        </div>
                        <div className="h-px flex-1 mx-4 bg-border relative">
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-brand" />
                        </div>
                        <div className="text-right">
                            <span className="block text-[9px] uppercase tracking-wider text-muted-foreground font-medium">To</span>
                            <span className="font-semibold text-foreground">{parcel.receiverServiceCenter}</span>
                        </div>
                    </div>

                    <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin size={12} className="text-muted-foreground/70" />
                        <span className="truncate">{parcel.receiverAddress}</span>
                    </div>

                    {/* Price Breakdown */}
                    <div className="mt-5 space-y-2.5 border-t border-border pt-4">
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Delivery fee</span>
                            <span className="font-medium text-foreground">৳{parcel.deliveryCost}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Tax / VAT</span>
                            <span className="font-medium text-foreground">৳0</span>
                        </div>
                        <div className="flex items-center justify-between border-t border-border pt-3">
                            <span className="text-sm font-semibold text-foreground">Total amount</span>
                            <span className="text-gradient-brand font-display text-xl font-bold">৳{parcel.deliveryCost}</span>
                        </div>
                    </div>
                </div>

                {/* Action Button */}
                <button
                    type="button"
                    onClick={handlePay}
                    disabled={paying}
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-brand py-4 text-sm font-semibold text-primary-foreground shadow-glow transition hover:brightness-105 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none"
                >
                    {paying ? (
                        <><Loader2 size={16} className="animate-spin" /> Processing payment…</>
                    ) : (
                        <><Lock size={14} /> Pay ৳{parcel.deliveryCost} Securely</>
                    )}
                </button>

                <p className="text-center text-[11px] text-muted-foreground px-4">
                    By completing this transaction, you agree to ZapShift's <a href="#" className="underline hover:text-foreground">Terms of Service</a>.
                </p>

                {/* Security Badges Footer */}
                <div className="flex items-center justify-between px-2 text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1"><ShieldCheck size={13} className="text-success" /> PCI-DSS Compliant</span>
                    <span className="flex items-center gap-1"><Lock size={11} /> 256-bit SSL Encrypted</span>
                </div>
            </div>
        </>
    );
}