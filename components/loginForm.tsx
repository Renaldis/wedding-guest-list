"use client";

import { useForm } from "react-hook-form";

import { useState } from "react";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import Link from "next/link";

type FormData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post("/api/auth/login", data);

      Cookies.set("token", response.data.token);

      window.location.href = "/dashboard";
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorMessage(error.response?.data?.message);
      } else {
        setErrorMessage("Login gagal");
      }
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-[80%] md:w-full max-w-md">
      <h2 className="text-2xl font-semibold mb-6">Login Akun</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            className="w-full p-3 border rounded-lg bg-blue-100"
            placeholder="name@email.com"
            {...register("email", { required: "Email wajib diisi" })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            className="w-full p-3 border rounded-lg bg-blue-100"
            placeholder="********"
            {...register("password", {
              required: "Password wajib diisi",
              minLength: {
                value: 8,
                message: "Minimal 8 karakter",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {errorMessage && (
          <p className="text-red-600 text-sm mb-4">{errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-800 disabled:opacity-60 cursor-pointer"
        >
          {isSubmitting ? "Loading..." : "Masuk Sekarang"}
        </button>
      </form>

      <p className="text-center text-gray-500 mt-6">
        Belum punya akun?
        <Link href={"/dashboard/register"}>
          <span className="text-blue-600 ml-1 hover:border-b-2 hover:border-blue-600 cursor-pointer">
            Daftar
          </span>
        </Link>
      </p>
    </div>
  );
}
