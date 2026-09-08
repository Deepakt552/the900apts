import React from 'react';
import { FileText } from 'lucide-react';

const TopBlogs = ({ data }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 transition-colors duration-200">
            <div className="flex items-center mb-4">
                <FileText className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-2 transition-colors duration-200" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 transition-colors duration-200">
                    Top Blog Posts
                </h3>
            </div>
            <div className="space-y-4">
                {data.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 text-sm transition-colors duration-200">
                        No data available
                    </p>
                ) : (
                    data.map((blog, index) => (
                        <div key={blog.id} className="flex items-center justify-between">
                            <div className="flex-1 min-w-0">
                                <p className="flex items-center gap-3 text-sm font-medium text-gray-900 dark:text-gray-100 truncate transition-colors duration-200">
                                    <span
                                        className={`w-6 h-6 p-2 flex items-center justify-center rounded-full text-white font-semibold ${
                                            index % 2 === 0
                                                ? "bg-[#f4342c]"
                                                : "bg-[#061f4b] dark:bg-[#3b82f6]"
                                        }`}
                                    >
                                        {index + 1}
                                    </span>

                                    <span className="truncate">{blog.title}</span>
                                </p>
                            </div>

                            <span className="ml-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap transition-colors duration-200">
                                {blog.views.toLocaleString()} views
                            </span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default TopBlogs;