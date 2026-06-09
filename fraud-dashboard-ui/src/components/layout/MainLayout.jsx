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
        <div className="flex h-screen bg-[#07090e] text-[#b3bccc] font-mono selection:bg-brand-primary selection:text-black antialiased">
            {/* Sidebar - Sharp, technical divider lines */}
            <aside className="w-64 bg-[#0a0d14] border-r border-[#1a2333] flex flex-col h-full flex-shrink-0 relative z-10">
                {/* Brand Header with industrial scanline effect */}
                <div className="p-6 flex items-center gap-3 border-b border-[#1a2333] relative overflow-hidden bg-gradient-to-b from-dark-900/50 to-transparent">
                    <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-brand-danger/40 to-transparent"></div>
                    <ShieldAlert className="text-brand-danger w-6 h-6 animate-pulse" />
                    <h1 className="text-md font-black tracking-widest text-white uppercase font-sans">
                        Stream<span className="text-brand-danger">Shield</span>
                    </h1>
                </div>

                {/* Tactical Navigation */}
                <nav className="p-3 space-y-1 flex-shrink-0">
                    <button 
                        type="button"
                        onClick={() => onTabChange('dashboard')}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-semibold tracking-wider uppercase transition-all duration-200 border ${
                            activeTab === 'dashboard' 
                            ? 'border-brand-primary bg-brand-primary/5 text-brand-primary shadow-[inset_0_0_12px_rgba(var(--brand-primary-rgb),0.05)]' 
                            : 'border-transparent text-slate-500 hover:text-slate-200 hover:bg-dark-800/40'
                        }`}
                    >
                        <LayoutDashboard className="w-4 h-4" />
                        [01] Overview
                    </button>
                    
                    <button 
                        type="button"
                        onClick={() => onTabChange('livestream')}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-semibold tracking-wider uppercase transition-all duration-200 border ${
                            activeTab === 'livestream' 
                            ? 'border-brand-primary bg-brand-primary/5 text-brand-primary shadow-[inset_0_0_12px_rgba(var(--brand-primary-rgb),0.05)]' 
                            : 'border-transparent text-slate-500 hover:text-slate-200 hover:bg-dark-800/40'
                        }`}
                    >
                        <Activity className="w-4 h-4" />
                        [02] Live Stream
                    </button>

                    {/* NEW: Demographic Analysis Tab Button Positioned Directly Down from Live Stream */}
                    <button 
                        type="button"
                        onClick={() => onTabChange('demographics')}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-semibold tracking-wider uppercase transition-all duration-200 border ${
                            activeTab === 'demographics' 
                            ? 'border-brand-primary bg-brand-primary/5 text-brand-primary shadow-[inset_0_0_12px_rgba(var(--brand-primary-rgb),0.05)]' 
                            : 'border-transparent text-slate-500 hover:text-slate-200 hover:bg-dark-800/40'
                        }`}
                    >
                        <Users className="w-4 h-4" />
                        [03] Demographics
                    </button>
                </nav>

                {/* Dynamic Telemetry / Status Footer */}
                <div className="mt-auto p-4 border-t border-[#1a2333] bg-[#080b11]">
                    <div className="p-3 border border-[#1b2538] bg-black/40 relative">
                        {/* Technical mini accent corners */}
                        <div className="absolute top-0 left-0 w-1 h-1 bg-brand-primary"></div>
                        <div className="absolute bottom-0 right-0 w-1 h-1 bg-brand-primary"></div>
                        
                        <div className="flex items-center gap-2 mb-2">
                            <Clock className="w-3 h-3 text-slate-500" />
                            <span className="text-[10px] tracking-widest text-slate-500 uppercase">SYS_RUNTIME</span>
                        </div>
                        <div className="text-lg font-bold text-slate-200 tracking-tight glow-text">
                            {formatSessionTime(secondsElapsed)}
                        </div>
                    </div>
                    
                    {/* Infrastructure checklist matrix */}
                    <div className="mt-4 space-y-1.5 text-[10px] uppercase text-slate-500">
                        <div className="flex justify-between items-center px-1">
                            <span>CORE_ENGINE:</span>
                            <span className="text-brand-success font-bold flex items-center gap-1">
                                <span className="w-1 h-1 bg-brand-success inline-block"></span> OK
                            </span>
                        </div>
                        <div className="flex justify-between items-center px-1">
                            <span>KAFKA_SERVICE:</span>
                            <span className="text-brand-success font-bold flex items-center gap-1 animate-pulse">
                                <span className="w-1 h-1 bg-brand-success inline-block"></span> POLLING
                            </span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Operational Screen */}
            <main className="flex-1 flex flex-col overflow-hidden bg-radial-grid">
                <header className="h-14 bg-[#0a0d14]/80 backdrop-blur-md border-b border-[#1a2333] flex items-center px-8 justify-between flex-shrink-0 relative z-20">
                    <div className="flex items-center gap-4">
                        <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">
                            {activeTab === 'dashboard' ? 'Real-Time Overview' : activeTab === 'livestream' ? 'Live Event Stream' : 'Demographic Matrix Logs'}
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase">
                        <span className="flex items-center gap-2 px-3 py-1 bg-brand-success/5 text-brand-success border border-brand-success/20">
                            <span className="w-1.5 h-1.5 bg-brand-success animate-ping"></span>
                            Stream Connected
                        </span>
                    </div>
                </header>
                
                {/* Viewport render canvas */}
                <div className="flex-1 overflow-auto p-6 relative">
                    {children}
                </div>
            </main>
        </div>
    );
};