import React, { useState, useEffect } from 'react';
import { Gavel, Scale, BookOpen, AlertCircle, ArrowRight, RotateCw, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fallback questions
    const fallbackQuestions = [
        {
            id: 1,
            question: 'What year was the U.S. Constitution ratified?',
            options: ['1776', '1787', '1791', '1795'],
            correctAnswer: 1
        },
        {
            id: 2,
            question: 'How many amendments are in the Bill of Rights?',
            options: ['5', '8', '10', '15'],
            correctAnswer: 2
        }
    ];

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/questions`);
                if (!response.ok) throw new Error('API Error');
                const data = await response.json();
                setQuestions(Array.isArray(data) ? data : [data]);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch questions:', error);
                setQuestions(fallbackQuestions);
                setLoading(false);
            }
        };
        fetchQuestions();
    }, []);

    const handleAnswer = (optionIndex) => {
        if (!questions.length) return;
        setSelectedOption(optionIndex);

        if (optionIndex === questions[currentQuestion].correctAnswer) {
            setScore(score + 100);
        }

        // Delay for visual feedback before next question
        setTimeout(() => {
            const nextQuestion = currentQuestion + 1;
            if (nextQuestion < questions.length) {
                setCurrentQuestion(nextQuestion);
                setSelectedOption(null);
            } else {
                setShowScore(true);
                // Fire and forget score submission (logic simplified for this demo)
                submitScore(score + (optionIndex === questions[currentQuestion].correctAnswer ? 100 : 0));
            }
        }, 1000);
    };

    const submitScore = (finalScore) => {
        // Guest submission for now, extended in future
        fetch(`${process.env.REACT_APP_API_URL}/api/submit-quiz`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Guest Player', quizId: 1, score: finalScore })
        }).catch(console.error);
    };

    const restartQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowScore(false);
        setSelectedOption(null);
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh]">
                <div className="animate-spin text-blue-600 mb-4">
                    <RotateCw size={40} />
                </div>
                <p className="text-slate-500 font-medium">Loading Questions...</p>
            </div>
        );
    }

    if (showScore) {
        return (
            <div className="max-w-xl mx-auto text-center py-12 card p-10 fade-in">
                <div className="w-24 h-24 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Award size={48} />
                </div>
                <h2 className="text-4xl font-bold mb-2">Quiz Complete!</h2>
                <p className="text-slate-500 mb-8">You have mastered this session.</p>

                <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-8">
                    {score}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <button onClick={restartQuiz} className="btn btn-secondary py-3">
                        Play Again
                    </button>
                    <button onClick={() => navigate('/leaderboard')} className="btn btn-primary py-3">
                        View Leaderboard
                    </button>
                </div>
            </div>
        );
    }

    const currentQ = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
        <div className="max-w-3xl mx-auto fade-in">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">Question {currentQuestion + 1} of {questions.length}</span>
                    <h2 className="text-xl font-bold text-slate-800">Constitutional Law</h2>
                </div>
                <div className="badge bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-bold">
                    {score} pts
                </div>
            </div>

            {/* Progress */}
            <div className="h-2 bg-slate-100 rounded-full mb-8 overflow-hidden">
                <div
                    className="h-full bg-blue-500 transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Question Card */}
            <div className="card p-8 mb-8">
                <h3 className="text-2xl font-bold text-slate-900 leading-relaxed mb-8">
                    {currentQ?.question}
                </h3>

                <div className="space-y-3">
                    {currentQ?.options?.map((option, index) => {
                        let stateClass = "border-slate-200 hover:border-blue-300 hover:bg-slate-50";
                        if (selectedOption !== null) {
                            if (index === currentQ.correctAnswer) stateClass = "border-green-500 bg-green-50 text-green-700";
                            else if (index === selectedOption) stateClass = "border-red-500 bg-red-50 text-red-700";
                            else stateClass = "border-slate-100 opacity-50";
                        }

                        return (
                            <button
                                key={index}
                                disabled={selectedOption !== null}
                                onClick={() => handleAnswer(index)}
                                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 font-medium ${stateClass}`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border transition-colors ${selectedOption !== null && index === currentQ.correctAnswer
                                        ? 'bg-green-500 text-white border-green-500'
                                        : 'bg-white text-slate-400 border-slate-200'
                                        }`}>
                                        {String.fromCharCode(65 + index)}
                                    </div>
                                    {option}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="text-center">
                <button
                    className="text-slate-400 hover:text-slate-600 text-sm font-medium transition-colors"
                    onClick={() => {
                        const nextQ = currentQuestion + 1;
                        if (nextQ < questions.length) setCurrentQuestion(nextQ);
                        else setShowScore(true);
                    }}
                >
                    Skip Question
                </button>
            </div>
        </div>
    );
};

export default Quiz;
