// import React, { useState, useMemo, useEffect } from "react";
// import DataTable from "react-data-table-component";
// import { FiCalendar, FiClock, FiEye, FiInfo, FiWatch } from "react-icons/fi";
// import {
//   FaCalendarAlt,
//   FaClock,
//   FaMapMarkerAlt,
//   FaRegEdit,
// } from "react-icons/fa";
// import { Trash2, Upload } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useNavigate } from "react-router-dom";
// import { Switch } from "@/components/ui/switch";
// import toast from "react-hot-toast";
// import axios from "axios";

// import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
// import { ColorRing } from "react-loader-spinner";
// import AddDoctor from "./AddDoctor";
// import { formatDate, formatDateTime, formatTime } from "@/utils/dateFormater";

// const StatusBadge = ({ status }) => {
//   const statusClasses = {
//     Pending: "text-yellow-800 bg-[#ffd08978]",
//     Completed: "text-green-900 bg-green-100",
//     Cancelled: "text-red-900 bg-red-100",
//   };

//   return (
//     <div
//       className={`flex items-center justify-center py-2 px-4 w-[130px] rounded-full ${
//         statusClasses[status] || ""
//       }`}
//     >
//       {status}
//     </div>
//   );
// };

// const FilterComponent = ({ filterText, onFilter, onClear }) => (
//   <div className="md:flex hidden gap-2 items-center">
//     <input
//       id="search"
//       type="text"
//       placeholder="Filter by docotr name"
//       aria-label="Search Input"
//       value={filterText}
//       onChange={onFilter}
//       className="p-2 border rounded-lg focus:outline-none focus:border-blue-800"
//     />
//   </div>
// );

// const convertArrayToCSV = (array) => {
//   const columnDelimiter = ",";
//   const lineDelimiter = "\n";
//   const keys = Object.keys(array[0]);

//   let csv = keys.join(columnDelimiter) + lineDelimiter;
//   array.forEach((item) => {
//     csv += keys.map((key) => item[key]).join(columnDelimiter) + lineDelimiter;
//   });

//   return csv;
// };

// const downloadCSV = (array) => {
//   const csv = convertArrayToCSV(array);
//   const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
//   const link = document.createElement("a");
//   const url = URL.createObjectURL(blob);
//   link.setAttribute("href", url);
//   link.setAttribute("download", "export.csv");
//   link.style.display = "none";
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// };


//   //handle get Event list
//   const handleGetDoctorList = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_API_URL}/doctors`,
//         // {
//         //   headers: {
//         //     Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//         //   },
//         // }
//       );

//       if (response?.status === 200) {
//         setDoctors(response?.data?.data || []);
//         console.log("doctors:", response?.data?.data);
//         const filteredItemsData = response?.data?.data?.filter((item) =>
//           item?.name?.toLowerCase()?.includes(filterText.toLowerCase())
//         );
//         setFilteredItems(filteredItemsData);
//         setLoading(false);
//       }
//     } catch (error) {
//       console.error("error while getting the Doctor list:", error);
//       toast.error(error?.response?.data?.message || "Failed to get Doctor List");
//     } finally {
//       setLoading(false);
//     }
//   };

//   //handle delete attendee
//   const handleDelete = async (id) => {
//     try {
//       const response = await axios.delete(
//         `${import.meta.env.VITE_API_URL}/doctors/${id}`,
//         // {
//         //   headers: {
//         //     Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//         //   },
//         // }
//       );
//       if (response?.status === 200) {
//         setDeleteLoading(false);
//         setDeleteId(null);
//         setReload(true);
//         handleGetEventList();
//         toast.success("Doctor deleted successfully");
//       }
//     } catch (error) {
//       console.error("error while deleting the Doctor:", error);
//       toast.error(error?.response?.data?.message || "Failed to delete Doctor");
//     }
//   };
//   const handleClear = () => {
//     if (filterText) {
//       setResetPaginationToggle(!resetPaginationToggle);
//       setFilterText("");
//     }
//   };
//   const subHeaderComponent = useMemo(
//     () => (
//       <div className="flex justify-between w-full mb-5">
//         <FilterComponent
//           filterText={filterText}
//           onFilter={(e) => setFilterText(e.target.value)}
//           onClear={handleClear}
//         />

