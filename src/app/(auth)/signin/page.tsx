"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { signIn } from "@/redux/slices/authSlice";
import type { AppDispatch, RootState } from "@/redux/store";
import TextInput from "@/components/forms/TextInput";

/** Validation schema */
const schema = z.object({
  userName: z.string().min(1, "Username is required"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

type FormData = z.infer<typeof schema>;

export default function SignInPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { loading, error } = useSelector((state: RootState) => state.auth);

  const { control, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await dispatch(signIn(data));
      if (res.meta.requestStatus === "fulfilled") {
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("Sign in error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Sign In
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-4">
          {/* Username */}
          <Controller
            name="userName"
            control={control}
            render={({ field, fieldState }) => (
              <TextInput
                label="Username"
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
                placeholder="Enter your username"
              />
            )}
          />

          {/* Password */}
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <TextInput
                label="Password"
                name={field.name}
                type="password"
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
                placeholder="Enter your password"
              />
            )}
          />

          {/* Error Message */}
          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 text-white font-medium rounded-lg transition ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
