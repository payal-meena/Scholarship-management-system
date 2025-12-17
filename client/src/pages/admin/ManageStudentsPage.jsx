import React, { useState, useEffect } from "react";
import { Search, ArrowLeft } from "lucide-react"; // Added ArrowLeft
import axios from "axios";
import { toast } from "react-toastify";
import { PlusCircle, Upload, Edit, Trash2, Eye } from "lucide-react";
import BulkUploadModal from "./BulkUploadModal";
import CustomDropdown from "../CustomDropdown";
import ViewStudentModal from "./ViewStudentModal";
import EditStudentModal from "./EditStudentModal";

// const getStatusClasses = (status) => {
//   switch (status) {
//     case "Application Complete":
//       return "bg-green-100 text-green-700";
//     case "Reverted for Correction":
//       return "bg-yellow-100 text-yellow-700";
//     case "Documents Missing":
//       return "bg-red-100 text-red-700";
//     case "Not Started":
//       return "bg-gray-200 text-gray-700";
//     default:
//       return "bg-violet-200 text-violet-700";
//   }
// };

const ManageStudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [yearFilter, setYearFilter] = useState("All");

  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [refreshToggle, setRefreshToggle] = useState(false);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchAllStudents = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) throw new Error("Admin authentication required.");

        const queryParams = new URLSearchParams({
          year: yearFilter,
          status: statusFilter,
        }).toString();

        const url = `http://localhost:4000/api/admin/students?${queryParams}`;

        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching student list:", error);
        toast.error(
          error.response?.data?.message || "Failed to load student records."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchAllStudents();
  }, [statusFilter, yearFilter, refreshToggle]);

  const filteredStudents = students.filter((student) => {
    const name = student.name || "";
    const id = student.email || "";
    const matchesSearch =
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      id.includes(searchTerm);
    const matchesStatus =
      statusFilter === "All" || student.applicationStatus === statusFilter;
    const matchesYear =
      yearFilter === "All" || student.currentStudyYear === yearFilter;
    return matchesSearch && matchesStatus && matchesYear;
  });

  const handleBulkUploadSuccess = () => {
    setIsBulkModalOpen(false);
    setRefreshToggle((prev) => !prev);
    toast.success("Records updated! Refreshing list...");
  };

  const handleAddStudent = () => {
    alert("Open modal to Add New Student");
  };

  const handleViewDetails = (student) => {
    setSelectedStudent(student);
    setIsViewModalOpen(true);
  };

  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    setIsEditModalOpen(true);
  };

  const handleEditSuccess = () => {
    setIsEditModalOpen(false);
    setSelectedStudent(null);
    setRefreshToggle(prev => !prev);
    toast.success("Student record updated!");
  }
  const handleDeleteStudent = async (studentId, studentName) => {
    if (!window.confirm(`Are you sure you want to permanently delete the record for ${studentName}? This action cannot be undone.`)) {
        return;
    }

    try {
        const token = localStorage.getItem('adminToken');
        if (!token) throw new Error('Admin authentication required.');

        await axios.delete(`http://localhost:4000/api/admin/students/${studentId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        toast.success(`Student ${studentName} deleted successfully.`);
        setRefreshToggle(prev => !prev); 

    } catch (error) {
        console.error("Error deleting student:", error);
        toast.error(error.response?.data?.message || "Failed to delete student record.");
    }
};

  if (loading)
    return <div className="p-8 text-center">Loading student records...</div>;

  return (
    <div className="p-6 bg-indigo-100 min-h-screen">

      {isBulkModalOpen ? (
        <div className="mx-auto animate-in fade-in slide-in-from-right duration-300">
          <button
            onClick={() => setIsBulkModalOpen(false)}
            className="mb-4 flex items-center text-indigo-700 hover:text-indigo-900 font-bold transition"
          >
            <ArrowLeft className="w-5 h-5 mr-2" /> Back to Student List
          </button>

          <BulkUploadModal
            onClose={() => setIsBulkModalOpen(false)}
            onUploadSuccess={handleBulkUploadSuccess}
          />
        </div>
      ) : isViewModalOpen && selectedStudent ? (
        <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-right duration-300">
             <button
                onClick={() => {
                    setIsViewModalOpen(false);
                    setSelectedStudent(null);
                }}
                className="mb-4 flex items-center text-indigo-700 hover:text-indigo-900 font-bold transition"
            >
                <ArrowLeft className="w-5 h-5 mr-2" /> Back to Student List
            </button>
            <ViewStudentModal 
                student={selectedStudent}
                onClose={() => setIsViewModalOpen(false)}
            />
        </div>

      /* 3. EDIT STUDENT VIEW */
      ) : isEditModalOpen && selectedStudent ? (
        <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-right duration-300">
             <button
                onClick={() => {
                    setIsEditModalOpen(false);
                    setSelectedStudent(null);
                }}
                className="mb-4 flex items-center text-indigo-700 hover:text-indigo-900 font-bold transition"
            >
                <ArrowLeft className="w-5 h-5 mr-2" /> Back to Student List
            </button>
            <EditStudentModal 
                student={selectedStudent}
                onClose={() => setIsEditModalOpen(false)}
                onSaveSuccess={handleEditSuccess}
            />
        </div>

      ) : (
        <div className="animate-in fade-in duration-500 rounded-xl shadow-2xl bg-indigo-100 p-6 border border-indigo-200">
          <h1 className="text-3xl font-extrabold text-indigo-900 mb-6 border-b pb-2 flex items-center">
            📑 All Student Records
          </h1>

          <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-3">
              <button
                onClick={handleAddStudent}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 flex items-center space-x-2 rounded-lg shadow hover:opacity-90 transition transform active:scale-95"
              >
                <PlusCircle className="w-5 h-5" />{" "}
                <span>Add Single Student</span>
              </button>

              <button
                onClick={() => setIsBulkModalOpen(true)}
                className="bg-white text-purple-600 border border-purple-600 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-purple-600 hover:text-white transition duration-300"
              >
                <Upload className="w-5 h-5" /> <span>Upload (CSV)</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-400" />
              <input
                type="text"
                placeholder="Search by Student Name or Id"
                className="w-full pl-10 pr-4 py-2 border border-indigo-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-indigo-50 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-64">
              <CustomDropdown
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                options={[
                  "All",
                  "Application Complete",
                  "Documents Missing",
                  "Not Started",
                  "Reverted for Correction",
                ]}
              />
            </div>
            <div className="w-64">
              <CustomDropdown
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                options={[
                  "All",
                  "1st Year",
                  "2nd Year",
                  "3rd Year",
                  "4th Year",
                ]}
              />
            </div>
          </div>
          <div className="overflow-x-auto bg-indigo-50 rounded-lg border border-indigo-300">
            <table className="min-w-full divide-y divide-indigo-200">
              <thead className="bg-indigo-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Student Name & ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Current Year
                  </th>
                  {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Status
                  </th> */}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Contact No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-indigo-50 divide-y divide-indigo-200">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <tr key={student.collegeId}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-900">
                        {student.name || "N/A"} <br />
                        <span className="text-indigo-500 text-xs">
                          {student.email || "N/A"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-700 font-semibold">
                        {student.course || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-700 font-semibold">
                        {student.currentStudyYear || "N/A"}
                      </td>
                      {/* <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(
                            student.applicationStatus
                          )}`}
                        >
                          {student.applicationStatus || "N/A"}
                        </span>
                      </td> */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-700 font-semibold">
                        {student.contactNo || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-1">
                        <button
                          className="text-indigo-600 hover:text-indigo-900 p-1 rounded-md transition duration-150"
                          onClick={() => handleEditStudent(student)}
                          title="Edit Record"
                        >
                          <Edit className="w-4 h-4 inline" />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900 p-1 rounded-md transition duration-150"
                          onClick={() =>
                            handleDeleteStudent(student.id, student.name)
                          }
                        >
                          <Trash2 className="w-4 h-4 inline" />
                        </button>
                        <button
                          className="text-gray-600 hover:text-gray-900 p-1 rounded-md transition duration-150"
                          onClick={() => handleViewDetails(student)}
                        >
                          <Eye className="w-4 h-4 inline" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      No student records found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
     
    </div>
  );
};

export default ManageStudentsPage;
