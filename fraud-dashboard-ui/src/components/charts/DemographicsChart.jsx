import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const DemographicsChart = ({ cityData, ageData }) => {
    return (
        <div className="bg-dark-800 border border-dark-700 rounded-xl p-6 h-[350px] flex gap-6">
            
            {/* City Chart */}
            <div className="flex-1 flex flex-col">
                <h3 className="text-sm font-semibold text-slate-400 mb-4 uppercase tracking-wider">High Risk by Region</h3>
                <div className="flex-1 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={cityData} layout="vertical" margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                            <XAxis type="number" stroke="#64748b" fontSize={12} />
                            <YAxis type="category" dataKey="name" stroke="#64748b" fontSize={12} width={70} />
                            <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }} />
                            <Bar dataKey="value" fill="#f59e0b" radius={[0, 4, 4, 0]} isAnimationActive={true} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Divider */}
            <div className="w-px bg-dark-700 h-full"></div>

            {/* Age Chart */}
            <div className="flex-1 flex flex-col">
                <h3 className="text-sm font-semibold text-slate-400 mb-4 uppercase tracking-wider">High Risk by Age Group</h3>
                <div className="flex-1 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={ageData} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                            <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                            <YAxis stroke="#64748b" fontSize={12} />
                            <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }} />
                            <Bar dataKey="value" fill="#ef4444" radius={[4, 4, 0, 0]} isAnimationActive={true} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div>
    );
};