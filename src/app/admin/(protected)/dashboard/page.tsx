'use client';

import Link from "next/link";
import { useState } from "react";

export default function AdminDashboard() {
    const [timeRange, setTimeRange] = useState('week');

    // Mock data - replace with real data later
    const stats = [
        {
            label: 'Total Bookings',
            value: '1,234',
            change: '+12.5%',
            trend: 'up',
            icon: '📅',
            gradient: 'from-blue-500 to-cyan-500'
        },
        {
            label: 'Active Professionals',
            value: '89',
            change: '+5.2%',
            trend: 'up',
            icon: '👥',
            gradient: 'from-purple-500 to-pink-500'
        },
        {
            label: 'Revenue',
            value: 'NPR 45.2K',
            change: '+18.3%',
            trend: 'up',
            icon: '💰',
            gradient: 'from-green-500 to-emerald-500'
        },
        {
            label: 'Pending Reviews',
            value: '23',
            change: '-8.1%',
            trend: 'down',
            icon: '⭐',
            gradient: 'from-orange-500 to-red-500'
        },
    ];

    const recentActivity = [
        { action: 'New booking', user: 'John Doe', service: 'Plumbing', time: '5 min ago', status: 'pending' },
        { action: 'Professional added', user: 'Admin', service: 'Electrician', time: '1 hour ago', status: 'success' },
        { action: 'Review submitted', user: 'Jane Smith', service: 'Cleaning', time: '2 hours ago', status: 'info' },
        { action: 'Payment received', user: 'Mike Johnson', service: 'Painting', time: '3 hours ago', status: 'success' },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                        Dashboard Overview
                    </h1>
                    <p className="text-gray-500">Welcome back! Here's what's happening today.</p>
                </div>

                {/* Time Range Selector */}
                <div className="flex gap-2 bg-white p-1.5 rounded-xl shadow-sm border border-gray-100">
                    {['day', 'week', 'month'].map((range) => (
                        <button
                            key={range}
                            onClick={() => setTimeRange(range)}
                            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${timeRange === range
                                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                                    : 'text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            {range.charAt(0).toUpperCase() + range.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="group relative bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden"
                    >
                        {/* Gradient Background */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                        <div className="relative">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    {stat.icon}
                                </div>
                                <span className={`text-sm font-semibold px-3 py-1 rounded-full ${stat.trend === 'up'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-red-100 text-red-700'
                                    }`}>
                                    {stat.change}
                                </span>
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                            <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Quick Actions */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <span className="text-2xl">⚡</span>
                            Quick Actions
                        </h2>
                        <div className="space-y-3">
                            <Link
                                href="/admin/add-professional"
                                className="group flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 border border-indigo-100 transition-all"
                            >
                                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-lg flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                                    +
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Add Professional</h3>
                                    <p className="text-xs text-gray-500">Register new provider</p>
                                </div>
                            </Link>

                            <button className="w-full flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-100 transition-all opacity-60 cursor-not-allowed">
                                <div className="w-10 h-10 bg-gray-300 text-white rounded-lg flex items-center justify-center text-xl">
                                    📊
                                </div>
                                <div className="text-left">
                                    <h3 className="font-bold text-gray-900">View Reports</h3>
                                    <p className="text-xs text-gray-500">Coming Soon</p>
                                </div>
                            </button>

                            <button className="w-full flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-100 transition-all opacity-60 cursor-not-allowed">
                                <div className="w-10 h-10 bg-gray-300 text-white rounded-lg flex items-center justify-center text-xl">
                                    ⚙️
                                </div>
                                <div className="text-left">
                                    <h3 className="font-bold text-gray-900">Settings</h3>
                                    <p className="text-xs text-gray-500">Coming Soon</p>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="lg:col-span-2">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <span className="text-2xl">📋</span>
                                Recent Activity
                            </h2>
                            <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">
                                View All
                            </button>
                        </div>

                        <div className="space-y-3">
                            {recentActivity.map((activity, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-all border border-gray-100"
                                >
                                    <div className={`w-2 h-2 rounded-full ${activity.status === 'success' ? 'bg-green-500' :
                                            activity.status === 'pending' ? 'bg-yellow-500' :
                                                'bg-blue-500'
                                        }`} />
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900">{activity.action}</h3>
                                        <p className="text-sm text-gray-500">
                                            {activity.user} • {activity.service}
                                        </p>
                                    </div>
                                    <span className="text-xs text-gray-400 font-medium">
                                        {activity.time}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Chart Placeholder */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <span className="text-2xl">📈</span>
                    Performance Analytics
                </h2>
                <div className="h-64 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-dashed border-gray-300">
                    <div className="text-center">
                        <div className="text-6xl mb-4">📊</div>
                        <p className="text-gray-500 font-medium">Chart visualization coming soon</p>
                        <p className="text-sm text-gray-400 mt-1">Booking trends, revenue graphs, and more</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
