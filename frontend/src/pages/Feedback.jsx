import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

const Feedback = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        category: 'General Query',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/feedback`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', category: 'General Query', message: '' });
            } else {
                setStatus('error');
            }
        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="max-w-lg mx-auto py-20 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                    <CheckCircle size={40} />
                </div>
                <h2 className="text-3xl font-bold mb-4">Message Sent!</h2>
                <p className="text-slate-600 mb-8">Thank you for your feedback. We'll get back to you shortly.</p>
                <button className="btn btn-primary" onClick={() => setStatus('idle')}>
                    Send Another Message
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold mb-3">Contact & Support</h1>
                <p className="text-slate-500">Have a question or suggestion? We'd love to hear from you.</p>
            </div>

            <div className="card p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Name</label>
                            <input
                                type="text"
                                name="name"
                                required
                                className="input-field"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                required
                                className="input-field"
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
                        <select
                            name="category"
                            className="input-field cursor-pointer"
                            value={formData.category}
                            onChange={handleChange}
                        >
                            <option>General Query</option>
                            <option>Report a Bug</option>
                            <option>Content Suggestion</option>
                            <option>Legal Question</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
                        <textarea
                            name="message"
                            required
                            rows="5"
                            className="input-field resize-none"
                            placeholder="How can we help you?"
                            value={formData.message}
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="btn btn-primary w-full py-3 flex items-center justify-center gap-2"
                    >
                        {status === 'submitting' ? (
                            'Sending...'
                        ) : (
                            <>
                                <Send size={18} /> Send Message
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Feedback;