//         <div className="flex gap-[10px]">
//           <button
//             onClick={() => downloadCSV(events)}
//             className="text-base flex items-center px-6 py-2 gap-[5px] border border-blue-600 text-gray-600 rounded-lg"
//           >
//             <Upload className="text-gray-600 " size={20} />
//             <p>Export</p>
//           </button>
//           <Dialog
//             open={openModal}
//             onOpenChange={setOpenModal}
//             className="h-[650px] overflow-y-scroll"
//             style={{ scrollbarWidth: "none" }}
//           >
//             <DialogTrigger asChild>
//               <button className=" h-full bg-blue-800 text-white rounded-xl px-6 hover:bg-transparent hover:border hover:border-blue-800 hover:text-blue-800">
//                 + Add
//               </button>
//             </DialogTrigger>
//             <DialogContent className="p-6 bg-white shadow-lg rounded-lg max-w-md">
//               <AddEvent
//                 reload={reload}
//                 setReload={setReload}
//                 openModal={openModal}
//                 setOpenModal={setOpenModal}
//                 data={rowData}
//               />
//             </DialogContent>
//           </Dialog>
//         </div>
//       </div>
//     ),
//     [filterText, resetPaginationToggle, openModal]
//   );
//   const ActionButtons = ({ data }) => {
//     const navigate = useNavigate();
//     return (
//       <div className="flex gap-2 items-center py-3">
//         <Dialog>
//           <DialogTrigger>
//             <div className="cursor-pointer p-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full shadow-md hover:shadow-lg transition">
//               <FiEye size={20} />
//             </div>
//           </DialogTrigger>
//           <DialogContent className="p-8 bg-gradient-to-b from-white to-gray-50 shadow-xl rounded-2xl max-w-lg">
//             {/* Header */}
//             <div className="text-center mb-6">
//               <h2 className="text-2xl font-bold text-gray-800">
//                 Doctor Details
//               </h2>
//               <p className="text-sm text-gray-500">
//                 View all the information about Doctor
//               </p>
//             </div>

//             {/* Event Information */}
//             <div className="space-y-6">
//               {/* Name */}
//               <div className="flex items-center">
//                 <span className="p-2 bg-blue-100 rounded-full text-blue-600">
//                   <FiCalendar size={20} />
//                 </span>
//                 <div className="ml-4">
//                   <p className="text-sm text-gray-500 font-medium">Name</p>
//                   <p className="text-lg font-semibold text-gray-800">
//                     {data?.name}
//                   </p>
//                 </div>
//               </div>

//               {/* Description */}
//               <div className="flex items-center">
//                 <span className="p-2 bg-green-100 rounded-full text-green-600">
//                   <FiInfo size={20} />
//                 </span>
//                 <div className="ml-4">
//                   <p className="text-sm text-gray-500 font-medium">
//                     Experience
//                   </p>
//                   <p className="text-gray-700">{data?.experience}</p>
//                 </div>
//               </div>


//               <div className="flex items-center">
//                 <span className="p-2 bg-green-100 rounded-full text-green-600">
//                   <FiInfo size={20} />
//                 </span>
//                 <div className="ml-4">
//                   <p className="text-sm text-gray-500 font-medium">
//                     Licence
//                   </p>
//                   <p className="text-gray-700">{data?.licence}</p>
//                 </div>
//               </div>


//               <div className="flex items-center">
//                 <span className="p-2 bg-green-100 rounded-full text-green-600">
//                   <FiInfo size={20} />
//                 </span>
//                 <div className="ml-4">
//                   <p className="text-sm text-gray-500 font-medium">
//                     Specialization
//                   </p>
//                   <p className="text-gray-700">{data?.specialization}</p>
//                 </div>
//               </div>

              

              

