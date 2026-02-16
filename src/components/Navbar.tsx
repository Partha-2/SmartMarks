'use client';

import { useAuth } from './AuthProvider';
import { Bookmark, LogOut, User } from 'lucide-react';

export default function Navbar() {
    const { user, signInWithGoogle, signOut, loading } = useAuth();

    if (loading) return null;

    return (
        <nav className="border-b border-neutral-800 bg-neutral-950/50 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="bg-blue-600 p-2 rounded-lg">
                        <Bookmark className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-xl tracking-tight hidden sm:block">SmartMarks</span>
                </div>

                <div>
                    {user ? (
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-900 rounded-full border border-neutral-800">
                                {user.user_metadata.avatar_url ? (
                                    <img
                                        src={user.user_metadata.avatar_url}
                                        alt="avatar"
                                        className="w-6 h-6 rounded-full"
                                    />
                                ) : (
                                    <User className="w-4 h-4" />
                                )}
                                <span className="text-sm font-medium max-w-[100px] truncate">
                                    {user.user_metadata.full_name || user.email}
                                </span>
                            </div>
                            <button
                                onClick={signOut}
                                className="p-2 hover:bg-neutral-800 rounded-lg transition-colors text-neutral-400 hover:text-white"
                                title="Log out"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={signInWithGoogle}
                            className="px-4 py-2 bg-white text-black font-semibold rounded-lg hover:bg-neutral-200 transition-colors"
                        >
                            Log in with Google
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}
