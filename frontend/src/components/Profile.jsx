import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LogOut, Trophy, Calendar, User } from 'lucide-react';

const Profile = ({ onLogout }) => {
  const [user, setUser] = useState(null);
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Not authenticated');

        const res = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setUser(res.data.user);
        setScores(res.data.user.scores || []);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    if (onLogout) onLogout();
  };

  if (loading) return <div className="p-6 text-center text-gray-600">Loading profile...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!user) return <div className="p-6">No user data</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-indigo-100 text-indigo-700 rounded-full p-3">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">{user.username}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1 bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm text-gray-600 flex items-center gap-2"><Trophy className="w-4 h-4 text-yellow-500"/> Top Score</h3>
          <p className="text-xl font-bold text-gray-800">{scores.length ? Math.max(...scores.map(s => s.score)) : '—'}</p>
        </div>

        <div className="col-span-2 bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm text-gray-600 mb-3 flex items-center gap-2"><Calendar className="w-4 h-4 text-indigo-500"/> Score History</h3>
          {scores.length === 0 && <p className="text-sm text-gray-500">No scores yet. Take a quiz to appear on the leaderboard.</p>}

          <ul className="space-y-2">
            {scores.slice().reverse().map((s, idx) => (
              <li key={idx} className="flex items-center justify-between bg-white border rounded-md p-3">
                <div className="text-sm text-gray-700">Quiz #{s.quizId}</div>
                <div className="flex items-center gap-4">
                  <div className="text-sm text-gray-600">{s.date}</div>
                  <div className="text-lg font-semibold text-gray-800">{s.score}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
