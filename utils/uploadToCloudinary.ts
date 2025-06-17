export const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "weddingress"); // ganti dengan upload preset kamu
  formData.append("cloud_name", "weddingres"); // ganti dengan cloud name kamu

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/weddingres/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();
  return data.secure_url; // ini yang akan disimpan ke DB
};
