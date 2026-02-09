import Link from "next/link";

export default function AdminDashboard() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Quick Action Card */}
                <Link
                    href="/admin/add-professional"
                    className="group bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all"
                >
                    <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                        +
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Add Professional</h2>
                    <p className="text-gray-500">
                        Register a new service provider, set their rates, and add them to a category.
                    </p>
                </Link>

                {/* Placeholder for future features */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 opacity-60">
                    <div className="w-12 h-12 bg-gray-100 text-gray-400 rounded-xl flex items-center justify-center text-2xl mb-4">
                        📊
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Analytics</h2>
                    <p className="text-gray-500">
                        View site traffic and booking statistics (Coming Soon).
                    </p>
                </div>
            </div>
        </div>
    );
}
