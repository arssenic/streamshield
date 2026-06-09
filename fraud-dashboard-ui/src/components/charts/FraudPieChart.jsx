import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export const FraudPieChart = ({ safeCount, highRiskCount }) => {
    const data = [
        { name: 'Safe', value: safeCount },
        { name: 'High Risk', value: highRiskCount },
    ];

    const COLORS = ['#10b981', '#ef4444'];

    return (
        <div className="bg-dark-800 border border-dark-700 rounded-xl p-6 h-[350px] flex flex-col">
        <h3 className="text-lg font-semibold text-white mb-4">Fraud Distribution</h3>
        <div className="flex-1 w-full h-full min-w-0 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
                {/* 1. Added explicit horizontal margins so Recharts grants extra width to the drawing engine */}
                <PieChart margin={{ top: 0, right: 20, bottom: 0, left: 20 }}>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="45%" 
                        innerRadius="55%" 
                        outerRadius="100%" 
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                        isAnimationActive={true}
                        animationDuration={1000} 
                        animationEasing="ease-in-out"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                        itemStyle={{ color: '#f8fafc' }}
                    />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
            </ResponsiveContainer>
        </div>
    </div>
    );
};