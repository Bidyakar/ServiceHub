import Link from "next/link";

export default function EsewaPaymentPage() {
    return (
        <div className="min-h-screen bg-[#F5F9F6] flex items-center justify-center p-4">
            <div className="bg-white max-w-md w-full rounded-lg shadow-lg overflow-hidden border border-gray-200">
                {/* Header */}
                <div className="bg-[#60BB46] p-4 flex items-center justify-between">
                    <h1 className="text-white font-bold text-lg">eSewa Payment</h1>
                    <div className="bg-white/20 px-2 py-1 rounded text-white text-xs font-medium">
                        TEST MODE
                    </div>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6">
                    <div className="text-center">
                        <div className="w-20 h-20 bg-[#60BB46]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">💰</span>
                        </div>
                        <h2 className="text-xl font-bold text-gray-800">Confirm Payment</h2>
                        <p className="text-gray-500 text-sm mt-1">Service Hub Booking Fee</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center border border-gray-100">
                        <span className="text-gray-600 font-medium">Total Amount</span>
                        <span className="text-[#60BB46] font-bold text-xl">NPR 500.00</span>
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between text-sm text-gray-500">
                            <span>Service Charge</span>
                            <span>NPR 0.00</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500">
                            <span>Tax</span>
                            <span>NPR 0.00</span>
                        </div>
                    </div>
                </div>

                {/* Footer / Actions */}
                <div className="p-6 bg-gray-50 border-t border-gray-100">
                    <button className="w-full bg-[#60BB46] hover:bg-[#54a33e] text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-md hover:shadow-lg transform active:scale-[0.98] transition-all">
                        Pay with eSewa
                    </button>
                    <Link
                        href="/"
                        className="w-full mt-3 flex justify-center text-gray-500 font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                    >
                        Cancel Transaction
                    </Link>
                </div>
            </div>
        </div>
    );
}
