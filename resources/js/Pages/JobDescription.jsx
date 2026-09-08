// resources/js/Pages/JobDescription.jsx
import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    Briefcase,
    MapPin,
    Clock,
    Calendar,
    Building2,
    Users,
    Award,
    CheckCircle,
    AlertCircle,
    DollarSign,
    GraduationCap,
    Heart,
    Star,
    ChevronRight,
    ExternalLink,
    Mail,
    X
} from 'lucide-react';
import Apply from './Admin/Careers/Apply';
import Navbar from '../Layouts/NavBar';
import Footer from '../Layouts/Footer';
import APP_CONFIG from "./config";

export default function JobDescription({ job, relatedJobs = [], skillLevels }) {
    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

    // No need to check if job is array, it's a single object
    // Add a check if job exists
    if (!job) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-dark-500">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-white">Job not found</h1>
                    <Link href={route('career')} className="text-gold-400 hover:text-gold-500 mt-4 inline-block">
                        Back to Careers
                    </Link>
                </div>
            </div>
        );
    }

    // Format date
    const formatDate = (date) => {
        if (!date) return 'N/A';
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Benefits array
    const benefits = [
        { icon: Heart, label: 'Health Insurance', description: 'Comprehensive medical coverage' },
        { icon: Award, label: 'Performance Bonus', description: 'Annual performance-based incentives' },
        { icon: GraduationCap, label: 'Learning Budget', description: '$2000 annual learning stipend' },
        { icon: Clock, label: 'Flexible Hours', description: 'Flexible working schedule' },
        { icon: Users, label: 'Team Events', description: 'Monthly team building activities' },
    ];

    return (
        <>
            <Head title={`${job.title || 'Job Details'} | ${APP_CONFIG.APPNAME}`} />
            <Navbar />

            <section className="relative w-full h-[520px] flex md:items-start items-start md:py-0 py-10 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        // src="/herohalf.png"
                        style={{
                            backgroundImage: `url(${APP_CONFIG.ORIGIN}/img/carrerHero.png)`,
                        }}
                        alt="Modern skyscrapers"
                        className="hidden md:block w-full h-full object-cover object-cover"
                    />
                    <img
                        // src="/heroMobileView.png"
                        style={{
                            backgroundImage: `url(${APP_CONFIG.ORIGIN}/img/carrerHero.png)`,
                        }}
                        alt="Modern skyscrapers"
                        className="block md:hidden w-full h-full object-cover object-cover"
                    />
                    <div className="absolute inset-0 bg-dark-500 bg-opacity-60"></div>
                </div>

                {/* Content */}
                <div className="container mx-auto px-6 lg:px-2 relative z-10 text-white">
                    <div className="w-full md:w-1/2 h-full flex items-center">
                        <div className="max-w-xl mx-auto px-6 md:px-10 py-20 text-white">
                            <div className="inline-flex bg-gold-400/10 backdrop-blur-sm rounded-full px-6 py-2 border border-gold-400/30 mb-6">
                                <span className="text-sm font-medium text-gold-400">Join Our Team</span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight">
                                Build Your
                                <span className="text-gold-400"> Career With Us</span>
                            </h1>

                            <p className="text-gray-300 text-lg md:text-xl max-w-md leading-relaxed mt-10">
                                Discover exciting opportunities and grow professionally in a dynamic environment.
                            </p>
                        </div>
                    </div>
                </div>
            </section> 

            {/* Main Content */}
            <div className="bg-dark-500 py-8">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
                        {/* Left Column - Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Job Header Card */}
                            <div className="bg-dark-50 rounded-2xl shadow-sm border border-gold-400/20 overflow-hidden">
                                <div className="p-8">
                                    <div className="flex items-start justify-between mb-6">
                                        <div>
                                            <div className="container mx-auto px-4 py-4">
                                                <Link
                                                    href={route('career')}
                                                    className="inline-flex items-center gap-2 text-gray-400 hover:text-gold-400 transition-colors group"
                                                >
                                                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                                    Back to All Positions
                                                </Link>
                                            </div>
                                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                                                {job.title || 'Position Title'}
                                            </h1>
                                            {job.department && (
                                                <div className="flex items-center gap-2">
                                                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-dark-200 text-gold-400 text-sm rounded-full border border-gold-400/10">
                                                        <Briefcase className="w-3 h-3" />
                                                        {job.department}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm text-gray-400">Posted on</div>
                                            <div className="font-medium text-gray-300">{formatDate(job.created_at)}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Job Description */}
                            <div className="bg-dark-50 rounded-2xl shadow-sm border border-gold-400/20 overflow-hidden">
                                <div className="p-8">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-2xl font-bold text-white mb-4">
                                            Job Description
                                        </h2>
                                    </div>
                                    <div className="prose prose-lg max-w-none prose-invert text-gray-300">
                                        {job.content ? (
                                            <iframe
                                                title="Job Description"
                                                className="w-full border-0 min-h-screen bg-dark-50"
                                                srcDoc={`
                                                    <!DOCTYPE html>
                                                    <html>
                                                    <head>
                                                        <style>
                                                            body{
                                                                margin:24px;
                                                                font-family: Arial, Helvetica, sans-serif;
                                                                line-height:1.7;
                                                                color:#e5e7eb;
                                                                background-color: #1c2840;
                                                            }
                                                            h1, h2, h3, h4, h5, h6 {
                                                                color: #ffffff;
                                                            }
                                                            a {
                                                                color: #d4af37;
                                                            }
                                                            ul, ol {
                                                                color: #e5e7eb;
                                                            }
                                                            p {
                                                                color: #d1d5db;
                                                            }
                                                            strong, b {
                                                                color: #ffffff;
                                                            }
                                                        </style>
                                                    </head>
                                                    <body>
                                                        ${job.content}
                                                    </body>
                                                    </html>
                                                `}
                                            />
                                        ) : (
                                            <p className="text-gray-400">No description provided</p>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span></span>
                                        <button
                                            onClick={() => setIsApplyModalOpen(true)}
                                            className="mt-4 inline-flex items-center gap-2 bg-gold-400 text-dark-500 px-6 py-3 rounded-lg font-semibold hover:bg-gold-500 transition-all transform hover:scale-105 shadow-md shadow-gold-400/20"
                                        >
                                            Apply
                                            <Mail className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Apply Modal */}
            {isApplyModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-dark-400 bg-opacity-80 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsApplyModalOpen(false)}
                    ></div>

                    {/* Modal */}
                    <div className="flex min-h-full items-center justify-center p-4">
                        <div className="relative bg-dark-50 rounded-2xl shadow-2xl border border-gold-400/20 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                            {/* Modal Header */}
                            <div className="sticky top-0 bg-dark-50 border-b border-gold-400/20 px-6 py-4 flex items-center justify-between z-10">
                                <h3 className="text-xl font-bold text-white">
                                    Apply for {job.title}
                                </h3>
                                <button
                                    onClick={() => setIsApplyModalOpen(false)}
                                    className="p-2 hover:bg-dark-200 rounded-full transition-colors text-gray-400 hover:text-white"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Modal Body - Apply Component */}
                            <div className="p-2">
                                <Apply skillLevels={skillLevels} jobId={job.id} jobTitle={job.title}/>
                            </div>

                            {/* Modal Footer */}
                            <div className="sticky bottom-0 bg-dark-200 border-t border-gold-400/20 px-6 py-4">
                                <p className="text-sm text-gray-400 text-center">
                                    By applying, you agree to our terms and conditions
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
}