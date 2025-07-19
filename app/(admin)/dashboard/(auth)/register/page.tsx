// app/dashboard/register/page.tsx
import RegisterForm from "@/components/register-form";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 p-4">
      <main className="w-full max-w-md space-y-6 ">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            GuesList Dashboard
          </h1>
        </div>

        <RegisterForm />
      </main>
    </div>
  );
}
