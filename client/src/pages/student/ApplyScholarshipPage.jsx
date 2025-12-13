import React , {useState, useEffect} from "react";
import { toast } from "react-toastify";
import { User, BookOpen, DollarSign, UploadCloud, Send, X, CheckCircle, Clock } from "lucide-react";
import axios from "axios";

// const availableSchemes = [
//   { id: '654a8b79f3d9d3002f2329e1', name: "Central Sector 2025-26", deadline: "2025-10-31" },
//   { id: '690c55c7c8ce883efd58f499', name: "Post Metric Scholarship 2025-26", deadline: "2025-12-31" },
//   { id: '654a8b79f3d9d3002f2329e3', name: "Gav Ki Beti Scholarship 2025-26", deadline: "2026-01-31" },
// ];

const getCurrentAcademicYear = () => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  if (currentMonth >= 8) {
    return `${currentYear}-${currentYear + 1}`;
  } else {
    return `${currentYear - 1}-${currentYear}`;
  }
};

const FullApplicationForm = ({ scheme, onFormSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    gender: "",
    contactNo: "",
    fullAddress: "",
    samagraId: "",

    academicYear: getCurrentAcademicYear(),
    currentCourse: "",
    currentBranch: "",
    currentStudyYear: "1st Year",
    cgpa: "",
    ten_perc: "",
    twelve_perc: "",

    income: "",
    fatherOccupation: "",
    motherOccupation: "",

    photoFile: null,
    aadharFile: null,
    bankPassbookFile: null,
    casteCertificateFile: null,
    domicileCertificateFile: null,
    tenthMarksheetFile: null,
    twelveMarksheetFile: null,
    incomeCertificateFile: null,
    lastYearMarksheetFile: null,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "fullName",
      "dob",
      "contactNo",
      "currentCourse",
      "income",
      "ten_perc",
      "twelve_perc",
    ];
    const requiredFiles = [
      "photoFile",
      "aadharFile",
      "bankPassbookFile",
      "casteCertificateFile",
      "domicileCertificateFile",
      "tenthMarksheetFile",
      "twelveMarksheetFile",
      "incomeCertificateFile",
      "lastYearMarksheetFile",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(`please fill all required text fields. Missing: ${field}`);
        return;
      }
    }
    for (const file of requiredFiles) {
      if (!formData[file]) {
        toast.error("Please upload all required docuemnts (marked with *).");
        return;
      }
    }

    setIsLoading(true);
    
    const formPayload = new FormData();

    Object.keys(formData).forEach(key => {
      if(formData[key] !== null && formData[key] !== undefined) {
        formPayload.append(key, formData[key]);
      }
    });
    if(scheme && scheme._id) {
    formPayload.append("scheme", scheme._id);
    } else {
      toast.error("Scheme ID is missing. Please refresh and try again.");
      setIsLoading(false);
      return;
    }


    try{
      const token = localStorage.getItem('studentToken');
      const res = await axios.post("http://localhost:4000/api/students/apply", formPayload, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if(res.status === 201) {
        toast.success("Application submitted successfully! Status: Pending Review.");
        onFormSubmit(scheme.id, res.data.application);
      }
    } catch (error) {
      console.error("Application Submission Error:", error);
      toast.error(error.response?.data?.message || "Submission failed. Server error.");
    } finally {
      setIsLoading(false);
    }
  };
  const FileStatus = ({ file }) => (
    <span
      className={`text-xs font-semibod px-2 py-1 rounded-full ${
        file ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
      }`}
    >
      {file ? `Uploaded: ${file.name}` : `Required`}
    </span>
  );
  return (
    <div className="mx-auto bg-indigo-50 p-6 md:p-8 rounded-xl shadow-2xl relative">
      {onClose && (
        <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-900 bg=gray-100 hover:bg-gray-200 rounded-full transition-colors z-10"
        aria-label="Close Application Form"
        >
          <X className="w-6 h-6" />
        </button>
      )}
      <h1>Application for: {scheme.name}</h1>
      <p className="text-gray-600 mb-8">
        Deadline : {scheme.deadline.split("T")[0]}  |  Academic Year : {formData.academicYear}
      </p>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="border-1 border-indigo-900 p-6 rounded-lg bg-blue-100/50 hover:shadow-lg duration-300">
          <h2 className="text-xl font-bold text-indigo-950 mb-4 flex items-center space-x-2">
            <User className="w-5 h-5" />{" "}
            <span>Personal & Contact Information</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-gray-700">
                Full Name (As per 10th Marksheet) *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-blue-50 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date of Birth *
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-blue-50 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 ">
                Gender *
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-blue-50 focus:outline-none focus:border-indigo-500"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contact Number *
              </label>
              <input
                type="tel"
                name="contactNo"
                value={formData.contactNo}
                onChange={handleChange}
                required
                maxLength="10"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-blue-50 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Samagra ID
              </label>
              <input
                type="text"
                name="samagraId"
                value={formData.samagraId}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-blue-50 focus:outline-none focus:border-indigo-500 "
              />
            </div>
            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-gray-700">
                Full Permanent Address *
              </label>
              <textarea
                name="fullAddress"
                value={formData.fullAddress}
                onChange={handleChange}
                required
                rows="2"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-blue-50 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        <div className="border-1 border-violet-900 p-6 rounded-lg bg-violet-100/50 hover:shadow-lg duration-300">
            <h2 className="text-xl font-bold text-violet-900 mb-4 flex items-center space-x-2">
              <BookOpen className="w-5 h-5" /> <span>Academic History & Current Status</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">10th Percentage *</label>
                    <input type="number" name="ten_perc" value={formData.ten_perc} onChange={handleChange} required step="0.01" max="100" 
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-violet-50 focus:outline-none focus:border-violet-500"/>
                </div>
                <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">12th percentage *</label>
                    <input type="number" name="twelve_perc" value={formData.twelve_perc} onChange={handleChange} required step="0.01" max="100"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-violet-50 focus:outline-none focus:border-violet-500"/>
                </div>
                <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-medium text-gray-700">Current Year of Study *</label>
                      <select name="currentStudyYear" value={formData.currentStudyYear} onChange={handleChange} 
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-violet-50 focus:outline-none focus:border-violet-500" >
                          <option value="1st Year">1st Year</option>
                          <option value="2nd Year">2nd Year</option>
                          <option value="3rd Year">3rd Year</option>
                          <option value="4th Year">4th Year</option>
                      </select>
                </div>
                <div className="col-span-2 sm:col-span-1">
                          <label className="block text-sm font-medium text-gray-700">CGPA (Last Exam) *</label>
                          <input type="number" name="cgpa" value={formData.cgpa} onChange={handleChange} required step="0.01" 
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-violet-50 focus:outline-none focus:border-violet-500" />
                </div>
                <div className="col-span-2">
                          <label className="block text-sm font-medium text-gray-700">Course Name *</label>
                          <input type="text" name="currentCourse" value={formData.currentCourse} onChange={handleChange} required
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-violet-50 focus:outline-none focus:border-violet-500" />
                </div>
                <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Branch / Specialization *</label>
                        <input type="text" name="currentBranch" value={formData.currentBranch} onChange={handleChange} required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-violet-50 focus:outline-none focus:border-violet-500" />
                </div>
            </div>
        </div>

        <div className="border-1 border-green-900 p-6 rounded-lg bg-green-100/50 hover:shadow-lg duration-300">
            <h2 className="text-xl font-bold text-green-800 mb-4 flex items-center space-x-2">
                <DollarSign className="w-5 h-5" /> <span>Financial Information</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Annual Family Income(₹) *</label>
                  <input type="number" name="income" value={formData.income} onChange={handleChange} required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-green-50 focus:outline-none focus:border-green-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Father's Occupation</label>
                  <input type="text" name="fatherOccupation" value={formData.fatherOccupation} onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-green-50 focus:outline-none focus:border-green-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Mother's Occupation</label>
                  <input type="text" name="motherOccupation" value={formData.motherOccupation} onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-green-50 focus:outline-none focus:border-green-500" />
                </div>
            </div>
        </div>

        <div className="border-1 border-red-900 p-6 rounded-lg bg-red-100/50 hover:shadow-lg duration-300">
          <h2 className="text-xl font-bold text-red-800 mb-4 flex items-center space-x-2">
              <UploadCloud className="w-5 h-5"/> <span>Mandatory Document Uploads (PDF/JPG, Max 5MB)</span>
          </h2>
          
          <div className="space-y-4">
                {[
                  { label: "Passport Size Photo (JPG/PNG only) *", name: "photoFile", accept: ".jpg,.jpeg,.png" },
                  { label: "Aadhaar Card *", name: "aadharFile", accept: ".pdf" },
                  { label: "Bank Passbook (First Page) *", name: "bankPassbookFile", accept: ".pdf" },
                  { label: "Latest Annual Income Proof *", name: "incomeCertificateFile", accept: ".pdf" },
              ].map((item) => (
                  <div key={item.name} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 border rounded-md bg-red-50">
                      <label className="text-sm font-medium text-gray-700">{item.label}</label>
                      <input type="file" name={item.name} accept={item.accept} onChange={handleFileChange} required
                          className="mt-1 sm:mt-0 text-sm text-gray-600 file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 " />
                      <FileStatus file={formData[item.name]} />
                  </div>
              ))}
              
              {[
                  { label: "Caste Certificate *", name: "casteCertificateFile", accept: ".pdf" },
                  { label: "Domicile Certificate (Niwasi Praman Patra) *", name: "domicileCertificateFile", accept: ".pdf" },
              ].map((item) => (
                  <div key={item.name} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 border rounded-md bg-red-50">
                      <label className="text-sm font-medium text-gray-700">{item.label}</label>
                      <input type="file" name={item.name} accept={item.accept} onChange={handleFileChange} required
                          className="mt-1 sm:mt-0 text-sm text-gray-600 file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
                      <FileStatus file={formData[item.name]} />
                  </div>
              ))}

              {[
                  { label: "10th Marksheet *", name: "tenthMarksheetFile", accept: ".pdf" },
                  { label: "12th Marksheet *", name: "twelveMarksheetFile", accept: ".pdf" },
                  { label: "Last Year's Marksheet (Current Course) *", name: "lastYearMarksheetFile", accept: ".pdf" },
              ].map((item) => (
                  <div key={item.name} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 border rounded-md bg-red-50">
                      <label className="text-sm font-medium text-gray-700">{item.label}</label>
                      <input type="file" name={item.name} accept={item.accept} onChange={handleFileChange} required
                          className="mt-1 sm:mt-0 text-sm text-gray-600 file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
                      <FileStatus file={formData[item.name]} />
                  </div>
              ))}
          </div>
      </div>

      <button type="submit" disabled={isLoading}
          className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white 
                           py-3 rounded-xl font-semibold shadow-lg 
                           hover:from-violet-700 hover:to-indigo-700 transition transform hover:scale-[1.01] transition flex items-center justify-center space-x-2 disabled:bg-violet-400">
          <Send className="w-5 h-5 mr-1"/> 
          {isLoading ? 'Submitting Application...' : 'Submit Final Application'}
      </button>
      </form>
    </div>
  );
};

