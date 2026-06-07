import React from 'react';
import { ShieldAlert } from 'lucide-react';

export const TopUsersList = ({ users }) => {
    return (
        <div className="bg-dark-800 border border-dark-700 rounded-xl overflow-hidden h-full flex flex-col">
            <div className="px-6 py-5 border-b border-dark-700">
                <h3 className="text-lg font-semibold text-white">Top Suspicious Users</h3>
            </div>
            <div className="p-4 flex-1">
                {users?.length === 0 ? (
                    <p className="text-slate-500 text-center mt-4">No suspicious activity.</p>
                ) : (
                    <ul className="space-y-3">
                        {users?.map((user, index) => (
                            <li key={user.userId} className="flex items-center justify-between p-3 rounded-lg bg-dark-900 border border-dark-700">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-brand-danger/20 flex items-center justify-center text-brand-danger font-bold">
                                        {index + 1}
                                    </div>
                                    <span className="text-slate-200 font-medium">{user.userId}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ShieldAlert className="w-4 h-4 text-brand-danger" />
                                    <span className="text-brand-danger font-bold">{user.count} flags</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};