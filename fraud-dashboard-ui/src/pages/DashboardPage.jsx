import React from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { StatCard } from '../components/dashboard/StatCard';
import { RecentTxTable } from '../components/dashboard/RecentTxTable';
import { useFraudData } from '../hooks/useFraudData';
import { Activity, ShieldAlert, CreditCard, Users } from 'lucide-react';

export const DashboardPage = () => {
    // Poll the backend every 3 seconds
    const { data, loading, error } = useFraudData(3000);

    // Calculate dynamic stats
    const safeCount = data.totalCount - data.highRiskCount;
    const fraudRate = data.totalCount > 0 
        ? ((data.highRiskCount / data.totalCount) * 100).toFixed(1) 
        : 0;

    return (
        <MainLayout>
            {error && (
                <div className="mb-6 p-4 bg-brand-danger/10 border border-brand-danger/20 rounded-lg text-brand-danger flex items-center gap-3">
                    <ShieldAlert className="w-5 h-5" />
                    <p>{error} Make sure your Spring Boot backend is running on port 8082.</p>
                </div>
            )}

            {/* Loading Overlay (only shows on initial load) */}
            {loading && data.totalCount === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                    <Activity className="w-8 h-8 animate-spin mb-4 text-brand-primary" />
                    <p>Connecting to Fraud Engine...</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Top Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard 
                            title="Total Transactions" 
                            value={data.totalCount.toLocaleString()} 
                            icon={CreditCard} 
                            color="primary" 
                        />
                        <StatCard 
                            title="Safe Transactions" 
                            value={safeCount.toLocaleString()} 
                            icon={Activity} 
                            color="success" 
                        />
                        <StatCard 
                            title="High Risk Detected" 
                            value={data.highRiskCount.toLocaleString()} 
                            icon={ShieldAlert} 
                            color="danger" 
                        />
                        <StatCard 
                            title="Fraud Rate" 
                            value={`${fraudRate}%`} 
                            icon={Users} 
                            color={fraudRate > 5 ? "warning" : "primary"} 
                        />
                    </div>

                    {/* Table Section */}
                    <div className="mt-8">
                        <RecentTxTable transactions={data.recentTransactions} />
                    </div>
                </div>
            )}
        </MainLayout>
    );
};