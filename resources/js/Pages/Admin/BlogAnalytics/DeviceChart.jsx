import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#041b45', '#f1332b', '#3e454e', '#EF4444', '#a8abb3'];

const DeviceChart = ({ data }) => {
    const formattedData = data.map(item => ({
        name: item.device || 'Unknown',
        value: item.count,
    }));

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 h-full">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Views by Device</h3>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={formattedData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {formattedData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip 
                            contentStyle={{ 
                                backgroundColor: 'var(--tooltip-bg, #fff)',
                                borderColor: 'var(--tooltip-border, #e5e7eb)',
                                color: 'var(--tooltip-text, #111827)'
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default DeviceChart;