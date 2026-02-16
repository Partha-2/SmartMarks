'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from './AuthProvider';
import { Plus, Loader2 } from 'lucide-react';

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
                    url,
                    title,
                    user_id: user.id
                }
            ]);

            if (error) throw error;

            setUrl('');
            setTitle('');
        } catch (error) {
            console.error('Error adding bookmark:', error);
            alert('Failed to add bookmark');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-neutral-900 rounded-2xl border border-neutral-800 shadow-xl">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-neutral-400 mb-1.5">
                    Title
                </label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. My Favorite Design Tool"
                    required
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder:text-neutral-600"
                />
            </div>
            <div>
                <label htmlFor="url" className="block text-sm font-medium text-neutral-400 mb-1.5">
                    URL
                </label>
                <input
                    id="url"
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com"
                    required
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder:text-neutral-600"
                />
            </div>
            <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 disabled:opacity-50 transition-all font-semibold"
            >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
                Add Bookmark
            </button>
        </form>
    );
}
