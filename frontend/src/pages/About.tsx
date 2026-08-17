import React, { useState } from 'react';
import { LightboxModal } from '../components/LightboxModal';
import { 
  Building2, 
  Target, 
  Compass, 
  CheckCircle2, 
  Award, 
  Users, 
  BookOpen, 
  Sparkles,
  Maximize2
} from 'lucide-react';

export const About: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<{ url: string; caption: string; category: string } | null>(null);

  const stats = [
    { label: 'Years Experience', value: '15+', icon: <Building2 className="w-6 h-6 text-blue-600" /> },
    { label: 'Academic Excellence', value: '95%', icon: <Award className="w-6 h-6 text-emerald-600" /> },
    { label: 'Enrolled Students', value: '2000+', icon: <Users className="w-6 h-6 text-amber-600" /> },
    { label: 'Qualified Teachers', value: '100+', icon: <BookOpen className="w-6 h-6 text-purple-600" /> }
  ];

  const gallery = [
    {
      caption: 'Main Academic Block & Campus Entrance',
      category: 'School Building',
      url: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=800'
    },
    {
      caption: 'Modern Interactive Smart Classroom',
      category: 'Classroom',
      url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=800'
    },
    {
      caption: 'Advanced High-Tech Computer Science Lab',
      category: 'Computer Lab',
      url: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800'
    },
    {
      caption: 'Science & Chemistry Laboratory Station',
      category: 'Science Lab',
      url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800'
    },
    {
      caption: 'Central Library & Reading Hall',
      category: 'Library',
      url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=800'
    },
    {
      caption: 'Outdoor Athletics Track & Sports Complex',
      category: 'Playground',
      url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <div className="space-y-12 pb-12">
      
      {/* Hero Section */}
      <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-4 text-center max-w-5xl mx-auto">
        <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100">
          About Horizon International School
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Nurturing Leaders of Tomorrow
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed pt-2">
          Established in 2010, Horizon International School provides holistic education focused on intellectual growth, character discipline, and academic innovation across Pre-Primary to High School levels.
        </p>
      </section>

      {/* School Statistics Counter Bar (Section 16 Requirement) */}
      <section className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((st, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mx-auto mb-2">
              {st.icon}
            </div>
            <p className="text-3xl font-extrabold text-slate-900">{st.value}</p>
            <p className="text-xs font-semibold text-slate-500">{st.label}</p>
          </div>
        ))}
      </section>

      {/* Vision & Mission Cards */}
      <section className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white p-8 rounded-3xl shadow-xl space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-amber-300">
            <Target className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold">Our Vision</h2>
          <p className="text-xs text-blue-100 leading-relaxed">
            To be a premier educational institution recognized for academic excellence, character building, global awareness, and fostering creative critical thinkers.
          </p>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 rounded-3xl shadow-xl space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-amber-300">
            <Compass className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold">Our Mission</h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            To provide a safe, inclusive, and technologically advanced learning environment where students excel academically, develop strong moral discipline, and achieve personal excellence.
          </p>
        </div>
      </section>

      {/* Why Choose Us Checklist (Matches Section 16 requirements) */}
      <section className="max-w-6xl mx-auto px-4 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">Key Educational Strengths</span>
          <h2 className="text-2xl font-extrabold text-slate-900">Why Choose Horizon International School?</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            'Experienced Teachers',
            'Modern Classrooms',
            'Smart Learning Tech',
            'Sports Facilities',
            'Computer Laboratory',
            'Science Laboratory',
            'Safe Campus & Transport',
            'Student-Focused Education'
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center space-x-3 text-xs font-bold text-slate-800">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>✓ {item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* School Photo Gallery with Lightbox (Section 17 Requirements) */}
      <section className="max-w-6xl mx-auto px-4 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">School Photo Gallery</h2>
            <p className="text-xs text-slate-500">Click any image to enlarge in full-screen lightbox viewer</p>
          </div>
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Campus Infrastructure
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((img, i) => (
            <div
              key={i}
              onClick={() => setSelectedPhoto(img)}
              className="group relative bg-slate-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl cursor-pointer transition-all duration-300 aspect-video"
            >
              <img
                src={img.url}
                alt={img.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent p-4 flex flex-col justify-end">
                <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest bg-black/40 w-fit px-2 py-0.5 rounded backdrop-blur-sm">
                  {img.category}
                </span>
                <p className="text-xs font-bold text-white mt-1 group-hover:text-amber-200 flex items-center justify-between">
                  <span>{img.caption}</span>
                  <Maximize2 className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity ml-2 shrink-0" />
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal Component */}
      {selectedPhoto && (
        <LightboxModal
          imageUrl={selectedPhoto.url}
          caption={selectedPhoto.caption}
          category={selectedPhoto.category}
          onClose={() => setSelectedPhoto(null)}
        />
      )}

    </div>
  );
};
