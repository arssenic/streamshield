import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const TransactionTrendChart = ({ transactions }) => {
    const chartData = [...transactions].reverse().map(tx => ({
        time: new Date(tx.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        amount: Math.round(tx.amount),
        status: tx.status
    }));

    return (
        <div className="bg-dark-800 border border-dark-700 rounded-xl p-6 h-[350px] flex flex-col">
            <h3 className="text-lg font-semibold text-white mb-4">Live Transaction Volume</h3>
            <div className="flex-1 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 22, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                        <XAxis 
                            dataKey="time" 
                            stroke="#64748b" 
                            fontSize={12} 
                            tickMargin={10}
                            interval={0}
                        />
                        <YAxis 
                            stroke="#64748b" 
                            fontSize={12} 
                            tickFormatter={(value) => `$${value / 1000}k`}
                        />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                            formatter={(value) => [`$${value}`, 'Amount']}
                            labelStyle={{ color: '#94a3b8' }}
                        />
                        <Area 
                            type="monotone" 
                            dataKey="amount" 
                            stroke="#3b82f6" 
                            strokeWidth={2}
                            fillOpacity={1} 
                            fill="url(#colorAmount)" 
                            isAnimationActive={false} // Disable animation for smoother polling updates
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};