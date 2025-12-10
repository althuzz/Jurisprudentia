import React, { useEffect, useState } from 'react';
import { FileText, Download, ChevronDown, ChevronRight, Lock } from 'lucide-react';

const LegalNotes = () => {
    const [semesters, setSemesters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedSemester, setExpandedSemester] = useState(null);
    const [expandedSubject, setExpandedSubject] = useState(null);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/notes`)
            .then(res => res.json())
            .then(data => {
                setSemesters(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch notes", err);
                setLoading(false);
            });
    }, []);

    const toggleSemester = (id) => {
        setExpandedSemester(expandedSemester === id ? null : id);
        setExpandedSubject(null); // Reset subject expansion when switching semesters
    };

    const toggleSubject = (id, e) => {
        e.stopPropagation();
        setExpandedSubject(expandedSubject === id ? null : id);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Legal Notes Repository</h1>
                <p className="text-slate-500">Curated materials organized by Semester.</p>
            </div>

            {loading ? (
                <div className="text-center py-20 text-slate-400 animate-pulse">Loading library...</div>
            ) : (
                <div className="space-y-4">
                    {semesters.map((sem) => (
                        <div key={sem.id} className="card overflow-hidden">
                            {/* Semester Header */}
                            <div
                                className={`p-6 flex items-center justify-between cursor-pointer transition-colors ${sem.status === 'active' ? 'hover:bg-slate-50' : 'opacity-75 cursor-not-allowed bg-slate-50'
                                    }`}
                                onClick={() => sem.status === 'active' && toggleSemester(sem.id)}
                            >
                                <div className="flex items-center gap-4">
                                    <h2 className="text-xl font-bold text-slate-800">{sem.title}</h2>
                                    {sem.status === 'coming_soon' && (
                                        <span className="text-xs font-bold px-2 py-1 bg-amber-100 text-amber-700 rounded-full flex items-center gap-1">
                                            <Lock size={12} /> Coming Soon
                                        </span>
                                    )}
                                </div>
                                {sem.status === 'active' && (
                                    expandedSemester === sem.id ? <ChevronDown className="text-slate-400" /> : <ChevronRight className="text-slate-400" />
                                )}
                            </div>

                            {/* Semester Content (Subjects) */}
                            {expandedSemester === sem.id && sem.subjects && (
                                <div className="border-t border-slate-100 bg-slate-50/50">
                                    {sem.subjects.map((subject) => (
                                        <div key={subject.id} className="border-b border-slate-100 last:border-0">
                                            <div
                                                className="p-4 pl-8 flex items-center justify-between cursor-pointer hover:bg-white transition-colors"
                                                onClick={(e) => toggleSubject(subject.id, e)}
                                            >
                                                <span className="font-semibold text-slate-700">{subject.name}</span>
                                                {expandedSubject === subject.id ? <ChevronDown size={18} className="text-slate-400" /> : <ChevronRight size={18} className="text-slate-400" />}
                                            </div>

                                            {/* Subject Content (Resources) */}
                                            {expandedSubject === subject.id && (
                                                <div className="bg-white p-4 pl-12 grid md:grid-cols-2 gap-6 animate-fadeIn">
                                                    {/* Notes Section */}
                                                    <div>
                                                        <h4 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                                                            <FileText size={16} /> Notes
                                                        </h4>
                                                        <ul className="space-y-2">
                                                            {subject.resources.notes.length > 0 ? (
                                                                subject.resources.notes.map((note, idx) => (
                                                                    <li key={idx}>
                                                                        <a href={note.url} className="text-sm text-slate-600 hover:text-blue-600 flex items-center gap-2 group">
                                                                            <Download size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                                                            {note.title}
                                                                        </a>
                                                                    </li>
                                                                ))
                                                            ) : (
                                                                <li className="text-sm text-slate-400 italic">No notes available</li>
                                                            )}
                                                        </ul>
                                                    </div>

                                                    {/* Previous Qns Section */}
                                                    <div>
                                                        <h4 className="text-sm font-bold text-emerald-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                                                            <FileText size={16} /> Previous Qns
                                                        </h4>
                                                        <ul className="space-y-2">
                                                            {subject.resources.previousQns.length > 0 ? (
                                                                subject.resources.previousQns.map((qn, idx) => (
                                                                    <li key={idx}>
                                                                        <a href={qn.url} className="text-sm text-slate-600 hover:text-emerald-600 flex items-center gap-2 group">
                                                                            <Download size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                                                            {qn.title}
                                                                        </a>
                                                                    </li>
                                                                ))
                                                            ) : (
                                                                <li className="text-sm text-slate-400 italic">No papers available</li>
                                                            )}
                                                        </ul>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LegalNotes;
