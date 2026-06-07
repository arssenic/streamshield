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
                // Fetch all required data concurrently
                const [count, highRisk, allTx] = await Promise.all([
                    fraudApi.getTotalCount(),
                    fraudApi.getHighRisk(),
                    fraudApi.getAllTransactions()
                ]);

                // Sort transactions to get the most recent first based on timestamp
                const sortedTx = [...allTx].sort((a, b) => b.timestamp - a.timestamp);

                setData({
                    totalCount: count,
                    highRiskCount: highRisk.length,
                    recentTransactions: sortedTx.slice(0, 10), // Top 10 recent
                    allTransactions: sortedTx // Keep all for charts
                });
                
                setError(null);
            } catch (err) {
                console.error("Error fetching fraud data:", err);
                setError("Failed to connect to Fraud Engine.");
            } finally {
                setLoading(false);
            }
        };

        // Initial fetch
        fetchData();

        // Setup polling interval
        const intervalId = setInterval(fetchData, pollingInterval);

        // Cleanup interval on unmount
        return () => clearInterval(intervalId);
    }, [pollingInterval]);

    return { data, loading, error };
};