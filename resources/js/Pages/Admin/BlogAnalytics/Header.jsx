import React from 'react';
import { Calendar, TrendingUp, Eye, Users, UserCheck, BarChart3 } from 'lucide-react';

const Header = () => {
    return (
        <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Blog Analytics</h1>
                    <p className="text-sm text-gray-600 mt-1">Track your blog performance and audience insights</p>
                </div>
                <div className="mt-4 sm:mt-0 flex items-center space-x-3">
                    {/* 
                        <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <Calendar className="h-4 w-4 mr-2" />
                            Last 30 Days
                        </button>
                        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <BarChart3 className="h-4 w-4 mr-2" />
                            Export Report
                        </button> 
                    */}
                </div>
            </div>
        </div>
    );
};

export default Header;