//               {/* Attendees */}
              
//             </div>
//           </DialogContent>
//         </Dialog>

//         {/* Edit Button */}
//         <div
//           onClick={() => {
//             setOpenModal(!openModal);
//             setRowData(data);
//           }}
//           className="cursor-pointer p-3 bg-gradient-to-r from-green-100 to-green-200 text-green-700 rounded-full shadow-md hover:shadow-lg transition duration-200"
//         >
//           <FaRegEdit size={20} />
//         </div>

//         {/* Delete Button */}
//         {deleteLoading && deleteId === data?._id ? (
//           <button>
//             <ColorRing
//               visible={true}
//               height="30"
//               width="30"
//               ariaLabel="color-ring-loading"
//               wrapperStyle={{}}
//               wrapperClass="color-ring-wrapper"
//               colors={["#16a34a", "#22c55e", "#16a34a", "#22c55e", "#16a34a"]}
//             />
//           </button>
//         ) : (
//           <div
//             onClick={() => {
//               setDeleteId(data?._id);
//               handleDelete(data?._id);
//             }}
//             className="cursor-pointer p-3 bg-gradient-to-r from-red-100 to-red-200 text-red-700 rounded-full shadow-md hover:shadow-lg transition duration-200"
//           >
//             <Trash2 size={20} />
//           </div>
//         )}
//       </div>
//     );
//   };
//   const columns = [
//     {
//       name: "Doctor Name",
//       sortable: true,
//       selector: (row) => row.name,
//       cell: (row) => (
//         <p className="text-blue-600 font-semibold">
//           {row?.name || <span className="text-gray-400 italic">No Name</span>}
//         </p>
//       ),
//     },
//     {
//       name: "Experience",
//       sortable: true,
//       selector: (row) => row?.experience,
//       cell: (row) => (
//         <p className="text-gray-700">
//           {row?.experience || (
//             <span className="text-gray-400 italic">No Experience</span>
//           )}
//         </p>
//       ),
//     },
//     {
//       name: "licence",
//       sortable: true,
//       selector: (row) => row?.licence,
//       cell: (row) => (
//         <p className="text-green-600 flex items-center gap-2">
//           <FaMapMarkerAlt size={14} />
//           {row?.licence || (
//             <span className="text-gray-400 italic">No Licence</span>
//           )}
//         </p>
//       ),
//     },

//     {
//       name: "specialization",
//       sortable: true,
//       selector: (row) => row?.specialization,
//       cell: (row) => (
//         <p className="text-green-600 flex items-center gap-2">
//           <FaMapMarkerAlt size={14} />
//           {row?.specialization || (
//             <span className="text-gray-400 italic">No Specialization</span>
//           )}
//         </p>
//       ),
//     },

    
    
//     {
//       name: "Action",
//       cell: (row) => <ActionButtons data={row} />,
//     },
//   ];

  
// };

// export default AttendantList;


