// resources/js/Pages/Admin/PublicLinks/Edit.jsx

import React from 'react';
import { Head } from '@inertiajs/react';
import { Pencil } from 'lucide-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PublicLinkForm from './PublicLinkForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Edit({ publicLink }) {
    return (
        <AuthenticatedLayout>
            <Head title={`Edit Public Link: ${publicLink.label}`} />
            
            <ToastContainer 
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center gap-3 mb-6">
                    <Pencil className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Edit Public Link
                    </h1>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <PublicLinkForm publicLink={publicLink} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}