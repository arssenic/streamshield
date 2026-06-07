import React from 'react';

export const StatCard = ({ title, value, icon: Icon, color = "primary" }) => {
    // Dynamic color mapping based on Tailwind config
    const colorClasses = {
        primary: "text-brand-primary bg-brand-primary/10 border-brand-primary/20",
        success: "text-brand-success bg-brand-success/10 border-brand-success/20",
        danger: "text-brand-danger bg-brand-danger/10 border-brand-danger/20",
        warning: "text-brand-warning bg-brand-warning/10 border-brand-warning/20",
    };

    return (
        <div className="bg-dark-800 border border-dark-700 rounded-xl p-6 flex flex-col hover:border-dark-600 transition-colors">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm font-medium text-slate-400 mb-2">{title}</p>
                    <h3 className="text-3xl font-bold text-white">{value}</h3>
                </div>
                <div className={`p-3 rounded-lg border ${colorClasses[color]}`}>
                    <Icon className="w-6 h-6" />
                </div>
            </div>
        </div>
    );
};