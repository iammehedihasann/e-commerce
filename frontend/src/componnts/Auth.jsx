import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { getApiErrorMessage } from "../lib/api";
import { useAuthStore } from "../stores/authStore";

const authSchema = z
  .object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    phone: z
      .string()
      .trim()
      .optional()
      .refine((value) => !value || /^(\+?88)?01[3-9]\d{8}$/.test(value), "Use a valid BD phone number"),
    email: z.string().email("Email is invalid"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().optional()
  });

function Auth({ onClose, onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const { login, register: registerUser } = useAuthStore();
  const titleId = useId();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    resolver: zodResolver(authSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  const onSubmit = async (formData) => {
    try {
      if (!isLogin) {
        if (!formData.firstName?.trim()) {
          setError("firstName", { message: "First name is required" });
          return;
        }

        if (!formData.lastName?.trim()) {
          setError("lastName", { message: "Last name is required" });
          return;
        }

        if (formData.password !== formData.confirmPassword) {
          setError("confirmPassword", { message: "Passwords do not match" });
          return;
        }
      }

      const user = isLogin
        ? await login({ email: formData.email, password: formData.password })
        : await registerUser({
            firstName: formData.firstName,
            lastName: formData.lastName,
            phone: formData.phone,
            email: formData.email,
            password: formData.password
          });

      onLogin(user);
    } catch (error) {
      setError("root", { message: getApiErrorMessage(error) });
    }
  };

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  function inputClassName(hasError) {
    return `w-full rounded-lg border px-3 py-2.5 outline-none transition focus:ring-2 ${
      hasError
        ? "border-red-500 focus:border-red-500 focus:ring-red-100"
        : "border-slate-200 focus:border-emerald-600 focus:ring-emerald-100"
    }`;
  }

  function Field({ label, error, children }) {
    const id = useId();
    return (
      <div>
        <label htmlFor={id} className="mb-1 block text-sm font-medium text-slate-700">
          {label}
        </label>
        {React.isValidElement(children)
          ? React.cloneElement(children, { id })
          : children}
        {error ? <p className="mt-1 text-xs text-red-600">{error}</p> : null}
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-md rounded-3xl bg-white shadow-2xl"
      >
        <div className="p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-600">
                Secure access
              </p>
              <h2 id={titleId} className="mt-1 text-2xl font-bold text-slate-900">
                {isLogin ? "Sign In" : "Create Account"}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {isLogin
                  ? "Access your saved cart, wishlist, and order history."
                  : "Create a customer account for checkout and tracking."}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
              aria-label="Close authentication dialog"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {!isLogin && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="First Name *" error={errors.firstName?.message}>
                  <input
                    type="text"
                    {...register("firstName")}
                    className={inputClassName(Boolean(errors.firstName))}
                  />
                </Field>
                <Field label="Last Name *" error={errors.lastName?.message}>
                  <input
                    type="text"
                    {...register("lastName")}
                    className={inputClassName(Boolean(errors.lastName))}
                  />
                </Field>
              </div>
            )}

            {!isLogin && (
              <Field label="Phone Number" error={errors.phone?.message}>
                <input
                  type="tel"
                  {...register("phone")}
                  placeholder="017XXXXXXXX"
                  className={inputClassName(Boolean(errors.phone))}
                />
              </Field>
            )}

            <Field label="Email *" error={errors.email?.message}>
              <input
                type="email"
                {...register("email")}
                className={inputClassName(Boolean(errors.email))}
              />
            </Field>

            <Field label="Password *" error={errors.password?.message}>
              <input
                type="password"
                {...register("password")}
                className={inputClassName(Boolean(errors.password))}
              />
            </Field>

            {!isLogin && (
              <Field label="Confirm Password *" error={errors.confirmPassword?.message}>
                <input
                  type="password"
                  {...register("confirmPassword")}
                  className={inputClassName(Boolean(errors.confirmPassword))}
                />
              </Field>
            )}

            {errors.root && (
              <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
                {errors.root.message}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-2xl bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {isSubmitting ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          <div className="mt-6 rounded-2xl bg-slate-50 px-4 py-3 text-center text-sm text-slate-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => {
                reset();
                setIsLogin(!isLogin);
              }}
              className="ml-1 font-semibold text-emerald-600 hover:text-emerald-700"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
