import React from 'react';
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 font-sans antialiased">
                <div className="min-h-screen flex flex-col">
                    <header className="w-full py-6 bg-white/80 shadow-md backdrop-blur-md border-b border-gray-200">
                        <div className="container mx-auto px-4 flex items-center justify-between">
                            <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 drop-shadow">
                                Notes Management
                            </span>
                            {/* Add nav or logo here if needed */}
                        </div>
                    </header>
                    <main className="flex-1 flex flex-col items-center justify-center">
                        {children}
                    </main>
                    <footer className="w-full py-4 bg-white/80 text-center text-xs text-gray-400 border-t border-gray-200">
                        &copy; {new Date().getFullYear()} Notes Management. All rights reserved.
                    </footer>
                </div>
            </body>
        </html>
    );
}
