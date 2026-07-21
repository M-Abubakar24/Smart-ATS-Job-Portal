import { useEffect, useState } from "react";
import { getProfile, uploadResume } from "../services/authService";

const Profile = () => {
const [user, setUser] = useState(null);
const [resume, setResume] = useState(null);
const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await getProfile();
      setUser(data.user);
    } catch (error) {
      console.log(error);
    }
  };
const handleUpload = async () => {
  if (!resume) {
    alert("Please select a PDF file.");
    return;
  }

  try {
    setUploading(true);

    await uploadResume(resume);

    alert("Resume uploaded successfully!");

    fetchProfile();
  } catch (error) {
    alert(error.response?.data?.message || "Upload failed");
  } finally {
    setUploading(false);
  }
};
  if (!user) {
    return (
      <div className="text-center mt-20 text-xl">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-8">

        <h1 className="text-3xl font-bold mb-8">
          My Profile
        </h1>

        <div className="space-y-5">

          <div>
            <span className="font-semibold">Name:</span>{" "}
            {user.fullName}
          </div>

          <div>
            <span className="font-semibold">Email:</span>{" "}
            {user.email}
          </div>

          <div>
            <span className="font-semibold">Role:</span>{" "}
            {user.role}
          </div>

          <div>
            <span className="font-semibold">Phone:</span>{" "}
            {user.phone || "Not Added"}
          </div>

          <div>
            <span className="font-semibold">Location:</span>{" "}
            {user.location || "Not Added"}
          </div>

        </div>
<div className="mt-8 border-t pt-6">

  <h2 className="text-2xl font-bold mb-4">
    Resume
  </h2>

  {user.resume && (
    <a
      href={user.resume}
      target="_blank"
      rel="noreferrer"
      className="text-indigo-600 underline block mb-4"
    >
      View Current Resume
    </a>
  )}

  <input
    type="file"
    accept=".pdf"
    onChange={(e) => setResume(e.target.files[0])}
  />

  <button
    onClick={handleUpload}
    className="mt-4 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
    disabled={uploading}
  >
    {uploading ? "Uploading..." : "Upload Resume"}
  </button>

</div>
      </div>
    </div>
    
  );
};

export default Profile;