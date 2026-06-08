import React from 'react';
import { ShieldAlert, Search } from 'lucide-react';

export const TopUsersList = ({ users, onUserClick }) => {
    return (
        <div className="bg-dark-800 border border-dark-700 rounded-xl overflow-hidden h-full flex flex-col">
            <div className="px-6 py-5 border-b border-dark-700 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white">Top Suspicious Users</h3>
            </div>
            <div className="p-4 flex-1">
                {users?.length === 0 ? (
                    <p className="text-slate-500 text-center mt-4">No suspicious activity.</p>
                ) : (
                    <ul className="space-y-3">
                        {users?.map((user, index) => (
                            <li 
                                key={user.userId} 
                                onClick={() => onUserClick(user.userId)}
                                className="flex items-center justify-between p-3 rounded-lg bg-dark-900 border border-dark-700 cursor-pointer hover:bg-dark-700 hover:border-dark-600 transition-all group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-brand-danger/20 flex items-center justify-center text-brand-danger font-bold group-hover:bg-brand-danger/30 transition-colors">
                                        {index + 1}
                                    </div>
                                    <span className="text-slate-200 font-medium">{user.userId}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1.5">
                                        <ShieldAlert className="w-4 h-4 text-brand-danger" />
                                        <span className="text-brand-danger font-bold text-sm">{user.count} flags</span>
                                    </div>
                                    {/* Small icon indicating it can be inspected */}
                                    <Search className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors opacity-0 group-hover:opacity-100" />
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};