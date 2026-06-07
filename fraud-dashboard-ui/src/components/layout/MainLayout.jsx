import React from 'react';
import { Activity, ShieldAlert, LayoutDashboard } from 'lucide-react';

export const MainLayout = ({ children }) => {
    return (
        <div className="flex h-screen bg-dark-900 text-slate-200 font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-dark-800 border-r border-dark-700 flex flex-col">
                <div className="p-6 flex items-center gap-3 border-b border-dark-700">
                    <ShieldAlert className="text-brand-danger w-8 h-8" />
                    <h1 className="text-xl font-bold tracking-wider text-white">FraudGuard</h1>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <a href="#" className="flex items-center gap-3 px-4 py-3 bg-brand-primary/10 text-brand-primary rounded-lg font-medium transition-colors">
                        <LayoutDashboard className="w-5 h-5" />
                        Dashboard
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-dark-700 hover:text-white rounded-lg font-medium transition-colors">
                        <Activity className="w-5 h-5" />
                        Live Stream
                    </a>
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 bg-dark-800 border-b border-dark-700 flex items-center px-8 justify-between">
                    <h2 className="text-lg font-semibold text-white">Real-Time Overview</h2>
                    <div className="flex items-center gap-4 text-sm font-medium text-slate-300">
                        <span className="flex items-center gap-2 px-3 py-1 bg-brand-success/10 text-brand-success rounded-full border border-brand-success/20">
                            <span className="w-2 h-2 rounded-full bg-brand-success animate-pulse"></span>
                            System Live
                        </span>
                    </div>
                </header>
                {/* Scrollable Dashboard Area */}
                <div className="flex-1 overflow-auto p-8">
                    {children}
                </div>
            </main>
        </div>
    );
};