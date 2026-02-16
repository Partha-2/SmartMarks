'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from './AuthProvider';
import { ExternalLink, Trash2, Calendar, Globe, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Bookmark {
    id: string;
    url: string;
    title: string;
    created_at: string;
}

export default function BookmarkList() {
    const { user } = useAuth();
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!user) return;

        const fetchBookmarks = async () => {
            try {
                const { data, error } = await supabase
                    .from('bookmarks')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setBookmarks(data || []);
            } catch (err: any) {
                console.error('Error fetching bookmarks:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBookmarks();

        // Set up real-time subscription
        // IMPORTANT: Remove the filter for a moment to verify if that's the issue
        // In production with RLS, Supabase will handle the filtering automatically based on the user's JWT
        const channel = supabase
            .channel('public:bookmarks')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'bookmarks',
                },
                (payload) => {
                    console.log('Realtime change received:', payload);
                    if (payload.eventType === 'INSERT') {
                        const newBookmark = payload.new as Bookmark;
                        setBookmarks((prev) => {
                            // Avoid duplicates if fetch triggered at same time
                            if (prev.some(b => b.id === newBookmark.id)) return prev;
                            return [newBookmark, ...prev];
                        });
                    } else if (payload.eventType === 'DELETE') {
                        setBookmarks((prev) => prev.filter((b) => b.id !== payload.old.id));
                    }
                }
            )
            .subscribe((status) => {
                console.log('Realtime subscription status:', status);
            });

        return () => {
            supabase.removeChannel(channel);
        };
    }, [user]);

    const deleteBookmark = async (id: string) => {
        try {
            const { error } = await supabase.from('bookmarks').delete().eq('id', id);
            if (error) throw error;
        } catch (err: any) {
            console.error('Error deleting bookmark:', err);
            alert('Failed to delete bookmark');
        }
    };

    if (loading) {
        return (
            <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-32 bg-neutral-900/40 border border-neutral-800/50 rounded-3xl animate-pulse" />
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm font-medium">{error}</p>
            </div>
        );
    }

    if (bookmarks.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-20 bg-neutral-900/20 border border-dashed border-neutral-800 rounded-[3rem] text-neutral-500">
                <div className="w-20 h-20 bg-neutral-900 rounded-full flex items-center justify-center mb-6 shadow-inner ring-1 ring-neutral-800">
                    <Globe className="w-10 h-10 opacity-20" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-300 mb-2">No links found</h3>
                <p className="text-center max-w-xs text-neutral-500 leading-relaxed">
                    Your collection is empty. Start by adding a website you'd like to save for later.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <AnimatePresence mode="popLayout">
                {bookmarks.map((bookmark) => (
                    <motion.div
                        key={bookmark.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        className="group relative"
                    >
                        <div className="p-6 bg-gradient-to-br from-neutral-900/80 to-neutral-950 border border-neutral-800/60 hover:border-blue-500/30 rounded-[2rem] transition-all duration-300 shadow-2xl hover:shadow-blue-500/5 hover:-translate-y-1">
                            <div className="flex items-start justify-between gap-6">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="p-1.5 bg-neutral-800 rounded-lg group-hover:bg-blue-600/20 transition-colors">
                                            <Globe className="w-3.5 h-3.5 text-neutral-500 group-hover:text-blue-400" />
                                        </span>
                                        <span className="text-xs font-bold uppercase tracking-widest text-neutral-500 group-hover:text-blue-500/70 transition-colors">
                                            {new URL(bookmark.url).hostname.replace('www.', '')}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-neutral-100 group-hover:text-white mb-2 leading-tight transition-colors truncate">
                                        {bookmark.title}
                                    </h3>
                                    <div className="flex items-center gap-4 text-xs font-semibold text-neutral-500">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {new Date(bookmark.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <a
                                        href={bookmark.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 bg-neutral-950 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-2xl border border-neutral-800 transition-all active:scale-95 group-hover:border-neutral-700 shadow-lg"
                                        title="Open link"
                                    >
                                        <ExternalLink className="w-5 h-5" />
                                    </a>
                                    <button
                                        onClick={() => deleteBookmark(bookmark.id)}
                                        className="p-3 bg-neutral-950 text-neutral-600 hover:text-red-400 hover:bg-red-400/10 rounded-2xl border border-neutral-800 transition-all active:scale-95 group-hover:border-neutral-700 shadow-lg"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Ambient Background Glow on Hover */}
                        <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-[2rem] -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
