import React from 'react';

export const StatCard = ({ title, value, icon: Icon, color = "primary" }) => {
    // Cyberpunk specific tactical palette styles 
    const themes = {
        primary: {
            border: "border-[#1b2538] border-t-brand-primary",
            text: "text-brand-primary",
            bgGlow: "group-hover:bg-brand-primary/[0.02]",
            tag: "[MONITOR_OK]"
        },
        success: {
            border: "border-[#1b2538] border-t-brand-success",
            text: "text-brand-success",
            bgGlow: "group-hover:bg-brand-success/[0.02]",
            tag: "[SYS_STABLE]"
        },
        danger: {
            border: "border-[#1b2538] border-t-brand-danger",
            text: "text-brand-danger animate-pulse",
            bgGlow: "group-hover:bg-brand-danger/[0.03]",
            tag: "[ANOMALY_HALT]"
        },
        warning: {
            border: "border-[#1b2538] border-t-brand-warning",
            text: "text-brand-warning",
            bgGlow: "group-hover:bg-brand-warning/[0.03]",
            tag: "[RISK_WARNING]"
        }
    };

    const currentTheme = themes[color] || themes.primary;

    return (
        <div className={`group relative bg-[#090d16] border-t-2 border-r border-b border-l ${currentTheme.border} p-5 transition-all duration-300 ${currentTheme.bgGlow}`}>
            {/* Reticle corner anchors */}
            <div className="absolute top-0 right-0 w-2 h-[1px] bg-slate-700"></div>
            <div className="absolute top-0 right-0 w-[1px] h-2 bg-slate-700"></div>
            <div className="absolute bottom-0 left-0 w-2 h-[1px] bg-slate-700"></div>
            <div className="absolute bottom-0 left-0 w-[1px] h-2 bg-slate-700"></div>

            <div className="flex justify-between items-start">
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">
                            {title}
                        </span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black font-sans text-white tracking-tight">
                            {value}
                        </span>
                    </div>
                </div>
                
                <div className="flex flex-col items-end justify-between h-full space-y-6">
                    <Icon className={`w-4 h-4 ${currentTheme.text}`} />
                    <span className="text-[8px] font-mono text-slate-600 tracking-wider">
                        {currentTheme.tag}
                    </span>
                </div>
            </div>
            
            {/* Bottom status barcode graphical filler accent */}
            <div className="mt-4 pt-2 border-t border-[#131a29]/60 flex items-center justify-between text-[9px] text-slate-600 font-mono">
                <span>INDEX_SRC_KAFKA</span>
                <span className="opacity-40">||||| | ||||</span>
            </div>
        </div>
    );
};