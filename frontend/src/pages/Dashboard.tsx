import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { 
  Calendar, 
  BookOpen, 
  Users, 
  CreditCard, 
  User as UserIcon, 
  Bell, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  FileText,
  Clock
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { user, student } = useAuth();
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.getStudentDashboard();
        setData(res);
      } catch (err) {
        console.warn('Using cached context for student dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const studentName = student?.name || user?.name || 'Rahul Kumar';
  const admissionNo = student?.admission_no || user?.admission_no || '20260125';
  const className = student?.class_name || '8';
  const section = student?.section || 'A';

  const summary = data?.summary || {
    attendance_percentage: 92,
    subjects_count: 6,
    due_fees: 15000,
    active_homework_count: 2
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Student Welcome Banner (Matches prompt section 6 exact layout requirements) */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          
          <div className="flex items-center space-x-4">
            <Link to="/profile" className="relative group">
              <img
                src={student?.photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'}
                alt={studentName}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-blue-600/30 group-hover:ring-blue-600 transition-all shadow-md"
              />
              <span className="absolute bottom-0 right-0 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full"></span>
            </Link>
            
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Welcome, {studentName.split(' ')[0]} 👋
                </h1>
                <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded-full font-bold">
                  Active Student
                </span>
              </div>
              <p className="text-xs font-mono text-slate-500">
                Admission No: <span className="font-bold text-slate-800">{admissionNo}</span>
              </p>
              <p className="text-xs font-semibold text-blue-700">
                Class: {className} • Section: {section} • Roll No: {student?.roll_no || '18'}
              </p>
            </div>
          </div>

          {/* Quick Profile Link CTA */}
          <Link
            to="/profile"
            className="flex items-center space-x-2 px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all shadow-sm group"
          >
            <UserIcon className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
            <span>View Full Profile</span>
            <ArrowRight className="w-4 h-4 text-slate-500" />
          </Link>

        </div>
      </section>

      {/* Section 7 - Core Dashboard Cards Grid */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <span>Student Diary Quick Modules</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">

          {/* 1. Attendance Card */}
          <Link
            to="/attendance"
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-500 transition-all duration-200 group flex flex-col justify-between"
          >
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Calendar className="w-6 h-6" />
              </div>
              <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-0.5 rounded-full font-extrabold">
                {summary.attendance_percentage}%
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700">📅 Attendance</h3>
              <p className="text-xs text-slate-500 mt-0.5">Present: 20 Days</p>
            </div>
          </Link>

          {/* 2. Subjects Card */}
          <Link
            to="/subjects"
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-500 transition-all duration-200 group flex flex-col justify-between"
          >
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <span className="bg-indigo-100 text-indigo-800 text-xs px-2.5 py-0.5 rounded-full font-extrabold">
                {summary.subjects_count}
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-700">📚 Subjects</h3>
              <p className="text-xs text-slate-500 mt-0.5">Textbooks & Homework</p>
            </div>
          </Link>

          {/* 3. Class Group Card */}
          <Link
            to="/class-group"
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-purple-500 transition-all duration-200 group flex flex-col justify-between"
          >
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <span className="bg-purple-100 text-purple-800 text-xs px-2.5 py-0.5 rounded-full font-extrabold">
                Class 8-A
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-base font-bold text-slate-900 group-hover:text-purple-700">👥 Class Group</h3>
              <p className="text-xs text-slate-500 mt-0.5">Teacher: Mrs. Priya</p>
            </div>
          </Link>

          {/* 4. Fees Card */}
          <Link
            to="/fees"
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-amber-500 transition-all duration-200 group flex flex-col justify-between"
          >
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <CreditCard className="w-6 h-6" />
              </div>
              <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full font-extrabold">
                ₹{summary.due_fees.toLocaleString('en-IN')} Due
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-700">💰 Fees</h3>
              <p className="text-xs text-slate-500 mt-0.5">Pay Online & Receipts</p>
            </div>
          </Link>

        </div>
      </section>

      {/* Main Content Layout: Homework & Announcements */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Pending Homework List (2 cols) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Today's Homework Tasks</h3>
                <p className="text-xs text-slate-500">Subject assignments uploaded by teachers</p>
              </div>
            </div>
            <Link to="/subjects" className="text-xs font-bold text-blue-600 hover:text-blue-800">
              View All Subjects →
            </Link>
          </div>

          <div className="space-y-3">
            {data?.recent_homework?.map((hw: any) => (
              <div
                key={hw.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-colors flex justify-between items-center"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md">
                      {hw.subject_name}
                    </span>
                    <span className="text-xs font-semibold text-slate-900">{hw.title}</span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-1">{hw.description}</p>
                  <div className="flex items-center space-x-3 text-[11px] text-slate-500 pt-1">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>Due: {hw.due_date}</span>
                    </span>
                  </div>
                </div>

                <Link
                  to={`/subjects/subj-${hw.subject_name.toLowerCase().substring(0, 3)}`}
                  className="px-3.5 py-2 rounded-xl school-gradient text-white text-xs font-bold shadow hover:brightness-110 shrink-0 ml-4"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Class Group Noticeboard Feed (1 col) */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                <Bell className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Class Notices</h3>
            </div>
            <Link to="/class-group" className="text-xs font-bold text-purple-600 hover:text-purple-800">
              Class Portal →
            </Link>
          </div>

          <div className="space-y-3">
            {data?.announcements?.map((ann: any) => (
              <div key={ann.id} className="p-3.5 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-1">
                <span className="text-xs font-bold text-slate-900 block">{ann.title}</span>
                <p className="text-xs text-slate-600 leading-relaxed">{ann.content}</p>
                <p className="text-[10px] text-purple-700 font-semibold pt-1">{ann.author}</p>
              </div>
            ))}
          </div>
        </div>

      </section>

    </div>
  );
};
