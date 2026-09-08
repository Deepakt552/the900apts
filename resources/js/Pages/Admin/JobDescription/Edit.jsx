// resources/js/Pages/Admin/JobDescription/Edit.jsx

import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Form from './Form';

export default function Edit({ jobDescription }) {
    return (
        <AuthenticatedLayout>
            <Form jobDescription={jobDescription} isEdit={true} />
        </AuthenticatedLayout>
    );
}