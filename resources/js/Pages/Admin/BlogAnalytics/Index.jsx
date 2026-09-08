import React from "react";
import Header from "./Header";
import StatsCards from "./StatsCards";
import ViewsOverTimeChart from "./ViewsOverTimeChart";
import DeviceChart from "./DeviceChart";
import TopCountries from "./TopCountries";
import BrowserChart from "./BrowserChart";
import TopBlogs from "./TopBlogs";
import Footer from "./Footer";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const Index = ({
    totalViews,
    uniqueVisitors,
    loggedInUsers,
    avgViewsPerDay,
    viewsOverTime,
    viewsByDevice,
    viewsByBrowser,
    topCountries,
    topBlogs,
    IsModal,
}) => {
    return (
        <>
            {IsModal ? (
                <>
                    <div className="space-y-6 bg-gray-100 dark:bg-gray-900 p-3 min-h-screen transition-colors duration-200">
                        {/* <Header /> */}
                        <StatsCards
                            totalViews={totalViews}
                            uniqueVisitors={uniqueVisitors}
                            loggedInUsers={loggedInUsers}
                            avgViewsPerDay={avgViewsPerDay}
                        />
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                            <div className="lg:col-span-2">
                                <ViewsOverTimeChart data={viewsOverTime} />
                            </div>
                            <div>
                                <DeviceChart data={viewsByDevice} />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                            <TopCountries data={topCountries} />
                            <BrowserChart data={viewsByBrowser} />
                            <TopBlogs data={topBlogs} />
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <AuthenticatedLayout
                        header={
                            <div className="ml-10 p-4 text-xl font-bold text-gray-500 dark:text-gray-400 transition-colors duration-200">
                                Blog Analytics
                            </div>
                        }
                    >
                        <div className="space-y-6 bg-gray-100 dark:bg-gray-900 p-3 min-h-screen transition-colors duration-200">
                            {/* <Header /> */}
                            <StatsCards
                                totalViews={totalViews}
                                uniqueVisitors={uniqueVisitors}
                                loggedInUsers={loggedInUsers}
                                avgViewsPerDay={avgViewsPerDay}
                            />
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                                <div className="lg:col-span-2">
                                    <ViewsOverTimeChart data={viewsOverTime} />
                                </div>
                                <div>
                                    <DeviceChart data={viewsByDevice} />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                                <TopCountries data={topCountries} />
                                <BrowserChart data={viewsByBrowser} />
                                <TopBlogs data={topBlogs} />
                            </div>
                        </div>
                    </AuthenticatedLayout>
                </>
            )}
        </>
    );
};

export default Index;
