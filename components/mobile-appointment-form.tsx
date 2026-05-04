"use client";

import { useForm } from "react-hook-form";

interface MobileAppointmentFormValues {
  name: string;
  phone: string;
  email: string;
  preferredDate: string;
  message: string;
}

export default function MobileAppointmentForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<MobileAppointmentFormValues>();

  const onSubmit = (data: MobileAppointmentFormValues) => {
    const body = `Name: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email}\nPreferred Date: ${data.preferredDate}\nMessage: ${data.message}`;
    window.open(
      `mailto:boga.viswanath@gmail.com?subject=${encodeURIComponent("Appointment Request")}&body=${encodeURIComponent(body)}`,
      "_self",
    );
    reset();
  };

  return (
    <section className="rounded-3xl border border-[#C8A2C8]/45 bg-white/90 p-4 dark:border-[#B899BF]/45 dark:bg-[#2d2d2d] sm:p-6">
      <h2 className="text-xl font-semibold">Quick Appointment Request</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4" noValidate>
        <div>
          <label htmlFor="mobile-name" className="text-sm font-medium">
            Name
          </label>
          <input
            id="mobile-name"
            autoComplete="name"
            className="mt-1 min-h-11 w-full rounded-xl border border-[#C8A2C8]/60 bg-white px-3 py-2 text-base dark:bg-[#2d2d2d]"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name ? <p className="mt-1 text-xs text-red-600">{errors.name.message}</p> : null}
        </div>

        <div>
          <label htmlFor="mobile-phone" className="text-sm font-medium">
            Phone
          </label>
          <input
            id="mobile-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            className="mt-1 min-h-11 w-full rounded-xl border border-[#C8A2C8]/60 bg-white px-3 py-2 text-base dark:bg-[#2d2d2d]"
            {...register("phone", { required: "Phone is required" })}
          />
        </div>

        <div>
          <label htmlFor="mobile-email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="mobile-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            className="mt-1 min-h-11 w-full rounded-xl border border-[#C8A2C8]/60 bg-white px-3 py-2 text-base dark:bg-[#2d2d2d]"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
            })}
          />
          {errors.email ? <p className="mt-1 text-xs text-red-600">{errors.email.message}</p> : null}
        </div>

        <div>
          <label htmlFor="mobile-date" className="text-sm font-medium">
            Preferred Date
          </label>
          <input
            id="mobile-date"
            type="date"
            className="mt-1 min-h-11 w-full rounded-xl border border-[#C8A2C8]/60 bg-white px-3 py-2 text-base dark:bg-[#2d2d2d]"
            {...register("preferredDate", { required: "Preferred date is required" })}
          />
        </div>

        <div>
          <label htmlFor="mobile-message" className="text-sm font-medium">
            Message
          </label>
          <textarea
            id="mobile-message"
            rows={4}
            className="mt-1 w-full rounded-xl border border-[#C8A2C8]/60 bg-white px-3 py-2 text-base dark:bg-[#2d2d2d]"
            {...register("message", { required: "Message is required" })}
          />
          {errors.message ? <p className="mt-1 text-xs text-red-600">{errors.message.message}</p> : null}
        </div>

        <button
          type="submit"
          className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-[#C8A2C8] px-4 py-3 text-sm font-semibold text-[#2C2C2C] hover:bg-[#A47DAB] hover:text-white sm:w-auto"
        >
          Request Appointment
        </button>

        {isSubmitSuccessful ? <p className="text-xs text-emerald-700">Draft email opened successfully.</p> : null}
      </form>
    </section>
  );
}

