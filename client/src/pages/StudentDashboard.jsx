// import React, { useState } from "react";
// import DashboardNavbar from "../components/DashboardNavbar";
// import SideBar from "../components/SideBar";

// const StudentDashboard = () => {
//   const [active, setActive] = useState("apply");

//   return (
//     <div className="flex flex-col  min-h-screen bg-gray-100">

//       <DashboardNavbar role="student" name="Payal"/>
//        <div className="flex flex-1 relative">

//           <SideBar role="student" active={active} setActive={setActive} />

//           <main className="flex-1 p-8">
//             {active === "apply" && (
//               <h2 className="text-2xl font-bold">Available Scholarships</h2>
//             )}
//             {active === "my-applications" && (
//               <h2 className="text-2xl font-bold">My Applications</h2>
//             )}
//             {active === "profile" && (
//               <h2 className="text-2xl font-bold">My Profile</h2>
//             )}
//           </main>

//         </div>
//     </div>
//   );
// };

// export default StudentDashboard;
