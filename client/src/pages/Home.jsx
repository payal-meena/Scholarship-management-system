import Navbar from "../components/Navbar";
import welcome_image from "../assets/welcome_page_img.jpg";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div className="scroll-smooth">
      <Navbar />

      <section
        id="home"
        className="relative bg-cover bg-center min-h-screen flex items-center justify-center text-center"
        style={{
          backgroundImage: `url(${welcome_image})`,
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative  text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Welcome to Scholarship Management System
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            A centralized platform for students to apply for scholarships and
            for administrators to manage applications efficiently.
          </p>
          <Link
            to="/login"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
        </div>
      </section>

      <section id="about" className="py-24 bg-white text-center px-6 md:px-16">
        <h2 className="text-3xl md:text-4xl font-semibold text-blue-700 mb-8">
          About Us
        </h2>
        <p className="max-w-3xl mx-auto text-gray-600 text-lg md:text-xl leading-relaxed">
          The Scholarship Management System is designed to streamline the
          process of applying for and managing scholarships. Students can apply
          online, upload necessary documents, and track their application
          status. Admins can review, approve, or reject applications with ease.
        </p>
      </section>

      <section
        id="contact"
        className="py-24 bg-gray-100 text-center px-6 md:px-16"
      >
        <h2 className="text-3xl md:text-4xl font-semibold text-blue-700 mb-8">
          Contact Us
        </h2>
        <p className="text-gray-600 mb-4 text-lg md:text-xl">
          Have questions? Reach out to us at:
        </p>
        <p className="font-medium text-lg md:text-xl mb-2">
          📧 support@scholarship.com
        </p>
        <p className="font-medium text-lg md:text-xl">📞 +91 98765 43210</p>
      </section>

      <footer className="bg-blue-600 text-white py-6 text-center">
        <p>
          © {new Date().getFullYear()} Scholarship Management System. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}

export default Home;
