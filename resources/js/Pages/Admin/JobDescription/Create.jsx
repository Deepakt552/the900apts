// resources/js/Pages/Admin/JobDescription/Create.jsx

import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Form from './Form';

export default function Create() {
    return (
        <AuthenticatedLayout>
            <Form />
        </AuthenticatedLayout>
    );
}