import React, { useState, useRef, useMemo, forwardRef, useImperativeHandle, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { Link, useForm, usePage } from '@inertiajs/react';
import Swal from 'sweetalert2';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router } from '@inertiajs/react';
import 'react-quill/dist/quill.snow.css';
import {
    Image as ImageIcon,
    Tag,
    FileText,
    User,
    Clock, 
    X,
    Eye,
    Save,
    Upload,
    BarChart,
    CheckCircle,
    TrendingUp,
    Hash,
    Plus,
    Calendar,
    Shield,
    BookOpen,
    Menu,
    Zap,
    Filter,
    MoveVertical,
    Maximize2,
    Minimize2,
    Trash2,
    Edit
} from 'lucide-react';

// Custom Quill Editor Component (same as Create)
const QuillEditor = forwardRef(({ value, onChange, placeholder, isResizable, onResizeToggle }, ref) => {
    const quillRef = useRef(null);
    const editorContainerRef = useRef(null);
    const isResizing = useRef(false);
    const startY = useRef(0);
    const startHeight = useRef(0);
    const [showMobileToolbar, setShowMobileToolbar] = useState(false);

    useImperativeHandle(ref, () => ({
        getEditor: () => quillRef.current?.getEditor(),
        getQuill: () => quillRef.current,
        focus: () => quillRef.current?.getEditor()?.focus()
    }));

    const handleQuillRef = (node) => {
        quillRef.current = node;
    };

    const handleMouseDown = (e) => {
        e.preventDefault();
        e.stopPropagation();
        isResizing.current = true;
        startY.current = e.clientY;
        startHeight.current = editorContainerRef.current.offsetHeight;

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        document.body.style.cursor = 'ns-resize';
        document.body.style.userSelect = 'none';
    };

    const handleMouseMove = (e) => {
        if (!isResizing.current) return;
        const deltaY = e.clientY - startY.current;
        const newHeight = Math.max(300, Math.min(window.innerHeight - 100, startHeight.current + deltaY));
        editorContainerRef.current.style.height = `${newHeight}px`;

        if (quillRef.current) {
            const quillEditor = quillRef.current.getEditor();
            if (quillEditor.root) {
                quillEditor.root.style.height = `${newHeight - 80}px`;
            }
        }
    };

    const handleMouseUp = () => {
        isResizing.current = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
    };

    const handleFullscreen = () => {
        if (!editorContainerRef.current) return;
        if (!document.fullscreenElement) {
            editorContainerRef.current.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
        applyPresetSize(window.innerHeight);
    };

    useEffect(() => {
        const handleFullscreenChange = () => {
            const isFullscreen = !!document.fullscreenElement;
            if (isFullscreen) {
                document.documentElement.style.overflow = 'hidden';
                editorContainerRef.current.classList.add('fullscreen-mode');
            } else {
                document.documentElement.style.overflow = '';
                editorContainerRef.current.classList.remove('fullscreen-mode');
            }
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, []);

    useEffect(() => {
        if (editorContainerRef.current) {
            const defaultHeight = isResizable ? 700 : 500;
            editorContainerRef.current.style.height = `${defaultHeight}px`;
            setTimeout(() => {
                const quillEditor = quillRef.current?.getEditor();
                if (quillEditor?.root) {
                    quillEditor.root.style.height = `${defaultHeight - 80}px`;
                }
            }, 100);
        }
    }, [isResizable]);
    const width = window.innerWidth;
    const sizePresets =[
        // { height: Math.floor(width < 640 ? window.innerHeight * 0.4 : width < 768 ? window.innerHeight * 0.5 : window.innerHeight * 0.8), label: 'S', title: 'Small (responsive)' },
        { height: Math.floor(window.innerHeight * 0.5), label: 'S', title: 'Medium (responsive)' },
        { height: Math.floor(window.innerHeight * 0.8), label: 'M', title: 'Large (responsive)' },
        { height: window.innerHeight, label: 'L', title: 'Full Height' },
    ];
    // [
    //     { height: 400, label: 'S', title: 'Small (400px)' },
    //     { height: 500, label: 'M', title: 'Medium (500px)' },
    //     { height: 600, label: 'L', title: 'Large (600px)' },
    //     { height: 700, label: 'XL', title: 'Extra Large (100px)' },
    // ];

    const applyPresetSize = (height) => {
        if (editorContainerRef.current) {
            editorContainerRef.current.style.height = `${height}px`;
            const quillEditor = quillRef.current?.getEditor();
            if (quillEditor?.root) {
                quillEditor.root.style.height = `${height - 80}px`;
            }
        }
    };

    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                ['link', 'image', 'video'],
                ['clean'],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'align': [] }]
            ]
        },
        clipboard: {
            matchVisual: false,
        }
    }), []);

    const formats = useMemo(() => [
        'header', 'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent', 'link', 'image', 'video',
        'color', 'background', 'align'
    ], []);

    return (
        <div
            ref={editorContainerRef}
            className="relative bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm transition-colors"
        >
            <button
                type="button"
                onClick={() => setShowMobileToolbar(!showMobileToolbar)}
                className="lg:hidden absolute top-3 left-3 z-30 p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                title="Toggle Toolbar"
            >
                <Menu className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>

            {isResizable && (
                <div
                    className="absolute bottom-0 left-0 right-0 h-4 cursor-ns-resize z-20 group"
                    onMouseDown={handleMouseDown}
                    title="Drag to resize height"
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-100 dark:from-gray-700 to-transparent group-hover:from-gray-200 dark:group-hover:from-gray-600 transition-colors"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex space-x-1 opacity-60 group-hover:opacity-100">
                        <MoveVertical className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </div>
                </div>
            )}

            <div className={`absolute top-2 right-2 z-10 flex flex-col space-y-2 ${showMobileToolbar ? 'flex' : 'hidden lg:flex'}`}>
              
                <button
                    type="button"
                    onClick={handleFullscreen}
                    className="p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
                    title="Toggle Fullscreen"
                >
                    {document.fullscreenElement ? (
                        <Minimize2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    ) : (
                        <Maximize2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    )}
                </button>
                <button
                    type="button"
                    onClick={onResizeToggle}
                    className="p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 group"
                    title={isResizable ? "Fixed Height" : "Resizable Height"}
                >
                    <div className="relative w-4 h-4">
                        <div className="absolute inset-0 border border-gray-600 dark:border-gray-400 rounded-sm group-hover:border-gray-900 dark:group-hover:border-gray-300"></div>
                        {isResizable && (
                            <>
                                <div className="absolute -bottom-1 -right-1 w-2 h-2 border-r border-b border-gray-600 dark:border-gray-400 rounded-sm"></div>
                                <div className="absolute -bottom-1 -right-1 w-1 h-1 bg-gray-600 dark:bg-gray-400"></div>
                            </>
                        )}
                    </div>
                </button>
                  {isResizable && (
                    <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm p-1 flex flex-col space-y-2 mr-2">
                        {sizePresets.map((size) => (
                            <button
                                key={size.height}
                                type="button"
                                onClick={() => applyPresetSize(size.height)}
                                className="w-7 h-7 flex items-center justify-center text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition"
                                title={size.title}
                            >
                                {size.label}
                            </button>
                        ))}
                    </div>
                )}

            </div>

            <ReactQuill
                ref={handleQuillRef}
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modules}
                formats={formats}
                placeholder={placeholder}
                className="h-full border-0 text-gray-600 dark:text-gray-400"
            />
        </div>
    );
});

