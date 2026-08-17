import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { 
  ShieldCheck, 
  Users, 
  FileText, 
  Calendar, 
  Bell, 
  UserPlus, 
  CheckCircle2, 
  AlertCircle,
  Plus,
  BookOpen
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'homework' | 'announcements' | 'enquiries'>('overview');
  const [adminData, setAdminData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // New Student Form State
  const [newStudent, setNewStudent] = useState({
    admission_no: '20260999',
    name: 'Anjali Sharma',
    class_name: '8',
    section: 'A',
    parent_name: 'Manish Sharma',
    phone: '+91 98111 22233'
  });

  // New Homework Form State
  const [newHw, setNewHw] = useState({
    subject_id: 'subj-math',
    class_name: '8',
    title: 'Chapter 6 - Quadrilaterals Worksheet',
    description: 'Solve practice problems 1 to 5 from chapter 6 workbook.',
    due_date: '2026-08-25'
  });

  // New Announcement Form State
  const [newAnn, setNewAnn] = useState({
    class_name: '8-A',
    title: '📢 Science Exhibition Registration',
    content: 'All class 8-A students must register their science project models by Friday.',
    category: 'academic'
  });

  const [formMsg, setFormMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchAdminOverview();
  }, []);

  const fetchAdminOverview = async () => {
    try {
      const res = await api.getAdminOverview();
      setAdminData(res);
    } catch (err) {
      console.warn('Failed to load admin overview');
    } finally {
      setLoading(false);
    }
  };

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormMsg(null);
    try {
      await api.addStudent(newStudent);
      setFormMsg({ type: 'success', text: `Student ${newStudent.name} (${newStudent.admission_no}) added successfully!` });
      fetchAdminOverview();
    } catch (err: any) {
      setFormMsg({ type: 'error', text: err.message || 'Failed to add student.' });
    }
  };

  const handleAddHomework = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormMsg(null);
    try {
      await api.addHomework({
        ...newHw,
        questions: ['Solve Q1-Q5 on page 102']
      });
      setFormMsg({ type: 'success', text: 'Homework assignment published to Class ' + newHw.class_name + '!' });
      fetchAdminOverview();
    } catch (err: any) {
      setFormMsg({ type: 'error', text: err.message || 'Failed to publish homework.' });
    }
  };

  const handleAddAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormMsg(null);
    try {
      await api.createAnnouncement(newAnn);
      setFormMsg({ type: 'success', text: 'Class notice published successfully!' });
      fetchAdminOverview();
    } catch (err: any) {
      setFormMsg({ type: 'error', text: err.message || 'Failed to publish notice.' });
    }
  };

  const handleUpdateEnquiry = async (id: string, status: string) => {
    try {
      await api.updateEnquiryStatus(id, status);
      fetchAdminOverview();
    } catch (e) {
      alert('Failed to update enquiry status');
    }
  };

  const stats = adminData?.stats || {
    total_students: 32,
    total_teachers: 12,
    pending_enquiries: 4,
    unread_messages: 2,
    total_homework_assigned: 8
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <span>Administrative Controls</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold">Teacher & Admin Portal</h1>
          <p className="text-xs text-slate-300 mt-1">Manage students, mark attendance, publish homework, and handle enquiries.</p>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap bg-slate-800 p-1.5 rounded-2xl border border-slate-700 text-xs font-bold w-full md:w-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl transition-all ${activeTab === 'overview' ? 'bg-blue-600 text-white shadow' : 'text-slate-300 hover:text-white'}`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('students')}
            className={`px-4 py-2 rounded-xl transition-all ${activeTab === 'students' ? 'bg-blue-600 text-white shadow' : 'text-slate-300 hover:text-white'}`}
          >
            Students
          </button>
          <button
            onClick={() => setActiveTab('homework')}
            className={`px-4 py-2 rounded-xl transition-all ${activeTab === 'homework' ? 'bg-blue-600 text-white shadow' : 'text-slate-300 hover:text-white'}`}
          >
            Homework
          </button>
          <button
            onClick={() => setActiveTab('announcements')}
            className={`px-4 py-2 rounded-xl transition-all ${activeTab === 'announcements' ? 'bg-blue-600 text-white shadow' : 'text-slate-300 hover:text-white'}`}
          >
            Notices
          </button>
          <button
            onClick={() => setActiveTab('enquiries')}
            className={`px-4 py-2 rounded-xl transition-all ${activeTab === 'enquiries' ? 'bg-blue-600 text-white shadow' : 'text-slate-300 hover:text-white'}`}
          >
            Enquiries
          </button>
        </div>
      </div>

      {formMsg && (
        <div className={`p-4 rounded-2xl text-xs font-bold flex items-center space-x-2 ${
          formMsg.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {formMsg.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" /> : <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />}
          <span>{formMsg.text}</span>
        </div>
      )}

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <p className="text-xs font-medium text-slate-500">Total Enrolled Students</p>
              <p className="text-3xl font-extrabold text-slate-900 mt-1">{stats.total_students}</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <p className="text-xs font-medium text-slate-500">Active Faculty Members</p>
              <p className="text-3xl font-extrabold text-blue-700 mt-1">{stats.total_teachers}</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <p className="text-xs font-medium text-slate-500">Pending Admission Enquiries</p>
              <p className="text-3xl font-extrabold text-amber-600 mt-1">{stats.pending_enquiries}</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <p className="text-xs font-medium text-slate-500">Unread Public Messages</p>
              <p className="text-3xl font-extrabold text-purple-600 mt-1">{stats.unread_messages}</p>
            </div>
          </div>
        </div>
      )}

      {/* Students Tab */}
      {activeTab === 'students' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form to Add Student */}
          <form onSubmit={handleAddStudent} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2 border-b pb-3">
              <UserPlus className="w-5 h-5 text-blue-600" />
              <span>Add New Student Record</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Admission Number</label>
                <input
                  type="text"
                  value={newStudent.admission_no}
                  onChange={(e) => setNewStudent({ ...newStudent, admission_no: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono outline-none"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Student Full Name</label>
                <input
                  type="text"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Class</label>
                  <input
                    type="text"
                    value={newStudent.class_name}
                    onChange={(e) => setNewStudent({ ...newStudent, class_name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Section</label>
                  <input
                    type="text"
                    value={newStudent.section}
                    onChange={(e) => setNewStudent({ ...newStudent, section: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Parent Name</label>
                <input
                  type="text"
                  value={newStudent.parent_name}
                  onChange={(e) => setNewStudent({ ...newStudent, parent_name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl school-gradient text-white font-bold text-xs shadow hover:brightness-110"
            >
              Add Student to Database
            </button>
          </form>

          {/* Student Roster Table */}
          <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b pb-3">Enrolled Student Directory</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 font-bold text-slate-500 uppercase">
                    <th className="py-2.5 px-3">Adm No</th>
                    <th className="py-2.5 px-3">Student Name</th>
                    <th className="py-2.5 px-3">Class</th>
                    <th className="py-2.5 px-3">Parent Name</th>
                    <th className="py-2.5 px-3">Phone</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {adminData?.students?.map((s: any) => (
                    <tr key={s.id}>
                      <td className="py-3 px-3 font-mono font-bold text-blue-700">{s.admission_no}</td>
                      <td className="py-3 px-3 font-bold text-slate-900">{s.name}</td>
                      <td className="py-3 px-3">Class {s.class_name}-{s.section}</td>
                      <td className="py-3 px-3 text-slate-600">{s.parent_name}</td>
                      <td className="py-3 px-3 font-mono text-slate-600">{s.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Homework Tab */}
      {activeTab === 'homework' && (
        <form onSubmit={handleAddHomework} className="max-w-2xl bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 border-b pb-3">Assign Homework to Class</h3>
          <div className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Homework Title</label>
              <input
                type="text"
                value={newHw.title}
                onChange={(e) => setNewHw({ ...newHw, title: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 outline-none"
                required
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Description & Instructions</label>
              <textarea
                rows={3}
                value={newHw.description}
                onChange={(e) => setNewHw({ ...newHw, description: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 outline-none"
                required
              ></textarea>
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Due Date</label>
              <input
                type="date"
                value={newHw.due_date}
                onChange={(e) => setNewHw({ ...newHw, due_date: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 outline-none"
                required
              />
            </div>
          </div>
          <button type="submit" className="py-3 px-6 rounded-xl school-gradient text-white font-bold text-xs shadow">
            Publish Homework
          </button>
        </form>
      )}

      {/* Announcements Tab */}
      {activeTab === 'announcements' && (
        <form onSubmit={handleAddAnnouncement} className="max-w-2xl bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 border-b pb-3">Post Class Announcement</h3>
          <div className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Notice Headline</label>
              <input
                type="text"
                value={newAnn.title}
                onChange={(e) => setNewAnn({ ...newAnn, title: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 outline-none"
                required
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Content</label>
              <textarea
                rows={3}
                value={newAnn.content}
                onChange={(e) => setNewAnn({ ...newAnn, content: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 outline-none"
                required
              ></textarea>
            </div>
          </div>
          <button type="submit" className="py-3 px-6 rounded-xl school-gradient text-white font-bold text-xs shadow">
            Post Announcement
          </button>
        </form>
      )}

      {/* Enquiries Tab */}
      {activeTab === 'enquiries' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 border-b pb-3">Public Admission Enquiries</h3>
          <div className="space-y-3 text-xs">
            {adminData?.admission_enquiries?.map((enq: any) => (
              <div key={enq.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-900">{enq.student_name}</span>
                    <span className="bg-blue-100 text-blue-800 text-[10px] px-2 py-0.5 rounded font-bold">{enq.class_applying}</span>
                  </div>
                  <p className="text-slate-600 mt-1">Parent: {enq.parent_name} ({enq.phone})</p>
                  <p className="text-slate-500 italic mt-0.5">"{enq.message}"</p>
                </div>
                <div className="space-x-2">
                  {enq.status === 'pending' ? (
                    <button
                      onClick={() => handleUpdateEnquiry(enq.id, 'reviewed')}
                      className="py-1.5 px-3 rounded-lg bg-emerald-600 text-white font-bold text-xs"
                    >
                      Mark Contacted
                    </button>
                  ) : (
                    <span className="text-emerald-700 font-bold">Contacted</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
