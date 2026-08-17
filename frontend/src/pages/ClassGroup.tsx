import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Users, Bell, Mail, Shield, Award, Sparkles, UserCheck } from 'lucide-react';

export const ClassGroup: React.FC = () => {
  const { student } = useAuth();
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const className = student?.class_name || '8';
  const section = student?.section || 'A';

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await api.getAnnouncements(`${className}-${section}`);
        setAnnouncements(res.announcements);
      } catch (err) {
        console.warn('Failed to load announcements');
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, [className, section]);

  const classmates = [
    { name: 'Rahul Kumar', roll: '18', status: 'Active Student', role: 'Student' },
    { name: 'Aarav Sharma', roll: '01', status: 'Active Student', role: 'Class Monitor' },
    { name: 'Ananya Verma', roll: '04', status: 'Active Student', role: 'Student' },
    { name: 'Devendra Patel', roll: '09', status: 'Active Student', role: 'Student' },
    { name: 'Isha Saxena', roll: '12', status: 'Active Student', role: 'Student' },
    { name: 'Kavya Singh', roll: '15', status: 'Active Student', role: 'Student' },
    { name: 'Rohan Gupta', roll: '22', status: 'Active Student', role: 'Student' },
    { name: 'Siddharth Nair', roll: '28', status: 'Active Student', role: 'Sports Captain' }
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-extrabold text-xl shadow-inner">
            <Users className="w-9 h-9" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Class {className} - Section {section}
              </h1>
              <span className="bg-purple-100 text-purple-800 text-xs px-2.5 py-0.5 rounded-full font-bold">
                Academic Group
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Official class group noticeboard & roster</p>
          </div>
        </div>

        {/* Class Teacher Card */}
        <div className="bg-purple-50 p-4 rounded-2xl border border-purple-200 flex items-center space-x-3 w-full md:w-auto">
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"
            alt="Mrs. Priya Sharma"
            className="w-12 h-12 rounded-xl object-cover ring-2 ring-purple-400"
          />
          <div>
            <p className="text-[11px] font-bold text-purple-700 uppercase tracking-wider">Class Teacher</p>
            <p className="text-sm font-extrabold text-slate-900">Mrs. Priya Sharma</p>
            <p className="text-xs text-slate-500">Mathematics Faculty</p>
          </div>
        </div>
      </div>

      {/* Grid: Announcements Board & Class Roster */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Announcements Noticeboard (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <Bell className="w-5 h-5 text-purple-600" />
              <span>Class Announcements & Notices</span>
            </h2>
            <span className="text-xs text-purple-700 font-bold bg-purple-100 px-2.5 py-0.5 rounded-full">
              Official Updates
            </span>
          </div>

          <div className="space-y-4">
            {announcements.map((ann) => (
              <div
                key={ann.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3 relative overflow-hidden"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-600 inline-block"></span>
                    <h3 className="text-base font-bold text-slate-900">{ann.title}</h3>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">{ann.posted_at}</span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed font-medium bg-purple-50/40 p-4 rounded-2xl border border-purple-100">
                  {ann.content}
                </p>

                <div className="pt-2 flex justify-between items-center text-[11px] text-slate-500">
                  <span>Author: <strong className="text-slate-800">{ann.author}</strong></span>
                  <span className="bg-slate-100 px-2.5 py-0.5 rounded text-slate-600 font-semibold uppercase">
                    {ann.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Class Roster (1 col) */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <UserCheck className="w-5 h-5 text-blue-600" />
              <span>Class 8-A Roster</span>
            </h3>
            <span className="text-xs text-slate-500 font-mono">32 Students</span>
          </div>

          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {classmates.map((cm, i) => (
              <div
                key={i}
                className="p-3 rounded-2xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200 transition-colors flex justify-between items-center text-xs"
              >
                <div className="flex items-center space-x-3">
                  <span className="w-7 h-7 rounded-xl bg-slate-200 text-slate-700 font-bold flex items-center justify-center font-mono">
                    {cm.roll}
                  </span>
                  <div>
                    <p className="font-bold text-slate-900">{cm.name}</p>
                    <p className="text-[10px] text-slate-500">{cm.role}</p>
                  </div>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500" title="Active"></span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
