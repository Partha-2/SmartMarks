'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from './AuthProvider';
import { Plus, Loader2, Link as LinkIcon, Type } from 'lucide-react';

export default function BookmarkForm() {
    const { user } = useAuth();
    const [url, setUrl] = useState('');
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setLoading(true);
        try {
            const { error } = await supabase.from('bookmarks').insert([
                {
                    url: url.trim(),
                    title: title.trim(),
                    user_id: user.id
                }
            ]);

            if (error) throw error;

            setUrl('');
            setTitle('');
        } catch (error) {
            console.error('Error adding bookmark:', error);
            alert('Failed to add bookmark. Check your connection.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative group">
            {/* Glow Effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>

            <form onSubmit={handleSubmit} className="relative space-y-6 p-8 bg-neutral-900 border border-neutral-800/50 rounded-[2.5rem] shadow-2xl backdrop-blur-xl">
                <div className="space-y-5">
                    <div className="space-y-2">
                        <label htmlFor="title" className="flex items-center gap-2 text-sm font-bold text-neutral-400 px-1 uppercase tracking-wider">
                            <Type className="w-4 h-4 text-blue-500" />
                            Website Title
                        </label>
                        <div className="relative">
                            <input
                                id="title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g. Supabase Documentation"
                                required
                                className="w-full px-6 py-4 bg-neutral-950 border border-neutral-800 rounded-2xl focus:ring-2 focus:ring-blue-600/50 focus:border-blue-500 outline-none transition-all placeholder:text-neutral-700 text-neutral-100 font-medium shadow-inner"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="url" className="flex items-center gap-2 text-sm font-bold text-neutral-400 px-1 uppercase tracking-wider">
                            <LinkIcon className="w-4 h-4 text-cyan-500" />
                            Direct Link
                        </label>
                        <div className="relative">
                            <input
                                id="url"
                                type="url"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="https://supabase.com"
                                required
                                className="w-full px-6 py-4 bg-neutral-950 border border-neutral-800 rounded-2xl focus:ring-2 focus:ring-cyan-600/50 focus:border-cyan-500 outline-none transition-all placeholder:text-neutral-700 text-neutral-100 font-medium shadow-inner"
                            />
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 active:scale-[0.98] disabled:opacity-50 transition-all flex items-center justify-center gap-3 text-lg"
                >
                    {loading ? (
                        <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                        <>
                            <Plus className="w-6 h-6" />
                            <span>Add to Collection</span>
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
