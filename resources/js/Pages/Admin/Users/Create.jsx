import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { UserPlus } from 'lucide-react';
import Form from './Form';
import toast, { Toaster } from 'react-hot-toast';

export default function Create() {
    const handleSubmit = (data, reset) => {
        const loadingToast = toast.loading('Creating user...');

        router.post(route('admin.users.store'), data, {
            preserveScroll: true,
            onSuccess: () => {
                toast.dismiss(loadingToast);
                toast.success('User created successfully.');
                reset();
            },
            onError: (errors) => {
                toast.dismiss(loadingToast);
                // toast.error('Failed to create user. Please check the form for errors.'+errors);
                Object.values(errors).forEach((error) => {
                    toast.error(error);
                });
                console.log(errors);
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Create User" />
            <Toaster position="top-right" reverseOrder={false} />

            <div className="max-w-2xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 lg:p-8">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="p-2 bg-[#1d294d] dark:bg-[#2a3a6b] rounded-lg">
                            <UserPlus className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Create New User</h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Add a new user to the system</p>
                        </div>
                    </div>

                    <Form
                        isEditing={false}
                        onSubmit={handleSubmit}
                        submitButtonText="Create User"
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}