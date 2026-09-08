// resources/js/Pages/Careers.jsx
import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    Briefcase,
    MapPin,
    Clock,
    Calendar,
    ChevronRight,
    Search,
    Filter,
    Building2,
    Mail,
    Phone,
    Globe,
    Users,
    Award,
    TrendingUp,
    Coffee,
    Heart,
    Sparkles,
    ArrowRight
} from 'lucide-react';

import Navbar from '@/Layouts/NavBar';
import Footer from '@/Layouts/Footer';
import config from './config';

export default function Careers({ jobDescriptions = [] }) {
    const { auth } = usePage().props;
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('all');

    // Get unique departments for filter
    const departments = ['all', ...new Set(jobDescriptions.map(job => job.department).filter(Boolean))];

    // Filter jobs based on search and department
    const filteredJobs = jobDescriptions.filter(job => {
        const matchesSearch = job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.department?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDepartment = selectedDepartment === 'all' || job.department === selectedDepartment;
        return matchesSearch && matchesDepartment;
    });

    return (
        <>
            <Head title={`Careers | ${config.APPNAME}`} />
            <Navbar />

            {/* Hero Section */}
            <section className="relative w-full h-[520px] flex md:items-start items-start md:py-0 py-10 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        // src="/herohalf.png"
                        style={{
                            backgroundImage: `url(${config.ORIGIN}/img/carrerHero.png)`,
                        }}
                        alt="Modern skyscrapers"
                        className="hidden md:block w-full h-full object-cover object-cover"
                    />
                    <img
                        // src="/heroMobileView.png"
                        style={{
                            backgroundImage: `url(${config.ORIGIN}/img/carrerHero.png)`,
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
                            <div className="inline-flex bg-gold-400/10 backdrop-blur-sm rounded-full px-6 py-2 border border-gold-400/30 mb-6" data-aos="zoom-in">
                                <span className="text-sm font-medium text-gold-400">Join Our Team</span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight" data-aos="zoom-in">
                                Build Your
                                <span className="text-gold-400"> Career With Us</span>
                            </h1>

                            <p className="text-gray-300 text-lg md:text-xl max-w-md leading-relaxed mt-10" data-aos="zoom-in">
                                Discover exciting opportunities and grow professionally in a dynamic environment.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Join Us Section */}
            <section className="py-16 bg-dark-500">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" data-aos="zoom-in">
                            Why Join <span className="text-gold-400">{config.APPNAME}</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto" data-aos="zoom-in">
                            We believe in creating an environment where you can thrive both personally and professionally
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: Heart, title: 'Great Culture', description: 'Collaborative and inclusive work environment where every voice matters' },
                            { icon: TrendingUp, title: 'Growth Opportunities', description: 'Continuous learning and career advancement programs' },
                            { icon: Coffee, title: 'Work-Life Balance', description: 'Flexible schedules and employee wellness initiatives' },
                        ].map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div key={index} className="bg-dark-50 rounded-2xl p-8 shadow-sm hover:shadow-lg hover:shadow-gold-400/5 transition-all duration-300 border border-gold-400/10 hover:border-gold-400/30" data-aos="zoom-in">
                                    <div className="w-14 h-14 bg-gold-400/10 rounded-xl flex items-center justify-center mb-4 border border-gold-400/20">
                                        <Icon className="w-7 h-7 text-gold-400" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                                    <p className="text-gray-400">{item.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Job Listings Section */}
            <section className="py-16 bg-dark-500">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                        <div data-aos="zoom-in">
                            <p className="text-gray-400 mt-1">
                                {filteredJobs.length} {filteredJobs.length === 1 ? 'Job' : 'Jobs'} available
                            </p>
                        </div>

                        {/* Search and Filter */}
                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                            <div className="relative" data-aos="zoom-in">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Search jobs..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 bg-dark-50 border border-gold-400/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-gold-400 w-full sm:w-64 text-white placeholder-gray-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Job Cards Grid */}
                    {filteredJobs.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {filteredJobs.map((job) => (
                                <div key={job.id} data-aos="zoom-in"
                                    className="group bg-dark-50 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-gold-400/5 transition-all duration-300 border border-gold-400/10 hover:border-gold-400/30 overflow-hidden">
                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h3 className="text-xl font-semibold text-white group-hover:text-gold-400 transition-colors">
                                                    {job.title}
                                                </h3>
                                                {job.department && (
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-dark-200 text-gold-400 text-sm rounded-full border border-gold-400/10">
                                                            <Briefcase className="w-3 h-3" />
                                                            {job.department}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <Link
                                            href={route('career.job', job.id)}
                                            className="inline-flex items-center gap-2 text-gold-400 font-medium hover:text-gold-500 hover:gap-3 transition-all duration-300 group/link"
                                        >
                                            Apply Now
                                            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-dark-50 rounded-2xl border border-gold-400/10">
                            <Briefcase className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-white mb-2">No Positions Available</h3>
                            <p className="text-gray-400">Check back later for new opportunities</p>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </>
    );
}