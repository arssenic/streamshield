import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { FraudMap } from './FraudMap'; // Import the new map

export const DemographicsChart = ({ cityData, ageData }) => {
    return (
        <div className="bg-dark-800 border border-dark-700 rounded-xl p-6 h-[400px] flex flex-col lg:flex-row gap-6">
            
            {/* NEW: Interactive Map Section */}
            <div className="flex-1 flex flex-col h-full">
                <div className="flex justify-between items-end mb-4">
                    <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Live Threat Map</h3>
                    <span className="text-xs text-brand-danger animate-pulse flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-brand-danger"></span> Live Updates
                    </span>
                </div>
                <div className="flex-1 w-full relative z-0">
                    <FraudMap cityData={cityData} />
                </div>
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px bg-dark-700 h-full"></div>

            {/* Age Bar Chart Section */}
            <div className="flex-1 flex flex-col h-full">
                <h3 className="text-sm font-semibold text-slate-400 mb-4 uppercase tracking-wider">High Risk by Age Group</h3>
                <div className="flex-1 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={ageData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                            <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                            <YAxis stroke="#64748b" fontSize={12} />
                            <RechartsTooltip 
                                cursor={{fill: '#1e293b'}}
                                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc', borderRadius: '8px' }} 
                            />
                            <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} isAnimationActive={true} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div>
    );
};