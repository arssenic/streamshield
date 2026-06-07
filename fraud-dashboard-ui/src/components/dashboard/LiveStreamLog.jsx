import React from 'react';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { ShieldAlert, CheckCircle2 } from 'lucide-react';

export const LiveStreamLog = ({ transactions }) => {
    return (
        <div className="bg-dark-800 border border-dark-700 rounded-xl p-6 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6 border-b border-dark-700 pb-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-primary"></span>
                    </span>
                    Raw Event Feed
                </h3>
                <span className="text-sm text-slate-400">Monitoring {transactions?.length || 0} events</span>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-3 font-mono text-sm pr-2">
                {transactions?.length === 0 ? (
                    <p className="text-slate-500 text-center mt-10">Awaiting Kafka events...</p>
                ) : (
                    transactions?.map((tx) => (
                        <div 
                            key={tx.transactionId} 
                            className="flex items-center justify-between p-4 rounded-lg bg-dark-900 border-l-4 border-y border-r border-dark-700 hover:bg-dark-700/50 transition-colors"
                            style={{ borderLeftColor: tx.status === 'SAFE' ? '#10b981' : '#ef4444' }}
                        >
                            <div className="flex gap-6 items-center">
                                <span className="text-slate-500 w-20">{formatDate(tx.timestamp)}</span>
                                <span className="text-slate-400">[{tx.transactionId.substring(0, 8)}]</span>
                                <span className="text-white font-semibold w-24">{tx.userId}</span>
                                <span className="text-slate-300 w-24">{formatCurrency(tx.amount)}</span>
                            </div>
                            
                            <div>
                                {tx.status === 'SAFE' ? (
                                    <span className="text-brand-success flex items-center gap-2 bg-brand-success/10 px-3 py-1 rounded-full">
                                        <CheckCircle2 className="w-4 h-4"/> SAFE
                                    </span>
                                ) : (
                                    <span className="text-brand-danger flex items-center gap-2 bg-brand-danger/10 px-3 py-1 rounded-full animate-pulse">
                                        <ShieldAlert className="w-4 h-4"/> HIGH RISK
                                    </span>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};