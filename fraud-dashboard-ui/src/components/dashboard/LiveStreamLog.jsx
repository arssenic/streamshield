import React from 'react';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { ShieldAlert, CheckCircle2, Download } from 'lucide-react';

export const LiveStreamLog = ({ transactions }) => {
    
    const handleDownloadCSV = () => {
        if (!transactions || transactions.length === 0) return;
        
        const headers = "Transaction ID,User ID,Amount,City,Age,Status,Time\n";
        const rows = transactions.map(tx => 
            `${tx.transactionId},${tx.userId},${Math.round(tx.amount)},${tx.city || 'N/A'},${tx.age || '?'},${tx.status},${new Date(tx.timestamp).toISOString()}`
        ).join("\n");
        
        const blob = new Blob([headers + rows], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `fraud_monitoring_log_${new Date().getTime()}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const formatAlertBadge = (status) => {
        if (status === 'SAFE') {
            return (
                <span className="text-brand-success flex items-center gap-2 bg-brand-success/10 px-3 py-1 rounded-full">
                    <CheckCircle2 className="w-4 h-4"/> SAFE
                </span>
            );
        }
        
        let label = "HIGH RISK";
        if (status.includes('IMPOSSIBLE_TRAVEL')) label = "GEO-VELOCITY ALERT";
        if (status.includes('STATISTICAL_ANOMALY')) label = "Z-SCORE ANOMALY";
        if (status.includes('NEW_USER')) label = "UNVERIFIED LARGE TX";

        return (
            <span className="text-brand-danger flex items-center gap-2 bg-brand-danger/10 px-3 py-1 rounded-full animate-pulse whitespace-nowrap text-xs font-bold">
                <ShieldAlert className="w-3 h-3"/> {label}
            </span>
        );
    };

    return (
        <div className="bg-dark-800 border border-dark-700 rounded-xl p-6 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6 border-b border-dark-700 pb-4">
                <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold text-white flex items-center gap-3">
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-primary"></span>
                        </span>
                        Raw Event Feed
                    </h3>
                    <span className="text-sm text-slate-400 ml-4">Monitoring {transactions?.length || 0} events</span>
                </div>
                
                {/* Download Button */}
                <button 
                    onClick={handleDownloadCSV}
                    className="flex items-center gap-2 bg-dark-700 hover:bg-dark-600 text-slate-200 px-4 py-2 rounded-lg transition-colors text-sm font-medium border border-dark-600"
                >
                    <Download className="w-4 h-4" />
                    Export CSV
                </button>
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
                            <div className="flex gap-4 items-center flex-1">
                                <span className="text-slate-500 w-20">{formatDate(tx.timestamp)}</span>
                                <span className="text-slate-400">[{tx.transactionId.substring(0, 8)}]</span>
                                <span className="text-white font-semibold w-16">{tx.userId}</span>
                                <span className="text-slate-300 w-24">{formatCurrency(tx.amount)}</span>
                                <span className="text-slate-400 w-32 text-xs truncate">{tx.city || 'N/A'} (Age: {tx.age || '?'})</span>
                            </div>
                            
                            {/* Alert Badge Formatter */}
                            <div className="flex-shrink-0 ml-4">
                                {formatAlertBadge(tx.status)}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};