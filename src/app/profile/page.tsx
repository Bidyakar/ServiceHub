"use client";

import { useState, useEffect, useTransition } from "react";
import { useFormState } from "react-dom";
import { getCurrentUser, updateProfileInfo, updateUserAvatar, changeUserPassword } from "@/app/actions/userProfile";
import { User } from "@/lib/userStorage";

const AVATARS = [
    "https://api.dicebear.com/7.x/lorelei/svg?seed=Felix&backgroundColor=b6e3f4",
    "https://api.dicebear.com/7.x/lorelei/svg?seed=Anya&backgroundColor=ffdfbf",
    "https://api.dicebear.com/7.x/lorelei/svg?seed=Jack&backgroundColor=c0aede",
    "https://api.dicebear.com/7.x/lorelei/svg?seed=Luna&backgroundColor=d1d4f9",
    "https://api.dicebear.com/7.x/lorelei/svg?seed=Zoe&backgroundColor=ffd5dc",
    "https://api.dicebear.com/7.x/lorelei/svg?seed=Milo&backgroundColor=ffeb3b",
    "https://api.dicebear.com/7.x/lorelei/svg?seed=Leo&backgroundColor=4caf50",
    "https://api.dicebear.com/7.x/lorelei/svg?seed=Maya&backgroundColor=f44336",
    "https://api.dicebear.com/7.x/lorelei/svg?seed=Sasha&backgroundColor=03a9f4",
    "https://api.dicebear.com/7.x/lorelei/svg?seed=Toby&backgroundColor=ff9800",
    "https://api.dicebear.com/7.x/lorelei/svg?seed=Daisy&backgroundColor=e91e63",
    "https://api.dicebear.com/7.x/lorelei/svg?seed=Finn&backgroundColor=00bcd4",
    "https://api.dicebear.com/7.x/lorelei/svg?seed=Heidi&backgroundColor=9c27b0",
    "https://api.dicebear.com/7.x/lorelei/svg?seed=Jasper&backgroundColor=3f51b5",
    "https://api.dicebear.com/7.x/lorelei/svg?seed=Kiara&backgroundColor=cddc39",
    "https://api.dicebear.com/7.x/lorelei/svg?seed=Nico&backgroundColor=795548",
    "https://api.dicebear.com/7.x/lorelei/svg?seed=Oliver&backgroundColor=607d8b",
    "https://api.dicebear.com/7.x/lorelei/svg?seed=Luna&backgroundColor=ffc107",
    "https://api.dicebear.com/7.x/lorelei/svg?seed=Bella&backgroundColor=009688",
    "https://api.dicebear.com/7.x/lorelei/svg?seed=George&backgroundColor=8bc34a",
    "https://api.dicebear.com/7.x/lorelei/svg?seed=Sophie&backgroundColor=673ab7",
    "https://api.dicebear.com/7.x/lorelei/svg?seed=Charlie&backgroundColor=ff5722",
    "https://api.dicebear.com/7.x/lorelei/svg?seed=Emma&backgroundColor=e040fb",
    "https://api.dicebear.com/7.x/lorelei/svg?seed=Arlo&backgroundColor=18ffff",
];