QuillEditor.displayName = 'QuillEditor';

// Main Edit Blog Component
const EditBlogPost = ({ blog, keyPoints }) => {
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        title: blog.title || '',
        excerpt: blog.excerpt || '',
        summary: blog.summary || '',
        original_content: blog.original_content || '',
        content: blog.content || '',
        category: blog.blog_category_id || '',
        tags: blog.tags || [],
        image: null,
        user_id: blog.user_id || 1,
        blog_category_id: blog.blog_category_id || 1,
        keys: blog.keys || '',
        banner_image: blog.banner_image || '',
        author_name: blog.author_name || '',
        author_bio: blog.author_bio || '',
        read_time: blog.read_time || '5 min',
        status: blog.status || 'draft',
        featured: blog.featured || false,
        seo_title: blog.seo_title || '',
        seo_description: blog.seo_description || '',
        seo_keywords: blog.seo_keywords || '',
        publish_date: blog.publish_date || '',
        slug: blog.slug || '',
        constant_status: blog.status || 'draft',
    });

    const [imagePreview, setImagePreview] = useState(blog.banner_image ? `/storage/${blog.banner_image}` : '');
    const [newTag, setNewTag] = useState('');
    const [showImageModal, setShowImageModal] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [imageAlt, setImageAlt] = useState('');
    const [isEditorResizable, setIsEditorResizable] = useState(false);
    const [activeTab, setActiveTab] = useState('content');
    const [featuredImageFile, setFeaturedImageFile] = useState(null);
    const [contentImageFile, setContentImageFile] = useState(null);
    const [isInsertingImage, setIsInsertingImage] = useState(false);
    const [keyPointsState, setKeyPointsState] = useState(keyPoints.length > 0 ? keyPoints : ['']);
    const [loading, setLoading] = useState(false);
    const [existingImages, setExistingImages] = useState(blog.images || []);
    const quillRef = useRef(null);

    const tagSuggestions = [
        'Landlord', 'Management', 'Tips', 'Beginner',
        'Market', 'Legal', 'Tenant', 'Maintenance',
        'Investment', 'Real Estate', 'Property', 'Rental'
    ];

    // Update form data helper
    const updateFormData = (key, value) => {
        setFormData(prev => ({
            ...prev,
            [key]: value
        }));
    };

    // Helper Functions
    const analyzeContent = () => {
        const quill = quillRef.current?.getEditor();
        const html = quill ? quill.root.innerHTML : formData.content;
        const text = quill ? quill.getText() : formData.content.replace(/<[^>]*>/g, '');
        const wordCount = text.trim().split(/\s+/).filter(Boolean).length;

        const images = [];
        if (html) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            const imgElements = tempDiv.querySelectorAll('img');
            imgElements.forEach(img => {
                images.push({
                    src: img.src,
                    alt: img.alt || ''
                });
            });
        }

        return {
            wordCount,
            images,
            imageCount: images.length,
            readingTime: Math.max(1, Math.ceil(wordCount / 200))
        };
    };

    // const validateForm = () => {
    //     const errors = [];
    //     if (!formData.title.trim()) errors.push('Title is required');
    //     if (!formData.excerpt.trim()) errors.push('Excerpt is required');
    //     if (!formData.banner_image && !featuredImageFile) errors.push('Featured image is required');

    //     const analysis = analyzeContent();
    //     if (analysis.wordCount < 1) {
    //         errors.push(`Content required (currently: ${analysis.wordCount})`);
    //     }

    //     return errors;
    // };
    const validateForm = (status) => {
        const errors = {};

        if (!formData.title.trim()) errors.title = 'Title is required';
        if (!formData.excerpt.trim()) errors.excerpt = 'Excerpt is required';
        if (!featuredImageFile && !formData.banner_image) errors.image = 'Featured image is required';
        
        // alert(formData.status+"-"+formData.publish_date);
        // Schedule-specific
        if (status == 'schedule' && !formData.publish_date) {
            errors.publish_date = 'Publish Date is required for scheduled post';
        }
        if (formData.publish_date && status != 'draft' && status != 'update') {
            const now = new Date();
            const selected = new Date(formData.publish_date);
            // console.log(now +"-----"+selected);
            if (selected < now) {
                errors.publish_date = 'Publish Date cannot be in the past';
            }
        }
        // console.log(errors);
        if (status = 'draft') {
            const analysis = analyzeContent?.();
            if (analysis && analysis.wordCount < 1) {
                errors.content = `Content is required (currently: ${analysis.wordCount})`;
            }
            // else if (analysis && analysis.wordCount < 50) {
            //     errors.content = `Content should have at least 50 words (currently: ${analysis.wordCount})`;
            // }
        }
        return errors;
    };

    // Handle Featured Image Upload
    const handleFeaturedImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFeaturedImageFile(file);
            updateFormData('banner_image', ''); // Clear old path

            const reader = new FileReader();
            reader.onload = (event) => {
                setImagePreview(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle Content Image Upload
    const handleContentImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setContentImageFile(file);

            const reader = new FileReader();
            reader.onload = (event) => {
                setImageUrl(event.target.result);
                setImageAlt(file.name.split('.')[0]);
            };
            reader.readAsDataURL(file);
        }
    };

    // Insert Image in Editor
    const insertImageInEditor = async () => {
        if (!imageUrl || isInsertingImage) {
            return;
        }

        setIsInsertingImage(true);

        try {
            const quill = quillRef.current?.getEditor();
            if (!quill) {
                throw new Error('Quill editor not available');
            }

            const range = quill.getSelection();
            const position = range ? range.index : quill.getLength();

            quill.insertEmbed(position, 'image', imageUrl);

            if (imageAlt) {
                setTimeout(() => {
                    const imgElement = quill.root.querySelector(`img[src="${imageUrl}"]`);
                    if (imgElement) {
                        imgElement.alt = imageAlt;
                    }
                }, 100);
            }

            quill.setSelection(position + 1);

            const newContent = quill.root.innerHTML;
            updateFormData('content', newContent);

            setShowImageModal(false);
            setImageUrl('');
            setImageAlt('');
            setContentImageFile(null);

        } catch (error) {
            console.error('Error inserting image:', error);
            alert('Failed to insert image. Please try again.');
        } finally {
            setIsInsertingImage(false);
        }
    };

    // Delete existing image
    const handleDeleteImage = async (imageId) => {
        if (!confirm('Are you sure you want to delete this image?')) return;

        try {
            const response = await fetch(`/admin/blog-images/${imageId}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                    'Accept': 'application/json'
                }
            });

            const result = await response.json();

            if (result.success) {
                setExistingImages(prev => prev.filter(img => img.id !== imageId));
                // Remove image from content if it exists
                const quill = quillRef.current?.getEditor();
                if (quill) {
                    const content = quill.root.innerHTML;
                    const image = existingImages.find(img => img.id === imageId);
                    if (image) {
                        const newContent = content.replace(new RegExp(`src=["']${image.image_path}["']`, 'g'), '');
                        quill.root.innerHTML = newContent;
                        updateFormData('content', newContent);
                    }
                }
                alert('Image deleted successfully!');
            } else {
                alert(result.message || 'Failed to delete image');
            }
        } catch (error) {
            console.error('Error deleting image:', error);
            alert('Error deleting image');
        }
    };

    // Get a proper datetime string for Laravel
    const getFormattedPublishDate = (dateStr) => {
        if (!dateStr) return '';

        const date = new Date(dateStr); // parse ISO string
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // months 0-11
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        let blog_status;

        const buttonValue = e.nativeEvent.submitter?.value;

        if (buttonValue == 'draft') {
            blog_status = 'draft';
        }
        else if (buttonValue == 'schedule') {
            blog_status = 'schedule';
        }
        else if (buttonValue == 'update') {
            blog_status = 'update';
        }
        else {
            blog_status = 'published';
        }
        setFormData(prev => ({
            ...prev,
            status: blog_status
        }));
        const formErrors = validateForm(blog_status);
        setErrors(formErrors);
        setLoading(false);

        if (Object.keys(formErrors).length > 0) {
            // alert('Please fix the following errors:\n\n' + Object.values(formErrors).join('\n'));

            // Scroll to first error field
            const firstErrorKey = Object.keys(formErrors)[0];
            const errorInput = document.querySelector(`[name="${firstErrorKey}"]`);

            if (errorInput) {
                errorInput.scrollIntoView({ behavior: "smooth", block: "center" });
                errorInput.focus({ preventScroll: true });
                // console.log("herrrror");
            }
            // console.log("herrrror2");
            return;
        }
        let publish_date = '';

        if (blog_status == 'published') {
            publish_date = getFormattedPublishDate(new Date().toISOString());
            setFormData(prev => ({
                ...prev,
                publish_date: publish_date
            }));
            console.log(publish_date + "published");
        } else if (blog_status == 'schedule') {
            publish_date = getFormattedPublishDate(formData.publish_date);
            setFormData(prev => ({
                ...prev,
                publish_date: publish_date
            }));
            console.log(publish_date + "schedule");
        } else if (blog_status == 'update') {
            publish_date = getFormattedPublishDate(formData.publish_date);
            setFormData(prev => ({
                ...prev,
                publish_date: publish_date
            }));
        }else {
            // console.log(publish_date + "else");
        }
        // const formErrors = validateForm();
        // if (formErrors.length > 0) {
        //     alert('Please fix the following errors:\n\n' + formErrors.join('\n'));
        //     setLoading(false);
        //     return;
        // }
        // console.log(formData);
        // return;
        const analysis = analyzeContent();
        const contentImages = extractImagesFromContent(formData.content);

        // Process content to replace base64 images
        let processedContent = formData.content;
        const imageReplacements = [];
        const base64Images = contentImages.filter(img => img.isBase64 && img.file);

        base64Images.forEach((image, index) => {
            const timestamp = Date.now();
            const uniqueId = `${timestamp}_${index}`;
            const fileExtension = image.fileExtension || 'jpg';
            const placeholderUrl = `/storage/blog-content-images/content_image_${uniqueId}.${fileExtension}`;

            imageReplacements.push({
                originalSrc: image.src,
                placeholder: placeholderUrl,
                file: image.file,
                alt: image.alt || '',
                uniqueId: uniqueId,
                fileExtension: fileExtension
            });

            processedContent = processedContent.replace(image.src, placeholderUrl);
        });

        // Create FormData
        const submitFormData = new FormData();

        // Add basic fields
        submitFormData.append('title', formData.title);
        submitFormData.append('summary', formData.excerpt);
        submitFormData.append('excerpt', formData.excerpt);
        submitFormData.append('content', processedContent);
        submitFormData.append('blog_category_id', formData.category || 1);
        submitFormData.append('user_id', formData.user_id || 1);
        submitFormData.append('tags', JSON.stringify(formData.tags));
        submitFormData.append('keys', keyPointsState.join('||'));
        submitFormData.append('author_name', formData.author_name || '');
        submitFormData.append('author_bio', formData.author_bio || '');
        submitFormData.append('read_time', formData.read_time ?? '5 min');
        // submitFormData.append('status', formData.status);
        submitFormData.append('status', blog_status);
        submitFormData.append('featured', formData.featured ? '1' : '0');
        submitFormData.append('seo_title', formData.seo_title);
        submitFormData.append('seo_description', formData.seo_description);
        submitFormData.append('seo_keywords', formData.seo_keywords);
        // submitFormData.append('publish_date', formData.publish_date);
        submitFormData.append('publish_date', publish_date);
        submitFormData.append('slug', formData.slug);
        submitFormData.append('_method', 'PUT'); // For Laravel update

        // console.log(submitFormData);
        // return;
        // Add banner image if new one is uploaded
        if (featuredImageFile instanceof File) {
            submitFormData.append('banner_image', featuredImageFile);
        }

        // Add content images with proper structure
        if (imageReplacements.length > 0) {
            const contentImagesMapping = {};

            imageReplacements.forEach((replacement, index) => {
                const key = `content_images[${index}]`;

                if (replacement.file instanceof File) {
                    const fileName = `content_image_${replacement.uniqueId}.${replacement.fileExtension}`;
                    submitFormData.append(key, replacement.file, fileName);
                }

                contentImagesMapping[index] = {
                    placeholder: replacement.placeholder,
                    alt: replacement.alt,
                    uniqueId: replacement.uniqueId,
                    fileExtension: replacement.fileExtension
                };
            });

            submitFormData.append('content_images_mapping', JSON.stringify(contentImagesMapping));
        }

        try {
            router.post(route('admin.blog.update', blog.id), submitFormData, { 
                forceFormData: true,
                preserveScroll: true,
                onStart: () => setLoading(true),
                onFinish: () => setLoading(false),
                onSuccess: (response) => {
                    Swal.fire("Blog post updated successfully!");
                    // alert('Blog post updated successfully!');
                    router.visit(route('admin.blogs.index'));
                },
                onError: (errors) => {
                    console.error('ERROR RESPONSE:', errors);
                    if (errors && typeof errors === 'object') {
                        const errorMessages = Object.values(errors).join('\n');
                        alert('Please fix the following errors:\n\n' + errorMessages);
                    } else {
                        alert('Error updating blog post. Please try again.');
                    }
                }
            });
        } catch (error) {
            console.error('Error:', error);
            alert('Error updating blog post: ' + error.message);
            setLoading(false);
        }
    };

    // Helper function to extract images from HTML content
    const extractImagesFromContent = (htmlContent) => {
        if (!htmlContent || typeof htmlContent !== 'string') {
            return [];
        }

        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');
        const imgElements = doc.querySelectorAll('img');

        const images = [];

        imgElements.forEach((img, index) => {
            const src = img.getAttribute('src') || '';
            const alt = img.getAttribute('alt') || '';

            const isBase64 = src.includes('data:image');

            let file = null;
            let fileExtension = null;

            if (isBase64) {
                const mimeMatch = src.match(/data:image\/([a-zA-Z+]+);/);
                if (mimeMatch && mimeMatch[1]) {
                    fileExtension = mimeMatch[1].toLowerCase();
                    if (fileExtension.includes('jpeg')) fileExtension = 'jpg';

                    const timestamp = Date.now();
                    const filename = `content_image_${timestamp}_${index}.${fileExtension}`;

                    try {
                        file = base64ToFile(src, filename);
                    } catch (error) {
                        console.log(`❌ Error converting: ${error.message}`);
                    }
                }
            }

            images.push({
                src,
                alt,
                position: index,
                isBase64: isBase64,
                file: file,
                fileExtension: fileExtension
            });
        });

        return images;
    };

    // Helper function to convert base64 to File object
    const base64ToFile = (base64String, filename) => {
        try {
            const commaIndex = base64String.indexOf(',');
            if (commaIndex === -1) {
                console.log('❌ No comma found in base64 string');
                return null;
            }

            const metadata = base64String.substring(0, commaIndex);
            const data = base64String.substring(commaIndex + 1);

            const mimeMatch = metadata.match(/data:(image\/[a-zA-Z+]+);/);
            if (!mimeMatch) {
                console.log('❌ Could not extract MIME type from metadata:', metadata);
                return null;
            }

            const mimeType = mimeMatch[1];
            const binaryString = atob(data);
            const bytes = new Uint8Array(binaryString.length);

            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }

            const file = new File([bytes], filename, {
                type: mimeType,
                lastModified: Date.now()
            });

            return file;
        } catch (error) {
            console.error('❌ Error converting base64 to file:', error);
            return null;
        }
    };

    const handleContentChange = (content) => {
        updateFormData('content', content);
    };

    const handleAddTag = (tag) => {
        if (!formData.tags.includes(tag)) {
            updateFormData('tags', [...formData.tags, tag]);
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        updateFormData('tags', formData.tags.filter(tag => tag !== tagToRemove));
    };

    const addKeyPoint = () => {
        setKeyPointsState([...keyPointsState, '']);
    };

    const updateKeyPoint = (index, value) => {
        const updatedPoints = [...keyPointsState];
        updatedPoints[index] = value;
        setKeyPointsState(updatedPoints);
    };

    const removeKeyPoint = (index) => {
        const updatedPoints = keyPointsState.filter((_, i) => i !== index);
        setKeyPointsState(updatedPoints);
    };

    const displayWordCount = useMemo(() => {
        const analysis = analyzeContent();
        return analysis.wordCount || 0;
    }, [formData.content]);

    useEffect(() => {
        if (formData.title && !formData.seo_title) {
            updateFormData('seo_title', `${formData.title} | Blog`);
        }

        if (formData.excerpt && !formData.seo_description) {
            updateFormData('seo_description', formData.excerpt.substring(0, 160));
        }

        if (formData.tags.length > 0 && !formData.seo_keywords) {
            updateFormData('seo_keywords', formData.tags.join(', '));
        }

        if (formData.title && !formData.slug) {
            const slug = formData.title
                .toLowerCase()
                .replace(/[^\w\s]/gi, '')
                .replace(/\s+/g, '-')
                .substring(0, 60);
            updateFormData('slug', slug);
        }

        if (formData.excerpt && !formData.summary) {
            updateFormData('summary', formData.excerpt);
        }
    }, [formData.title, formData.excerpt, formData.tags]);

    const toggleEditorResize = () => {
        setIsEditorResizable(!isEditorResizable);
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            {/* Image Modal */}
            {showImageModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="text-xl font-bold text-gray-600 dark:text-gray-400">Insert Image</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Add image to content</p>
                            </div>
                            <button
                                onClick={() => setShowImageModal(false)}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                            >
                                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-400 mb-2">
                                    Upload Image
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleContentImageUpload}
                                    className="w-full px-3 py-2 text-base border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400"
                                />
                                {contentImageFile && (
                                    <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/30 rounded">
                                        <p className="text-sm text-blue-800 dark:text-blue-300">{contentImageFile.name}</p>
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-400 mb-2">
                                    Alt Text (for SEO)
                                </label>
                                <input
                                    type="text"
                                    value={imageAlt}
                                    onChange={(e) => setImageAlt(e.target.value)}
                                    className="w-full px-4 py-3 text-base border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400"
                                    placeholder="Describe the image"
                                />
                            </div>

                            {imageUrl && (
                                <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border dark:border-gray-700">
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">Preview:</p>
                                    <img
                                        src={imageUrl}
                                        alt="Preview"
                                        className="w-full h-32 object-contain rounded-lg bg-gray-100 dark:bg-gray-800"
                                    />
                                </div>
                            )}

                            <div className="flex justify-end space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowImageModal(false)}
                                    className="px-5 py-2.5 border border-gray-300 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition text-base text-gray-700 dark:text-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={insertImageInEditor}
                                    disabled={!imageUrl.trim() || isInsertingImage}
                                    className="px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition disabled:opacity-50 font-medium flex items-center justify-center"
                                >
                                    {isInsertingImage ? 'Inserting...' : 'Insert Image'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="container mx-auto px-6 py-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Status Bar */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border dark:border-gray-700 p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                            <div className="grid grid-cols-2 md:flex md:flex-row gap-6">
                                <div className="text-center">
                                    <div className="text-2xl mb-1">📝</div>
                                    <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Words</div>
                                    <div className="font-bold text-gray-600 dark:text-gray-400">{displayWordCount}</div>
                                </div>
                                {/* <div className="text-center">
                                    <div className="text-2xl mb-1">⏱️</div>
                                    <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Read Time</div>
                                    <div className="font-bold text-gray-600 dark:text-gray-400">{formData.read_time}</div>
                                </div> */}
                                <div className="text-center">
                                    <div className="text-2xl mb-1">
                                        {blog.status === "published" && <span className="mr-1">✅</span>}
                                        {blog.status === "draft" && <span className="mr-1">✏️</span>}
                                        {blog.status === "schedule" && <span className="mr-1">⏰</span>}
                                    </div>
                                    <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Blog Status</div>
                                    <span
                                        className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium
                                        ${blog.status == "published"
                                                ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                                                : blog.status == "draft"
                                                    ? "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                                                    : blog.status == "schedule"
                                                        ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
                                                        : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                                            }`}
                                    >
                                        {formData.status.charAt(0).toUpperCase() + formData.status.slice(1)}
                                    </span>
                                </div>
                                {formData.publish_date && (
                                    <div className="flex flex-col sm:flex-row sm:space-x-6 mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-sm">
                                        {/* Date */}
                                        <div className="flex-1 text-center sm:text-left mb-2 sm:mb-0">
                                            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Publish Date</div>
                                            <div className="mt-1 text-lg font-semibold text-gray-700 dark:text-gray-200">
                                                {formData.publish_date.split(" ")[0]}
                                            </div>
                                        </div>

                                        {/* Time */}
                                        <div className="flex-1 text-center sm:text-left">
                                            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Publish Time</div>
                                            <div className="mt-1 text-lg font-semibold text-gray-700 dark:text-gray-200">
                                                {formData.publish_date.split(" ")[1]}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                                {/* <div className="flex items-center space-x-4">
                                    <div className="h-10 w-px bg-gray-300 dark:bg-gray-700 hidden md:block"></div>
                                    <label className="flex items-center space-x-3 cursor-pointer">
                                        <div className="relative">
                                            <input
                                                type="checkbox"
                                                checked={formData.featured}
                                                onChange={e => updateFormData('featured', e.target.checked)}
                                                className="sr-only"
                                            />
                                            <div className={`w-12 h-6 rounded-full transition ${formData.featured ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-700'}`}>
                                                <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${formData.featured ? 'transform translate-x-6' : ''}`}></div>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <Zap className="w-4 h-4 text-yellow-500 mr-2" />
                                            <span className="font-medium text-base text-gray-700 dark:text-gray-400">Featured</span>
                                        </div>
                                    </label>
                                </div> */}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content Column */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border dark:border-gray-700">
                                <div className="flex border-b dark:border-gray-700">
                                    {['content', 'seo'].map((tab) => (
                                        <button
                                            key={tab}
                                            type="button"
                                            onClick={() => setActiveTab(tab)}
                                            className={`px-6 py-4 font-medium capitalize transition ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>

                                <div className="p-6">
                                    {activeTab === 'content' && (
                                        <div className="space-y-8">
                                            {/* Title */}
                                            <div>
                                                <label className="block text-base font-semibold text-gray-600 dark:text-gray-400 mb-3">
                                                    Post Title *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.title}
                                                    onChange={e => updateFormData('title', e.target.value)}
                                                    className={`w-full px-5 py-4 border rounded-xl focus:ring-2 ${errors.title ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                                                        }`}
                                                    name="title"
                                                    placeholder="Enter blog title"

                                                />
                                                {errors.title && <p className="text-red-500">{errors.title}</p>}
                                            </div>

                                            <div>
                                                <label className="block text-base font-semibold text-gray-600 dark:text-gray-400 mb-2">
                                                    URL Slug
                                                </label>
                                                <div className="flex items-center">
                                                    <span className="px-4 py-3 bg-gray-100 dark:bg-gray-900 border border-r-0 border-gray-300 dark:border-gray-700 rounded-l-xl text-gray-600 dark:text-gray-400">
                                                        yourblog.com/
                                                    </span>
                                                    <input
                                                        type="text"
                                                        value={formData.slug}
                                                        // onChange={e => updateFormData('slug', e.target.value)}
                                                        onChange={e => {
                                                            // Remove spaces from the input
                                                            const valueWithoutSpaces = e.target.value.replace(/\s+/g, '-');
                                                            updateFormData('slug', valueWithoutSpaces);
                                                        }}
                                                        className="flex-1 px-4 py-3 text-base border border-gray-300 dark:border-gray-700 rounded-r-xl focus:ring-2 focus:ring-green-500 bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400"
                                                        placeholder="blog-slug"
                                                    />
                                                </div>
                                            </div>

                                            {/* <div>
                                                <label className="block text-base font-semibold text-gray-600 dark:text-gray-400 mb-2">
                                                    Publish Date
                                                </label>
                                                <input
                                                    type="date"
                                                    value={formData.publish_date}
                                                    onChange={e => updateFormData('publish_date', e.target.value)}
                                                    className="px-4 py-3 text-base border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 w-full bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400"
                                                />
                                            </div> */}
                                            {/* {formData.constant_status != 'published' && (
                                                <> */}
                                                    <div className="mb-4">
                                                        <label htmlFor="publish_date" className="block text-base font-semibold text-gray-900 dark:text-gray-100 mt-2 mb-2">
                                                            Schedule Date & Time
                                                        </label>
                                                        <input
                                                            type="datetime-local"
                                                            id="publish_date"
                                                            name="publish_date"
                                                            value={formData.publish_date} // e.g., state value in ISO format: "2026-02-23T14:30"
                                                            onChange={e => updateFormData('publish_date', e.target.value)}
                                                            className={`px-4 py-3 text-base border rounded-xl focus:ring-2 w-full
                                                                ${errors.publish_date
                                                                    ? "border-red-500 focus:ring-red-500 bg-red-50 dark:bg-red-900"
                                                                    : "border-gray-300 dark:border-gray-700 focus:ring-purple-500 bg-gray-100 dark:bg-gray-900"
                                                                } text-gray-900 dark:text-gray-100`}
                                                        />
                                                        {errors.publish_date && (
                                                            <p className="text-red-500 mt-1">{errors.publish_date}</p>
                                                        )}
                                                    </div>
                                                {/* </>
                                            )} */}
                                            {/* Excerpt */}
                                            <div>
                                                <label className="block text-base font-semibold text-gray-600 dark:text-gray-400 mb-3">
                                                    Excerpt *
                                                </label>
                                                <textarea
                                                    value={formData.excerpt}
                                                    onChange={e => updateFormData('excerpt', e.target.value)}
                                                    name="excerpt"
                                                    rows="3"
                                                    className={`w-full px-5 py-4 text-base border rounded-xl focus:ring-2
                                                    ${errors.excerpt
                                                            ? "border-red-500 focus:ring-red-500 bg-red-50 dark:bg-red-900"
                                                            : "border-gray-300 dark:border-gray-700 focus:ring-blue-500 bg-gray-100 dark:bg-gray-900"
                                                        } text-gray-900 dark:text-gray-100`} placeholder="Brief summary..."

                                                />
                                            </div>

                                            {/* Content Editor */}
                                            <div>
                                                <div className="flex items-center justify-between mb-4">
                                                    <div>
                                                        <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-400">Content</h2>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">Write your main content</p>
                                                    </div>
                                                </div>

                                                <div className={`rounded-xl border ${errors.content
                                                        ? "border-red-500 bg-red-50 dark:bg-red-900"
                                                        : "border-gray-300 dark:border-gray-700"
                                                    }`}>
                                                    <QuillEditor
                                                        ref={quillRef}
                                                        value={formData.content}
                                                        onChange={handleContentChange}
                                                        placeholder="Start writing here..."
                                                        isResizable={isEditorResizable}
                                                        onResizeToggle={toggleEditorResize}
                                                    />
                                                </div>
                                                {errors.image && <p className="text-red-500 mt-1">Have On {errors.image}</p>}
                                                {errors.content && <p className="text-red-500 mt-1">{errors.content}</p>}

                                                <div className="mt-4 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                                                    <div className="flex items-center gap-4">
                                                        <span className="text-sm">💡 Use headers for structure</span>
                                                        <span className="text-sm">🖼️ Click image button to insert</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <BookOpen className="w-4 h-4 mr-1" />
                                                        <span>{displayWordCount} words</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Key Points */}
                                            {/* <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-900/30">
                                                <div className="flex items-center justify-between mb-6">
                                                    <div>
                                                        <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-400 flex items-center">
                                                            <Hash className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                                                            Key Points
                                                        </h2>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">Main points summary</p>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={addKeyPoint}
                                                        className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium flex items-center"
                                                    >
                                                        <Plus className="w-4 h-4 mr-1" />
                                                        Add Point
                                                    </button>
                                                </div>

                                                <div className="space-y-4">
                                                    {keyPointsState.map((point, index) => (
                                                        <div key={index} className="flex items-center space-x-3 bg-white dark:bg-gray-800 p-4 rounded-xl border dark:border-gray-700">
                                                            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center font-bold">
                                                                {index + 1}
                                                            </div>
                                                            <input
                                                                type="text"
                                                                value={point}
                                                                onChange={e => updateKeyPoint(index, e.target.value)}
                                                                className="flex-1 px-3 py-2 border-0 focus:ring-0 focus:outline-none text-base bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400"
                                                                placeholder="Enter key point..."
                                                            />
                                                            {keyPointsState.length > 1 && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() => removeKeyPoint(index)}
                                                                    className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                                                                >
                                                                    <X className="w-4 h-4" />
                                                                </button>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div> */}
                                        </div>
                                    )}

                                    {activeTab === 'seo' && (
                                        <div className="space-y-6">
                                            <div>
                                                <label className="block text-base font-semibold text-gray-600 dark:text-gray-400 mb-2">
                                                    SEO Title
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.seo_title}
                                                    onChange={e => updateFormData('seo_title', e.target.value)}
                                                    className="w-full px-4 py-3 text-base border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-green-500 bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400"
                                                    placeholder="SEO Title"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-base font-semibold text-gray-600 dark:text-gray-400 mb-2">
                                                    Meta Description
                                                </label>
                                                <textarea
                                                    value={formData.seo_description}
                                                    onChange={e => updateFormData('seo_description', e.target.value)}
                                                    rows="3"
                                                    className="w-full px-4 py-3 text-base border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-green-500 bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400"
                                                    placeholder="Meta description..."
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-base font-semibold text-gray-600 dark:text-gray-400 mb-2">
                                                    Keywords
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.seo_keywords}
                                                    onChange={e => updateFormData('seo_keywords', e.target.value)}
                                                    className="w-full px-4 py-3 text-base border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-green-500 bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400"
                                                    placeholder="keyword1, keyword2, keyword3"
                                                />
                                            </div>

                                        </div>
                                    )}

                                    {activeTab === 'advanced' && (
                                        <div className="space-y-6">
                                            <div>
                                                <label className="block text-base font-semibold text-gray-700 dark:text-gray-400 mb-2">
                                                    Author Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.author_name}
                                                    onChange={e => updateFormData('author_name', e.target.value)}
                                                    className="w-full pl-10 pr-4 py-3 text-base border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400"
                                                    placeholder="Author name"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-base font-semibold text-gray-700 dark:text-gray-400 mb-2">
                                                    Author Bio
                                                </label>
                                                <textarea
                                                    value={formData.author_bio}
                                                    onChange={e => updateFormData('author_bio', e.target.value)}
                                                    rows="3"
                                                    className="w-full px-4 py-3 text-base border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400"
                                                    placeholder="Author biography..."
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-base font-semibold text-gray-700 dark:text-gray-400 mb-2">
                                                    Read Time
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.read_time}
                                                    onChange={e => updateFormData('read_time', e.target.value)}
                                                    className="w-full px-4 py-3 text-base border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400"
                                                    placeholder="5 min"
                                                />
                                            </div>

                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Column */}
                        <div className="space-y-8">
                            {/* Featured Image */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border dark:border-gray-700 p-6">
                                <div className="flex items-center mb-6">
                                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center mr-3">
                                        <ImageIcon className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-600 dark:text-gray-400 text-base">Featured Image</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Main blog image</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-sm border p-6 ${errors.image ? "border-red-500" : "border-gray-300 dark:border-gray-700"
                                        }`}>
                                        <label className="block text-base font-semibold text-gray-700 dark:text-gray-400 mb-2">
                                            Upload Image *
                                        </label>
                                        <div className="flex flex-col items-center space-y-4">
                                            <label className="w-full cursor-pointer">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleFeaturedImageUpload}
                                                    className="hidden"
                                                />
                                                <div className={`
                                                        px-4 py-3 border-2 border-dashed rounded-xl text-center
                                                        hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition
                                                        ${errors.image
                                                        ? "border-red-500 bg-red-50 dark:bg-red-900"
                                                        : "border-gray-300 dark:border-gray-700"
                                                    }
                                                    `}>
                                                    <Upload className="w-5 h-5 mx-auto mb-1 text-gray-400" />
                                                    <span className="text-sm text-gray-600 dark:text-gray-400">Choose File</span>
                                                </div>
                                            </label>
                                            {featuredImageFile && (
                                                <div className="w-full">
                                                    <div className="px-4 py-3 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-900/30 rounded-xl">
                                                        <p className="text-sm font-medium text-green-800 dark:text-green-300">
                                                            {featuredImageFile.name}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {imagePreview && (
                                        <div className="mt-4">
                                            <div className="rounded-xl overflow-hidden border-2 border-dashed border-gray-200 dark:border-gray-700 relative">
                                                <img
                                                    src={imagePreview}
                                                    alt="Featured preview"
                                                    className="w-full h-48 object-cover"
                                                />
                                                {!featuredImageFile && blog.banner_image && (
                                                    <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                                                        Existing Image
                                                    </div>
                                                )}
                                            </div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                                                {featuredImageFile ? 'New Image Preview' : 'Current Image'}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Existing Content Images */}
                            {existingImages.length > 0 && (
                                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border dark:border-gray-700 p-6">
                                    <div className="flex items-center mb-6">
                                        <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center mr-3">
                                            <ImageIcon className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-600 dark:text-gray-400 text-base">Content Images</h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Uploaded images ({existingImages.length})</p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        {existingImages.map((image) => (
                                            <div key={image.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border dark:border-gray-700">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                                                        <ImageIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-700 dark:text-gray-400 truncate max-w-[150px]">
                                                            {image.image_path.split('/').pop()}
                                                        </p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                                            Alt: {image.alt_text || 'N/A'}
                                                        </p>
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDeleteImage(image.id)}
                                                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                                                    title="Delete Image"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                           {Object.keys(errors).length > 0 && (
                                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border dark:border-gray-700 p-6">
                                    <div className="space-y-4">
                                        {Object.entries(errors).map(([key, value]) => (
                                            <div key={key} className="bg-red-100 dark:bg-red-900 p-3 rounded-lg">
                                                <p className="font-semibold text-red-600 dark:text-red-400 capitalize">{key}</p>
                                                <p className="text-red-500 dark:text-red-300 text-sm">{value}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Submit Buttons */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border dark:border-gray-700 p-6">
                        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
                            <div className="flex space-x-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (confirm('Are you sure you want to reset all changes?')) {
                                            router.visit(route('admin.blog.edit', blog.id));
                                        }
                                    }}
                                    className="px-6 py-3 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-400 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition font-medium"
                                >
                                    Reset
                                </button>

                                <button
                                    type="button"
                                    onClick={() => router.visit(route('admin.blogs.index'))}
                                    className="px-6 py-3 border-2 border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition font-medium"
                                >
                                    Cancel
                                </button>
                            </div>

                            <div className="flex items-center space-x-4">
                                {/* <div className="flex items-center space-x-3">
                                    <div className={`w-3 h-3 rounded-full ${formData.status === 'published' ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
                                        <p className="font-bold text-gray-600 dark:text-gray-400 capitalize">{formData.status}</p>
                                    </div>
                                </div> */}
                                {(formData.publish_date == '' || formData.constant_status != 'schedule') && (
                                    <button
                                        type="submit"
                                        name="status"
                                        value="schedule"
                                        className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-green-700 transition font-medium shadow-lg disabled:opacity-50"
                                    >
                                        {loading ? 'Update scheduling...' : 'Schedule Blog'}
                                    </button>
                                )}
                                {(formData.constant_status == 'draft' || formData.constant_status == 'schedule') && (<>
                                    <button
                                        type="submit"
                                        disabled={loading} name="status" value="published"
                                        className="px-8 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition font-medium shadow-lg disabled:opacity-50"
                                    >
                                        {loading ? 'Update Publishing...' : 'Publish Blog'}
                                    </button>
                                </>
                                )}

                                {formData.constant_status == 'draft'&& (<>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        value="draft"
                                        className="px-8 py-3 bg-gray-600 text-white rounded-xl hover:bg-green-700 transition font-medium shadow-lg disabled:opacity-50"
                                    >
                                        {loading ? 'Updating...' : 'Update As Draft'}
                                    </button> </>
                                )}
                                
                                {formData.constant_status != 'draft' && (<>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        value="update"
                                        className="px-8 py-3 bg-gray-600 text-white rounded-xl hover:bg-green-700 transition font-medium shadow-lg disabled:opacity-50"
                                    >
                                        {loading ? 'Updating...' : 'Update Blog'}
                                    </button>
                                    <button
                                            type="submit"
                                            disabled={loading}
                                            value="draft"
                                            className="px-8 py-3 bg-red-600 text-white rounded-xl hover:bg-green-700 transition font-medium shadow-lg disabled:opacity-50"
                                        >
                                            {loading ? 'Updating...' : 'Save as Draft'}
                                    </button>
                                </>
                                )}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

const BlogEdit = ({ blog, keyPoints }) => {
    return (
        <AuthenticatedLayout>
            <div className="flex justify-between items-center mb-6">
                <span className="text-2xl font-bold text-gray-800 dark:text-gray-400">

                </span>
                <Link
                    href={route('admin.blogs.index')}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center"
                >
                    Back to Posts
                </Link>
            </div>
            <EditBlogPost blog={blog} keyPoints={keyPoints} />
        </AuthenticatedLayout>
    );
};

export default BlogEdit;