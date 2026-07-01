import { useMemo } from "react";
import { useForm } from "react-hook-form";
import warehouses from "../../public/data/warehouses.json";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/UseAuth";

const SendParcel = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const parcelType = watch("type");
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");
  const axiosSecure = useAxiosSecure()

  // Unique region list, derived once from the warehouses data
  const regions = useMemo(
    () => [...new Set(warehouses.map((w) => w.region))].sort(),
    []
  );

  // Service centers (districts) are filtered down to whichever region is selected
  const senderServiceCenters = useMemo(
    () => warehouses.filter((w) => w.region === senderRegion).map((w) => w.district),
    [senderRegion]
  );
  const receiverServiceCenters = useMemo(
    () => warehouses.filter((w) => w.region === receiverRegion).map((w) => w.district),
    [receiverRegion]
  );

  const onSubmit = async (data) => {
    // console.log(data);

    const isDocument = data.type === "document";
    const isSameDistrict =
      data.senderServiceCenter === data.receiverServiceCenter;

    const weight = parseFloat(data.weight || 0);
    let cost = 0;

    if (isDocument) {
      cost = isSameDistrict ? 50 : 80;
    } else {
      if (weight <= 3) {
        cost = isSameDistrict ? 60 : 100;
      } else {
        cost = isSameDistrict
          ? 100 + (weight - 3) * 20
          : 150 + (weight - 3) * 20;
      }
    }

    const result = await Swal.fire({
      title: "Confirm Parcel",
      html: `
      <div style="text-align:left">
        <p><strong>Parcel Type:</strong> ${data.type}</p>
        <p><strong>Delivery:</strong> ${isSameDistrict ? "Within District" : "Outside District"
        }</p>
        <p><strong>Total Price:</strong> <span style="color:#16a34a;font-size:22px;">৳${cost}</span></p>
      </div>
    `,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Edit",
    });

    if (result.isConfirmed) {
      const parcel = {
        email: user?.email,
        ...data,
        deliveryCost: cost,
        status: "unpaid",
        createdAt: new Date(),
      };
      const res = await axiosSecure.post('/parcels', parcel)
      console.log(res.data);

      Swal.fire(
        "Success!",
        "Your parcel has been added successfully.",
        "success"
      );
    }
  };
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-8 text-4xl font-bold text-foreground text-gradient-brand">New Parcel</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-card p-5">

        {/* Parcel Info */}

        <div className="rounded-3xl border border-border bg-card p-8 shadow-lg">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">
                Parcel Delivery
              </p>

              <h1 className="mt-2 text-4xl font-bold text-foreground">
                Create <span className="text-gradient-brand">New Parcel</span>
              </h1>

              <p className="mt-2 text-sm text-muted-foreground">
                Fill in the sender and receiver information to create a parcel.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">

            <div>
              <label>Type</label>

              <select
                {...register("type")}
                className="border rounded-lg w-full p-2"
              >
                <option value="document">Document</option>
                <option value="non-document">Non Document</option>
              </select>
            </div>

            <div>
              <label>Title</label>

              <input
                {...register("title", {
                  required: "Title is required",
                })}
                className="border rounded-lg w-full p-2"
              />

              <p className="text-red-500 text-sm">
                {errors.title?.message}
              </p>
            </div>

            {parcelType === "non-document" && (
              <div>
                <label>Weight</label>

                <input
                  type="number"
                  {...register("weight")}
                  className="border rounded-lg w-full p-2"
                />
              </div>
            )}

          </div>
        </div>

        {/* Sender */}

        <div className="rounded-3xl border border-border bg-card p-8 shadow-lg">
          <h2 className="mb-6 text-xl font-bold text-foreground">
            Sender Information
          </h2>

          <div className="grid gap-6 md:grid-cols-2">

            <input
              placeholder="Sender Name"
              {...register("senderName", { required: true })}
              className="border rounded-lg p-2"
            />

            <input
              placeholder="Sender Contact"
              {...register("senderContact", { required: true })}
              className="border rounded-lg p-2"
            />

            <div>
              <select
                defaultValue=""
                {...register("senderRegion", { required: "Region is required" })}
                className="border rounded-lg w-full p-2"
              >
                <option value="" disabled>Select Region</option>
                {regions.map((region) => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
              <p className="text-red-500 text-sm">{errors.senderRegion?.message}</p>
            </div>

            <div>
              <select
                defaultValue=""
                disabled={!senderRegion}
                {...register("senderServiceCenter", { required: "Service center is required" })}
                className="border rounded-lg w-full p-2 disabled:opacity-50"
              >
                <option value="" disabled>
                  {senderRegion ? "Select Service Center" : "Select region first"}
                </option>
                {senderServiceCenters.map((district) => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
              <p className="text-red-500 text-sm">{errors.senderServiceCenter?.message}</p>
            </div>

            <textarea
              placeholder="Sender Address"
              {...register("senderAddress")}
              className="border rounded-lg p-2 md:col-span-2"
            />

            <textarea
              placeholder="Pickup Instruction"
              {...register("pickupInstruction")}
              className="border rounded-lg p-2 md:col-span-2"
            />

          </div>
        </div>

        {/* Receiver */}

        <div className="rounded-3xl border border-border bg-card p-8 shadow-lg">
          <h2 className="mb-6 text-xl font-bold text-foreground">
            Receiver Information
          </h2>

          <div className="grid gap-6 md:grid-cols-2">

            <input
              placeholder="Receiver Name"
              {...register("receiverName", { required: true })}
              className="border rounded-lg p-2"
            />

            <input
              placeholder="Receiver Contact"
              {...register("receiverContact", { required: true })}
              className="border rounded-lg p-2"
            />

            <div>
              <select
                defaultValue=""
                {...register("receiverRegion", { required: "Region is required" })}
                className="border rounded-lg w-full p-2"
              >
                <option value="" disabled>Select Region</option>
                {regions.map((region) => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
              <p className="text-red-500 text-sm">{errors.receiverRegion?.message}</p>
            </div>

            <div>
              <select
                defaultValue=""
                disabled={!receiverRegion}
                {...register("receiverServiceCenter", { required: "Service center is required" })}
                className="border rounded-lg w-full p-2 disabled:opacity-50"
              >
                <option value="" disabled>
                  {receiverRegion ? "Select Service Center" : "Select region first"}
                </option>
                {receiverServiceCenters.map((district) => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
              <p className="text-red-500 text-sm">{errors.receiverServiceCenter?.message}</p>
            </div>

            <textarea
              placeholder="Receiver Address"
              {...register("receiverAddress")}
              className="border rounded-lg p-2 md:col-span-2"
            />

            <textarea
              placeholder="Delivery Instruction"
              {...register("deliveryInstruction")}
              className="border rounded-lg p-2 md:col-span-2"
            />

          </div>
        </div>

        <button
          className="rounded-2xl bg-gradient-brand px-3 py-2 cursor-pointer text-white shadow-glow"
          type="submit"
        >
          Submit Parcel
        </button>

      </form>
    </div>
  );
};

export default SendParcel;