import React, { useState, useMemo, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FiCalendar, FiEye, FiInfo } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";
import { Trash2, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { ColorRing } from "react-loader-spinner";
import AddDoctor from "./AddDoctor";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [reload, setReload] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    handleGetDoctorList();
  }, [reload]);

  // Fetch doctors
  const handleGetDoctorList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/doctors`);
      if (response?.status === 200) {
        setDoctors(response?.data?.data || []);
        setFilteredItems(response?.data?.data);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to get Doctor List");
    } finally {
      setLoading(false);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    setDeleteLoading(true);
    setDeleteId(id);
    try {
        const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/doctors/${id}`);
        if (response?.status === 200) {
            setReload(!reload);
            toast.success("Doctor deleted successfully");
        }
    } catch (error) {
        console.error("Error deleting doctor:", error);
        toast.error(error?.response?.data?.message || "Failed to delete Doctor");
    } finally {
        setDeleteLoading(false);
        setDeleteId(null);
    }
};

  const handleClear = () => {
    if (filterText) {
      setResetPaginationToggle(!resetPaginationToggle);
      setFilterText("");
    }
  };

  const subHeaderComponent = useMemo(() => (
    <div className="flex justify-between w-full mb-5">
      <input
        type="text"
        placeholder="Filter by doctor name"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        className="p-2 border rounded-lg focus:outline-none focus:border-blue-800"
      />
      <div className="flex gap-2">
        {/* <button
          onClick={() => console.log("Export CSV")}
          className="text-base flex items-center px-6 py-2 gap-2 border border-blue-600 text-gray-600 rounded-lg"
        >
          <Upload className="text-gray-600" size={20} />
          <p>Export</p>
        </button> */}
        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogTrigger asChild>
            <button className="h-full bg-blue-800 text-white rounded-xl px-6 hover:bg-transparent hover:border hover:border-blue-800 hover:text-blue-800">
              + Add
            </button>
          </DialogTrigger>
          <DialogContent className="p-6 bg-white shadow-lg rounded-lg max-w-md">
            <AddDoctor reload={reload} setReload={setReload} openModal={openModal} setOpenModal={setOpenModal} data={rowData} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  ), [filterText, resetPaginationToggle, openModal]);

  const ActionButtons = ({ data }) => {
    return (
      <div className="flex gap-2 items-center py-3">
        <Dialog>
          <DialogTrigger>
            <div className="cursor-pointer p-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full shadow-md hover:shadow-lg transition">
              <FiEye size={20} />
            </div>
          </DialogTrigger>
          <DialogContent className="p-8 bg-gradient-to-b from-white to-gray-50 shadow-xl rounded-2xl max-w-lg">
            <h2 className="text-2xl font-bold text-gray-800">Doctor Details</h2>
            <p className="text-sm text-gray-500">View all information about the doctor</p>
            <div className="space-y-4 mt-4">
              <p><strong>Name:</strong> {data?.name}</p>
              <p><strong>Experience:</strong> {data?.experience}</p>
              <p><strong>Licence:</strong> {data?.licence}</p>
              <p><strong>Specialization:</strong> {data?.specialization}</p>
            </div>
          </DialogContent>
        </Dialog>

        <div
          onClick={() => {
            setOpenModal(true);
            setRowData(data);
          }}
          className="cursor-pointer p-3 bg-gradient-to-r from-green-100 to-green-200 text-green-700 rounded-full shadow-md hover:shadow-lg transition duration-200"
        >
          <FaRegEdit size={20} />
        </div>

        {deleteLoading && deleteId === data?._id ? (
          <ColorRing visible height="30" width="30" ariaLabel="loading" colors={["#16a34a", "#22c55e", "#16a34a", "#22c55e", "#16a34a"]} />
        ) : (
          <div
            onClick={() => handleDelete(data?._id)}
            className="cursor-pointer p-3 bg-gradient-to-r from-red-100 to-red-200 text-red-700 rounded-full shadow-md hover:shadow-lg transition duration-200"
          >
            <Trash2 size={20} />
          </div>
        )}
      </div>
    );
  };

  const columns = [
    { name: "Doctor Name", selector: (row) => row.name, sortable: true },
    { name: "Experience", selector: (row) => row.experience, sortable: true },
    { name: "Licence", selector: (row) => row.licence, sortable: true },
    { name: "Specialization", selector: (row) => row.specialization, sortable: true },
    { name: "Action", cell: (row) => <ActionButtons data={row} /> },
  ];

  return (
    <div>
      <DataTable
        title="Doctors List"
        columns={columns}
        data={filteredItems}
        pagination
        subHeader
        subHeaderComponent={subHeaderComponent}
        progressPending={loading}
      />
    </div>
  );
};

export default DoctorList;
