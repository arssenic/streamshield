import React, { useState } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { StatCard } from '../components/dashboard/StatCard';
import { RecentTxTable } from '../components/dashboard/RecentTxTable';
import { TopUsersList } from '../components/dashboard/TopUsersList';
import { LiveStreamLog } from '../components/dashboard/LiveStreamLog';
import { UserModal } from '../components/dashboard/UserModal';
import { FraudPieChart } from '../components/charts/FraudPieChart';
import { TransactionTrendChart } from '../components/charts/TransactionTrendChart';
import { DemographicsChart } from '../components/charts/DemographicsChart';
import { useFraudData } from '../hooks/useFraudData';
import { Activity, ShieldAlert, CreditCard, Users } from 'lucide-react';

export const DashboardPage = () => {
    const { data, loading, error } = useFraudData(3000);
    
    const [activeTab, setActiveTab] = useState('dashboard');
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [activeFilter, setActiveFilter] = useState('all');

    const totalCount = data?.totalCount || 0;
    const highRiskCount = data?.highRiskCount || 0;
    const safeCount = totalCount - highRiskCount;
    const fraudRate = totalCount > 0 ? ((highRiskCount / totalCount) * 100).toFixed(1) : 0;

    // Flexible filtering to match whatever keys your Kafka events are sending
    const filterDataArray = (txArray) => {
        if (!txArray) return [];
        if (activeFilter === 'anomalies') {
            return txArray.filter(tx => {
                const isFraudStatus = tx.status === 'FRAUD' || tx.status === 'FLAGGED';
                const isFraudBoolean = tx.isFraud === true || tx.fraud === true;
                const isHighRiskScore = tx.riskScore > 3.0 || tx.zscore > 3.0;
                
                return isFraudStatus || isFraudBoolean || isHighRiskScore;
            });
        }
        return txArray;
    };

    const filteredRecentTransactions = filterDataArray(data?.recentTransactions);
    const filteredAllTransactions = filterDataArray(data?.allTransactions);

    const renderDashboardContent = () => (
        <div className="space-y-6">
            {/* Top Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Transactions" value={totalCount.toLocaleString()} icon={CreditCard} color="primary" />
                <StatCard title="Safe Transactions" value={safeCount.toLocaleString()} icon={Activity} color="success" />
                <StatCard title="Risk Detected" value={highRiskCount.toLocaleString()} icon={ShieldAlert} color="danger" />
                <StatCard title="Fraud Rate" value={`${fraudRate}%`} icon={Users} color={fraudRate > 5 ? "warning" : "primary"} />
            </div>

            {/* Row 1: Charts Grid (Trend + Pie) updated to 2:1 sizing ratio split with layout safeguards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 66% width spatial container with explicit min-height to prevent canvas collapse */}
                <div className="lg:col-span-2 bg-dark-800 border border-dark-700 rounded-xl p-6 flex flex-col min-h-[340px]">
                    <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
                        Live Transaction Volume
                    </h3>
                    {filteredRecentTransactions.length === 0 ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-slate-500 text-sm font-medium">
                            <span className="w-2 h-2 rounded-full bg-brand-success animate-ping mb-2"></span>
                            No real-time anomalies detected in this stream window.
                        </div>
                    ) : (
                        <TransactionTrendChart transactions={filteredRecentTransactions} />
                    )}
                </div>
                
                {/* 33% width spatial container */}
                <div className="lg:col-span-1 bg-dark-800 border border-dark-700 rounded-xl p-6 flex flex-col justify-between">
                    <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
                        Fraud Distribution
                    </h3>
                    <FraudPieChart safeCount={safeCount} highRiskCount={highRiskCount} />
                </div>
            </div>

            {/* Row 1.5: Demographics Grid (Map + Age) */}
            <div className="mt-6">
                <DemographicsChart cityData={data?.cityStats || []} ageData={data?.ageStats || []} />
            </div>

            {/* Row 2: Top Users & Table */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                <div className="lg:col-span-1">
                    <TopUsersList users={data?.topUsers || []} onUserClick={setSelectedUserId} />
                </div>
                <div className="lg:col-span-2">
                    <RecentTxTable transactions={filteredRecentTransactions} />
                </div>
            </div>
        </div>
    );

    return (
        <MainLayout 
            activeTab={activeTab} 
            onTabChange={setActiveTab}
            activeFilter={activeFilter}    
            onFilterChange={setActiveFilter}  
        >
            {error && (
                <div className="mb-6 p-4 bg-brand-danger/10 border border-brand-danger/20 rounded-lg text-brand-danger flex items-center gap-3">
                    <ShieldAlert className="w-5 h-5" />
                    <p>{error} Make sure your Spring Boot backend is running on port 8082.</p>
                </div>
            )}

            {/* Loading Overlay */}
            {loading && totalCount === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                    <Activity className="w-8 h-8 animate-spin mb-4 text-brand-primary" />
                    <p>Connecting to Fraud Engine...</p>
                </div>
            ) : (
                activeTab === 'dashboard' ? (
                    renderDashboardContent()
                ) : (
                    <div className="h-[calc(100vh-8rem)]">
                        <LiveStreamLog transactions={filteredAllTransactions} />
                    </div>
                )
            )}

            {/* Interactive Investigation Overlay Modal */}
            <UserModal 
                userId={selectedUserId} 
                isOpen={!!selectedUserId} 
                onClose={() => setSelectedUserId(null)} 
                allTransactions={data?.allTransactions || []} 
            />
        </MainLayout>
    );
};