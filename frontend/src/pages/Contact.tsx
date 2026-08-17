import React, { useState } from 'react';
import { api } from '../services/api';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMsgId, setSubmittedMsgId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name || !phone || !message) {
      setErrorMsg('Please fill in Name, Phone number, and Message.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await api.submitContactMessage({ name, phone, email, message });
      setSubmittedMsgId(res.message_id || 'MSG-2026-901');
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to send message.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-12">
      
      {/* Page Title Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-100">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Contact School Administration</h1>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          We are here to answer your questions regarding admissions, academics, and campus visits.
        </p>
      </div>

      {/* Main Grid: Contact Info & Contact Form */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

        {/* Contact Info Sidebar (2 cols) */}
        <div className="lg:col-span-2 space-y-6">

          {/* Phone Numbers Card (Matches section 18 prompt format) */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center space-x-3 text-blue-600">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <h2 className="text-base font-bold text-slate-900">Phone Numbers</h2>
            </div>
            <div className="space-y-2 text-xs font-mono font-semibold text-slate-800">
              <p className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <span>📞 Helpline 1:</span>
                <span className="text-blue-700 font-bold">+91 98765 43210</span>
              </p>
              <p className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <span>📞 Helpline 2:</span>
                <span className="text-blue-700 font-bold">+91 98765 43211</span>
              </p>
              <p className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <span>📞 Office Desk:</span>
                <span className="text-blue-700 font-bold">+91 11 2345 6789</span>
              </p>
            </div>
          </div>

          {/* Email & Address */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="space-y-3 text-xs">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Email Address</h3>
                  <p className="text-slate-600 font-mono">info@horizonschool.edu.in</p>
                  <p className="text-slate-600 font-mono">admissions@horizonschool.edu.in</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 pt-3 border-t border-slate-100">
                <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">School Campus Address</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Horizon International School, Sector 4, Knowledge Campus, Ring Road, City - 110001
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 pt-3 border-t border-slate-100">
                <Clock className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Office Hours</h3>
                  <p className="text-slate-600">Monday – Saturday: 8:00 AM – 4:00 PM</p>
                  <p className="text-slate-400 text-[11px]">Closed on Sundays & Gazetted Holidays</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Contact Form (3 cols) */}
        <div className="lg:col-span-3">
          {!submittedMsgId ? (
            <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-lg space-y-5">
              <h2 className="text-lg font-bold text-slate-900">Send Us a Direct Message</h2>

              {errorMsg && (
                <div className="p-3.5 bg-red-50 text-red-700 text-xs font-bold rounded-2xl border border-red-200 flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Full Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 outline-none"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Phone Number *</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 outline-none font-mono"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 outline-none"
                  placeholder="your.name@example.com"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Message *</label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 outline-none"
                  placeholder="Write your inquiry message here..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl school-gradient text-white font-extrabold text-sm shadow-lg hover:brightness-110 transition-all flex items-center justify-center space-x-2 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Message</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-lg text-center space-y-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Message Received!</h2>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Thank you for contacting Horizon International School. Our team will get back to you shortly.
              </p>
              <button
                onClick={() => setSubmittedMsgId(null)}
                className="py-2.5 px-6 rounded-xl school-gradient text-white font-bold text-xs"
              >
                Send Another Message
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Campus Map Embed Section */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
        <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          <span>Interactive Campus Map & Location</span>
        </h2>

        <div className="w-full h-64 rounded-2xl bg-slate-100 overflow-hidden relative border border-slate-200">
          <iframe
            title="Horizon International School Location Map"
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            src="https://maps.google.com/maps?q=New%20Delhi&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full filter saturate-150 grayscale-25"
          ></iframe>
        </div>
      </div>

    </div>
  );
};
