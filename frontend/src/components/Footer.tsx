import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Phone, Mail, MapPin, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-20 lg:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

          {/* School Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl school-gradient flex items-center justify-center text-white shadow-md">
                <GraduationCap className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <span className="text-lg font-bold text-white tracking-tight block">Horizon International School</span>
                <span className="text-[11px] font-bold text-amber-400 block">Powered by EduBridge App</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Empowering young minds through quality education, moral discipline, and academic excellence since 2010.
            </p>
            <div className="flex items-center space-x-2 text-xs text-amber-400 font-medium bg-amber-950/40 p-2.5 rounded-lg border border-amber-800/40">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>CBSE Affiliated • Reg. No. 1030924</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Quick Navigation</h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/" className="hover:text-blue-400 transition-colors">School Home Page</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-blue-400 transition-colors">Student Login Portal</Link>
              </li>
              <li>
                <Link to="/admission-enquiry" className="hover:text-blue-400 transition-colors">Admission Enquiry Form</Link>
              </li>
              <li>
                <Link to="/fees-structure" className="hover:text-blue-400 transition-colors">Fees Structure & Guidelines</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-400 transition-colors">About Us & Campus Gallery</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-400 transition-colors">Contact Office</Link>
              </li>
            </ul>
          </div>

          {/* Student Portal Links */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Student Diary Features</h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/dashboard" className="hover:text-blue-400 transition-colors">Student Dashboard</Link>
              </li>
              <li>
                <Link to="/attendance" className="hover:text-blue-400 transition-colors">Attendance Tracker Calendar</Link>
              </li>
              <li>
                <Link to="/subjects" className="hover:text-blue-400 transition-colors">Class Subjects & Textbooks</Link>
              </li>
              <li>
                <Link to="/class-group" className="hover:text-blue-400 transition-colors">Class Group & Noticeboard</Link>
              </li>
              <li>
                <Link to="/fees" className="hover:text-blue-400 transition-colors">Fees History & Online Pay</Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-blue-400 transition-colors">My Profile & Settings</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Campus Contact</h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Sector 4, Knowledge Campus, Ring Road, City - 110001</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>+91 98765 43210 / +91 98765 43211</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>info@horizonschool.edu.in</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Horizon International School • EduBridge App. All rights reserved.</p>
          <p className="flex items-center space-x-1 mt-2 md:mt-0">
            <span>Built with care for quality education</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-current inline ml-1" />
          </p>
        </div>
      </div>
    </footer>
  );
};
