import React, { useState } from 'react';
import { CreditCard, CheckCircle2, ShieldCheck, Download, Loader2, ArrowRight } from 'lucide-react';
import { api } from '../services/api';

interface PaymentModalProps {
  studentName: string;
  admissionNo: string;
  amount: number;
  historyId?: string;
  onSuccess: (receipt: any) => void;
  onClose: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  studentName,
  admissionNo,
  amount,
  historyId,
  onSuccess,
  onClose,
}) => {
  const [method, setMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('rahul.kumar@upi');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8892');
  const [isProcessing, setIsProcessing] = useState(false);
  const [receipt, setReceipt] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handlePayNow = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrorMsg('');

    try {
      const res = await api.payFee({
        history_id: historyId,
        amount,
        payment_method: method === 'upi' ? 'Online UPI' : method === 'card' ? 'Credit/Debit Card' : 'Net Banking'
      });

      setReceipt(res.receipt);
      onSuccess(res.receipt);
    } catch (err: any) {
      setErrorMsg(err.message || 'Payment processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100">
        
        {/* Modal Header */}
        <div className="school-gradient p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 p-1.5 rounded-full hover:bg-white/20 transition-colors"
          >
            ✕
          </button>
          <div className="flex items-center space-x-2 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Secure Fee Portal</span>
          </div>
          <h2 className="text-xl font-bold">School Fee Payment</h2>
          <p className="text-xs text-blue-100 mt-1">Student: {studentName} ({admissionNo})</p>
        </div>

        {!receipt ? (
          <form onSubmit={handlePayNow} className="p-6 space-y-5">
            {errorMsg && (
              <div className="p-3 bg-red-50 text-red-700 text-xs font-medium rounded-xl border border-red-200">
                {errorMsg}
              </div>
            )}

            {/* Amount Banner */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex justify-between items-center">
              <div>
                <p className="text-xs text-slate-500 font-medium">Installment Amount Due</p>
                <p className="text-2xl font-bold text-slate-900">₹{amount.toLocaleString('en-IN')}</p>
              </div>
              <span className="bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full font-bold">
                Pending Payment
              </span>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Select Payment Method
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setMethod('upi')}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all ${
                    method === 'upi' 
                      ? 'border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-600/20' 
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  UPI (GPay/PhonePe)
                </button>
                <button
                  type="button"
                  onClick={() => setMethod('card')}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all ${
                    method === 'card' 
                      ? 'border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-600/20' 
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Debit / Credit Card
                </button>
                <button
                  type="button"
                  onClick={() => setMethod('netbanking')}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all ${
                    method === 'netbanking' 
                      ? 'border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-600/20' 
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Net Banking
                </button>
              </div>
            </div>

            {/* Method Inputs */}
            {method === 'upi' && (
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">Enter VPA / UPI ID</label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                  placeholder="username@upi"
                  required
                />
              </div>
            )}

            {method === 'card' && (
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-slate-700">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none font-mono"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-slate-700">Expiry Date</label>
                    <input
                      type="text"
                      defaultValue="08/29"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-700">CVV</label>
                    <input
                      type="password"
                      defaultValue="782"
                      maxLength={3}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm outline-none font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {method === 'netbanking' && (
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">Select Bank</label>
                <select className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm outline-none">
                  <option>State Bank of India (SBI)</option>
                  <option>HDFC Bank</option>
                  <option>ICICI Bank</option>
                  <option>Axis Bank</option>
                  <option>Punjab National Bank</option>
                </select>
              </div>
            )}

            {/* Pay Action Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3.5 rounded-xl school-gradient text-white font-bold text-sm shadow-lg hover:brightness-110 transition-all flex items-center justify-center space-x-2 disabled:opacity-75"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Processing Payment...</span>
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5" />
                  <span>Pay ₹{amount.toLocaleString('en-IN')} Instantly</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
          </form>
        ) : (
          /* Receipt Success State */
          <div className="p-6 space-y-5 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900">Payment Successful!</h3>
              <p className="text-xs text-slate-500 mt-1">Transaction recorded in school fee ledger</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left space-y-2 font-mono text-xs">
              <div className="flex justify-between border-b pb-1.5 border-slate-200">
                <span className="text-slate-500">Receipt No:</span>
                <span className="font-bold text-slate-900">{receipt.receipt_no}</span>
              </div>
              <div className="flex justify-between border-b pb-1.5 border-slate-200">
                <span className="text-slate-500">Paid Amount:</span>
                <span className="font-bold text-emerald-700">₹{amount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between border-b pb-1.5 border-slate-200">
                <span className="text-slate-500">Date:</span>
                <span className="text-slate-900">{receipt.payment_date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Method:</span>
                <span className="text-slate-900">{receipt.method}</span>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => alert(`Receipt ${receipt.receipt_no} saved as PDF!`)}
                className="flex-1 py-3 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold flex items-center justify-center space-x-1.5 hover:bg-slate-50"
              >
                <Download className="w-4 h-4" />
                <span>Download Receipt</span>
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-xl school-gradient text-white text-xs font-bold shadow-md hover:brightness-110"
              >
                Done
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
