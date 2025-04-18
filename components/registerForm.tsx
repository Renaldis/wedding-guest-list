"use client";

import { useState } from "react";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useForm } from "react-hook-form";

type Role = {
  admin: "Admin";
  resepsionis: "Resepsionis";
};

type FormData = {
  name: string;
  email: string;
  password: string;
  role: Role;
};

export default function RegisterForm() {
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post("/api/auth/register", data);
      if (response.status === 200 || response.status === 201) {
        window.location.href = "/dashboard/login";
      }
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
      <h2 className="text-2xl font-semibold mb-6">Registrasi Akun</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="name mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">
            Nama :
          </label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg bg-blue-100"
            placeholder="Nama Lengkap"
            {...register("name", {
              required: "Nama wajib diisi",
            })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            className="w-full p-3 border rounded-lg bg-blue-100"
            placeholder="name@email.com"
            {...register("email", {
              required: "Email wajib diisi",
            })}
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
            min="8"
            {...register("password", {
              required: "Password wajib diisi",
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
          {isSubmitting ? "Loading..." : "Daftar Sekarang"}
        </button>
      </form>
      <p className="text-center text-gray-500 mt-6">
        Sudah punya akun?
        <Link href={"/dashboard/login"}>
          <span className="text-blue-600 ml-1 hover:border-b-2 hover:border-blue-600 cursor-pointer">
            Login
          </span>
        </Link>
      </p>
    </div>
  );
}
