import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { 
  BookOpen, 
  Calculator, 
  FlaskConical, 
  Globe, 
  Languages, 
  Monitor, 
  ArrowRight,
  FileText,
  BookmarkCheck
} from 'lucide-react';

export const Subjects: React.FC = () => {
  const { student } = useAuth();
  const [selectedClass, setSelectedClass] = useState<string>(student?.class_name || '8');
  const [subjectsList, setSubjectsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const classesList = ['Nursery', 'LKG', 'UKG', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th'];

  useEffect(() => {
    const fetchSubjects = async () => {
      setLoading(true);
      try {
        const res = await api.getSubjects(selectedClass);
        setSubjectsList(res.subjects);
      } catch (err) {
        console.warn('Failed to load subjects for class', selectedClass);
      } finally {
        setLoading(false);
      }
    };
    fetchSubjects();
  }, [selectedClass]);

  const getSubjectIcon = (title: string) => {
    const lower = title.toLowerCase();
    if (lower.includes('math')) return <Calculator className="w-7 h-7 text-blue-600" />;
    if (lower.includes('sci')) return <FlaskConical className="w-7 h-7 text-emerald-600" />;
    if (lower.includes('eng')) return <BookOpen className="w-7 h-7 text-indigo-600" />;
    if (lower.includes('soc') || lower.includes('sst')) return <Globe className="w-7 h-7 text-amber-600" />;
    if (lower.includes('hin')) return <Languages className="w-7 h-7 text-red-600" />;
    return <Monitor className="w-7 h-7 text-purple-600" />;
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Academic Curriculum</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Class Subjects & Textbooks</h1>
          <p className="text-xs text-slate-500 mt-1">
            Click on any subject card to view assigned homework, textbooks, and topic syllabus.
          </p>
        </div>

        {/* Class Selector Dropdown */}
        <div className="flex items-center space-x-2 bg-slate-100 p-2 rounded-2xl border border-slate-200">
          <span className="text-xs font-bold text-slate-700 pl-2">Select Class:</span>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="bg-white px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold text-blue-700 outline-none cursor-pointer"
          >
            {classesList.map((c) => (
              <option key={c} value={c}>Class {c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Subjects Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjectsList.map((subj) => (
          <Link
            key={subj.id}
            to={`/subjects/${subj.id}`}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:border-blue-500 transition-all duration-200 group flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {getSubjectIcon(subj.title)}
                </div>
                {subj.pending_homework_count > 0 && (
                  <span className="bg-amber-100 text-amber-800 text-xs px-2.5 py-1 rounded-full font-bold flex items-center space-x-1">
                    <FileText className="w-3.5 h-3.5 text-amber-600" />
                    <span>{subj.pending_homework_count} Homework</span>
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                  {subj.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Teacher: {subj.teacher_name}</p>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-2">
                  {subj.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center space-x-1.5 font-medium text-slate-700">
                  <BookmarkCheck className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="truncate">{subj.textbook_title}</span>
                </div>
                <div className="text-[11px] text-slate-500">
                  Includes {subj.chapter_count} Textbook Chapters & Practice Topics
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-100 flex justify-between items-center text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
              <span>Open Subject & Homework</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
