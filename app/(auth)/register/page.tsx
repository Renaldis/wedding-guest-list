

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center py-8 bg-gray-100 min-h-screen">
      <div className="mb-8">
        {/* <img src={logo} alt="Workify logo" className="inline-block w-20" /> */}
        <span className="text-2xl font-semibold text-gray-800 ml-2">
          SiniLoker.id
        </span>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-lg w-[80%] md:w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6">Registrasi Akun</h2>
        <form>
          <div className="name mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Nama :
            </label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg bg-blue-100"
              name="name"
              placeholder="Nama Lengkap"
            />
          </div>
          <div className="image_url mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="image_url">
              Profile Picture URL :
            </label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg bg-blue-100"
              name="image_url"
              placeholder="URL Link Gambar"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className="w-full p-3 border rounded-lg bg-blue-100"
              name="email"
              placeholder="name@email.com"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              className="w-full p-3 border rounded-lg bg-blue-100"
              name="password"
              placeholder="********"
              min="8"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold"
          >
            Daftar Sekarang
          </button>
        </form>
        <p className="text-center text-gray-500 mt-6">
          Sudah punya akun?
          <span
            className="text-blue-600 ml-1 hover:border-b-2 hover:border-blue-600 cursor-pointer"
            // onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
