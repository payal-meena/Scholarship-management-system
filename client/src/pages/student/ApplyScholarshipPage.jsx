import React , {useState} from "react";
import { toast } from "react-toastify";
import { User, BookOpen, DollarSign, UploadCloud, Send } from "lucide-react";

const availableSchemes = [
  { id: 1, name: "Central Sector 2025-26", deadline: "2025-10-31" },
  { id: 2, name: "Post Metric Scholarship 2025-26", deadline: "2025-12-31" },
  { id: 3, name: "Gav Ki Beti Scholarship 2025-26", deadline: "2026-01-31" },
];

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

const FullApplicationForm = ({ scheme, onFormSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    gender: "Male",
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
    formPayload.append("schemeId", scheme.id);

    try{
      const token = localStorage.getItem('studentToken');
      const res = await Axis3DIcon.post("http://localhost:4000/api/students/apply", formPayload, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if(res.status === 201) {
        onFormSubmit(scheme.id, res.data.application);
      }
    } catch (error) {
      console.error("Application Submission Error:", error);
      toast.error(error.response?.data?.message || "Submission failed. Server error.");
    } finally {
      setIsLoading(false);
    }

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
    <div className="max-w-5xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow-2xl">
      <h1>Application for: {scheme.name}</h1>
      <p className="text-gray-600 mb-8">
        Deadline: **{scheme.deadline}** | Academic Year: **
        {formData.academicYear}**
      </p>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="border p-6 rounded-lg bg-gray-50">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
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
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
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
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
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
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
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
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
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
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
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
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
          </div>
        </div>

        <div className="border p-6 rounded-lg bg-indigo-50/50">
            <h2 className="text-xl font-bold text-indigo-800 mb-4 flex items-center space-x-2">
              <BookOpen className="w-5 h-5" /> <span>Academic History & Current Status</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">10th Percentage *</label>
                    <input type="number" name="ten_perc" value={formData.ten_perc} onChange={handleChange} required step="0.01" max="100" 
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"/>
                </div>
                <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">12th percentage *</label>
                    <input type="number" name="twelve_perc" value={formData.twelve_perc} onChange={handleChange} rquired step="0.01" max="100"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"/>
                </div>
                <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-medium text-gray-700">Current Year of Study *</label>
                      <select name="currentStudyYear" value={formData.currentStudyYear} onChange={handleChange} 
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" >
                          <option value="1st Year">1st Year</option>
                          <option value="2nd Year">2nd Year</option>
                          <option value="3rd Year">3rd Year</option>
                          <option value="4th Year">4th Year</option>
                      </select>
                </div>
                <div className="col-span-2 sm:col-span-1">
                          <label className="block text-sm font-medium text-gray-700">CGPA (Last Exam) *</label>
                          <input type="number" name="cgpa" value={formData.cgpa} onChange={handleChange} required step="0.01" 
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                </div>
                <div className="col-span-2">
                          <label className="block text-sm font-medium text-gray-700">Course Name *</label>
                          <input type="text" name="currentCourse" value={formData.currentCourse} onChange={handleChange} required
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                </div>
                <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Branch / Specialization *</label>
                        <input type="text" name="currentBranch" value={formData.currentBranch} onChange={handleChange} required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                </div>
            </div>
        </div>

        <div className="border p-6 rounded-lg bg-green-50/50">
            <h2 className="text-xl font-bold text-green-800 mb-4 flex items-center space-x-2">
                <DollarSign className="w-5 h-5" /> <span>Financial Information</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Annual Family Income(₹) *</label>
                  <input type="number" name="income" value={formData.income} onChange={handleChange} required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Father's Occupation</label>
                  <input type="text" name="fatherOccupation" value={formData.fatherOccupation} onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Mother's Occupation</label>
                  <input type="text" name="motherOccupation" value={formData.motherOccupation} onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                </div>
            </div>
        </div>

        <div className="border p-6 rounded-lg bg-red-50/50">
          <h2 className="text-xl font-bold text-red-800 mb-4 flex items-center space-x-2">
              <UploadCloud className="w-5 h-5"/> <span>Mandatory Document Uploads (PDF/JPG, Max 5MB)</span>
          </h2>
          
          <div className="space-y-4">
                {[
                  { label: "Passport Size Photo (JPG/PNG only) *", name: "photoFile", accept: ".jpg,.jpeg,.png" },
                  { label: "Aadhaar Card *", name: "aadharFile", accept: ".pdf" },
                  { label: "Bank Passbook (First Page) *", name: "bankPassbookFile", accept: ".pdf" },
                  { label: "Latest Annual Income Proof *", name: "incomeProofFile", accept: ".pdf" },
              ].map((item) => (
                  <div key={item.name} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 border rounded-md bg-white">
                      <label className="text-sm font-medium text-gray-700">{item.label}</label>
                      <input type="file" name={item.name} accept={item.accept} onChange={handleFileChange} required
                          className="mt-1 sm:mt-0 text-sm text-gray-600 file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
                      <FileStatus file={formData[item.name]} />
                  </div>
              ))}
              
              {[
                  { label: "Caste Certificate *", name: "casteCertFile", accept: ".pdf" },
                  { label: "Domicile Certificate (Niwasi Praman Patra) *", name: "domicileCertFile", accept: ".pdf" },
              ].map((item) => (
                  <div key={item.name} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 border rounded-md bg-white">
                      <label className="text-sm font-medium text-gray-700">{item.label}</label>
                      <input type="file" name={item.name} accept={item.accept} onChange={handleFileChange} required
                          className="mt-1 sm:mt-0 text-sm text-gray-600 file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
                      <FileStatus file={formData[item.name]} />
                  </div>
              ))}

              {[
                  { label: "10th Marksheet *", name: "tenMarksheetFile", accept: ".pdf" },
                  { label: "12th Marksheet *", name: "twelveMarksheetFile", accept: ".pdf" },
                  { label: "Last Year's Marksheet (Current Course) *", name: "lastYearMarksheetFile", accept: ".pdf" },
              ].map((item) => (
                  <div key={item.name} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 border rounded-md bg-white">
                      <label className="text-sm font-medium text-gray-700">{item.label}</label>
                      <input type="file" name={item.name} accept={item.accept} onChange={handleFileChange} required
                          className="mt-1 sm:mt-0 text-sm text-gray-600 file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
                      <FileStatus file={formData[item.name]} />
                  </div>
              ))}
          </div>
      </div>

      <button type="submit" disabled={isLoading}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition flex items-center justify-center space-x-2 disabled:bg-indigo-400">
          <Send className="w-5 h-5 mr-1"/> 
          {isLoading ? 'Submitting Application...' : 'Submit Final Application'}
      </button>
      </form>
    </div>
  );
};

const ApplyScholarshipPage = () => {
  const [selectedScheme, setSelectedScheme] = useState(null);
  const handleFormSubmit = (schemeId, data) => {
    toast.success(`Applicayion for Scheme ID ${schemeId} submitted successfully!`);
    console.log("Final Submission Date:", data);
    setSelectedScheme(null);
  };

  if (selectedScheme) {
    return <FullApplicationForm  scheme={selectedScheme} onFormSubmit={handleFormSubmit} />;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md  mx-auto">
      <h2 className="text-3xl font-bold text-indigo-700 mb-6 border-b pb-2">
        Available Scholarship Schemes
      </h2>

      {availableSchemes.map((scheme) => (
        <div key={scheme.id} className="border border-indigo-200 p-4 rounded-md flex justify-between items-center">
            <div>
                <h3 className="text-xl font-semibold text-gray-800">{scheme.name}</h3>
                <p className="text-sm text-gray-600">Deadline: {scheme.deadline}</p>
            </div>
            <button 
              onClick={()=> setSelectedScheme(scheme)}
              className="bg-indigo-600 text-white px-4 py-2 cursor-pointer rounded-lg hover:bg-indigo-700 transition"
            >
              Start Application
            </button>
        </div>
      ))}

      {availableSchemes.length === 0 && (
        <p className="text-gray-500 italic">No scholarship schemes are curently open for applications.</p>
      )} 
    </div>
  );
};
}

export default ApplyScholarshipPage;
