import Link from "next/link";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 text-white min-h-screen hidden md:block">
                <div className="p-6">
                    <h1 className="text-2xl font-bold bg-#181144 bg-clip-text text-transparent">
                        ServiceHub
                    </h1>
                    <p className="text-white text-xs mt-1">Admin Console</p>
                </div>

                <nav className="mt-6">
                    <Link
                        href="/admin/dashboard"
                        className="block px-6 py-3 text-white hover:bg-white hover:text-black transition-colors"
                    >
                        Dashboard
                    </Link>
                    <Link
                        href="/admin/add-professional"
                        className="block px-6 py-3 text-white hover:bg-gray-800 hover:text-white transition-colors"
                    >
                        Add Professional
                    </Link>
                    <Link
                        href="/"
                        className="block px-6 py-3 text-white hover:bg-gray-800 hover:text-white transition-colors mt-8"
                    >
                        ← Back to Site
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                {children}
            </main>
        </div>
    );
}
