import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { 
  User as UserIcon, 
  Lock, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Users, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Settings,
  Edit3
} from 'lucide-react';

export const Profile: React.FC = () => {
  const { user, student, updateStudent, refreshProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'settings'>('profile');

  // Settings form states
  const [phone, setPhone] = useState(student?.phone || '+91 98765 43210');
  const [email, setEmail] = useState(student?.email || 'rahul.kumar@abcschool.edu.in');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isUpdating, setIsUpdating] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleUpdateSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg(null);

    if (newPassword) {
      if (!currentPassword) {
        setStatusMsg({ type: 'error', text: 'Please enter your current password to set a new password.' });
        return;
      }
      if (newPassword.length < 6) {
        setStatusMsg({ type: 'error', text: 'New password must be at least 6 characters.' });
        return;
      }
      if (newPassword !== confirmPassword) {
        setStatusMsg({ type: 'error', text: 'New password and confirm password do not match.' });
        return;
      }
    }

    setIsUpdating(true);

    try {
      const res = await api.updateProfile({
        phone,
        email,
        current_password: currentPassword,
        new_password: newPassword
      });

      updateStudent(res.student);
      setStatusMsg({ type: 'success', text: 'Profile updated successfully.' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: err.message || 'Failed to update profile settings.' });
    } finally {
      setIsUpdating(false);
    }
  };

  const studentName = student?.name || user?.name || 'Rahul Kumar';
  const admissionNo = student?.admission_no || user?.admission_no || '20260125';

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header Profile Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
          <img
            src={student?.photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'}
            alt={studentName}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover ring-4 ring-blue-600/30 shadow-lg"
          />

          <div className="text-center sm:text-left space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{studentName}</h1>
              <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-bold">
                Student Profile
              </span>
            </div>

            <p className="text-xs font-mono text-slate-500">
              Admission No: <strong className="text-slate-900">{admissionNo}</strong> | Academic Year: 2026-2027
            </p>

            <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-xs font-semibold text-slate-700 pt-2">
              <span className="bg-slate-100 px-3 py-1 rounded-xl">Class: {student?.class_name || '8'}</span>
              <span className="bg-slate-100 px-3 py-1 rounded-xl">Section: {student?.section || 'A'}</span>
              <span className="bg-slate-100 px-3 py-1 rounded-xl">Roll No: {student?.roll_no || '18'}</span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 text-xs font-bold w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl transition-all ${
                activeTab === 'profile' 
                  ? 'bg-white text-blue-700 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              👤 Profile Overview
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl transition-all ${
                activeTab === 'settings' 
                  ? 'bg-white text-blue-700 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ⚙️ Account Settings
            </button>
          </div>
        </div>
      </div>

      {/* Tab 1: Profile Overview (Section 14 fields) */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Personal Details */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2 border-b pb-3 border-slate-100">
              <UserIcon className="w-5 h-5 text-blue-600" />
              <span>Personal Student Details</span>
            </h2>

            <div className="space-y-3.5 text-xs">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Full Name:</span>
                <span className="font-bold text-slate-900">{studentName}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Admission Number:</span>
                <span className="font-bold text-slate-900 font-mono">{admissionNo}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Class & Section:</span>
                <span className="font-bold text-slate-900">Class {student?.class_name || '8'} - Section {student?.section || 'A'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Date of Birth:</span>
                <span className="font-bold text-slate-900">{student?.dob || '12 May 2012'}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-500 font-medium">Academic Roll No:</span>
                <span className="font-bold text-slate-900">{student?.roll_no || '18'}</span>
              </div>
            </div>
          </div>

          {/* Guardian & Contact Information */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2 border-b pb-3 border-slate-100">
              <Users className="w-5 h-5 text-purple-600" />
              <span>Guardian & Contact Information</span>
            </h2>

            <div className="space-y-3.5 text-xs">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Parent / Guardian Name:</span>
                <span className="font-bold text-slate-900">{student?.parent_name || 'Rajesh Kumar'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Phone Number:</span>
                <span className="font-bold text-slate-900 font-mono">{student?.phone || '+91 98765 43210'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Registered Email:</span>
                <span className="font-bold text-slate-900 font-mono">{student?.email || 'rahul.kumar@abcschool.edu.in'}</span>
              </div>
              <div className="py-2 space-y-1">
                <span className="text-slate-500 font-medium block">Residential Address:</span>
                <span className="font-bold text-slate-900 block leading-relaxed">
                  {student?.address || '42, Park View Enclave, Civil Lines, City - 110001'}
                </span>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Tab 2: Settings Section (Section 14 Change Password & Add/Change Phone Number) */}
      {activeTab === 'settings' && (
        <div className="max-w-2xl bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b pb-4 border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <Settings className="w-5 h-5 text-blue-600" />
              <span>Account Settings & Credentials</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">Update your security password or contact details</p>
          </div>

          {statusMsg && (
            <div className={`p-4 rounded-2xl text-xs font-bold flex items-center space-x-2 ${
              statusMsg.type === 'success' 
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {statusMsg.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" /> : <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />}
              <span>{statusMsg.text}</span>
            </div>
          )}

          <form onSubmit={handleUpdateSettings} className="space-y-6">
            
            {/* Contact Updates */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Contact Information</h3>
              
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Add / Change Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 outline-none"
                    placeholder="+91 XXXXX XXXXX"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Registered Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 outline-none"
                    placeholder="student@abcschool.edu.in"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Password Change */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Change Password</h3>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 outline-none font-mono"
                  placeholder="Enter current password"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 outline-none font-mono"
                    placeholder="New password (min 6 chars)"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Confirm New Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 outline-none font-mono"
                    placeholder="Re-enter new password"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isUpdating}
              className="py-3.5 px-8 rounded-2xl school-gradient text-white font-extrabold text-sm shadow-lg hover:brightness-110 transition-all disabled:opacity-75"
            >
              {isUpdating ? 'Saving Changes...' : 'Save Profile Settings'}
            </button>
          </form>
        </div>
      )}

    </div>
  );
};
