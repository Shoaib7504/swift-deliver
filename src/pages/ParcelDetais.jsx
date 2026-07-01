import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft, Package, MapPin, Phone, User, Hash,
  Calendar, CreditCard, Truck, CheckCircle2, Clock,
  ArrowRight, Box, Loader2, AlertCircle, FileText,
} from "lucide-react";
import useAuth from "../hooks/UseAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";

// ── Status config
const STATUS_CONFIG = {
  unpaid:                   { label: "Unpaid",                 color: "text-warning",   bg: "bg-warning/10",   border: "border-warning/30",   step: 0 },
  paid:                     { label: "Paid",                   color: "text-info",      bg: "bg-info/10",      border: "border-info/30",      step: 1 },
  "ready-to-pickup":        { label: "Ready to pickup",        color: "text-brand",     bg: "bg-brand/10",     border: "border-brand/30",     step: 2 },
  "in-transit":             { label: "In transit",             color: "text-brand-2",   bg: "bg-brand-2/10",   border: "border-brand-2/30",   step: 3 },
  "reached-service-center": { label: "At service center",      color: "text-brand-3",   bg: "bg-brand-3/10",   border: "border-brand-3/30",   step: 4 },
  shipped:                  { label: "Shipped",                color: "text-brand-4",   bg: "bg-brand-4/10",   border: "border-brand-4/30",   step: 5 },
  "ready-for-delivery":     { label: "Ready for delivery",     color: "text-info",      bg: "bg-info/10",      border: "border-info/30",      step: 6 },
  delivered:                { label: "Delivered",              color: "text-success",   bg: "bg-success/10",   border: "border-success/30",   step: 7 },
};

const STATUS_ORDER = [
  "unpaid", "paid", "ready-to-pickup", "in-transit",
  "reached-service-center", "shipped", "ready-for-delivery", "delivered",
];

