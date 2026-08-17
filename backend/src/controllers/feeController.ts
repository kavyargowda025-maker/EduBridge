import { Response } from 'express';
import { db } from '../config/database';
import { AuthRequest } from '../middleware/authMiddleware';

export const getFees = (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const store = db.getStore();
  const student = store.students.find((s) => s.user_id === req.user?.id);

  if (!student) {
    return res.status(404).json({ message: 'Student profile not found.' });
  }

  let feeRecord = store.fees.find((f) => f.student_id === student.id);

  if (!feeRecord) {
    feeRecord = {
      id: `fee-${student.id}`,
      student_id: student.id,
      total_amount: 60000,
      paid_amount: 45000,
      due_amount: 15000,
      history: [
        { id: 'fh-1', month: 'June 2026', amount: 15000, status: 'paid', payment_date: '2026-06-05', receipt_no: 'REC-2026-091', method: 'UPI' },
        { id: 'fh-2', month: 'July 2026', amount: 15000, status: 'paid', payment_date: '2026-07-03', receipt_no: 'REC-2026-442', method: 'Card' },
        { id: 'fh-3', month: 'August 2026', amount: 15000, status: 'paid', payment_date: '2026-08-02', receipt_no: 'REC-2026-881', method: 'Net Banking' },
        { id: 'fh-4', month: 'September 2026', amount: 15000, status: 'pending' }
      ]
    };
    store.fees.push(feeRecord);
    db.saveData();
  }

  return res.json({
    student: {
      name: student.name,
      admission_no: student.admission_no,
      class: student.class_name,
      section: student.section
    },
    fee: feeRecord
  });
};

export const payFee = (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { history_id, amount, payment_method } = req.body;
  const store = db.getStore();
  const student = store.students.find((s) => s.user_id === req.user?.id);

  if (!student) {
    return res.status(404).json({ message: 'Student profile not found.' });
  }

  const feeRecord = store.fees.find((f) => f.student_id === student.id);
  if (!feeRecord) {
    return res.status(404).json({ message: 'Fee record not found.' });
  }

  const itemIndex = feeRecord.history.findIndex((h) => h.id === history_id || h.status === 'pending');
  
  if (itemIndex >= 0) {
    const item = feeRecord.history[itemIndex];
    const paidSum = Number(amount) || item.amount;
    
    feeRecord.history[itemIndex] = {
      ...item,
      status: 'paid',
      payment_date: new Date().toISOString().split('T')[0],
      receipt_no: `REC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      method: payment_method || 'Online Payment'
    };

    feeRecord.paid_amount += paidSum;
    feeRecord.due_amount = Math.max(0, feeRecord.total_amount - feeRecord.paid_amount);

    db.saveData();

    return res.json({
      message: 'Payment received successfully! Fee status updated.',
      receipt: feeRecord.history[itemIndex],
      updated_fee: feeRecord
    });
  }

  return res.status(400).json({ message: 'No pending fee installment found to pay.' });
};
