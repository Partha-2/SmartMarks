'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from './AuthProvider';
import { ExternalLink, Trash2, Calendar, Globe } from 'lucide-react';
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

    useEffect(() => {
        if (!user) return;

        const fetchBookmarks = async () => {
            const { data, error } = await supabase
                .from('bookmarks')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching bookmarks:', error);
            } else {
                setBookmarks(data || []);
            }
            setLoading(false);
        };

        fetchBookmarks();

        // Set up real-time subscription
        const channel = supabase
            .channel('bookmarks-realtime')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'bookmarks',
                    filter: `user_id=eq.${user.id}`,
                },
                (payload) => {
                    if (payload.eventType === 'INSERT') {
                        setBookmarks((prev) => [payload.new as Bookmark, ...prev]);
                    } else if (payload.eventType === 'DELETE') {
                        setBookmarks((prev) => prev.filter((b) => b.id !== payload.old.id));
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [user]);

    const deleteBookmark = async (id: string) => {
        const { error } = await supabase.from('bookmarks').delete().eq('id', id);
        if (error) {
            console.error('Error deleting bookmark:', error);
            alert('Failed to delete bookmark');
        }
    };

    if (loading) {
        return (
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-24 bg-neutral-900 border border-neutral-800 rounded-2xl animate-pulse" />
                ))}
            </div>
        );
    }

    if (bookmarks.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 bg-neutral-900/50 border border-dashed border-neutral-800 rounded-3xl text-neutral-500">
                <Globe className="w-12 h-12 mb-4 opacity-20" />
                <p className="text-lg">No bookmarks yet. Add your first one!</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <AnimatePresence mode="popLayout">
                {bookmarks.map((bookmark) => (
                    <motion.div
                        key={bookmark.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="group relative bg-neutral-900 border border-neutral-800 hover:border-neutral-700 p-5 rounded-2xl transition-all shadow-lg hover:shadow-cyan-900/5"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-bold text-white mb-1 truncate group-hover:text-blue-400 transition-colors">
                                    {bookmark.title}
                                </h3>
                                <a
                                    href={bookmark.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 text-sm text-neutral-400 hover:text-white transition-colors truncate"
                                >
                                    <Globe className="w-3.5 h-3.5" />
                                    {new URL(bookmark.url).hostname}
                                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </a>
                                <div className="flex items-center gap-2 mt-3 text-xs text-neutral-500 font-medium">
                                    <Calendar className="w-3 h-3" />
                                    {new Date(bookmark.created_at).toLocaleDateString()}
                                </div>
                            </div>
                            <button
                                onClick={() => deleteBookmark(bookmark.id)}
                                className="p-2.5 bg-neutral-950 text-neutral-500 hover:text-red-400 hover:bg-red-400/10 rounded-xl border border-neutral-800 transition-all opacity-0 group-hover:opacity-100"
                                title="Delete bookmark"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
