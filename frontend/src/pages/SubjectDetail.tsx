import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { 
  BookOpen, 
  FileText, 
  CheckCircle2, 
  Clock, 
  ArrowLeft, 
  ChevronRight, 
  Download, 
  Sparkles,
  Bookmark,
  X
} from 'lucide-react';

export const SubjectDetail: React.FC = () => {
  const { subject_id } = useParams<{ subject_id: string }>();
  const [activeTab, setActiveTab] = useState<'homework' | 'textbook'>('homework');
  const [subjectData, setSubjectData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [submittingHwId, setSubmittingHwId] = useState<string | null>(null);
  const [activeChapterModal, setActiveChapterModal] = useState<any | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!subject_id) return;
      try {
        const res = await api.getSubjectDetail(subject_id);
        setSubjectData(res);
      } catch (err) {
        console.warn('Failed to load subject detail');
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [subject_id]);

  const handleHomeworkSubmit = async (hwId: string) => {
    setSubmittingHwId(hwId);
    try {
      await api.submitHomework(hwId);
      if (subjectData) {
        const updatedHw = subjectData.homework.map((h: any) => 
          h.id === hwId ? { ...h, status: 'submitted' } : h
        );
        setSubjectData({ ...subjectData, homework: updatedHw });
      }
    } catch (err) {
      alert('Failed to submit homework');
    } finally {
      setSubmittingHwId(null);
    }
  };

  const subject = subjectData?.subject || {
    id: subject_id,
    title: 'Mathematics',
    code: 'MATH8',
    teacher_name: 'Mrs. Priya Sharma',
    description: 'Algebra, Linear Equations, Quadrilaterals, Data Handling'
  };

  const homeworkList = subjectData?.homework || [
    {
      id: 'hw-1',
      title: 'Today\'s Homework: Chapter 5 - Algebra',
      description: 'Solve the following algebraic equations in your homework notebook and show step-by-step working:',
      questions: [
        '1. 5x + 10 = 35',
        '2. 3x - 7 = 14',
        '3. 2x + 8 = 24',
        '4. Solve: 4(y - 3) = 2y + 10'
      ],
      assigned_date: '2026-08-16',
      due_date: '18 August 2026',
      status: 'pending'
    }
  ];

  const textbook = subjectData?.textbook || {
    book_title: 'NCERT Mathematics Class 8',
    author: 'NCERT Editorial Board',
    chapters: [
      {
        chapter_number: 1,
        title: 'Chapter 1 - Rational Numbers',
        summary: 'Properties of rational numbers, closure, commutativity, associativity, and representation on number line.',
        topics: ['1.1 Properties of Rational Numbers', '1.2 Representation on Number Line', '1.3 Finding Rational Numbers between numbers']
      },
      {
        chapter_number: 2,
        title: 'Chapter 2 - Linear Equations in One Variable',
        summary: 'Solving linear equations with variables on one or both sides.',
        topics: ['2.1 Linear Expressions', '2.2 Application Word Problems', '2.3 Equations reducible to linear form']
      },
      {
        chapter_number: 3,
        title: 'Chapter 3 - Understanding Quadrilaterals',
        summary: 'Polygons, classification, sum of measures of exterior angles, parallelograms, rhombus, rectangle, and square.',
        topics: ['3.1 Polygons Classification', '3.2 Sum of Exterior Angles', '3.3 Special Quadrilaterals']
      },
      {
        chapter_number: 4,
        title: 'Chapter 4 - Data Handling',
        summary: 'Organizing data, frequency distribution, histograms, pie charts, and basic probability.',
        topics: ['4.1 Grouped Data', '4.2 Constructing Histograms', '4.3 Pie Charts', '4.4 Chance & Probability']
      },
      {
        chapter_number: 5,
        title: 'Chapter 5 - Algebra',
        summary: 'Terms, factors, coefficients, monomials, binomials, polynomials, addition, subtraction, multiplication, and identities.',
        topics: ['5.1 Terms & Coefficients', '5.2 Multiplying Polynomials', '5.3 Standard Algebraic Identities']
      }
    ]
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <Link
          to="/subjects"
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Subjects</span>
        </Link>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded-md font-bold font-mono">
                {subject.code}
              </span>
              <span className="text-xs font-semibold text-slate-500">Teacher: {subject.teacher_name}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">{subject.title}</h1>
            <p className="text-xs text-slate-600 mt-1">{subject.description}</p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 text-xs font-bold w-full md:w-auto">
            <button
              onClick={() => setActiveTab('homework')}
              className={`flex-1 md:flex-initial px-5 py-2.5 rounded-xl transition-all ${
                activeTab === 'homework' 
                  ? 'bg-white text-blue-700 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              📝 Today's Homework ({homeworkList.length})
            </button>
            <button
              onClick={() => setActiveTab('textbook')}
              className={`flex-1 md:flex-initial px-5 py-2.5 rounded-xl transition-all ${
                activeTab === 'textbook' 
                  ? 'bg-white text-blue-700 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              📚 Textbook & Topics ({textbook.chapters.length})
            </button>
          </div>
        </div>
      </div>

      {/* Homework Tab View */}
      {activeTab === 'homework' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <span>Assigned Homework & Exercises</span>
            </h2>
            <span className="text-xs font-medium text-slate-500">
              {homeworkList.filter((h: any) => h.status === 'pending').length} Homework Pending
            </span>
          </div>

          {homeworkList.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-3xl border border-slate-200 space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
              <p className="text-sm font-bold text-slate-800">No homework assigned for today.</p>
              <p className="text-xs text-slate-500">Check back later for teacher updates.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {homeworkList.map((hw: any) => (
                <div
                  key={hw.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-4 border-b border-slate-100">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{hw.title}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">Assigned Date: {hw.assigned_date}</p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <span className="inline-flex items-center space-x-1 bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1 rounded-full text-xs font-bold">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        <span>Due: {hw.due_date}</span>
                      </span>

                      {hw.status === 'submitted' ? (
                        <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 px-3.5 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Submitted</span>
                        </span>
                      ) : (
                        <span className="bg-red-100 text-red-800 border border-red-200 px-3 py-1 rounded-full text-xs font-bold">
                          Pending
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">{hw.description}</p>

                    {/* Equations / Homework Questions List */}
                    {hw.questions && hw.questions.length > 0 && (
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 font-mono text-xs text-slate-800">
                        <p className="font-bold text-slate-900 font-sans">Solve Questions:</p>
                        {hw.questions.map((q: string, idx: number) => (
                          <div key={idx} className="p-2 bg-white rounded-lg border border-slate-200">
                            {q}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Submission Action */}
                  <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                    <p className="text-[11px] text-slate-500">Submit completed notebook photo or scanned assignment</p>
                    {hw.status !== 'submitted' ? (
                      <button
                        onClick={() => handleHomeworkSubmit(hw.id)}
                        disabled={submittingHwId === hw.id}
                        className="py-2.5 px-6 rounded-xl school-gradient text-white text-xs font-bold shadow hover:brightness-110 transition-all"
                      >
                        {submittingHwId === hw.id ? 'Submitting...' : 'Mark & Submit Homework'}
                      </button>
                    ) : (
                      <span className="text-xs text-emerald-700 font-bold flex items-center space-x-1">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Completed on time</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Textbook Tab View (Matches section 11 requirements) */}
      {activeTab === 'textbook' && (
        <div className="space-y-6">
          
          <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-6 rounded-3xl shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-1">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">Prescribed Textbook</span>
              <h2 className="text-xl font-bold">{textbook.book_title}</h2>
              <p className="text-xs text-blue-200">Author / Publisher: {textbook.author}</p>
            </div>
            <button
              onClick={() => alert(`Downloading ${textbook.book_title} E-Book PDF...`)}
              className="py-2.5 px-5 rounded-xl bg-white text-slate-900 font-bold text-xs shadow hover:bg-slate-100 flex items-center space-x-2"
            >
              <Download className="w-4 h-4 text-blue-700" />
              <span>Download PDF Book</span>
            </button>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900">Table of Chapters</h3>
            
            {textbook.chapters.map((chap: any) => (
              <div
                key={chap.chapter_number}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 font-bold flex items-center justify-center text-sm border border-blue-100">
                      Ch.{chap.chapter_number}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900">{chap.title}</h4>
                      <p className="text-xs text-slate-500">{chap.summary}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveChapterModal(chap)}
                    className="py-2 px-4 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold transition-colors shrink-0"
                  >
                    Open Chapter
                  </button>
                </div>

                {/* Topic Breakdown */}
                {chap.topics && (
                  <div className="pl-13 pt-2">
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Topics Covered:</p>
                    <div className="flex flex-wrap gap-2">
                      {chap.topics.map((t: string, idx: number) => (
                        <span key={idx} className="bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-lg border border-slate-200">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      )}

      {/* Chapter Reader Modal */}
      {activeChapterModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 space-y-5 border border-slate-100">
            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider font-mono">
                  {textbook.book_title}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5">{activeChapterModal.title}</h3>
              </div>
              <button
                onClick={() => setActiveChapterModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              <div className="p-4 bg-blue-50/70 rounded-2xl border border-blue-100 text-xs text-blue-900 space-y-1">
                <span className="font-bold block">Chapter Summary & Learning Objectives:</span>
                <p>{activeChapterModal.summary}</p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Detailed Section Topics:</h4>
                {activeChapterModal.topics.map((topic: string, index: number) => (
                  <div key={index} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 flex justify-between items-center">
                    <span>{topic}</span>
                    <span className="text-[11px] text-blue-600 font-bold">Read Notes →</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setActiveChapterModal(null)}
                className="py-2.5 px-6 rounded-xl school-gradient text-white text-xs font-bold shadow hover:brightness-110"
              >
                Close Chapter Reader
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
