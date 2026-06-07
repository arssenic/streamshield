import React, { useState } from 'react'; 
import { MainLayout } from '../components/layout/MainLayout';
import { StatCard } from '../components/dashboard/StatCard';
import { RecentTxTable } from '../components/dashboard/RecentTxTable';
import { TopUsersList } from '../components/dashboard/TopUsersList';
import { LiveStreamLog } from '../components/dashboard/LiveStreamLog'; 
import { FraudPieChart } from '../components/charts/FraudPieChart';
import { TransactionTrendChart } from '../components/charts/TransactionTrendChart';
import { useFraudData } from '../hooks/useFraudData';
import { Activity, ShieldAlert, CreditCard, Users } from 'lucide-react';

export const DashboardPage = () => {
    const { data, loading, error } = useFraudData(3000);
    
    // NEW: State to track which tab is active
    const [activeTab, setActiveTab] = useState('dashboard');

    const safeCount = data.totalCount - data.highRiskCount;
    const fraudRate = data.totalCount > 0 
        ? ((data.highRiskCount / data.totalCount) * 100).toFixed(1) 
        : 0;

    // We split out the dashboard content so the return statement is cleaner
    const renderDashboardContent = () => (
        <div className="space-y-6">
            {/* Top Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Transactions" value={data.totalCount.toLocaleString()} icon={CreditCard} color="primary" />
                <StatCard title="Safe Transactions" value={safeCount.toLocaleString()} icon={Activity} color="success" />
                <StatCard title="High Risk Detected" value={data.highRiskCount.toLocaleString()} icon={ShieldAlert} color="danger" />
                <StatCard title="Fraud Rate" value={`${fraudRate}%`} icon={Users} color={fraudRate > 5 ? "warning" : "primary"} />
            </div>

            {/* Row 1: Charts Grid (Trend + Pie) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <TransactionTrendChart transactions={data.recentTransactions} />
                </div>
                <div className="lg:col-span-1">
                    <FraudPieChart safeCount={safeCount} highRiskCount={data.highRiskCount} />
                </div>
            </div>

            {/* Row 2: Top Users & Table */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                <div className="lg:col-span-1">
                    <TopUsersList users={data.topUsers} />
                </div>
                <div className="lg:col-span-2">
                    <RecentTxTable transactions={data.recentTransactions} />
                </div>
            </div>
        </div>
    );

    return (
        <MainLayout activeTab={activeTab} onTabChange={setActiveTab}>
            {error && (
                <div className="mb-6 p-4 bg-brand-danger/10 border border-brand-danger/20 rounded-lg text-brand-danger flex items-center gap-3">
                    <ShieldAlert className="w-5 h-5" />
                    <p>{error} Make sure your Spring Boot backend is running on port 8082.</p>
                </div>
            )}

            {loading && data.totalCount === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                    <Activity className="w-8 h-8 animate-spin mb-4 text-brand-primary" />
                    <p>Connecting to Fraud Engine...</p>
                </div>
            ) : (
                // Conditionally render based on the active tab
                activeTab === 'dashboard' ? (
                    renderDashboardContent()
                ) : (
                    <div className="h-[calc(100vh-8rem)]">
                        {/* We pass allTransactions here so the log shows a longer history */}
                        <LiveStreamLog transactions={data.allTransactions} />
                    </div>
                )
            )}
        </MainLayout>
    );
};