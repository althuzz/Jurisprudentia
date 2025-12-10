import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Award, Scale } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" }
    }
};

const Home = () => {
    return (
        <motion.div
            className="max-w-6xl mx-auto relative"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* 3D Decorative Blur */}
            {/* Hero Section */}

            {/* Hero Section */}
            <div className="text-center pt-8 pb-16 px-4 relative z-10">
                <motion.div
                    variants={itemVariants}
                    className="inline-flex items-center justify-center p-1.5 pr-4 bg-blue-50 border border-blue-100 rounded-full mb-8 shadow-sm"
                >
                    <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-bold">New</span>
                    <span className="ml-3 text-sm text-slate-600 font-medium tracking-wide">BNS 2023 Guidelines Added</span>
                </motion.div>

                <motion.h1
                    variants={itemVariants}
                    className="text-6xl md:text-8xl font-sans font-black text-slate-900 tracking-tighter mb-8 leading-[1.1]"
                >
                    Master the <br />
                    <span className="text-blue-600 relative inline-block">
                        Laws of the Land
                    </span>
                </motion.h1>

                <motion.p
                    variants={itemVariants}
                    className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed font-light"
                >
                    The ultimate platform for legal aspirants. Test your knowledge, access vital legal notes, and climb the judicial ranks.
                </motion.p>

                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                >
                    <Link to="/quiz" className="w-full sm:w-auto">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full px-10 py-5 bg-blue-600 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
                        >
                            <span>Start Quiz</span>
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                        </motion.button>
                    </Link>
                    <Link to="/notes" className="w-full sm:w-auto">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full px-10 py-5 bg-white text-slate-700 border border-slate-200 font-bold text-lg rounded-2xl shadow-sm hover:shadow-md transition-all"
                        >
                            Browse Notes
                        </motion.button>
                    </Link>
                </motion.div>
            </div>

            {/* Features Grid */}
            <motion.div
                variants={containerVariants}
                className="grid md:grid-cols-3 gap-6 mt-16 px-4"
            >
                <FeatureCard
                    icon={<Scale className="text-blue-600" size={28} />}
                    title="Daily Quizzes"
                    description="Challenge yourself with updated constitutional and criminal law questions."
                />
                <FeatureCard
                    icon={<BookOpen className="text-blue-600" size={28} />}
                    title="Legal Notes"
                    description="Download curated PDF notes for quick revision and deep dives."
                />
                <FeatureCard
                    icon={<Award className="text-blue-600" size={28} />}
                    title="Rank System"
                    description="Progress from Student to Chief Justice as you earn points."
                />
            </motion.div>

            {/* Dedication Section */}
            <motion.div
                variants={itemVariants}
                className="mt-20 text-center pb-10"
            >
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto mb-8"></div>
                <p className="text-xs font-bold text-slate-400 tracking-[0.3em] uppercase opacity-70">
                    Dedicated to <span className="text-slate-800 font-black">3/1A GLCT</span>
                </p>
            </motion.div>
        </motion.div >
    );
};

const FeatureCard = ({ icon, title, description }) => {
    return (
        <motion.div
            variants={itemVariants}
            whileHover={{ y: -10 }}
            className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
        >
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                {icon}
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">{title}</h3>
            <p className="text-slate-500 leading-relaxed font-light">{description}</p>
        </motion.div>
    );
};

export default Home;
