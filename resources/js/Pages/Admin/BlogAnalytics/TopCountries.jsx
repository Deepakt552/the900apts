import React from 'react';
import { Globe } from 'lucide-react';

const TopCountries = ({ data }) => {
    const maxViews = data.length > 0 ? Math.max(...data.map(item => item.views)) : 1;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 transition-colors duration-200">
            <div className="flex items-center mb-4">
                <Globe className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-2 transition-colors duration-200" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 transition-colors duration-200">
                    Top Countries
                </h3>
            </div>
            <div className="space-y-4">
                {data.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 text-sm transition-colors duration-200">
                        No data available
                    </p>
                ) : (
                    data.map((country, index) => (
                        <div key={index}>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200">
                                    {country.country == '' ? 'Other' : country.country}
                                </span>
                                <span className="text-gray-600 dark:text-gray-400 transition-colors duration-200">
                                    {country.views.toLocaleString()} views
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 transition-colors duration-200">
                                <div
                                    className={`rounded-full h-2 transition-colors duration-200 ${
                                        index % 2 === 0
                                            ? "bg-[#061f4b] dark:bg-[#3b82f6]"
                                            : "bg-[#f4342c] dark:bg-[#ef4444]"
                                    }`}
                                    style={{ width: `${(country.views / maxViews) * 100}%` }}
                                />
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default TopCountries;