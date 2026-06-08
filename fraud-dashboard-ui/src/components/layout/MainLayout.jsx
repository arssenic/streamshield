import React, { useState, useEffect } from 'react';
import { Activity, ShieldAlert, LayoutDashboard, Clock, Users } from 'lucide-react';

export const MainLayout = ({ children, activeTab, onTabChange }) => {
    const [secondsElapsed, setSecondsElapsed] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setSecondsElapsed(prev => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatSessionTime = (totalSeconds) => {
        const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
        const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
        const secs = String(totalSeconds % 60).padStart(2, '0');
        return `${hrs}:${mins}:${secs}`;
    };

    return (
        <div className="flex h-screen bg-dark-900 text-slate-200 font-sans">
            {/* Sidebar Component */}
            <aside className="w-64 bg-dark-800 border-r border-dark-700 flex flex-col h-full flex-shrink-0">
                {/* Brand Header */}
                <div className="p-6 flex items-center gap-3 border-b border-dark-700 flex-shrink-0">
                    <ShieldAlert className="text-brand-danger w-8 h-8" />
                    <h1 className="text-xl font-bold tracking-wider text-white">StreamShield</h1>
                </div>

                {/* Primary Navigation */}
                <nav className="p-4 space-y-2 flex-shrink-0">
                    <button 
                        type="button"
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
                        type="button"
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

                {/* --- UPDATED: DYNAMIC SESSION TRACKER (Replaces hardcoded metrics) --- */}
                <div className="mt-auto p-5 border-t border-dark-700 bg-dark-900/40 flex-shrink-0">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 font-mono">
                        Pipeline Status
                    </p>
                    
                    <div className="space-y-3">
                        {/* Session Runtime Card */}
                        <div className="bg-dark-900 border border-dark-750 rounded-xl p-3 flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-brand-primary/10 text-brand-primary">
                                <Clock className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-[9px] font-medium text-slate-400 uppercase font-mono tracking-wider">
                                    Monitor Session
                                </p>
                                <h4 className="text-sm font-bold text-white font-mono tracking-tight">
                                    {formatSessionTime(secondsElapsed)}
                                </h4>
                            </div>
                        </div>

                        {/* Node Cluster Health Status Checklists */}
                        <div className="space-y-2 font-mono text-[11px] pt-1">
                            {/* Processing Engine Node */}
                            <div className="flex items-center justify-between">
                                <span className="text-slate-400">Fraud Engine</span>
                                <div className="flex items-center gap-1.5 font-sans">
                                    <span className="h-1.5 w-1.5 rounded-full bg-brand-success"></span>
                                    <span className="text-brand-success text-[10px] font-semibold">ONLINE</span>
                                </div>
                            </div>

                            {/* Kafka Event Broker Status */}
                            <div className="flex items-center justify-between">
                                <span className="text-slate-400">Kafka Service</span>
                                <div className="flex items-center gap-1.5 font-sans">
                                    <span className="h-1.5 w-1.5 rounded-full bg-brand-success animate-pulse"></span>
                                    <span className="text-brand-success text-[10px] font-semibold">ACTIVE</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Footnote Metadata */}
                    <div className="mt-5 pt-3 border-t border-dark-700/50 flex justify-between items-center text-[9px] text-slate-600 font-mono">
                        <span>STREAMSHIELD v2.0</span>
                        <span className="bg-dark-700 px-1.5 py-0.5 rounded text-slate-400 text-[8px]">PROD</span>
                    </div>
                </div>
            </aside>

            {/* Main Display Area */}
            <main className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 bg-dark-800 border-b border-dark-700 flex items-center px-8 justify-between flex-shrink-0">
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
                
                {/* Viewport Render Outlet */}
                <div className="flex-1 overflow-auto p-8">
                    {children}
                </div>
            </main>
        </div>
    );
};