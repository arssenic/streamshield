import { useState, useEffect } from 'react';
import { fraudApi } from '../services/api';

export const useFraudData = (pollingInterval = 3000) => {
    const [data, setData] = useState({
        totalCount: 0,
        highRiskCount: 0,
        recentTransactions: [],
        allTransactions: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [count, highRisk, allTx] = await Promise.all([
                    fraudApi.getTotalCount(),
                    fraudApi.getHighRisk(),
                    fraudApi.getAllTransactions()
                ]);

                const sortedTx = [...allTx].sort((a, b) => b.timestamp - a.timestamp);

                const userFraudCounts = highRisk.reduce((acc, tx) => {
                    acc[tx.userId] = (acc[tx.userId] || 0) + 1;
                    return acc;
                }, {});

                const topUsersArray = Object.entries(userFraudCounts)
                    .map(([userId, count]) => ({ userId, count }))
                    .sort((a, b) => b.count - a.count)
                    .slice(0, 5); 

                setData({
                    totalCount: count,
                    highRiskCount: highRisk.length,
                    recentTransactions: sortedTx.slice(0, 10),
                    allTransactions: sortedTx,
                    topUsers: topUsersArray // Add to state
                });
                
                setError(null);
            } catch (err) {
                console.error("Error fetching fraud data:", err);
                setError("Failed to connect to Fraud Engine.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        const intervalId = setInterval(fetchData, pollingInterval);

        return () => clearInterval(intervalId);
    }, [pollingInterval]);

    return { data, loading, error };
};