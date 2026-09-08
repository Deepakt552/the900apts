// resources/js/Pages/Admin/JobDescription/Form.jsx

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useForm } from '@inertiajs/react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import toast from 'react-hot-toast';
import {
    Save,
    X,
    ArrowLeft,
    AlertCircle,
    Type,
    AlignLeft,
    Maximize2,
    Minimize2,
    MoveVertical,
    Hash,
    RefreshCw,
    Check,
    Eye,
    Edit2,
    Copy,
    CheckCircle,
} from 'lucide-react';
import axios from 'axios';

// Custom CSS for the editor with proper resize
const editorStyles = `
    .job-description-editor .ql-container {
        min-height: 500px !important;
        height: 500px !important;
        max-height: none !important;
        border-radius: 0 0 12px 12px !important;
        font-size: 16px !important;
        line-height: 1.8 !important;
        overflow: auto !important;
        scroll-behavior: smooth !important;
        resize: vertical !important;
        display: block !important;
        position: relative !important;
    }

    .job-description-editor .ql-editor {
        min-height: 480px !important;
        height: 100% !important;
        padding: 20px !important;
        font-size: 16px !important;
        line-height: 1.8 !important;
        overflow-y: auto !important;
        scroll-behavior: smooth !important;
    }

    .job-description-editor .ql-container-wrapper {
        position: relative !important;
        display: flex !important;
        flex-direction: column !important;
    }

    .job-description-editor .ql-container-wrapper .ql-container {
        flex: 1 !important;
        min-height: 500px !important;
        resize: vertical !important;
        overflow: auto !important;
    }

    .job-description-editor .ql-toolbar {
        border-radius: 12px 12px 0 0 !important;
        position: sticky !important;
        top: 0 !important;
        z-index: 10 !important;
        background: inherit !important;
        border-bottom: 1px solid !important;
        padding: 12px 16px !important;
        flex-wrap: wrap !important;
        gap: 4px !important;
        display: flex !important;
        flex-wrap: wrap !important;
        align-items: center !important;
    }

    .job-description-editor.light .ql-toolbar {
        background: #ffffff !important;
        border-color: #e5e7eb !important;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05) !important;
    }

    .job-description-editor.light .ql-container {
        background: #ffffff !important;
        border-color: #e5e7eb !important;
    }

    .job-description-editor.light .ql-editor {
        color: #111827 !important;
    }

    .job-description-editor.light .ql-editor.ql-blank::before {
        color: #9ca3af !important;
    }

    .job-description-editor.dark .ql-toolbar {
        background: #1f2937 !important;
        border-color: #374151 !important;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3) !important;
    }

    .job-description-editor.dark .ql-container {
        background: #111827 !important;
        border-color: #374151 !important;
    }

    .job-description-editor.dark .ql-editor {
        color: #f3f4f6 !important;
    }

    .job-description-editor.dark .ql-editor.ql-blank::before {
        color: #6b7280 !important;
    }

    .job-description-editor.dark .ql-toolbar .ql-stroke {
        stroke: #d1d5db !important;
    }

    .job-description-editor.dark .ql-toolbar .ql-fill {
        fill: #d1d5db !important;
    }

    .job-description-editor.dark .ql-toolbar .ql-picker {
        color: #d1d5db !important;
    }

    .job-description-editor.dark .ql-toolbar .ql-picker-options {
        background: #1f2937 !important;
        border-color: #374151 !important;
        color: #d1d5db !important;
    }

    .job-description-editor.dark .ql-toolbar .ql-picker-item:hover {
        color: #ffffff !important;
        background: #374151 !important;
    }

    .job-description-editor.dark .ql-toolbar button:hover .ql-stroke {
        stroke: #ffffff !important;
    }

    .job-description-editor.dark .ql-toolbar button:hover .ql-fill {
        fill: #ffffff !important;
    }

    .job-description-editor .ql-editor {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important;
    }

    .job-description-editor .ql-editor p {
        margin-bottom: 1.2em !important;
    }

    .job-description-editor .ql-editor h1,
    .job-description-editor .ql-editor h2,
    .job-description-editor .ql-editor h3,
    .job-description-editor .ql-editor h4,
    .job-description-editor .ql-editor h5,
    .job-description-editor .ql-editor h6 {
        margin-top: 1.5em !important;
        margin-bottom: 0.8em !important;
        font-weight: 600 !important;
        line-height: 1.3 !important;
    }

    .job-description-editor .ql-editor h1 { font-size: 2em !important; }
    .job-description-editor .ql-editor h2 { font-size: 1.5em !important; }
    .job-description-editor .ql-editor h3 { font-size: 1.25em !important; }
    .job-description-editor .ql-editor h4 { font-size: 1.1em !important; }
    .job-description-editor .ql-editor h5 { font-size: 1em !important; }
    .job-description-editor .ql-editor h6 { font-size: 0.9em !important; }

    .job-description-editor .ql-editor img {
        max-width: 100% !important;
        height: auto !important;
        border-radius: 8px !important;
        margin: 16px 0 !important;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
    }

    .job-description-editor .ql-editor blockquote {
        border-left: 4px solid #3b82f6 !important;
        padding: 12px 20px !important;
        margin: 16px 0 !important;
        background: rgba(59, 130, 246, 0.05) !important;
        border-radius: 0 8px 8px 0 !important;
        font-style: italic !important;
    }

    .dark .job-description-editor .ql-editor blockquote {
        background: rgba(59, 130, 246, 0.1) !important;
    }

    .job-description-editor .ql-editor pre,
    .job-description-editor .ql-editor .ql-code-block {
        background: #1f2937 !important;
        color: #f3f4f6 !important;
        padding: 16px !important;
        border-radius: 8px !important;
        font-family: 'Courier New', monospace !important;
        font-size: 14px !important;
        line-height: 1.6 !important;
        overflow-x: auto !important;
        margin: 16px 0 !important;
    }

    .dark .job-description-editor .ql-editor pre,
    .dark .job-description-editor .ql-editor .ql-code-block {
        background: #0f172a !important;
    }

    .job-description-editor .ql-editor table {
        width: 100% !important;
        border-collapse: collapse !important;
        margin: 16px 0 !important;
    }

    .job-description-editor .ql-editor table td,
    .job-description-editor .ql-editor table th {
        border: 1px solid #e5e7eb !important;
        padding: 8px 12px !important;
    }

    .dark .job-description-editor .ql-editor table td,
    .dark .job-description-editor .ql-editor table th {
        border-color: #374151 !important;
    }

    .job-description-editor .ql-editor ul,
    .job-description-editor .ql-editor ol {
        padding-left: 24px !important;
        margin: 12px 0 !important;
    }

    .job-description-editor .ql-editor li {
        margin: 4px 0 !important;
    }

    .job-description-editor .ql-container::-webkit-scrollbar,
    .job-description-editor .ql-editor::-webkit-scrollbar {
        width: 8px !important;
        height: 8px !important;
    }

    .job-description-editor .ql-container::-webkit-scrollbar-track,
    .job-description-editor .ql-editor::-webkit-scrollbar-track {
        background: transparent !important;
    }

    .job-description-editor .ql-container::-webkit-scrollbar-thumb,
    .job-description-editor .ql-editor::-webkit-scrollbar-thumb {
        background: #d1d5db !important;
        border-radius: 4px !important;
    }

    .dark .job-description-editor .ql-container::-webkit-scrollbar-thumb,
    .dark .job-description-editor .ql-editor::-webkit-scrollbar-thumb {
        background: #4b5563 !important;
    }

    .job-description-editor .ql-container::-webkit-scrollbar-thumb:hover,
    .job-description-editor .ql-editor::-webkit-scrollbar-thumb:hover {
        background: #9ca3af !important;
    }

    .dark .job-description-editor .ql-container::-webkit-scrollbar-thumb:hover,
    .dark .job-description-editor .ql-editor::-webkit-scrollbar-thumb:hover {
        background: #6b7280 !important;
    }

    @media (max-width: 768px) {
        .job-description-editor .ql-toolbar {
            padding: 8px 12px !important;
            flex-wrap: wrap !important;
        }

        .job-description-editor .ql-toolbar .ql-formats {
            margin-right: 4px !important;
        }

        .job-description-editor .ql-toolbar button {
            padding: 4px !important;
        }

        .job-description-editor .ql-editor {
            padding: 16px !important;
            font-size: 15px !important;
            min-height: 380px !important;
        }

        .job-description-editor .ql-container {
            min-height: 400px !important;
            height: 400px !important;
        }
    }

    .job-description-editor .ql-container {
        position: relative !important;
    }

    .job-description-editor .ql-container::after {
        content: '↕' !important;
        position: absolute !important;
        bottom: 4px !important;
        right: 8px !important;
        font-size: 12px !important;
        color: #9ca3af !important;
        opacity: 0.3 !important;
        transition: opacity 0.3s ease !important;
        pointer-events: none !important;
        z-index: 5 !important;
    }

    .job-description-editor .ql-container:hover::after {
        opacity: 0.8 !important;
    }

    .job-description-editor .ql-container {
        resize: vertical !important;
        min-height: 500px !important;
        overflow: auto !important;
    }

    .job-description-editor:focus-within .ql-container {
        border-color: #3b82f6 !important;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
        border-radius: 0 0 12px 12px !important;
    }

    .job-description-editor:focus-within .ql-toolbar {
        border-color: #3b82f6 !important;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
        border-radius: 12px 12px 0 0 !important;
    }

    .job-description-editor .ql-editor .ql-checkbox {
        margin-right: 8px !important;
    }

    .job-description-editor.fullscreen {
        position: fixed !important;
        inset: 0 !important;
        z-index: 9999 !important;
        padding: 20px !important;
        background: #f9fafb !important;
    }

    .dark .job-description-editor.fullscreen {
        background: #111827 !important;
    }

    .job-description-editor.fullscreen .ql-container {
        height: calc(100vh - 160px) !important;
        min-height: calc(100vh - 160px) !important;
        max-height: calc(100vh - 160px) !important;
    }

    .job-description-editor.fullscreen .ql-editor {
        min-height: calc(100vh - 200px) !important;
        height: calc(100vh - 200px) !important;
    }
`;

