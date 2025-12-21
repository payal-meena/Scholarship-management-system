import welcome_image from "../assets/hero-section.png";
import {
  Mail, Phone, MapPin , BarChart, Lock, Zap, Award, Globe, Shield, Send, DollarSign, BookOpenCheck
} from "lucide-react";
import { Link } from "react-router-dom"; 

function Home() {
  
    const FeatureCard = ({ title, description, icon }) => (
        <div className="bg-white p-7 rounded-3xl shadow-2xl border-l-4 border-violet-800 transition duration-500 hover:shadow-3xl hover:-translate-y-2 transform relative overflow-hidden">
            <div className="absolute top-0 right-0 h-16 w-16 bg-violet-300 rounded-bl-full z-0"></div>
            <div className="relative z-10">
                <div className="p-3 rounded-full inline-flex items-center justify-center bg-violet-600 text-white mb-4 shadow-lg">
                    {icon}
                </div>
                <h3 className="text-xl font-extrabold text-violet-900 mb-3">{title}</h3> 
                <p className="text-gray-600 text-base leading-relaxed">{description}</p>
            </div>
        </div>
    );

    const ContactDetail = ({ icon, title, detail }) => (
        <div className="flex items-start space-x-4 border-b border-violet-700/50 pb-5 last:border-b-0 last:pb-0">
            <div className="flex-shrink-0 p-3 bg-violet-600 rounded-xl shadow-lg text-white">{icon}</div> 
            <div>
                <h4 className="text-xl font-extrabold text-white mb-1">{title}</h4>
                <p className="text-violet-200 font-light text-base">{detail}</p>
            </div>
        </div>
    );

    return (
        <div className="scroll-smooth">
            <main>
                <section
                    id="home"
                    className="relative bg-indigo-950 min-h-screen flex items-center justify-center overflow-hidden" 
                >
                    <div 
                        className="fixed inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${welcome_image})`,
                            backgroundAttachment: 'fixed', 
                            opacity: 0.3, 
                        }}
                    ></div>
                    <div className="absolute inset-0"></div> 
                    <div className="relative z-10 text-white px-8 py-16 md:px-16 bg-indigo-950/50 backdrop-blur-md rounded-3xl shadow-3xl max-w-5xl w-[90%] mx-auto text-center border border-violet-600 transform hover:shadow-glow  hover:shadow-[0_0_10px_rgba(255,255,255,0.5)] transition duration-500">
                        <div className="flex items-center justify-center mb-6">
                             <Award className="h-30 w-30 text-violet-500 mr-4 animate-pulse"/> 
                            <h1 className="text-4xl md:text-6xl font-black tracking-tight drop-shadow-lg leading-tight">
                                Scholarship Management System
                            </h1>
                        </div>
                        
                        <h2 className="text-xl md:text-3xl font-light text-violet-300 mb-8 mt-2 drop-shadow">
                            A centralized platform for students to apply for scholarships and for administrators to manage applications efficiently.
                        </h2>
                        
                        <p className="text-lg md:text-xl mb-12 font-regular drop-shadow max-w-4xl mx-auto text-white/90">
                            Apply quickly, track your status instantly, and enable administrators to manage the funding lifecycle with unparalleled transparency and efficiency.
                        </p>
                        <Link
                            to="/auth"
                            className="bg-white/50 hover:bg-violet-400 text-indigo-950 font-bold cursor-pointer text-xl px-14 py-4 rounded-full shadow-[0_15px_30px_rgba(139,92,246,0.6)] hover:shadow-[0_0_10px_rgba(255,255,255,0.5)] transition duration-400 transform hover:scale-[1.05] active:scale-95 focus:outline-none focus:ring-4 focus:ring-violet-500 inline-flex items-center space-x-3 group"
                        >
                            <Send className="h-6 w-6 transform transition-transform duration-300 group-hover:translate-x-1" />
                            <span>Start Your Application Today</span>
                        </Link>
                    </div>
                </section>
                
                <hr className="border-t-4 border-violet-950" />


                <section id="about" className="py-28 bg-indigo-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <p className="text-xl font-extrabold text-violet-900 uppercase tracking-widest mb-3">
                            Features That Drive Success
                        </p>
                        <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-16">
                            Tools for Every Stakeholder
                        </h2>

                        <div className="grid md:grid-cols-3 gap-10">
                            <FeatureCard
                                icon={<DollarSign className="h-6 w-6" />}
                                title="Fund Eligibility Checker"
                                description="Instantly cross-reference applicant data against scheme requirements to determine eligibility status before submission."
                            />
                            <FeatureCard
                                icon={<Zap className="h-6 w-6" />}
                                title="Single-Form Application"
                                description="Our platform uses smart-filling technology. Submit core profile and documentation once to apply to multiple schemes."
                            />
                            <FeatureCard
                                icon={<BookOpenCheck className="h-6 w-6" />}
                                title="Transparent Review"
                                description="Faculty reviewers can track their workload and provide consistent, objective scoring using a centralized, secure dashboard."
                            />
                            <FeatureCard
                                icon={<Lock className="h-6 w-6" />}
                                title="Secure Data Vault"
                                description="Sensitive student records are protected by advanced encryption, ensuring compliance and confidentiality at all times."
                            />
                            <FeatureCard
                                icon={<Shield className="h-6 w-6" />}
                                title="Automated Notifications"
                                description="Get real-time alerts for application status changes, deadline reminders, and required actions directly to your student dashboard."
                            />
                            <FeatureCard
                                icon={<Globe className="h-6 w-6" />}
                                title="Scalable Cloud Platform"
                                description="Designed to handle high volumes of applications seamlessly, ensuring smooth performance even during peak admission seasons."
                            />
                        </div>
                    </div>
                </section>

                <section id="contact" className="py-28 bg-indigo-950">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-4xl font-extrabold text-white text-center mb-16">
                            Get Answers Fast 📞
                        </h2>
                        <div className="flex flex-col lg:flex-row lg:space-x-12">
                            <div className="lg:w-1/3 space-y-8 p-10 bg-indigo-950/50 text-white rounded-2xl shadow-3xl order-2 lg:order-1 h-fit relative z-10">
                                <h3 className="text-2xl font-extrabold text-white mb-6 border-b border-violet-600 pb-3">Contact Information</h3>
                                <ContactDetail
                                    icon={<Mail className="h-6 w-6" />}
                                    title="General Support"
                                    detail="support@scholarshipportal.com"
                                />
                                <ContactDetail
                                    icon={<Phone className="h-6 w-6" />}
                                    title="Partnership Line"
                                    detail="+1 (555) 789-0123"
                                />
                                <ContactDetail
                                    icon={<MapPin className="h-6 w-6" />}
                                    title="Organization Address"
                                    detail="Sant Singaji Institute of Science & Management (SSISM) Sandalpur, MP, India"
                                />
                            </div>
                            <div className="lg:w-2/3 bg-indigo-950/50 p-8 md:p-12 rounded-2xl shadow-2xl mb-10 lg:mb-0 order-1 lg:order-2 relative z-10">
                                <p className="text-xl font-semibold text-white mb-8 border-b border-violet-600 pb-4">
                                    Send us a detailed message.
                                </p>
                                <form className="space-y-6">
                                    <input
                                        type="text"
                                        placeholder="Your Full Name"
                                        className="w-full p-4 border border-violet-400 rounded-xl focus:outline-none focus:ring-violet-600 focus:border-violet-600 transition duration-200 text-white"
                                        required
                                    />
                                    <input
                                        type="email"
                                        placeholder="Work or Academic Email"
                                        className="w-full p-4 border border-violet-400 rounded-xl focus:outline-none focus:ring-violet-600 focus:border-violet-600 transition duration-200 text-white"
                                        required
                                    />
                                    <textarea
                                        rows="5"
                                        placeholder="How can we assist you today?"
                                        className="w-full p-4 border border-violet-400 rounded-xl focus:outline-none focus:ring-violet-600 focus:border-violet-600 transition duration-200 text-white"
                                        required
                                    ></textarea>
                                    <button
                                        type="submit"
                                        className="w-full px-4 py-4 cursor-pointer text-lg font-bold rounded-xl shadow-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90 transition duration-300 transform hover:scale-[1.005] group inline-flex items-center justify-center space-x-2"
                                    >
                                        <Send className="h-5 w-5"/>
                                        <span>Submit Inquiry</span>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
            
            <footer className="py-12 bg-gray-950 border-t border-violet-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-white">
                    &copy; {new Date().getFullYear()} ScholarshipPortal. All rights reserved. | Built with 💜 for Education.
                </div>
            </footer>
        </div>
    );
}

export default Home;