export default function ProfilePage() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isPending, startTransition] = useTransition();

    // Form states
    const [infoState, infoAction] = useFormState(updateProfileInfo, null);
    const [passState, passAction] = useFormState(changeUserPassword, null);

    // Success/Error toast-like states
    const [avatarStatus, setAvatarStatus] = useState<{ success?: string, error?: string } | null>(null);

    useEffect(() => {
        async function fetchUser() {
            const userData = await getCurrentUser();
            setUser(userData);
            setLoading(false);
        }
        fetchUser();
    }, [infoState, avatarStatus]);

    const handleAvatarSelect = async (avatarUrl: string) => {
        startTransition(async () => {
            const result = await updateUserAvatar(avatarUrl);
            setAvatarStatus(result);
            setTimeout(() => setAvatarStatus(null), 3000);
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#000001] flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-[#000001] flex items-center justify-center p-4">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl text-center max-w-sm w-full">
                    <h2 className="text-2xl font-bold text-white mb-4">Please Login</h2>
                    <p className="text-gray-400 mb-6">You need to be authenticated to view this page.</p>
                    <a href="/login" className="block w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                        Go to Login
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#000001] text-white pt-12 pb-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-12">

                {/* Header Section */}
                <div className="text-center md:text-left flex flex-col md:flex-row items-center gap-6">
                    <div className="relative">
                        <div className="rainbow relative z-0 overflow-hidden p-1 flex items-center justify-center rounded-full shadow-2xl transition-transform hover:scale-105">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#000001] bg-[#191146] relative z-10">
                                <img
                                    src={user.avatar || AVATARS[0]}
                                    alt="Avatar"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        <div className="absolute bottom-1 right-1 bg-green-500 w-8 h-8 rounded-full border-4 border-[#000001] flex items-center justify-center z-20">
                            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                        </div>
                    </div>
                    <div>
                        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                            {user.firstName} {user.lastName}
                        </h1>
                        <p className="text-gray-400 text-lg mt-1">{user.email}</p>
                        <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
                            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-semibold text-gray-400">
                                User Since {new Date(user.createdAt).toLocaleDateString()}
                            </span>
                            <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-xs font-semibold text-indigo-400">
                                Premium Client
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Sidebar: Avatar Picker */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <span className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">🖼️</span>
                                Choose Avatar
                            </h3>

                            <div className="grid grid-cols-4 gap-3">
                                {AVATARS.map((url, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleAvatarSelect(url)}
                                        disabled={isPending}
                                        className={`w-full aspect-square rounded-xl border-2 transition-all p-1 hover:scale-110 active:scale-95 ${user.avatar === url ? 'border-indigo-500 bg-indigo-500/20' : 'border-transparent bg-white/5 hover:border-white/20'
                                            }`}
                                    >
                                        <img src={url} alt="Avatar option" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>

                            {avatarStatus?.success && (
                                <p className="mt-4 text-xs text-green-400 font-medium text-center bg-green-500/10 py-2 rounded-lg border border-green-500/20 animate-in fade-in zoom-in">
                                    {avatarStatus.success}
                                </p>
                            )}
                        </div>

                        <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 backdrop-blur-xl border border-white/10 p-6 rounded-3xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full -mr-16 -mt-16"></div>
                            <h3 className="text-xl font-bold mb-2">Need Help?</h3>
                            <p className="text-sm text-gray-400 mb-6">Our support team is available 24/7 to assist you with any issues.</p>
                            <button className="w-full py-3 bg-white text-indigo-600 font-bold rounded-xl hover:bg-white/90 transition-all shadow-xl active:scale-95">
                                Contact Support
                            </button>
                        </div>
                    </div>

                    {/* Main Content: Security & Info (Reordered) */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Security Section */}
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
                            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                                <span className="p-2 bg-red-500/10 rounded-xl text-red-400">🛡️</span>
                                Security & Password
                            </h3>

                            <form action={passAction} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-400 ml-1">Current Password</label>
                                    <input
                                        name="currentPassword"
                                        type="password"
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-400 ml-1">New Password</label>
                                        <input
                                            name="newPassword"
                                            type="password"
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-400 ml-1">Confirm New Password</label>
                                        <input
                                            name="confirmPassword"
                                            type="password"
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                {passState?.error && <p className="text-red-400 text-sm font-medium">{passState.error}</p>}
                                {passState?.success && <p className="text-green-400 text-sm font-medium">{passState.success}</p>}

                                <button
                                    type="submit"
                                    className="w-full sm:w-auto px-10 py-4 bg-white/5 hover:bg-red-500/20 text-white rounded-2xl font-bold border border-white/10 hover:border-red-500/50 transition-all active:scale-95"
                                >
                                    Update Password
                                </button>
                            </form>
                        </div>

                        {/* Profile Details Form (Moved to last) */}
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
                            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                                <span className="p-2 bg-purple-500/10 rounded-xl text-purple-400">👤</span>
                                Personal Information
                            </h3>

                            <form action={infoAction} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-400 ml-1">First Name</label>
                                        <input
                                            name="firstName"
                                            defaultValue={user.firstName}
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-400 ml-1">Last Name</label>
                                        <input
                                            name="lastName"
                                            defaultValue={user.lastName}
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-400 ml-1">Phone Number</label>
                                    <input
                                        name="phone"
                                        defaultValue={user.phone}
                                        placeholder="+977-98XXXXXXXX"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-400 ml-1">Address</label>
                                    <textarea
                                        name="address"
                                        defaultValue={user.address}
                                        placeholder="Your residential address"
                                        rows={3}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none"
                                    />
                                </div>

                                {infoState?.error && <p className="text-red-400 text-sm font-medium">{infoState.error}</p>}

                                <button
                                    type="submit"
                                    className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl font-bold hover:shadow-2xl hover:shadow-indigo-500/20 transition-all border border-indigo-500/20 active:scale-95 self-start"
                                >
                                    Save Changes
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
