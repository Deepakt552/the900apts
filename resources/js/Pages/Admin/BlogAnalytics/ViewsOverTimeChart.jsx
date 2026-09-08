import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

const ViewsOverTimeChart = ({ data }) => {
    const formattedData = data.map(item => ({
        date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        views: item.views,
    }));

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 py-2 rounded-lg shadow-lg">
                    <p className="text-gray-900 dark:text-gray-100 font-medium">{label}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {payload[0].value.toLocaleString()} views
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 transition-colors duration-200">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 transition-colors duration-200">
                Views Over Time
            </h3>
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={formattedData}>
                        <CartesianGrid 
                            strokeDasharray="3 3" 
                            stroke="#e5e7eb"
                            className="dark:stroke-gray-700"
                        />
                        <XAxis 
                            dataKey="date" 
                            stroke="#6b7280"
                            className="dark:stroke-gray-400"
                            tick={{ fill: '#6b7280' }}
                        />
                        <YAxis 
                            stroke="#6b7280"
                            className="dark:stroke-gray-400"
                            tick={{ fill: '#6b7280' }}
                            tickFormatter={(value) => value.toLocaleString()}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend 
                            wrapperStyle={{
                                color: '#6b7280'
                            }}
                            formatter={(value) => (
                                <span className="text-gray-600 dark:text-gray-400">{value}</span>
                            )}
                        />
                        <Line
                            type="monotone"
                            dataKey="views"
                            stroke="#061f4b"
                            strokeWidth={2}
                            dot={{ fill: '#f4342c', r: 4 }}
                            className="dark:stroke-[#3b82f6]"
                            activeDot={{ 
                                fill: '#f4342c',
                                className: "dark:fill-[#ef4444]",
                                r: 6
                            }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ViewsOverTimeChart;