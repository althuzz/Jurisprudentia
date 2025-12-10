import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, MessageSquare, Award, Scale } from 'lucide-react';

const Home = () => {
    return (
        <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center py-20">
                <div className="inline-flex items-center justify-center p-2 bg-blue-50 rounded-full mb-6">
                    <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-blue-600 shadow-sm border border-blue-100/50">New</span>
                    <span className="ml-2 pr-2 text-sm text-blue-700 font-medium">BNS 2023 Guidelines Added</span>
                </div>

                <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight mb-6">
                    Master the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Laws of the Land</span>
                </h1>

                <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
                    The ultimate platform for legal aspirants. Test your knowledge, access vital legal notes, and climb the judicial ranks.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/quiz" className="btn btn-primary px-8 py-3 text-lg flex items-center justify-center gap-2 group">
                        Start Quiz
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                    </Link>
                    <Link to="/notes" className="btn btn-secondary px-8 py-3 text-lg">
                        Browse Notes
                    </Link>
                </div>
            </div>

            {/* Dedication Section */}
            <div className="mt-6 text-center">
                <p className="text-sm font-medium text-slate-400 tracking-widest uppercase">
                    Dedicated to the students of <span className="text-slate-600 font-bold">3/1A GLCT</span>
                </p>
            </div>


            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
                <FeatureCard
                    icon={<Scale className="text-blue-600" size={24} />}
                    title="Daily Quizzes"
                    description="Challenge yourself with updated constitutional and criminal law questions."
                />
                <FeatureCard
                    icon={<BookOpen className="text-emerald-500" size={24} />}
                    title="Legal Notes"
                    description="Download curated PDF notes for quick revision and deep dives."
                />
                <FeatureCard
                    icon={<Award className="text-amber-500" size={24} />}
                    title="Rank System"
                    description="Progress from Student to Chief Justice as you earn points."
                />
            </div>
        </div >
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <div className="card p-6 h-full border border-slate-100 hover:border-blue-100 transition-colors">
        <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-4">
            {icon}
        </div>
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-slate-500 leading-relaxed">{description}</p>
    </div>
);

export default Home;
