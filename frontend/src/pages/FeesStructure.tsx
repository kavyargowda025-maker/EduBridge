import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { CreditCard, Download, ShieldCheck, CheckCircle2, HelpCircle } from 'lucide-react';

export const FeesStructure: React.FC = () => {
  const [feeRows, setFeeRows] = useState<any[]>([]);

  useEffect(() => {
    const fetchFees = async () => {
      try {
        const res = await api.getPublicFeeStructure();
        setFeeRows(res.feeStructure);
      } catch (err) {
        console.warn('Failed to load public fee structure');
      }
    };
    fetchFees();
  }, []);

  const feeTableData = feeRows.length > 0 ? feeRows : [
    { class_range: 'Nursery - UKG (Pre-Primary)', annual_tuition: 36000, admission_fee: 5000, lab_activity_fee: 3000, term_instalment: 9000 },
    { class_range: '1st - 5th Class (Primary)', annual_tuition: 48000, admission_fee: 8000, lab_activity_fee: 4000, term_instalment: 12000 },
    { class_range: '6th - 8th Class (Middle)', annual_tuition: 60000, admission_fee: 10000, lab_activity_fee: 5000, term_instalment: 15000 },
    { class_range: '9th - 10th Class (Secondary)', annual_tuition: 72000, admission_fee: 12000, lab_activity_fee: 6000, term_instalment: 18000 }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
            Public Fee Guidelines
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-2">School Fee Structure</h1>
          <p className="text-xs text-slate-500 mt-1">
            Academic Session 2026-2027 • Transparent & Installment-based Tuition Rules
          </p>
        </div>

        <button
          onClick={() => alert('Downloading Official School Fee Structure Prospectus PDF...')}
          className="py-3 px-6 rounded-2xl school-gradient text-white font-bold text-xs shadow-lg hover:brightness-110 flex items-center space-x-2"
        >
          <Download className="w-4 h-4 text-amber-300" />
          <span>Download Fee Prospectus (PDF)</span>
        </button>
      </div>

      {/* Fee Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
          <CreditCard className="w-5 h-5 text-blue-600" />
          <span>Class Grade Fee Breakdown</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-50">
                <th className="py-4 px-4 rounded-l-xl">Class Grade Level</th>
                <th className="py-4 px-4">Annual Tuition</th>
                <th className="py-4 px-4">Admission Fee</th>
                <th className="py-4 px-4">Lab & Activity Fee</th>
                <th className="py-4 px-4 rounded-r-xl">Quarterly Installment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium">
              {feeTableData.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-4 font-bold text-slate-900">{row.class_range}</td>
                  <td className="py-4 px-4 font-mono font-bold text-blue-700">₹{row.annual_tuition.toLocaleString('en-IN')}</td>
                  <td className="py-4 px-4 font-mono text-slate-700">₹{row.admission_fee.toLocaleString('en-IN')}</td>
                  <td className="py-4 px-4 font-mono text-slate-700">₹{row.lab_activity_fee.toLocaleString('en-IN')}</td>
                  <td className="py-4 px-4 font-mono font-bold text-emerald-700 bg-emerald-50/50">
                    ₹{row.term_instalment.toLocaleString('en-IN')} / Term
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Guidelines & Terms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Accepted Payment Modes</span>
          </h3>
          <ul className="space-y-2 text-xs text-slate-600">
            <li className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              <span>Online Student Portal (UPI, GPay, PhonePe, Debit/Credit Card)</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              <span>Net Banking & Demand Draft (DD) in favor of Horizon International School</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              <span>School Accounts Office Cash Counter (Mon-Sat, 9 AM - 2 PM)</span>
            </li>
          </ul>
        </div>

        <div className="bg-blue-900 text-white p-6 rounded-3xl shadow-lg space-y-3">
          <h3 className="text-base font-bold flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-amber-300" />
            <span>Installment Schedule Due Dates</span>
          </h3>
          <ul className="space-y-2 text-xs text-blue-100">
            <li><strong>Q1 (1st Term):</strong> Due at time of admission / June 10</li>
            <li><strong>Q2 (2nd Term):</strong> Due by September 10</li>
            <li><strong>Q3 (3rd Term):</strong> Due by December 10</li>
            <li><strong>Q4 (4th Term):</strong> Due by March 10</li>
          </ul>
        </div>
      </div>

    </div>
  );
};
