import Navbar from "../components/Navbar";
import { useState } from "react";
import RenderCurrentView from "../components/RenderCurrentView";

function Home() {
  const [currentView, setCurrentView] = useState('login-page');


  const handleScroll = (id) => {
        const element = document.getElementById(id.substring(1));
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };
  const handleViewChange = (view) => {
        setCurrentView(view);
        if (view !== 'login-page') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };


  return (
    <div className="scroll-smooth ">
      <Navbar onNavLinkClick={handleScroll} onViewChange={handleViewChange} currentView={currentView}/>
      <main className={currentView !== 'login-page' ? 'pt-16' : ''}>
        <RenderCurrentView currentView={currentView} handleViewChange={handleViewChange}/>
      </main>
     
      {currentView === 'login-page' && (
      <footer className="bg-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} ScholarshipPortal. Empowering
          Futures.
        </div>
      </footer>
      )}
    </div>
  );
}

export default Home;
