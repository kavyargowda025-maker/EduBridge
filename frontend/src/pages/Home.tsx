import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  UserPlus, 
  Info, 
  CreditCard, 
  PhoneCall, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight,
  Bell,
  Sparkles
} from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="space-y-12 pb-12">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden school-gradient py-16 sm:py-24 text-white rounded-b-3xl shadow-xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-400/20 via-transparent to-transparent"></div>
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10 space-y-6">

          {/* School Logo */}
          <div className="inline-flex p-4 rounded-3xl bg-white/10 backdrop-blur-md ring-8 ring-white/10 shadow-2xl animate-fade-in">
            <GraduationCap className="w-16 h-16 text-amber-300" />
          </div>

          {/* School Name & Tagline */}
          <div className="space-y-2">
            <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-block mb-1">
              📱 EduBridge App Portal
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight drop-shadow-md">
              HORIZON INTERNATIONAL SCHOOL
            </h1>
            <p className="text-sm sm:text-lg font-semibold text-amber-300 uppercase tracking-widest">
              Knowledge • Innovation • Excellence
            </p>
            <p className="max-w-2xl mx-auto text-xs sm:text-sm text-blue-100 font-light leading-relaxed pt-2">
              Empowering students through innovative learning, modern laboratories, moral values, and global standards of education.
            </p>
          </div>

          {/* Student Login Primary Hero Button */}
          <div className="pt-4">
            <Link
              to="/login"
              className="inline-flex items-center space-x-3 bg-amber-400 text-slate-900 hover:bg-amber-300 px-8 py-4 rounded-2xl font-extrabold text-base sm:text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200 group"
            >
              <GraduationCap className="w-6 h-6 text-slate-900 group-hover:rotate-12 transition-transform" />
              <span>🎓 Student Login Portal</span>
              <ArrowRight className="w-5 h-5 ml-1" />
            </Link>
          </div>

        </div>
      </section>

      {/* Main Home Page Cards Grid (Matches design mockup in prompt) */}
      <section className="max-w-6xl mx-auto px-4 space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Quick Navigation Portal
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900">Choose an Option</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* 1. Admission Enquiry Card */}
          <Link
            to="/admission-enquiry"
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-500 transition-all duration-200 group flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <UserPlus className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                  Admission Enquiry
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Apply for Nursery to Class 10th admissions for session 2026-2027.
                </p>
              </div>
            </div>
            <div className="mt-6 flex items-center text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
              <span>Open Form</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </Link>

          {/* 2. About Us Card */}
          <Link
            to="/about"
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-500 transition-all duration-200 group flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Info className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                  About Us & Gallery
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Explore campus infrastructure, vision, faculty, and photo gallery.
                </p>
              </div>
            </div>
            <div className="mt-6 flex items-center text-xs font-bold text-indigo-600 group-hover:translate-x-1 transition-transform">
              <span>Read Overview</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </Link>

          {/* 3. Fees Structure Card */}
          <Link
            to="/fees-structure"
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-amber-500 transition-all duration-200 group flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                  Fees Structure
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Transparent fee breakup, tuition instalments, and payment modes.
                </p>
              </div>
            </div>
            <div className="mt-6 flex items-center text-xs font-bold text-amber-600 group-hover:translate-x-1 transition-transform">
              <span>View Breakdown</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </Link>

          {/* 4. Contact Us Card */}
          <Link
            to="/contact"
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-500 transition-all duration-200 group flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <PhoneCall className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  Contact Us
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Phone helplines, email, school campus address, and office hours.
                </p>
              </div>
            </div>
            <div className="mt-6 flex items-center text-xs font-bold text-emerald-600 group-hover:translate-x-1 transition-transform">
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </Link>

        </div>
      </section>

      {/* Announcements & Highlights Section */}
      <section className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Announcements Widget */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <Bell className="w-5 h-5 text-blue-600" />
              <span>Latest School Noticeboard</span>
            </h3>
            <span className="text-[11px] bg-red-100 text-red-700 px-2.5 py-0.5 rounded-full font-bold uppercase animate-pulse">
              Live Feed
            </span>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-100 space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-blue-900">📢 Mathematics Unit Test</span>
                <span className="text-slate-500 font-mono text-[11px]">17 Aug 2026</span>
              </div>
              <p className="text-xs text-slate-700">
                Mathematics weekly test for Class 8 will be held on Friday, 22nd August.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-100 space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-amber-900">📢 Parent-Teacher Meeting (PTM)</span>
                <span className="text-slate-500 font-mono text-[11px]">15 Aug 2026</span>
              </div>
              <p className="text-xs text-slate-700">
                2nd Term PTM scheduled for Saturday, 23rd August from 9:00 AM to 12:30 PM.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-100 space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-emerald-900">📢 Science Exhibition Registration</span>
                <span className="text-slate-500 font-mono text-[11px]">14 Aug 2026</span>
              </div>
              <p className="text-xs text-slate-700">
                Annual Science Fair model submissions open for classes 6th through 10th.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Horizon Banner */}
        <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="inline-flex p-2.5 rounded-xl bg-amber-400/20 text-amber-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold">Why Choose Horizon International School?</h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Experienced Qualified Faculty</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Smart Classrooms & Computer Labs</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Safe Campus & Transport Facility</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>95% Academic Excellence Record</span>
              </li>
            </ul>
          </div>

          <Link
            to="/about"
            className="w-full py-2.5 rounded-xl bg-amber-400 text-slate-900 font-bold text-xs text-center block hover:bg-amber-300 transition-colors"
          >
            Learn More About School
          </Link>
        </div>

      </section>

    </div>
  );
};
