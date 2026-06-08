import React from 'react';
import { X, ShieldAlert, MapPin, CreditCard, Activity } from 'lucide-react';
import { formatCurrency, formatDate } from '../../utils/formatters';

export const UserModal = ({ userId, isOpen, onClose, allTransactions }) => {
    if (!isOpen || !userId) return null;

    const userTx = allTransactions.filter(tx => tx.userId === userId);
    
    const totalSpent = userTx.reduce((sum, tx) => sum + tx.amount, 0);
    const highRiskCount = userTx.filter(tx => tx.status !== 'SAFE').length;
    
    const cities = userTx.map(tx => tx.city);
    const topCity = cities.sort((a,b) =>
          cities.filter(v => v===a).length - cities.filter(v => v===b).length
    ).pop() || "Unknown";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            {/* Modal Container */}
            <div className="bg-dark-800 border border-dark-700 rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[85vh]">
                
                {/* Header */}
                <div className="px-6 py-4 border-b border-dark-700 flex justify-between items-center bg-dark-900/50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-brand-danger/20 flex items-center justify-center text-brand-danger">
                            <ShieldAlert className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">Investigating: {userId}</h2>
                            <p className="text-sm text-slate-400">Total Events: {userTx.length}</p>
                        </div>
                    </div>
                    <button 
                        onClick={onClose}
                        className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-dark-700 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Body: Quick Stats */}
                <div className="grid grid-cols-3 gap-4 p-6 border-b border-dark-700 bg-dark-800">
                    <div className="p-4 rounded-xl bg-dark-900 border border-dark-700 flex items-center gap-3">
                        <CreditCard className="w-5 h-5 text-brand-primary" />
                        <div>
                            <p className="text-xs text-slate-400 uppercase">Total Amount</p>
                            <p className="text-lg font-bold text-white">{formatCurrency(totalSpent)}</p>
                        </div>
                    </div>
                    <div className="p-4 rounded-xl bg-dark-900 border border-dark-700 flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-brand-warning" />
                        <div>
                            <p className="text-xs text-slate-400 uppercase">Primary Region</p>
                            <p className="text-lg font-bold text-white">{topCity}</p>
                        </div>
                    </div>
                    <div className="p-4 rounded-xl bg-dark-900 border border-dark-700 flex items-center gap-3">
                        <Activity className="w-5 h-5 text-brand-danger" />
                        <div>
                            <p className="text-xs text-slate-400 uppercase">Risk Flags</p>
                            <p className="text-lg font-bold text-brand-danger">{highRiskCount} Alerts</p>
                        </div>
                    </div>
                </div>

                {/* Body: Transaction Timeline */}
                <div className="p-6 flex-1 overflow-y-auto bg-dark-900/30">
                    <h3 className="text-sm font-semibold text-slate-400 mb-4 uppercase tracking-wider">Event Timeline</h3>
                    <div className="space-y-3">
                        {userTx.map(tx => (
                            <div key={tx.transactionId} className="flex items-center justify-between p-3 rounded-lg bg-dark-800 border border-dark-700">
                                <div className="flex items-center gap-4">
                                    <span className="text-sm text-slate-500 w-20">{formatDate(tx.timestamp)}</span>
                                    <span className="text-sm font-mono text-slate-400 bg-dark-900 px-2 py-1 rounded">
                                        {tx.transactionId.substring(0, 8)}
                                    </span>
                                    <span className="text-sm font-medium text-white w-20">{formatCurrency(tx.amount)}</span>
                                    <span className="text-sm text-slate-400">{tx.city}</span>
                                </div>
                                <span className={`text-xs px-2.5 py-1 rounded-full border font-semibold ${
                                    tx.status === 'SAFE' 
                                    ? 'bg-brand-success/10 text-brand-success border-brand-success/20' 
                                    : 'bg-brand-danger/10 text-brand-danger border-brand-danger/20'
                                }`}>
                                    {tx.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};