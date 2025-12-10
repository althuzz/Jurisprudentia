import React, { useEffect, useState } from 'react';
import { Trophy, Crown, Medal } from 'lucide-react';

const Leaderboard = () => {
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/leaderboard`);
                const data = await response.json();
                setLeaderboardData(data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch leaderboard:', error);
                setLoading(false);
            }
        };
        fetchLeaderboard();
    }, []);

    const getRankIcon = (index) => {
        if (index === 0) return <Crown className="text-yellow-500" size={24} fill="currentColor" />;
        if (index === 1) return <Medal className="text-slate-400" size={24} />;
        if (index === 2) return <Medal className="text-amber-700" size={24} />;
        return <span className="text-slate-400 font-bold w-6 text-center">#{index + 1}</span>;
    };

    if (loading) return <div className="text-center py-20">Loading rankings...</div>;

    return (
        <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
                <Trophy className="mx-auto text-yellow-500 mb-4" size={48} />
                <h1 className="text-3xl font-bold mb-2">Legal Leaderboard</h1>
                <p className="text-slate-500">Top legal minds of the week</p>
            </div>

            <div className="card divide-y divide-slate-100">
                {leaderboardData.map((user, index) => (
                    <div
                        key={index}
                        className={`p-4 flex items-center justify-between hover:bg-slate-50 transition-colors ${index === 0 ? 'bg-yellow-50/50' : ''
                            }`}
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-10 flex justify-center">
                                {getRankIcon(index)}
                            </div>
                            <div>
                                <div className="font-bold text-slate-900">{user.username || user.name}</div>
                                <div className="text-xs text-slate-500">Rank: {user.rank || index + 1}</div>
                            </div>
                        </div>

                        <div className="text-right">
                            <div className="font-bold text-blue-600">{user.score} pts</div>
                            <div className="text-xs text-slate-400">{user.date}</div>
                        </div>
                    </div>
                ))}

                {leaderboardData.length === 0 && (
                    <div className="p-8 text-center text-slate-500">
                        No scores recorded yet. Be the first!
                    </div>
                )}
            </div>
        </div>
    );
};

export default Leaderboard;
