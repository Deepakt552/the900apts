import React from 'react';
import { Eye, Users, UserCheck, TrendingUp } from 'lucide-react';

const StatsCards = ({ totalViews, uniqueVisitors, loggedInUsers, avgViewsPerDay }) => {
    const stats = [
        {
            title: 'Total Views',
            value: totalViews.toLocaleString(),
            icon: Eye,
            color: 'bg-[#f4342c]',
        },
        {
            title: 'Unique Visitors',
            value: uniqueVisitors.toLocaleString(),
            icon: Users,
            color: 'bg-[#061f4b] dark:bg-[#3b82f6]',
        },
        {
            title: 'Logged-in Users',
            value: loggedInUsers.toLocaleString(),
            icon: UserCheck,
            color: 'bg-[#f4342c]',
        },
        {
            title: 'Avg Views/Day',
            value: avgViewsPerDay.toLocaleString(),
            icon: TrendingUp,
            color: 'bg-[#061f4b] dark:bg-[#3b82f6]',
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {stats.map((stat, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 transition-colors duration-200">
                    <div className="flex items-center">
                        <div className={`${stat.color} rounded-lg p-3 transition-colors duration-200`}>
                            <stat.icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 transition-colors duration-200">
                                {stat.title}
                            </p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 transition-colors duration-200">
                                {stat.value}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatsCards;