




import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { ColorRing } from "react-loader-spinner";

const Doctor = ({ data, reload, setReload, openModal, setOpenModal }) => {
  const [formData, setFormData] = useState({
    name: data?.username || "",
    email: data?.email || "",
    phone: data?.phone || "",
    gender: data?.gender || "",
    hospital: data?.hospital || "",
    mbbsCollege: data?.mbbsCollege || "",
    specialization: data?.specialization || "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.gender || !formData.hospital || !formData.mbbsCollege || !formData.specialization) {
      setError("All fields are required!");
      return;
    }

    setError("");
    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/doctor`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
      });
      
      if (response?.status === 201) {
        toast.success("Doctor added successfully!");
        setFormData({ name: "", email: "", phone: "", gender: "", hospital: "", mbbsCollege: "", specialization: "" });
        setReload(!reload);
        setOpenModal(!openModal);
      }
    } catch (error) {
      console.error("Error while adding doctor:", error);
      toast.error(error?.response?.data?.message || "Failed to add doctor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Add Doctor</h2>
      {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {[
          { label: "Name", name: "name", type: "text", placeholder: "Doctor's Name" },
          { label: "Email", name: "email", type: "email", placeholder: "Doctor's Email" },
          { label: "Phone", name: "phone", type: "text", placeholder: "Doctor's Phone" },
          { label: "Gender", name: "gender", type: "text", placeholder: "Male / Female" },
          { label: "Current Hospital", name: "hospital", type: "text", placeholder: "Working Hospital" },
          { label: "MBBS College", name: "mbbsCollege", type: "text", placeholder: "MBBS College Name" },
          { label: "Specialization", name: "specialization", type: "text", placeholder: "Specialization" }
        ].map(({ label, name, type, placeholder }) => (
          <div key={name}>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
            <input
              type={type}
              id={name}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="mt-1 p-3 border w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder={placeholder}
            />
          </div>
        ))}
        <button type="submit" className={`mt-2 px-4 py-2 text-white rounded-lg ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-800 hover:bg-blue-700"}`} disabled={loading}>
          {loading ? <ColorRing visible={true} height="30" width="30" colors={["#fff", "#fff", "#fff", "#fff", "#fff"]} /> : "Add Doctor"}
        </button>
      </form>
    </div>
  );
};

export default Doctor;