export default function Form({ jobDescription = null, isEdit = false }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [wordCount, setWordCount] = useState(0);
    const [charCount, setCharCount] = useState(0);
    const [slugPreview, setSlugPreview] = useState('');
    const [slugGenerated, setSlugGenerated] = useState(false);
    const [isEditingSlug, setIsEditingSlug] = useState(false);
    const [customSlug, setCustomSlug] = useState('');
    const [copied, setCopied] = useState(false);
    const [slugError, setSlugError] = useState('');
    const quillRef = useRef(null);
    const editorContainerRef = useRef(null);
    const slugInputRef = useRef(null);

    const { data, setData, post, put, errors, processing, reset } = useForm({
        title: jobDescription?.title || '',
        content: jobDescription?.content || '',
        status: jobDescription?.status ?? true,
    });

    // Generate slug from title - FIXED: Replaces spaces with hyphens
    const generateSlug = (title) => {
        if (!title) return '';
        return title
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')  // Replace spaces with hyphens
            .replace(/[^a-z0-9-]/g, '')  // Remove any other special characters
            .replace(/-+/g, '-')  // Replace multiple hyphens with single
            .replace(/^-+|-+$/g, '');  // Remove leading/trailing hyphens
    };

    // Validate slug
    const validateSlug = (slug) => {
        if (!slug) return 'Slug is required';
        if (!/^[a-z0-9-]+$/.test(slug)) {
            return 'Slug can only contain lowercase letters, numbers, and hyphens';
        }
        if (slug.startsWith('-') || slug.endsWith('-')) {
            return 'Slug cannot start or end with a hyphen';
        }
        if (slug.includes('--')) {
            return 'Slug cannot contain consecutive hyphens';
        }
        return '';
    };

    // Auto-generate slug from title with real-time updates
    useEffect(() => {
        if (!isEditingSlug) {
            if (data.title) {
                const slug = generateSlug(data.title);
                setSlugPreview(slug);
                setSlugGenerated(true);
                setCustomSlug(slug);
                setSlugError('');
            } else {
                setSlugPreview('');
                setSlugGenerated(false);
                setCustomSlug('');
                setSlugError('');
            }
        }
    }, [data.title, isEdit, jobDescription, isEditingSlug]);

    // Focus slug input when editing
    useEffect(() => {
        if (isEditingSlug && slugInputRef.current) {
            slugInputRef.current.focus();
        }
    }, [isEditingSlug]);

    // Count words and characters
    const updateCounts = useCallback((content) => {
        const text = content.replace(/<[^>]*>/g, '').trim();
        const words = text ? text.split(/\s+/).length : 0;
        const chars = text.length;
        setWordCount(words);
        setCharCount(chars);
    }, []);

    // Update counts when content changes
    useEffect(() => {
        updateCounts(data.content);
    }, [data.content, updateCounts]);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Get the final slug
        let finalSlug = isEditingSlug ? customSlug : slugPreview;

        // If no slug is set, generate from title
        if (!finalSlug && data.title) {
            finalSlug = generateSlug(data.title);
        }

        // Validate slug
        if (finalSlug) {
            const error = validateSlug(finalSlug);
            if (error) {
                setSlugError(error);
                toast.error(error);
                return;
            }
        } else {
            toast.error('Please enter a title to generate a slug');
            return;
        }

        setIsSubmitting(true);

        const formData = {
            ...data,
            slug: finalSlug,
            _method: isEdit ? 'PUT' : 'POST',
        };

        const url = isEdit
            ? route('admin.job-descriptions.update', jobDescription.id)
            : route('admin.job-descriptions.store');

        const method = isEdit ? put : post;

        method(url, formData, {
            onSuccess: () => {
                toast.success(isEdit ? 'Updated Successfully' : 'Created Successfully');
                setIsSubmitting(false);
                setIsEditingSlug(false);
            },
            onError: (errors) => {
                if (errors.slug) {
                    setSlugError(errors.slug);
                    toast.error(errors.slug);
                } else {
                    toast.error('Validation Failed');
                }
                setIsSubmitting(false);
            },
        });
    };

    // Custom image handler for ReactQuill
    const imageHandler = useCallback(() => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            if (!file) return;

            const loadingToast = toast.loading('Uploading image...');

            const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
            if (!validTypes.includes(file.type)) {
                toast.dismiss(loadingToast);
                toast.error('Invalid image format. Please upload JPEG, PNG, JPG, or WEBP.');
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                toast.dismiss(loadingToast);
                toast.error('Image size should not exceed 5MB.');
                return;
            }

            const formData = new FormData();
            formData.append('image', file);

            try {
                const response = await axios.post(
                    route('admin.job-descriptions.upload-image'),
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                        },
                    }
                );

                if (response.data.url) {
                    const quill = quillRef.current?.getEditor();
                    if (quill) {
                        const range = quill.getSelection();
                        const position = range ? range.index : quill.getLength();
                        quill.insertEmbed(position, 'image', response.data.url);
                        quill.setSelection(position + 1);
                        toast.dismiss(loadingToast);
                        toast.success('Image Uploaded Successfully');
                    }
                }
            } catch (error) {
                toast.dismiss(loadingToast);
                console.error('Image upload error:', error);
                toast.error(error.response?.data?.error || 'Image Upload Failed');
            }
        };
    }, []);

    // Handle content change
    const handleContentChange = (content) => {
        setData('content', content);
        updateCounts(content);
    };

    // Handle slug change - FIXED: Replaces spaces with hyphens in real-time
    const handleSlugChange = (e) => {
        let value = e.target.value;

        // Replace spaces with hyphens
        value = value.replace(/\s+/g, '-');

        // Remove any invalid characters (keep only lowercase letters, numbers, and hyphens)
        value = value.toLowerCase().replace(/[^a-z0-9-]/g, '');

        // Replace multiple hyphens with single
        value = value.replace(/-+/g, '-');

        // Remove leading/trailing hyphens
        value = value.replace(/^-+|-+$/g, '');

        setCustomSlug(value);

        // Validate the slug
        if (value) {
            const error = validateSlug(value);
            setSlugError(error);
        } else {
            setSlugError('');
        }
    };

    // Handle slug blur - validate and auto-fix
    const handleSlugBlur = () => {
        if (customSlug) {
            // Remove leading/trailing hyphens
            let cleaned = customSlug.replace(/^-+|-+$/g, '');
            // Replace multiple hyphens with single
            cleaned = cleaned.replace(/--+/g, '-');
            if (cleaned !== customSlug) {
                setCustomSlug(cleaned);
                toast.info('Slug was automatically cleaned');
            }
            const error = validateSlug(cleaned);
            setSlugError(error);
        }
    };

    // Copy slug
    const copySlug = () => {
        const slugToCopy = isEditingSlug ? customSlug : slugPreview;
        if (slugToCopy) {
            navigator.clipboard.writeText(slugToCopy);
            setCopied(true);
            toast.success('Slug copied to clipboard!');
            setTimeout(() => setCopied(false), 3000);
        }
    };

    // Toggle slug editing
    const toggleSlugEditing = () => {
        if (!isEditingSlug) {
            setIsEditingSlug(true);
            setCustomSlug(slugPreview || generateSlug(data.title));
            setSlugError('');
        } else {
            // Cancel editing - revert to generated slug
            setIsEditingSlug(false);
            const slug = data.title ? generateSlug(data.title) : '';
            setSlugPreview(slug);
            setCustomSlug(slug);
            setSlugError('');
        }
    };

    // Full toolbar configuration
    const modules = {
        toolbar: {
            container: [
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                [{ size: ['small', false, 'large', 'huge'] }],
                [{ font: [] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ color: [] }, { background: [] }],
                [{ align: [] }],
                ['blockquote', 'code-block'],
                [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
                [{ indent: '-1' }, { indent: '+1' }],
                ['link', 'image', 'video', 'formula'],
                ['clean'],
                ['undo', 'redo'],
            ],
            handlers: {
                image: imageHandler,
            },
        },
        clipboard: {
            matchVisual: false,
        },
    };

    const formats = [
        'header', 'size', 'font',
        'bold', 'italic', 'underline', 'strike',
        'color', 'background',
        'align',
        'blockquote', 'code-block',
        'list', 'bullet', 'check',
        'indent',
        'link', 'image', 'video', 'formula',
        'clean',
        'undo', 'redo',
    ];

    // Toggle fullscreen
    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    // Auto-focus title on mount
    useEffect(() => {
        const titleInput = document.querySelector('input[name="title"]');
        if (titleInput) {
            setTimeout(() => titleInput.focus(), 100);
        }
    }, []);

    // Prevent accidental page refresh
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (data.title || data.content) {
                e.preventDefault();
                e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [data.title, data.content]);

    return (
        <>
            <style>{editorStyles}</style>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Header */}
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Header */}
                    <div className="flex-1 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            {isEdit ? "Edit Job Description" : "Create Job Description"}
                        </h1>

                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            {isEdit
                                ? "Update the job description details."
                                : "Add a new job description."}
                        </p>
                    </div>

                    {/* Status Card */}
                    <div className="w-full lg:w-80 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
                        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-5">
                            Status
                        </h3>

                        <div className="flex items-center justify-between mb-6">
                            <span
                                className={`text-sm font-semibold ${data.status
                                        ? "text-green-600 dark:text-green-400"
                                        : "text-red-600 dark:text-red-400"
                                    }`}
                            >
                                {data.status ? "Active" : "Inactive"}
                            </span>

                            <button
                                type="button"
                                onClick={() => setData("status", !data.status)}
                                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${data.status
                                        ? "bg-blue-600"
                                        : "bg-gray-300 dark:bg-gray-700"
                                    }`}
                            >
                                <span
                                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-300 ${data.status
                                            ? "translate-x-6"
                                            : "translate-x-1"
                                        }`}
                                />
                            </button>
                        </div>

                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back
                        </button>
                    </div>
                </div>

                {/* Form Content */}
                <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
                    <div className="lg:col-span-1 space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Title Field */}
                            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className={`w-full px-4 py-3 rounded-xl border ${errors.title
                                        ? 'border-red-500 focus:ring-red-500'
                                        : 'border-gray-300 dark:border-gray-700 focus:ring-blue-500'
                                        } focus:ring-2 focus:outline-none bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition`}
                                    placeholder="Enter job title"
                                />
                                {errors.title && (
                                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.title}
                                    </p>
                                )}
                            </div>

                            {/* Slug Field with Edit Capability */}
                            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Slug <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={copySlug}
                                            className="p-1.5 text-gray-500 hover:text-blue-600 transition rounded"
                                            title="Copy slug"
                                            disabled={!slugPreview && !customSlug}
                                        >
                                            {copied ? (
                                                <CheckCircle className="w-4 h-4 text-green-500" />
                                            ) : (
                                                <Copy className="w-4 h-4" />
                                            )}
                                        </button>
                                        {/* <button
                                        type="button"
                                        onClick={toggleSlugEditing}
                                        className={`p-1.5 transition rounded ${isEditingSlug 
                                            ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' 
                                            : 'text-gray-500 hover:text-blue-600'
                                        }`}
                                        title={isEditingSlug ? 'Cancel editing' : 'Edit slug'}
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button> */}
                                        {!isEditingSlug && slugGenerated && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (data.title) {
                                                        const newSlug = generateSlug(data.title);
                                                        setSlugPreview(newSlug);
                                                        setCustomSlug(newSlug);
                                                        toast.success('Slug regenerated');
                                                    }
                                                }}
                                                className="p-1.5 text-gray-500 hover:text-blue-600 transition rounded"
                                                title="Regenerate slug"
                                            >
                                                <RefreshCw className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {isEditingSlug ? (
                                    // Editable slug input with real-time space to hyphen conversion
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <div className="relative flex-1">
                                                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                <input
                                                    ref={slugInputRef}
                                                    type="text"
                                                    value={customSlug}
                                                    onChange={handleSlugChange}
                                                    onBlur={handleSlugBlur}
                                                    placeholder="Enter custom slug (spaces will become hyphens)"
                                                    className={`w-full pl-10 pr-4 py-3 rounded-xl border ${slugError || errors.slug
                                                        ? 'border-red-500 focus:ring-red-500'
                                                        : 'border-gray-300 dark:border-gray-700 focus:ring-blue-500'
                                                        } focus:ring-2 focus:outline-none bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition font-mono`}
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (data.title) {
                                                        const slug = generateSlug(data.title);
                                                        setCustomSlug(slug);
                                                        setSlugError('');
                                                        toast.success('Slug regenerated from title');
                                                    }
                                                }}
                                                className="p-3 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition"
                                                title="Regenerate from title"
                                            >
                                                <RefreshCw className="w-4 h-4" />
                                            </button>
                                        </div>
                                        {slugError && (
                                            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                                                <AlertCircle className="w-4 h-4" />
                                                {slugError}
                                            </p>
                                        )}
                                        {errors.slug && (
                                            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                                                <AlertCircle className="w-4 h-4" />
                                                {errors.slug}
                                            </p>
                                        )}
                                        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                            <span className="flex items-center gap-1">
                                                <span>• Spaces are automatically converted to hyphens</span>
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <span>• Only lowercase letters, numbers, and hyphens allowed</span>
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <span>• Must not start or end with a hyphen</span>
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    // Display slug preview
                                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Hash className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm font-mono text-blue-600 dark:text-blue-400">
                                                    {slugPreview || 'No slug generated yet'}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {slugGenerated && (
                                                    <span className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                                                        <Check className="w-3 h-3" />
                                                        Auto-generated
                                                    </span>
                                                )}
                                                {isEdit && !slugGenerated && jobDescription?.slug && (
                                                    <span className="text-xs text-blue-600 dark:text-blue-400 flex items-center gap-1">
                                                        <Check className="w-3 h-3" />
                                                        Custom
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* Content Field */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Content <span className="text-red-500">*</span>
                                </label>
                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={toggleFullscreen}
                                        className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
                                        title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                                    >
                                        {isFullscreen ? (
                                            <Minimize2 className="w-4 h-4" />
                                        ) : (
                                            <Maximize2 className="w-4 h-4" />
                                        )}
                                    </button>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                        <span className="mr-2">{wordCount} words</span>
                                        <span>{charCount} characters</span>
                                    </div>
                                </div>
                            </div>

                            <div
                                ref={editorContainerRef}
                                className={`job-description-editor ${document.documentElement.classList.contains('dark') ? 'dark' : 'light'
                                    } ${isFullscreen ? 'fullscreen' : ''}`}
                            >
                                <div
                                    className={`rounded-xl overflow-hidden border ${errors.content
                                        ? 'border-red-500'
                                        : 'border-gray-300 dark:border-gray-700'
                                        } bg-white dark:bg-gray-800 shadow-sm`}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: isFullscreen ? 'calc(100vh - 140px)' : 'auto',
                                    }}
                                >
                                    <ReactQuill
                                        ref={quillRef}
                                        theme="snow"
                                        value={data.content}
                                        onChange={handleContentChange}
                                        modules={modules}
                                        formats={formats}
                                        placeholder="Write the complete job description here..."
                                        style={{
                                            flex: 1,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            minHeight: isFullscreen ? 'calc(100vh - 200px)' : '500px',
                                        }}
                                    />
                                </div>

                                {isFullscreen && (
                                    <button
                                        type="button"
                                        onClick={toggleFullscreen}
                                        className="z-[99999] absolute top-8 right-8 p-3 bg-gray-900 dark:bg-gray-700 text-white rounded-xl hover:bg-gray-800 dark:hover:bg-gray-600 transition shadow-lg"
                                    >
                                        <Minimize2 className="w-5 h-5" />
                                    </button>
                                )}
                            </div>

                            {errors.content && (
                                <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                                    <AlertCircle className="w-4 h-4" />
                                    {errors.content}
                                </p>
                            )}

                            <div className="mt-3 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                                <div className="flex items-center gap-4">
                                    <span className="flex items-center gap-1">
                                        <Type className="w-3 h-3" />
                                        {wordCount} words
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <AlignLeft className="w-3 h-3" />
                                        {charCount} characters
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MoveVertical className="w-3 h-3" />
                                    <span>Drag bottom right corner to resize</span>
                                </div>
                            </div>
                        </div>

                        {/* Status and Actions */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Status Card */}
                            <div className=""></div>

                            {/* Meta Info (Edit Mode) */}
                            {isEdit && jobDescription && (
                                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 lg:col-span-1">
                                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                        Meta Information
                                    </h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500 dark:text-gray-400">Created:</span>
                                            <span className="text-gray-700 dark:text-gray-300">
                                                {new Date(jobDescription.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500 dark:text-gray-400">Last Updated:</span>
                                            <span className="text-gray-700 dark:text-gray-300">
                                                {new Date(jobDescription.updated_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500 dark:text-gray-400">Current Slug:</span>
                                            <span className="text-gray-700 dark:text-gray-300 font-mono text-xs">
                                                {jobDescription.slug}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className={`${isEdit ? 'lg:col-span-1' : 'lg:col-span-2'} flex flex-col sm:flex-row gap-4 items-stretch lg:items-center lg:justify-end`}>
                                <button
                                    type="button"
                                    onClick={() => window.history.back()}
                                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition font-semibold"
                                >
                                    <X className="w-5 h-5" />
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={isSubmitting || processing || !!slugError}
                                    className="flex-1 sm:flex-none min-w-[180px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-600/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting || processing ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            {isEdit ? "Updating..." : "Creating..."}
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-5 h-5" />
                                            {isEdit ? "Update" : "Create"}
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}