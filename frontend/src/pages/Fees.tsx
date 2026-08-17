import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { PaymentModal } from '../components/PaymentModal';
import { CreditCard, CheckCircle2, AlertCircle, Download, ShieldCheck, ArrowUpRight } from 'lucide-react';

export const Fees: React.FC = () => {
  const { student, user } = useAuth();
  const [feeData, setFeeData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedInstallment, setSelectedInstallment] = useState<any | null>(null);

  useEffect(() => {
    const fetchFees = async () => {
      try {
        const res = await api.getFees();
        setFeeData(res.fee);
      } catch (err) {
        console.warn('Using default fee structure');
      } finally {
        setLoading(false);
      }
    };
    fetchFees();
  }, []);

  const handlePayClick = (item: any) => {
    setSelectedInstallment(item);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = (receipt: any) => {
    // Refresh fee status
    if (feeData) {
      const updatedHistory = feeData.history.map((h: any) => 
        h.id === receipt.id || h.status === 'pending' ? receipt : h
      );
      const paidSum = feeData.paid_amount + receipt.amount;
      const dueSum = Math.max(0, feeData.total_amount - paidSum);
      setFeeData({
        ...feeData,
        paid_amount: paidSum,
        due_amount: dueSum,
        history: updatedHistory
      });
    }
  };

  const fee = feeData || {
    total_amount: 60000,
    paid_amount: 45000,
    due_amount: 15000,
    history: [
      { id: 'fh-1', month: 'June 2026 (Q1 Term)', amount: 15000, status: 'paid', payment_date: '2026-06-05', receipt_no: 'REC-2026-091', method: 'Online UPI' },
      { id: 'fh-2', month: 'July 2026 (Q2 Term)', amount: 15000, status: 'paid', payment_date: '2026-07-03', receipt_no: 'REC-2026-442', method: 'Debit Card' },
      { id: 'fh-3', month: 'August 2026 (Q3 Term)', amount: 15000, status: 'paid', payment_date: '2026-08-02', receipt_no: 'REC-2026-881', method: 'Net Banking' },
      { id: 'fh-4', month: 'September 2026 (Q4 Term)', amount: 15000, status: 'pending' }
    ]
  };

  const percentagePaid = Math.round((fee.paid_amount / fee.total_amount) * 100);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-600 text-xs font-bold uppercase tracking-wider mb-1">
            <CreditCard className="w-4 h-4" />
            <span>Financial & Fees Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Student Fee Management</h1>
          <p className="text-xs text-slate-500 mt-1">
            Annual fee structure, payment history, and instant online fee payment.
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-2xl flex items-center space-x-3 text-amber-900">
          <ShieldCheck className="w-6 h-6 text-amber-600 shrink-0" />
          <div>
            <p className="text-xs font-bold">Encrypted Payment Ledger</p>
            <p className="text-[11px] text-amber-700">Official receipt generated for all transactions</p>
          </div>
        </div>
      </div>

      {/* Major Financial Overview Cards (Matches section 13 requirement) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Total Fee Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Annual Fees</p>
          <p className="text-3xl font-extrabold text-slate-900">₹{fee.total_amount.toLocaleString('en-IN')}</p>
          <p className="text-xs text-slate-400">Class 8 Tuition & Academic Fee</p>
        </div>

        {/* Fees Paid Card */}
        <div className="bg-emerald-500 text-white p-6 rounded-3xl shadow-lg space-y-2 relative overflow-hidden">
          <div className="flex justify-between items-start">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-100">Fees Paid</p>
            <span className="bg-white/20 text-white text-xs px-2.5 py-0.5 rounded-full font-bold">
              {percentagePaid}% Cleared
            </span>
          </div>
          <p className="text-3xl font-extrabold">₹{fee.paid_amount.toLocaleString('en-IN')}</p>
          <div className="w-full bg-emerald-700 h-2 rounded-full overflow-hidden mt-3">
            <div className="bg-white h-full transition-all duration-500" style={{ width: `${percentagePaid}%` }}></div>
          </div>
        </div>

        {/* Remaining Fees Card */}
        <div className="bg-amber-500 text-white p-6 rounded-3xl shadow-lg space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-100">Remaining Due</p>
              {fee.due_amount > 0 && (
                <span className="bg-white text-amber-800 text-[11px] px-2 py-0.5 rounded-full font-bold">
                  Action Required
                </span>
              )}
            </div>
            <p className="text-3xl font-extrabold mt-1">₹{fee.due_amount.toLocaleString('en-IN')}</p>
          </div>

          {fee.due_amount > 0 ? (
            <button
              onClick={() => handlePayClick(fee.history.find((h: any) => h.status === 'pending') || { amount: fee.due_amount })}
              className="w-full py-3 rounded-2xl bg-white text-slate-900 font-extrabold text-xs shadow hover:bg-slate-100 transition-all flex items-center justify-center space-x-1.5"
            >
              <span>Pay ₹{fee.due_amount.toLocaleString('en-IN')} Online Now</span>
              <ArrowUpRight className="w-4 h-4 text-amber-600" />
            </button>
          ) : (
            <span className="text-xs font-bold bg-emerald-600/60 p-2 rounded-xl text-center block">
              ✓ All Installments Paid in Full
            </span>
          )}
        </div>

      </div>

      {/* Fee History Table (Matches section 13 mockup requirement) */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
            <CreditCard className="w-5 h-5 text-blue-600" />
            <span>Installment Fee History & Status</span>
          </h2>
          <span className="text-xs text-slate-500 font-mono">Academic Year 2026-2027</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Installment Term</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Payment Date</th>
                <th className="py-3.5 px-4">Receipt No</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {fee.history.map((item: any) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-4 font-bold text-slate-900">{item.month}</td>
                  <td className="py-4 px-4 font-mono font-bold text-slate-800">
                    ₹{item.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-4 px-4">
                    {item.status === 'paid' ? (
                      <span className="inline-flex items-center space-x-1 bg-emerald-100 text-emerald-800 border border-emerald-300 px-3 py-1 rounded-full font-bold text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Paid</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 bg-amber-100 text-amber-800 border border-amber-300 px-3 py-1 rounded-full font-bold text-[11px]">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                        <span>Pending</span>
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-slate-600 font-mono">
                    {item.payment_date || '-'}
                  </td>
                  <td className="py-4 px-4 text-slate-600 font-mono">
                    {item.receipt_no || '-'}
                  </td>
                  <td className="py-4 px-4 text-right">
                    {item.status === 'pending' ? (
                      <button
                        onClick={() => handlePayClick(item)}
                        className="py-1.5 px-4 rounded-xl school-gradient text-white font-bold text-xs shadow hover:brightness-110"
                      >
                        Pay Now
                      </button>
                    ) : (
                      <button
                        onClick={() => alert(`Downloading official fee receipt ${item.receipt_no}...`)}
                        className="p-2 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        title="Download Receipt"
                      >
                        <Download className="w-4 h-4 inline" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <PaymentModal
          studentName={student?.name || user?.name || 'Rahul Kumar'}
          admissionNo={student?.admission_no || user?.admission_no || '20260125'}
          amount={selectedInstallment?.amount || fee.due_amount}
          historyId={selectedInstallment?.id}
          onSuccess={handlePaymentSuccess}
          onClose={() => setShowPaymentModal(false)}
        />
      )}
    </div>
  );
};
