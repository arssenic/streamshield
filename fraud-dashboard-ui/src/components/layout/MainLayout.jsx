import React from 'react';
import { Activity, ShieldAlert, LayoutDashboard } from 'lucide-react';

export const MainLayout = ({ children, activeTab, onTabChange }) => {
    return (
        <div className="flex h-screen bg-dark-900 text-slate-200 font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-dark-800 border-r border-dark-700 flex flex-col">
                <div className="p-6 flex items-center gap-3 border-b border-dark-700">
                    <ShieldAlert className="text-brand-danger w-8 h-8" />
                    <h1 className="text-xl font-bold tracking-wider text-white">StreamShield</h1>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <button 
                        onClick={() => onTabChange('dashboard')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                            activeTab === 'dashboard' 
                            ? 'bg-brand-primary/10 text-brand-primary' 
                            : 'text-slate-400 hover:bg-dark-700 hover:text-white'
                        }`}
                    >
                        <LayoutDashboard className="w-5 h-5" />
                        Dashboard
                    </button>
                    
                    <button 
                        onClick={() => onTabChange('livestream')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                            activeTab === 'livestream' 
                            ? 'bg-brand-primary/10 text-brand-primary' 
                            : 'text-slate-400 hover:bg-dark-700 hover:text-white'
                        }`}
                    >
                        <Activity className="w-5 h-5" />
                        Live Stream
                    </button>
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 bg-dark-800 border-b border-dark-700 flex items-center px-8 justify-between">
                    <h2 className="text-lg font-semibold text-white capitalize">
                        {activeTab === 'dashboard' ? 'Real-Time Overview' : 'Live Event Stream'}
                    </h2>
                    <div className="flex items-center gap-4 text-sm font-medium text-slate-300">
                        <span className="flex items-center gap-2 px-3 py-1 bg-brand-success/10 text-brand-success rounded-full border border-brand-success/20">
                            <span className="w-2 h-2 rounded-full bg-brand-success animate-pulse"></span>
                            System Live
                        </span>
                    </div>
                </header>
                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-auto p-8">
                    {children}
                </div>
            </main>
        </div>
    );
};