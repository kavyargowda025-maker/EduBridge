import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  GraduationCap, 
  Home, 
  Calendar, 
  BookOpen, 
  Users, 
  CreditCard, 
  User as UserIcon, 
  LogOut, 
  Menu, 
  X, 
  ShieldCheck, 
  Info, 
  PhoneCall, 
  FileText 
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, student, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Top Info Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 hidden md:block border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="bg-blue-800/60 text-blue-200 px-2 py-0.5 rounded text-[11px] font-bold tracking-wide">
              📱 EduBridge App
            </span>
            <span>📍 Sector 4, Knowledge Campus, City - 110001</span>
            <span>📞 Helpline: +91 98765 43210</span>
            <span>✉️ info@horizonschool.edu.in</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-amber-400 font-medium">✨ Admissions Open for 2026-2027</span>
            {user && (
              <span className="bg-blue-900/60 text-blue-300 px-2 py-0.5 rounded text-[11px] font-mono border border-blue-700/50">
                {user.role.toUpperCase()}: {user.admission_no}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">

            {/* School Brand & Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 rounded-xl school-gradient flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-200 relative">
                <GraduationCap className="w-7 h-7 text-amber-300" />
                <span className="absolute -bottom-1 -right-1 bg-amber-400 text-slate-900 text-[9px] font-extrabold px-1 rounded shadow">
                  APP
                </span>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors">
                    HORIZON INTERNATIONAL SCHOOL
                  </h1>
                </div>
                <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest flex items-center space-x-1">
                  <span className="font-bold text-amber-600">EduBridge Portal</span>
                  <span>• Knowledge • Innovation • Excellence</span>
                </p>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1">
              {!user ? (
                <>
                  <Link
                    to="/"
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive('/') ? 'text-blue-700 bg-blue-50 font-semibold' : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                    }`}
                  >
                    Home
                  </Link>
                  <Link
                    to="/admission-enquiry"
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive('/admission-enquiry') ? 'text-blue-700 bg-blue-50 font-semibold' : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                    }`}
                  >
                    Admission Enquiry
                  </Link>
                  <Link
                    to="/about"
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive('/about') ? 'text-blue-700 bg-blue-50 font-semibold' : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                    }`}
                  >
                    About Us
                  </Link>
                  <Link
                    to="/fees-structure"
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive('/fees-structure') ? 'text-blue-700 bg-blue-50 font-semibold' : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                    }`}
                  >
                    Fees Structure
                  </Link>
                  <Link
                    to="/contact"
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive('/contact') ? 'text-blue-700 bg-blue-50 font-semibold' : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                    }`}
                  >
                    Contact Us
                  </Link>
                  <Link
                    to="/login"
                    className="ml-3 inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl school-gradient text-white font-medium text-sm shadow-md hover:shadow-lg hover:brightness-110 transition-all active:scale-95"
                  >
                    <GraduationCap className="w-4 h-4 text-amber-300" />
                    <span>Student Login</span>
                  </Link>
                </>
              ) : user.role === 'student' ? (
                <>
                  <Link
                    to="/dashboard"
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive('/dashboard') ? 'text-blue-700 bg-blue-50 font-semibold' : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                    }`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/attendance"
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive('/attendance') ? 'text-blue-700 bg-blue-50 font-semibold' : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                    }`}
                  >
                    Attendance
                  </Link>
                  <Link
                    to="/subjects"
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive('/subjects') || location.pathname.startsWith('/subjects')
                        ? 'text-blue-700 bg-blue-50 font-semibold'
                        : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                    }`}
                  >
                    Subjects
                  </Link>
                  <Link
                    to="/class-group"
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive('/class-group') ? 'text-blue-700 bg-blue-50 font-semibold' : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                    }`}
                  >
                    Class Group
                  </Link>
                  <Link
                    to="/fees"
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive('/fees') ? 'text-blue-700 bg-blue-50 font-semibold' : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                    }`}
                  >
                    Fees
                  </Link>

                  {/* Student Profile Dropdown Trigger */}
                  <div className="pl-3 border-l border-slate-200 flex items-center space-x-3">
                    <Link
                      to="/profile"
                      className="flex items-center space-x-2.5 p-1.5 rounded-xl hover:bg-slate-100 transition-colors group"
                      title="View Student Profile"
                    >
                      <img
                        src={student?.photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'}
                        alt={student?.name || user.name}
                        className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-600/30 group-hover:ring-blue-600 transition-all"
                      />
                      <div className="text-left hidden xl:block">
                        <p className="text-xs font-bold text-slate-800 group-hover:text-blue-700 leading-tight">
                          {student?.name || user.name}
                        </p>
                        <p className="text-[11px] text-slate-500 font-mono">
                          Class {student?.class_name || '8'}-{student?.section || 'A'}
                        </p>
                      </div>
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="p-2 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Logout"
                    >
                      <LogOut className="w-5 h-5" />
                    </button>
                  </div>
                </>
              ) : (
                /* Admin / Teacher Navigation */
                <>
                  <Link
                    to="/admin"
                    className="px-3.5 py-2 rounded-lg text-sm font-semibold text-blue-700 bg-blue-50"
                  >
                    <span className="flex items-center space-x-1.5">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Admin Management Portal</span>
                    </span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1.5 px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              )}
            </nav>

            {/* Mobile Hamburger Toggle Button */}
            <div className="flex items-center space-x-2 lg:hidden">
              {user && (
                <Link to="/profile" className="flex items-center space-x-2 mr-1">
                  <img
                    src={student?.photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'}
                    alt="Profile"
                    className="w-8 h-8 rounded-full ring-2 ring-blue-600 object-cover"
                  />
                </Link>
              )}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex justify-end animate-fade-in">
          <div className="w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto p-6">
            <div>
              {/* Header inside Mobile Menu */}
              <div className="flex justify-between items-center pb-6 border-b border-slate-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg school-gradient flex items-center justify-center text-white">
                    <GraduationCap className="w-5 h-5 text-amber-300" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">HORIZON INT. SCHOOL</h2>
                    <p className="text-[10px] font-bold text-blue-600">EDUBRIDGE MOBILE APP</p>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* User badge inside menu */}
              {user && (
                <div className="mt-4 p-3.5 bg-blue-50 border border-blue-100 rounded-xl flex items-center space-x-3">
                  <img
                    src={student?.photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'}
                    alt="Student"
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-blue-500"
                  />
                  <div>
                    <p className="text-sm font-bold text-slate-900">{student?.name || user.name}</p>
                    <p className="text-xs font-mono text-blue-700">Adm: {user.admission_no}</p>
                    <p className="text-xs text-slate-500">Class {student?.class_name || '8'} - Sec {student?.section || 'A'}</p>
                  </div>
                </div>
              )}

              {/* Navigation Links inside Mobile Menu */}
              <div className="mt-6 space-y-1.5">
                {!user ? (
                  <>
                    <Link
                      to="/"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-50 font-medium"
                    >
                      <Home className="w-5 h-5 text-blue-600" />
                      <span>Home Landing</span>
                    </Link>
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 rounded-xl text-white school-gradient font-semibold shadow-md"
                    >
                      <GraduationCap className="w-5 h-5 text-amber-300" />
                      <span>Student Login</span>
                    </Link>
                    <Link
                      to="/admission-enquiry"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-50 font-medium"
                    >
                      <FileText className="w-5 h-5 text-blue-600" />
                      <span>Admission Enquiry</span>
                    </Link>
                    <Link
                      to="/about"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-50 font-medium"
                    >
                      <Info className="w-5 h-5 text-blue-600" />
                      <span>About Us & Gallery</span>
                    </Link>
                    <Link
                      to="/fees-structure"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-50 font-medium"
                    >
                      <CreditCard className="w-5 h-5 text-blue-600" />
                      <span>Fees Structure</span>
                    </Link>
                    <Link
                      to="/contact"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-50 font-medium"
                    >
                      <PhoneCall className="w-5 h-5 text-blue-600" />
                      <span>Contact Us</span>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-800 hover:bg-blue-50 hover:text-blue-700 font-medium"
                    >
                      <Home className="w-5 h-5 text-blue-600" />
                      <span>Student Dashboard</span>
                    </Link>
                    <Link
                      to="/attendance"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-800 hover:bg-blue-50 hover:text-blue-700 font-medium"
                    >
                      <Calendar className="w-5 h-5 text-emerald-600" />
                      <span>Attendance Tracker</span>
                    </Link>
                    <Link
                      to="/subjects"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-800 hover:bg-blue-50 hover:text-blue-700 font-medium"
                    >
                      <BookOpen className="w-5 h-5 text-indigo-600" />
                      <span>Subjects & Homework</span>
                    </Link>
                    <Link
                      to="/class-group"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-800 hover:bg-blue-50 hover:text-blue-700 font-medium"
                    >
                      <Users className="w-5 h-5 text-purple-600" />
                      <span>Class Group & Notices</span>
                    </Link>
                    <Link
                      to="/fees"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-800 hover:bg-blue-50 hover:text-blue-700 font-medium"
                    >
                      <CreditCard className="w-5 h-5 text-amber-600" />
                      <span>Fees & Payments</span>
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-800 hover:bg-blue-50 hover:text-blue-700 font-medium"
                    >
                      <UserIcon className="w-5 h-5 text-blue-600" />
                      <span>My Profile & Settings</span>
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Logout button at bottom of mobile drawer */}
            {user && (
              <div className="pt-6 border-t border-slate-100">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-red-50 text-red-700 font-medium hover:bg-red-100 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout Account</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar (Shown on Mobile when logged in) */}
      {user && user.role === 'student' && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 flex justify-around items-center shadow-lg">
          <Link
            to="/dashboard"
            className={`flex flex-col items-center py-1 px-3 rounded-lg text-[11px] font-medium transition-colors ${
              isActive('/dashboard') ? 'text-blue-700 font-bold' : 'text-slate-500'
            }`}
          >
            <Home className="w-5 h-5 mb-0.5" />
            <span>Home</span>
          </Link>
          <Link
            to="/attendance"
            className={`flex flex-col items-center py-1 px-3 rounded-lg text-[11px] font-medium transition-colors ${
              isActive('/attendance') ? 'text-blue-700 font-bold' : 'text-slate-500'
            }`}
          >
            <Calendar className="w-5 h-5 mb-0.5" />
            <span>Attendance</span>
          </Link>
          <Link
            to="/subjects"
            className={`flex flex-col items-center py-1 px-3 rounded-lg text-[11px] font-medium transition-colors ${
              isActive('/subjects') || location.pathname.startsWith('/subjects') ? 'text-blue-700 font-bold' : 'text-slate-500'
            }`}
          >
            <BookOpen className="w-5 h-5 mb-0.5" />
            <span>Subjects</span>
          </Link>
          <Link
            to="/fees"
            className={`flex flex-col items-center py-1 px-3 rounded-lg text-[11px] font-medium transition-colors ${
              isActive('/fees') ? 'text-blue-700 font-bold' : 'text-slate-500'
            }`}
          >
            <CreditCard className="w-5 h-5 mb-0.5" />
            <span>Fees</span>
          </Link>
          <Link
            to="/profile"
            className={`flex flex-col items-center py-1 px-3 rounded-lg text-[11px] font-medium transition-colors ${
              isActive('/profile') ? 'text-blue-700 font-bold' : 'text-slate-500'
            }`}
          >
            <UserIcon className="w-5 h-5 mb-0.5" />
            <span>Profile</span>
          </Link>
        </div>
      )}
    </>
  );
};
