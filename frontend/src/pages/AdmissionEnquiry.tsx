import React, { useState } from 'react';
import { api } from '../services/api';
import { UserPlus, CheckCircle2, AlertCircle, Send, ShieldCheck } from 'lucide-react';

export const AdmissionEnquiry: React.FC = () => {
  const [studentName, setStudentName] = useState('');
  const [parentName, setParentName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [classApplying, setClassApplying] = useState('Class 6');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedEnquiryId, setSubmittedEnquiryId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const classesList = [
    'Nursery', 'LKG', 'UKG', 
    'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 
    'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!studentName || !parentName || !phone) {
      setErrorMsg('Please fill in all required fields (Student Name, Parent Name, and Phone Number).');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await api.submitAdmissionEnquiry({
        student_name: studentName,
        parent_name: parentName,
        phone,
        email,
        class_applying: classApplying,
        message
      });

      setSubmittedEnquiryId(res.enquiry_id || 'ENQ-2026-8812');
    } catch (err: any) {
      setErrorMsg(err.message || 'Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      
      {/* Page Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex p-3 rounded-2xl bg-blue-100 text-blue-700 mx-auto shadow-sm">
          <UserPlus className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900">Admission Enquiry Form</h1>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Admissions open for academic session 2026-2027. Fill in the enquiry details below to connect with our admissions officer.
        </p>
      </div>

      {!submittedEnquiryId ? (
        <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-lg space-y-6">
          
          {errorMsg && (
            <div className="p-4 bg-red-50 text-red-700 text-xs font-bold rounded-2xl border border-red-200 flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Student Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Student Name *
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 outline-none"
                placeholder="Enter candidate student name"
              />
            </div>

            {/* Parent Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Parent / Guardian Name *
              </label>
              <input
                type="text"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 outline-none"
                placeholder="Enter father's / mother's name"
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Phone Number *
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 outline-none font-mono"
                placeholder="+91 98765 43210"
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 outline-none"
                placeholder="parent@example.com"
              />
            </div>

          </div>

          {/* Class Applying For */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Class Applying For *
            </label>
            <select
              value={classApplying}
              onChange={(e) => setClassApplying(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 outline-none cursor-pointer"
            >
              {classesList.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Message / Specific Questions
            </label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 outline-none"
              placeholder="Ask about school prospectus, bus transport, lab facilities..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-2xl school-gradient text-white font-extrabold text-base shadow-xl hover:brightness-110 transition-all flex items-center justify-center space-x-2 disabled:opacity-70"
          >
            {isSubmitting ? (
              <span>Submitting Enquiry...</span>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Submit Admission Enquiry</span>
              </>
            )}
          </button>

        </form>
      ) : (
        /* Prompt Section 15 Required Confirmation Message */
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl text-center space-y-5 animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-900">
              Your admission enquiry has been submitted successfully.
            </h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Our admissions counselor will contact you within 24 hours via phone or email.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 max-w-sm mx-auto text-xs font-mono">
            <span className="text-slate-500 block">Enquiry Reference ID:</span>
            <span className="text-lg font-bold text-blue-700">{submittedEnquiryId}</span>
          </div>

          <button
            onClick={() => {
              setSubmittedEnquiryId(null);
              setStudentName('');
              setParentName('');
              setPhone('');
              setEmail('');
              setMessage('');
            }}
            className="py-3 px-8 rounded-xl school-gradient text-white font-bold text-xs shadow hover:brightness-110"
          >
            Submit Another Enquiry
          </button>
        </div>
      )}

    </div>
  );
};