function StatusBadge({ status, large = false }) {
  const cfg = STATUS_CONFIG[status] ?? { label: status, color: "text-muted-foreground", bg: "bg-muted", border: "border-border" };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-semibold ${large ? "text-sm" : "text-xs"} ${cfg.color} ${cfg.bg} ${cfg.border}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${cfg.color.replace("text-", "bg-")}`} />
      {cfg.label}
    </span>
  );
}

function fmtDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-BD", {
    year: "numeric", month: "short", day: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

function fmtDateShort(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-BD", {
    month: "short", day: "numeric", year: "numeric",
  });
}

// ── Info chip
function Chip({ icon: Icon, label, value }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/30 px-4 py-3">
      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
        <Icon size={14} />
      </span>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="mt-0.5 text-sm font-semibold text-foreground">{value}</p>
      </div>
    </div>
  );
}

// ── Party card (sender / receiver)    
function PartyCard({ role, name, contact, region, serviceCenter, address, instruction, instructionLabel, accentClass }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <div className="mb-4 flex items-center gap-2">
        <span className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold text-white ${accentClass}`}>
          {role === "Sender" ? "S" : "R"}
        </span>
        <h3 className="font-display text-sm font-semibold text-foreground">{role}</h3>
      </div>
      <div className="space-y-3">
        {[
          { icon: User,      label: "Name",           val: name },
          { icon: Phone,     label: "Contact",        val: contact },
          { icon: MapPin,    label: "Region",         val: region },
          { icon: Box,       label: "Service center", val: serviceCenter },
          { icon: MapPin,    label: "Address",        val: address },
          { icon: FileText,  label: instructionLabel, val: instruction },
        ].map(({ icon: Icon, label, val }) =>
          val ? (
            <div key={label} className="flex items-start gap-3">
              <Icon size={13} className="mt-0.5 shrink-0 text-muted-foreground" />
              <div className="min-w-0">
                <span className="text-xs text-muted-foreground">{label} · </span>
                <span className="text-xs font-medium text-foreground break-words">{val}</span>
              </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}

// ── Progress pipeline     
function StatusPipeline({ status, isSameCity }) {
  const steps = isSameCity
    ? ["unpaid", "paid", "ready-to-pickup", "in-transit", "ready-for-delivery", "delivered"]
    : STATUS_ORDER;

  const currentIdx = steps.indexOf(status);

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <h3 className="mb-4 font-display text-sm font-semibold text-foreground">Delivery progress</h3>
      <div className="flex items-center gap-0">
        {steps.map((s, i) => {
          const done = i <= currentIdx;
          const active = i === currentIdx;
          const cfg = STATUS_CONFIG[s] ?? {};
          return (
            <div key={s} className="flex flex-1 flex-col items-center gap-1.5">
              {/* connector before */}
              <div className="flex w-full items-center">
                {i > 0 && (
                  <div className={`h-0.5 flex-1 transition-all ${i <= currentIdx ? "bg-gradient-brand" : "bg-border"}`} />
                )}
                <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition-all
                  ${active ? "border-brand bg-gradient-brand shadow-glow scale-110" : done ? "border-brand/40 bg-brand/10" : "border-border bg-background"}`}>
                  {done && !active
                    ? <CheckCircle2 size={12} className="text-brand" />
                    : active
                      ? <span className="h-2 w-2 rounded-full bg-white" />
                      : <span className="h-1.5 w-1.5 rounded-full bg-border" />
                  }
                </div>
                {i < steps.length - 1 && (
                  <div className={`h-0.5 flex-1 ${i < currentIdx ? "bg-gradient-brand" : "bg-border"}`} />
                )}
              </div>
              {/* label */}
              <p className={`hidden text-center text-[10px] font-medium leading-tight sm:block
                ${active ? "text-brand" : done ? "text-muted-foreground" : "text-border"}`}
                style={{ maxWidth: 60 }}
              >
                {STATUS_CONFIG[s]?.label ?? s}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Main page 
export default function ParcelDetailsPage() {
    const {user}=useAuth()
  const { id } = useParams();
  const axiosSecure=useAxiosSecure()
  const navigate = useNavigate();

  const {data:parcel,isLoading,error,refetch}=useQuery({
    queryKey:["parcel",id],
    queryFn:async ()=>{
        const res=await axiosSecure.get(`/parcels/${id}`)
        return res.data
    }
  })

//   useEffect(() => {
//     if (!id) return;
//     fetch(`${import.meta.env.VITE_API_URL}/parcels/${id}`)
//       .then((r) => { if (!r.ok) throw new Error("Not found"); return r.json(); })
//       .then(setParcel)
//       .catch(() => setError("Parcel not found or something went wrong."))
//       .finally(() => setLoading(false));
//   }, [id]);

  // ── Loading 
  if (isLoading) return (
    <div className="flex min-h-[60vh] items-center justify-center gap-2 text-muted-foreground">
      <Loader2 size={18} className="animate-spin" />
      <span className="text-sm">Loading parcel…</span>
    </div>
  );

  // ── Error 
  if (error || !parcel) return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
        <AlertCircle size={24} />
      </span>
      <div>
        <p className="font-display font-semibold text-foreground">Parcel not found</p>
        <p className="mt-1 text-sm text-muted-foreground">{error || "This parcel doesn't exist or has been removed."}</p>
      </div>
      <button onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-secondary">
        <ArrowLeft size={14} /> Go back
      </button>
    </div>
  );

  const {
    title, type, weight, status, deliveryCost, createdAt, tracking_no,
    senderName, senderContact, senderRegion, senderServiceCenter, senderAddress, pickupInstruction,
    receiverName, receiverContact, receiverRegion, receiverServiceCenter, receiverAddress, deliveryInstruction,
    email,
  } = parcel;

  const isSameCity = senderServiceCenter === receiverServiceCenter;
  const isUnpaid = status === "unpaid";

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">

      {/* ── Back  */}
      <button
        onClick={() => navigate(-1)}
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft size={15} /> Back to parcels
      </button>

      {/* ── Hero header     */}
      <div className="relative mb-6 overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
        {/* background glow strip */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-brand opacity-80" />

        {/* subtle orb */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full"
          style={{ background: "oklch(0.71 0.19 38)", filter: "blur(60px)", opacity: 0.06 }}
        />

        <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-start sm:justify-between">
          {/* Left — title + meta */}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Parcel details
            </p>
            <h1 className="mt-1.5 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {title}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <StatusBadge status={status} large />
              <span className="rounded-full border border-border bg-muted/40 px-2.5 py-0.5 text-xs font-medium capitalize text-muted-foreground">
                {type}
              </span>
              {type === "non-document" && weight && (
                <span className="rounded-full border border-border bg-muted/40 px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                  {weight} kg
                </span>
              )}
              <span className="rounded-full border border-border bg-muted/40 px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                {isSameCity ? "Within city" : "Outside city"}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar size={12} /> Created {fmtDateShort(createdAt)}
              </span>
              {tracking_no && (
                <span className="flex items-center gap-1.5">
                  <Hash size={12} />
                  Tracking — <strong className="text-foreground">{tracking_no}</strong>
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <User size={12} /> {email}
              </span>
            </div>
          </div>

          {/* Right — cost + CTA */}
          <div className="flex shrink-0 flex-col items-end gap-3">
            <div className="text-right">
              <p className="text-xs font-medium text-muted-foreground">Delivery cost</p>
              <p className="font-display text-4xl font-extrabold text-gradient-brand leading-none mt-0.5">
                ৳{deliveryCost}
              </p>
            </div>
            {isUnpaid && (
              <button
                onClick={() => navigate(`/dashboard/pay/${id}`)}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-90"
              >
                <CreditCard size={14} /> Pay now
              </button>
            )}
            {!isUnpaid && (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-success">
                <CheckCircle2 size={13} /> Payment confirmed
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── Progress pipeline  */}
      <div className="mb-6">
        <StatusPipeline status={status} isSameCity={isSameCity} />
      </div>

      {/* ── Route banner  */}
      <div className="mb-6 flex items-center gap-4 rounded-2xl border border-border bg-card px-6 py-5 shadow-soft">
        <div className="flex-1 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">From</p>
          <p className="mt-1 font-display text-lg font-bold text-foreground">{senderServiceCenter}</p>
          <p className="text-xs text-muted-foreground">{senderRegion}</p>
        </div>
        <div className="flex flex-1 items-center gap-2">
          <span className="h-px flex-1 bg-border" />
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-brand shadow-glow">
            <Truck size={15} className="text-white" />
          </span>
          <span className="h-px flex-1 bg-border" />
        </div>
        <div className="flex-1 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">To</p>
          <p className="mt-1 font-display text-lg font-bold text-foreground">{receiverServiceCenter}</p>
          <p className="text-xs text-muted-foreground">{receiverRegion}</p>
        </div>
      </div>

      {/* ── Info chips  */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Chip icon={Package}  label="Type"         value={type === "document" ? "Document" : "Non-document"} />
        <Chip icon={Box}      label="Weight"       value={weight ? `${weight} kg` : "N/A"} />
        <Chip icon={Calendar} label="Created"      value={fmtDateShort(createdAt)} />
        <Chip icon={Hash}     label="Tracking no." value={tracking_no ?? "—"} />
      </div>

      {/* ── Sender / Receiver  */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <PartyCard
          role="Sender"
          accentClass="bg-gradient-to-br from-brand to-brand-2"
          name={senderName}
          contact={senderContact}
          region={senderRegion}
          serviceCenter={senderServiceCenter}
          address={senderAddress}
          instruction={pickupInstruction}
          instructionLabel="Pickup instruction"
        />
        <PartyCard
          role="Receiver"
          accentClass="bg-gradient-to-br from-brand-3 to-brand-4"
          name={receiverName}
          contact={receiverContact}
          region={receiverRegion}
          serviceCenter={receiverServiceCenter}
          address={receiverAddress}
          instruction={deliveryInstruction}
          instructionLabel="Delivery instruction"
        />
      </div>

    </div>
  );
}