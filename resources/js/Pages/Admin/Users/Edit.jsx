import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { Pencil } from 'lucide-react';
import Form from './Form';
import toast, { Toaster } from 'react-hot-toast';

export default function Edit({ user }) {
    const handleSubmit = (data, reset) => {
        const loadingToast = toast.loading('Updating user...');
        
        router.put(route('admin.users.update', user.id), data, {
            preserveScroll: true,
            onSuccess: () => {
                toast.dismiss(loadingToast);
                toast.success('User updated successfully.');
            },
            onError: (errors) => {
                toast.dismiss(loadingToast);
                Object.values(errors).forEach((error) => {
                    toast.error(error);
                });
                console.log(errors);
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Edit User - ${user.name}`} />
            <Toaster position="top-right" reverseOrder={false} />

            <div className="max-w-2xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 lg:p-8">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="p-2 bg-[#1d294d] dark:bg-[#2a3a6b] rounded-lg">
                            <Pencil className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Edit User</h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Update user information</p>
                        </div>
                    </div>

                    <Form 
                        initialData={user}
                        isEditing={true}
                        onSubmit={handleSubmit}
                        submitButtonText="Update User"
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}