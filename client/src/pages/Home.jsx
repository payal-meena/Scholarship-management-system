import welcome_image from "../assets/hero-section.png"
import {
  Mail, Phone, MapPin , BarChart, Lock,Zap } from "lucide-react";
import { Link } from "react-router-dom"; 

function Home() {
  
      const FeatureCard = ({ title, description, icon }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-violet-800 transition duration-300 hover:shadow-xl hover:translate-y-[-2px]">
      <div className="p-3 rounded-lg inline-flex items-center justify-center bg-violet-200 text-violet-800 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-violet-800 mb-3">{title}</h3>
      <p className="text-violet-950 text-sm">{description}</p>
    </div>
  );

  const ContactDetail = ({ icon, title, detail }) => (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0 p-2 bg-white rounded-full">{icon}</div>
      <div>
        <h4 className="text-lg font-semibold">{title}</h4>
        <p className="text-violet-200">{detail}</p>
      </div>
    </div>
  );

  return (
    <div className="scroll-smooth ">
      <main>
         <section
            id="home"
            className="relative bg-gray-800 bg-cover bg-right min-h-[80vh] flex items-center justify-end text-right"
            style={{
              backgroundImage: `url(${welcome_image})`,
            }}
          >
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="relative text-white  px-4 py-10 max-w-2xl w-full md:mr-20 text-center">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 tracking-tight drop-shadow-lg">
                Welcome to <br />Scholarship Management System
              </h1>
              <p className="text-lg md:text-xl mb-10 font-light drop-shadow">
                A centralized platform for students to apply for scholarships and
                for administrators to manage applications efficiently.
              </p>
              <Link
                to="/auth"
                className="bg-violet-800 hover:bg-violet-700 text-white font-semibold cursor-pointer text-lg px-10 py-4 rounded-full shadow-2xl transition duration-300 transform hover:scale-[1.05] active:scale-95 focus:outline-none focus:ring-4 focus:ring-violet-700 inline-block"
              >
                Get Started
              </Link>
            </div>
          </section>
        <section id="about" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-base font-semibold text-violet-800 uppercase tracking-wider mb-2">
            Core Features
          </p>
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-6">
            Simplifying Funding for Faculty and Students
          </h2>
          <p className="text-xl text-gray-600 mb-16 max-w-3xl mx-auto">
            Providing essential tools for teachers to manage applications and an
            intuitive process for students to apply successfully.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Zap className="h-6 w-6" />}
              title="Simple Application Process"
              description="Students can quickly find eligible college scholarships and submit all necessary documentation though a single, intuitive interface."
            />
            <FeatureCard
              icon={<BarChart className="h-6 w-6" />}
              title="Efficient Review Dashboard"
              description="Faculty gain access to centralized tools for collaborative scoring, setting review deadlines, and making final decisions swiftly."
            />
            <FeatureCard
              icon={<Lock className="h-6 w-6" />}
              title="Secure Data & Easy Access"
              description="Robust security protects student academic records and personal data. Faculty and students can log in easily and securely manage their profiles."
            />
          </div>
        </div>
      </section>
      <section id="contact" className="pt-20 pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-indigo-950 text-center mb-12">
            Have Questions? We're Here to Help.
          </h2>
          <div className="flex flex-col lg:flex-row lg:space-x-12">
            <div className="lg:w-2/3 bg-gray-50 p-8 rounded-xl shadow-lg mb-8 lg:mb-0">
              <p className="text-lg font-medium text-gray-700 mb-6">
                Send us a detailed message, and our support team will respond
                within one business day.
              </p>
              <form className="space-y-6">
                <input
                  type="text"
                  placeholder="Your Full Name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                  required
                />
                <input
                  type="email"
                  placeholder="Work or Academic Email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                  required
                />
                <textarea
                  rows="4"
                  placeholder="How can we assist you today? (e.g., Partnership inquiry, Technical support)"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                  required
                ></textarea>
                <button
                  type="submit"
                  className="w-full px-4 py-3 cursor-pointer border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-violet-950 hover:bg-violet-900 transition duration-200"
                >
                  Submit Inquiry
                </button>
              </form>
            </div>

            <div className="lg:w-1/3 space-y-8 p-6 bg-violet-950 text-white rounded-xl shadow-xl">
              <ContactDetail
                icon={<Mail className="h-6 w-6 text-violet-600" />}
                title="General Support"
                detail="support@scholarshipportal.com"
              />
              <ContactDetail
                icon={<Phone className="h-6 w-6 text-violet-600" />}
                title="Partnership Line"
                detail="+1 (555) 789-0123"
              />
              <ContactDetail
                icon={<MapPin className="h-6 w-6 text-violet-600" />}
                title="Organization"
                detail="Sant Singaji Institute of Science & Management (SSISM) Sandalpur , Mp India"
              />
            </div>
          </div>
        </div>
      </section>

      </main>
     
      <footer className="py-8 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} ScholarshipPortal. Empowering
          Futures.
        </div>
      </footer>
    </div>
  );
}

export default Home;
