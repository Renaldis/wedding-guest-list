import LoginForm from "@/components/loginForm";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center py-8 bg-gray-100 min-h-screen">
      <div className="mb-8">
        {/* <img src={logo} alt="Workify logo" className="inline-block w-20" /> */}
        <span className="text-2xl font-semibold text-gray-800 ml-2">
          GuestList Dashboard
        </span>
      </div>
      <LoginForm />
    </div>
  );
}
