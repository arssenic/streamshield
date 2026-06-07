import React from 'react';
import { formatCurrency, formatDate } from '../../utils/formatters';

export const RecentTxTable = ({ transactions }) => {
    return (
        <div className="bg-dark-800 border border-dark-700 rounded-xl overflow-hidden shadow-lg">
            <div className="px-6 py-5 border-b border-dark-700 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
                <span className="text-xs font-medium px-2 py-1 bg-dark-700 text-slate-300 rounded-md">Live Updates</span>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-dark-900/50 text-slate-400">
                        <tr>
                            <th className="px-6 py-4 font-medium">Transaction ID</th>
                            <th className="px-6 py-4 font-medium">User ID</th>
                            <th className="px-6 py-4 font-medium">Amount</th>
                            <th className="px-6 py-4 font-medium">Time</th>
                            <th className="px-6 py-4 font-medium">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-dark-700">
                        {transactions.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
                                    Waiting for transactions...
                                </td>
                            </tr>
                        ) : (
                            transactions.map((tx) => (
                                <tr key={tx.transactionId} className="hover:bg-dark-700/50 transition-colors">
                                    <td className="px-6 py-4 text-slate-400 font-mono text-xs">
                                        {tx.transactionId.substring(0, 8)}...
                                    </td>
                                    <td className="px-6 py-4 font-medium text-white">{tx.userId}</td>
                                    <td className="px-6 py-4 text-slate-200">{formatCurrency(tx.amount)}</td>
                                    <td className="px-6 py-4 text-slate-400">{formatDate(tx.timestamp)}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1.5 rounded-full text-xs font-semibold border ${
                                            tx.status === 'SAFE' 
                                            ? 'bg-brand-success/10 text-brand-success border-brand-success/20' 
                                            : 'bg-brand-danger/10 text-brand-danger border-brand-danger/20 animate-pulse'
                                        }`}>
                                            {tx.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};