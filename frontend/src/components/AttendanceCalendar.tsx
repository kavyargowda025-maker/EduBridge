import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, CheckCircle2, XCircle, MinusCircle, Info } from 'lucide-react';

interface AttendanceRecord {
  id: string;
  date: string;
  status: 'present' | 'absent' | 'holiday';
  remark?: string;
}

interface AttendanceCalendarProps {
  records: AttendanceRecord[];
  statistics: {
    total_working_days: number;
    present_days: number;
    absent_days: number;
    percentage: number;
  };
}

export const AttendanceCalendar: React.FC<AttendanceCalendarProps> = ({ records, statistics }) => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 7, 1)); // August 2026
  const [selectedDay, setSelectedDay] = useState<{ dateStr: string; record?: AttendanceRecord; dayNum: number } | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0 = Sun

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const getRecordForDate = (dayNum: number): AttendanceRecord | undefined => {
    const formattedDay = dayNum < 10 ? `0${dayNum}` : `${dayNum}`;
    const formattedMonth = month + 1 < 10 ? `0${month + 1}` : `${month + 1}`;
    const dateStr = `${year}-${formattedMonth}-${formattedDay}`;
    return records.find((r) => r.date === dateStr);
  };

  // Generate calendar grid slots
  const gridCells = [];
  // Offset for start day
  const offset = (firstDayOfWeek + 6) % 7; // Convert Sun-based (0) to Mon-based (0=Mon, 6=Sun)

  for (let i = 0; i < offset; i++) {
    gridCells.push(<div key={`empty-${i}`} className="h-16 sm:h-20 bg-slate-50/50 rounded-xl border border-dashed border-slate-200"></div>);
  }

  const todayStr = '2026-08-17'; // Current date benchmark in mock context

  for (let day = 1; day <= daysInMonth; day++) {
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    const formattedMonth = month + 1 < 10 ? `0${month + 1}` : `${month + 1}`;
    const dateStr = `${year}-${formattedMonth}-${formattedDay}`;
    const record = getRecordForDate(day);
    const isToday = dateStr === todayStr;

    let badgeBg = 'bg-slate-100 text-slate-500 border-slate-200';
    let badgeLabel = 'N/A';

    if (record) {
      if (record.status === 'present') {
        badgeBg = 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold';
        badgeLabel = 'P';
      } else if (record.status === 'absent') {
        badgeBg = 'bg-red-100 text-red-800 border-red-300 font-bold';
        badgeLabel = 'A';
      } else if (record.status === 'holiday') {
        badgeBg = 'bg-slate-200 text-slate-600 border-slate-300 font-medium';
        badgeLabel = 'H';
      }
    } else {
      // Default weekend check if not in records
      const dayOfWeek = new Date(year, month, day).getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        badgeBg = 'bg-slate-100 text-slate-400 border-slate-200';
        badgeLabel = '-';
      }
    }

    gridCells.push(
      <button
        key={`day-${day}`}
        onClick={() => setSelectedDay({ dateStr, record, dayNum: day })}
        className={`h-16 sm:h-20 p-1.5 sm:p-2 rounded-xl border flex flex-col justify-between items-start transition-all hover:scale-[1.02] hover:shadow-md ${
          isToday 
            ? 'ring-2 ring-blue-600 bg-blue-50/70 border-blue-300' 
            : 'bg-white border-slate-200 hover:border-blue-400'
        }`}
      >
        <div className="w-full flex justify-between items-center">
          <span className={`text-xs sm:text-sm font-semibold ${isToday ? 'text-blue-700 font-bold' : 'text-slate-700'}`}>
            {day}
          </span>
          {isToday && (
            <span className="text-[10px] bg-blue-600 text-white px-1.5 py-0.5 rounded font-bold uppercase">
              Today
            </span>
          )}
        </div>

        <div className="w-full flex justify-center mt-1">
          <span className={`text-xs px-2 py-0.5 rounded-md border w-full text-center ${badgeBg}`}>
            {badgeLabel === 'P' ? 'Present' : badgeLabel === 'A' ? 'Absent' : badgeLabel === 'H' ? 'Holiday' : 'Off'}
          </span>
        </div>
      </button>
    );
  }

  return (
    <div className="space-y-6">
      {/* Attendance Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg">
            {statistics.percentage}%
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Overall Attendance</p>
            <p className="text-base font-bold text-slate-900">
              {statistics.percentage >= 75 ? 'Good Standing' : 'Needs Improvement'}
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Total Working Days</p>
            <p className="text-base font-bold text-slate-900">{statistics.total_working_days} Days</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Present Days</p>
            <p className="text-base font-bold text-emerald-700">{statistics.present_days} Days</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center">
            <XCircle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Absent Days</p>
            <p className="text-base font-bold text-red-600">{statistics.absent_days} Days</p>
          </div>
        </div>
      </div>

      {/* Main Calendar Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6">
        
        {/* Calendar Header Navigation */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <CalendarIcon className="w-5 h-5 text-blue-600" />
              <span>{monthNames[month]} {year}</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Click any calendar date to view complete attendance status details</p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={prevMonth}
              className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
              title="Previous Month"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextMonth}
              className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
              title="Next Month"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-4 text-xs font-medium text-slate-600 bg-slate-50 p-3 rounded-xl">
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
            <span>Green = Present</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
            <span>Red = Absent</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-slate-400 inline-block"></span>
            <span>Grey = Holiday / Weekend</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-blue-600 inline-block"></span>
            <span>Blue Border = Today</span>
          </div>
        </div>

        {/* Day Header Row */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div className="text-slate-400">Sat</div>
          <div className="text-slate-400">Sun</div>
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {gridCells}
        </div>
      </div>

      {/* Date Detail Modal */}
      {selectedDay && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4 border border-slate-100">
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {selectedDay.dayNum} {monthNames[month]} {year}
                </h3>
                <p className="text-xs text-slate-500 font-mono mt-0.5">Date: {selectedDay.dateStr}</p>
              </div>
              <button
                onClick={() => setSelectedDay(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-sm font-medium text-slate-700">Attendance Status:</span>
                {selectedDay.record?.status === 'present' ? (
                  <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>PRESENT</span>
                  </span>
                ) : selectedDay.record?.status === 'absent' ? (
                  <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-300">
                    <XCircle className="w-4 h-4 text-red-600" />
                    <span>ABSENT</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-200 text-slate-700 border border-slate-300">
                    <MinusCircle className="w-4 h-4 text-slate-500" />
                    <span>HOLIDAY / WEEKEND</span>
                  </span>
                )}
              </div>

              {selectedDay.record?.remark && (
                <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-100 text-xs text-slate-700 flex items-start space-x-2">
                  <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900 block">Teacher Remark:</span>
                    <span>{selectedDay.record.remark}</span>
                  </div>
                </div>
              )}

              {!selectedDay.record && (
                <p className="text-xs text-slate-500 text-center py-2">
                  No attendance anomaly recorded for this day (Regular schedule).
                </p>
              )}
            </div>

            <button
              onClick={() => setSelectedDay(null)}
              className="w-full py-2.5 rounded-xl school-gradient text-white font-medium text-sm shadow-md hover:brightness-110 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
