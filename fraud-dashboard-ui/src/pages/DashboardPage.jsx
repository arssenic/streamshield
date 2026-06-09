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

    const filterDataArray = (txArray) => {
        if (!txArray) return [];
        if (activeFilter === 'anomalies') {
            return txArray.filter(tx => {
                return tx.status === 'FRAUD' || tx.status === 'FLAGGED' || tx.isFraud || tx.fraud || tx.riskScore > 3.0 || tx.zscore > 3.0;
            });
        }
        return txArray;
    };

    const filteredRecentTransactions = filterDataArray(data?.recentTransactions);
    const filteredAllTransactions = filterDataArray(data?.allTransactions);

    const renderDashboardContent = () => (
        <div className="space-y-6">
            {/* Control Matrix Header Toggles */}
            <div className="flex items-center justify-between border-b border-[#1b2538] pb-4">
                <div className="flex gap-2">
                    <button 
                        onClick={() => setActiveFilter('all')} 
                        className={`px-3 py-1 text-[11px] uppercase tracking-wider transition-all ${activeFilter === 'all' ? 'bg-brand-primary text-black font-bold' : 'border border-[#1b2538] text-slate-400 hover:text-white'}`}
                    >
                        [ALL_STREAMS]
                    </button>
                </div>
            </div>

            {/* Top Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Total Volume Traversed" value={totalCount.toLocaleString()} icon={CreditCard} color="primary" />
                <StatCard title="Verified Safe Transactions" value={safeCount.toLocaleString()} icon={Activity} color="success" />
                <StatCard title="Threat Vectors Arrested" value={highRiskCount.toLocaleString()} icon={ShieldAlert} color="danger" />
                <StatCard title="Calculated Breach Rate" value={`${fraudRate}%`} icon={Users} color={fraudRate > 5 ? "warning" : "primary"} />
            </div>

            {/* Row 1: Charts Section */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
                <div className="xl:col-span-2 bg-[#090d16] border border-[#1b2538] p-5 relative flex flex-col min-h-[380px] w-full overflow-hidden">
                    <div className="flex items-center justify-between mb-4 border-b border-[#131a29] pb-2">
                        <h3 className="text-xs font-bold text-slate-400 tracking-widest uppercase flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-brand-primary inline-block"></span>
                            Telemetry Flow Matrix
                        </h3>
                        <span className="text-[9px] text-slate-600">SYS_HUD_M_01</span>
                    </div>
                    {filteredRecentTransactions.length === 0 ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-slate-500 text-xs">
                            <div className="relative w-12 h-12 mb-4 flex items-center justify-center">
                                <span className="absolute inset-0 rounded-full border border-brand-success/30 animate-ping"></span>
                                <span className="w-2 h-2 bg-brand-success"></span>
                            </div>
                            NO ANOMALIES DETECTED IN ACTIVE STREAM MATRIX
                        </div>
                    ) : (
                        <div className="flex-1 w-full h-full min-h-[280px]">
                            <TransactionTrendChart transactions={filteredRecentTransactions} />
                        </div>
                    )}
                </div>
                
                <div className="xl:col-span-1 bg-[#090d16] border border-[#1b2538] p-5 flex flex-col justify-between relative min-h-[380px]">
                    <div className="flex items-center justify-between mb-2 border-b border-[#131a29] pb-2">
                        <h3 className="text-xs font-bold text-slate-400 tracking-widest uppercase flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-brand-danger inline-block"></span>
                            Threat Division Matrix
                        </h3>
                    </div>
                    <div className="flex-1 w-full h-full flex items-center justify-center p-2 overflow-hidden">
                        <FraudPieChart safeCount={safeCount} highRiskCount={highRiskCount} />
                    </div>
                </div>
            </div>

            {/* Row 2: Live Tracking Relays */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-1 border border-[#1b2538] bg-[#090d16] p-4">
                    <TopUsersList users={data?.topUsers || []} onUserClick={setSelectedUserId} />
                </div>
                <div className="lg:col-span-2 border border-[#1b2538] bg-[#090d16] p-4">
                    <RecentTxTable transactions={filteredRecentTransactions} />
                </div>
            </div>
        </div>
    );

    // Conditional render router for view states
    const renderContent = () => {
        if (activeTab === 'dashboard') {
            return renderDashboardContent();
        } else if (activeTab === 'livestream') {
            return (
                <div className="h-[calc(100vh-10rem)] border border-[#1b2538] bg-[#05070b]">
                    <LiveStreamLog transactions={filteredAllTransactions} />
                </div>
            );
        } else if (activeTab === 'demographics') {
            {/* Moved cleanly right into here as requested, preserving exact elements */}
            return (
                <div className="border border-[#1b2538] bg-[#090d16] p-5 relative space-y-4">
                    <h3 className="text-xs font-bold text-slate-400 tracking-widest uppercase flex items-center gap-2 mb-2 border-b border-[#131a29] pb-2">
                        <span className="w-1.5 h-1.5 bg-brand-primary inline-block"></span>
                        Geographic & Population Density Analysis
                    </h3>
                    <DemographicsChart cityData={data?.cityStats || []} ageData={data?.ageStats || []} />
                </div>
            );
        }
        return renderDashboardContent();
    };

    return (
        <MainLayout activeTab={activeTab} onTabChange={setActiveTab}>
            {error && (
                <div className="mb-4 p-3 bg-brand-danger/5 border border-brand-danger/30 text-brand-danger text-xs tracking-wide uppercase flex items-center gap-3">
                    <ShieldAlert className="w-4 h-4 flex-shrink-0 animate-bounce" />
                    <p>CRITICAL_COMM_ERR: Failed pipeline sync. Verify fallback gateway target port [8082].</p>
                </div>
            )}

            {loading && totalCount === 0 ? (
                <div className="flex flex-col items-center justify-center h-96 text-slate-500 text-xs tracking-widest">
                    <Activity className="w-6 h-6 animate-spin mb-4 text-brand-primary" />
                    SYNCING STREAMSHIELD TO HOST CONSOLE...
                </div>
            ) : (
                renderContent()
            )}

            <UserModal 
                userId={selectedUserId} 
                isOpen={!!selectedUserId} 
                onClose={() => setSelectedUserId(null)} 
                allTransactions={data?.allTransactions || []} 
            />
        </MainLayout>
    );
};