export const getDeadlineStatus = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);

    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if(diffDays > 7) {
      return {
        text: `Open - ${diffDays} days left`,
        classes: `text-green-700 border-green-500`,
        icon: CheckCircle
      };
    } else if (diffDays >= 1) {
      return {
        text: `Closing Soon - ${diffDays} days left!`,
        classes: `text-yellow-800 border-yellow-500`,
        icon: Clock
      };
    } else {
      return {
        text: 'Closed',
        classes: `text-red-700 border-red-500`
      }
    }
};
const ApplyScholarshipPage = () => {
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [availableSchemes, setAvailableSchemes] = useState([]);
  const [loading,setLoading] = useState(true);

   useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/admin/public/schemes');
        setAvailableSchemes(response.data);        
      } catch (error) {
        toast.error("Failed to load available schems from server.");
      } finally {
        setLoading(false);
      }
    };
    fetchSchemes();
  }, []);

  const handleFormSubmit = (schemeId, data) => {
    toast.success(`Application for Scheme ID ${schemeId} submitted successfully!`);
    console.log("Final Submission Date:", data);
    setSelectedScheme(null);
  };

  const handleFormClose = () => {
    setSelectedScheme(null);
  }
  if (selectedScheme) {
    return <FullApplicationForm 
    scheme={selectedScheme}
    onFormSubmit={handleFormSubmit}
    onClose={handleFormClose} />;
  };

  if(loading) {
    return <div className="p-8 text-center">Loading available schemes...</div>;
  }

  return (
    <div className="bg-indigo-100 p-6 rounded-lg shadow-2xl mx-auto">
      <h2 className="text-3xl font-extrabold text-indigo-900 mb-6 border-b-2 border-indigo-900 pb-3">
        📚 Available Scholarships
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {availableSchemes.map((scheme) => {
          const status = getDeadlineStatus(scheme.deadline);
          const StatusIcon = status.icon; 

          return (
            <div
              key={scheme._id}
              className="bg-indigo-50 rounded-2xl border-t-4 border-indigo-900 shadow-lg p-6 
                         hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 transform" 
            >
                <div className="flex items-start justify-between">
                <h3 className="text-xl font-bold text-gray-900 pr-2">{scheme.name}</h3>
                <div
                  className={`flex items-center text-xs font-semibold px-3 py-1 rounded-full space-x-1 whitespace-nowrap ${status.classes}`}
                >
                  {StatusIcon && <StatusIcon className="w-4 h-4" />}
                  <span>{status.text}</span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100">
                <p className="text-sm text-gray-600 font-medium">
                  <span className="inline-block mr-1">🗓️</span> Application Deadline:
                </p>
                <p className="text-gray-800 font-semibold text-lg">
                  {new Date(scheme.deadline).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100">
                <p className="text-sm text-gray-600 font-medium">
                  <span className="inline-block mr-1">💰</span> Fund Amount:
                </p>
                <p className="text-indigo-700 font-semibold text-lg">
                  ₹{scheme.fundAmount}
                </p>
              </div>
              <button
                onClick={() => setSelectedScheme(scheme)}
                className="mt-6 w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white 
                           py-3 rounded-xl font-semibold shadow-lg 
                           hover:from-violet-700 hover:to-indigo-700 transition transform hover:scale-[1.01]" 
              >
                Start Application
              </button>
            </div>
          );
})}
    </div>
    
      {availableSchemes.length === 0 && (
        <p className="text-gray-500 italic">No scholarship schemes are curently open for applications.</p>
      )} 
    </div>
  );
};


export default ApplyScholarshipPage;
