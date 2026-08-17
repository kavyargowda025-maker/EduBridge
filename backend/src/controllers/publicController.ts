import { Request, Response } from 'express';
import { db } from '../config/database';

export const submitAdmissionEnquiry = (req: Request, res: Response) => {
  const { student_name, parent_name, phone, email, class_applying, message } = req.body;

  if (!student_name || !parent_name || !phone || !class_applying) {
    return res.status(400).json({ message: 'Student Name, Parent Name, Phone, and Class Applying For are required fields.' });
  }

  const store = db.getStore();
  const enquiryId = `ENQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;

  const newEnquiry = {
    id: enquiryId,
    student_name,
    parent_name,
    phone,
    email: email || 'N/A',
    class_applying,
    message: message || '',
    status: 'pending' as const,
    created_at: new Date().toLocaleString()
  };

  store.admission_enquiries.unshift(newEnquiry);
  db.saveData();

  return res.status(201).json({
    message: 'Your admission enquiry has been submitted successfully.',
    enquiry_id: enquiryId,
    enquiry: newEnquiry
  });
};

export const submitContactMessage = (req: Request, res: Response) => {
  const { name, phone, email, message } = req.body;

  if (!name || !phone || !message) {
    return res.status(400).json({ message: 'Name, Phone number, and Message are required.' });
  }

  const store = db.getStore();
  const msgId = `MSG-2026-${Math.floor(1000 + Math.random() * 9000)}`;

  const newMsg = {
    id: msgId,
    name,
    phone,
    email: email || 'N/A',
    message,
    status: 'new' as const,
    created_at: new Date().toLocaleString()
  };

  store.contact_messages.unshift(newMsg);
  db.saveData();

  return res.status(201).json({
    message: 'Thank you for reaching out! Your message has been received. Our team will contact you shortly.',
    message_id: msgId
  });
};

export const getPublicFeeStructure = (req: Request, res: Response) => {
  const feeStructure = [
    { class_range: 'Nursery - UKG (Pre-Primary)', annual_tuition: 36000, admission_fee: 5000, lab_activity_fee: 3000, term_instalment: 9000 },
    { class_range: '1st - 5th Class (Primary)', annual_tuition: 48000, admission_fee: 8000, lab_activity_fee: 4000, term_instalment: 12000 },
    { class_range: '6th - 8th Class (Middle)', annual_tuition: 60000, admission_fee: 10000, lab_activity_fee: 5000, term_instalment: 15000 },
    { class_range: '9th - 10th Class (Secondary)', annual_tuition: 72000, admission_fee: 12000, lab_activity_fee: 6000, term_instalment: 18000 }
  ];

  return res.json({ feeStructure });
};

export const getSchoolInfo = (req: Request, res: Response) => {
  return res.json({
    name: 'Horizon International School',
    tagline: 'Knowledge • Innovation • Excellence',
    established: '2010',
    stats: {
      experience_years: '15+',
      academic_excellence: '95%',
      enrolled_students: '2000+',
      qualified_teachers: '100+'
    },
    contact: {
      phones: ['+91 98765 43210', '+91 98765 43211', '+91 11 2345 6789'],
      email: 'info@horizonschool.edu.in',
      address: 'Knowledge Campus, Ring Road, Sector 4, City - 110001',
      office_hours: 'Monday – Saturday: 8:00 AM – 4:00 PM'
    }
  });
};
