import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LogIn , GraduationCapIcon, X, GraduationCap } from "lucide-react"; 

const Navbar = ({onNavLinkClick , currentView}) => {
    
    const isLoginPage = currentView === 'auth';

    return (
        <nav className="bg-indigo-100 shadow-2xl fixed w-full z-50 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">

                <Link to="/">
                <div className="flex items-center gap-2 cursor-pointer group">
                            <svg width="0" height="0" className="absolute">
                        <linearGradient id="icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#4f46e5" />   
                        <stop offset="100%" stopColor="#d946ef" />
                        </linearGradient>
                    </svg>
                    <div className="relative p-1 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                        <GraduationCap 
                            className="w-10 h-10 drop-shadow-sm" 
                            stroke="url(#icon-gradient)" 
                            strokeWidth={2} 
                        />
                    </div>
                     <div className="flex flex-col">
                        <h1 className="text-2xl font-black tracking-tight text-indigo-950 leading-none drop-shadow-sm">
                        Scholar<span className="text-violet-600">Portal</span>
                        </h1>
                        <span className="text-[10px] font-bold text-indigo-500 tracking-widest uppercase ml-0.5">
                        Student Funding
                        </span>
                     </div>
                    </div>
                    </Link>                    
                    <div className="flex items-center">
                    <Link
                        to={isLoginPage ? '/' : '/auth'} 
                        className={`group relative flex items-center justify-center space-x-2 px-6 py-2.5 cursor-pointer text-sm font-bold rounded-full overflow-hidden
                            transition-all duration-300 transform 
                            ${isLoginPage 
                                ? 'bg-white text-indigo-600 border border-indigo-200 shadow-sm hover:bg-gray-50 hover:text-gray-500 hover:border-gray-200' 
                                : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-[0_4px_15px_rgba(99,102,241,0.4)] hover:shadow-[0_6px_20px_rgba(99,102,241,0.6)]' 
                            }`}
                    >
                        {isLoginPage ? (
                            <>
                                <X className="h-5 w-5 transition-transform duration-500 group-hover:rotate-90" />
                                <span>Close</span>
                            </>
                        ) : (
                            <>
                                <LogIn className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-1" />
                                
                                <span className="relative z-10">
                                    <span className="hidden sm:inline">Login | Register</span>
                                    <span className="sm:hidden">Login</span>
                                </span>
                                <div className="absolute inset-0 h-full w-full scale-0 rounded-full transition-all duration-300 group-hover:scale-100 group-hover:bg-white/10"></div>
                            </>
                        )}
                    </Link> 
                </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;