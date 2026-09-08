import React, { useState, useEffect } from "react";
import { Head, useForm, router } from "@inertiajs/react";
import {
    Briefcase,
    User,
    Mail,
    Phone,
    MapPin,
    FileText,
    CheckCircle,
    Loader2,
    Upload,
    AlertCircle,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function Apply({ skillLevels, jobId, jobTitle }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        job_title: jobTitle || "",
        job_descriptions_id: jobId || "",
        full_name: "",
        email: "",
        phone: "",
        skill_level: "",
        address: "",
        resume: null,
        agree_terms: false,
    });
    useEffect(() => {
        setData({
            job_title: jobTitle,
            job_descriptions_id: jobId,
        });
    }, [jobTitle, jobId]);

    const [resumeName, setResumeName] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);

        const loadingToast = toast.loading("Submitting application...");

        post("/career/apply", {
            preserveScroll: true,
            onSuccess: () => {
                toast.dismiss(loadingToast);
                toast.success("Application submitted successfully!");
                setSubmitted(false);
                reset();
                setResumeName("");
                // Reload page after 2 seconds
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            },
            onError: (errors) => {
                toast.dismiss(loadingToast);
                Object.entries(errors).forEach(([field, message]) => {
                    switch (field) {
                        case "job_title":
                            toast.error(
                                "Job title is missing. Please refresh the page and try again.",
                            );
                            break;

                        case "job_descriptions_id":
                            toast.error("Job ID is missing.");
                            break;

                        default:
                            toast.error(message);
                    }
                });
                toast.error("Please check the form for errors.");
            },
            onFinish: () => {
                setSubmitted(false);
            },
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const allowedTypes = [
                "application/pdf",
                "application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            ];
            const maxSize = 5 * 1024 * 1024; // 5MB

            if (!allowedTypes.includes(file.type)) {
                toast.error("Please upload a PDF, DOC, or DOCX file.");
                e.target.value = "";
                return;
            }

            if (file.size > maxSize) {
                toast.error("File size must be less than 5MB.");
                e.target.value = "";
                return;
            }

            setData("resume", file);
            setResumeName(file.name);
        }
    };

    return (
        <>
            <Head title="Apply for Position" />

            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 4000,
                    style: {
                        background: "#1c2840",
                        color: "#ffffff",
                        border: "1px solid rgba(212, 175, 55, 0.2)",
                    },
                }}
            />

            <div className="flex items-center justify-center p-4">
                <div className="w-full">
                    {/* Form */}
                    <div className="bg-dark-50 rounded-2xl ">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gold-400/10 border border-gold-400/20 text-gold-400">
                                <Briefcase className="h-6 w-6" />
                            </div>

                            <p className="text-gray-400">
                                Fill out the form below to submit your
                                application
                            </p>
                        </div>
                        <form
                            onSubmit={handleSubmit}
                            className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        >
                            {/* Full Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    <div className="flex items-center gap-2">
                                        <User className="h-4 w-4 text-gold-400" />
                                        Full Name
                                        <span className="text-gold-400">*</span>
                                    </div>
                                </label>
                                <input
                                    type="text"
                                    value={data.full_name}
                                    onChange={(e) =>
                                        setData("full_name", e.target.value)
                                    }
                                    className={`w-full px-4 py-2 bg-dark-200 border ${errors.full_name ? "border-red-500" : "border-gold-400/20"} rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent text-white placeholder-gray-500 transition-all`}
                                    placeholder="Enter your full name"
                                />

                                <input
                                    type="hidden"
                                    name="job_title"
                                    value={data.job_title}
                                />
                                <input
                                    type="hidden"
                                    name="job_descriptions_id"
                                    value={data.job_descriptions_id}
                                />
                                {errors.full_name && (
                                    <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                                        <AlertCircle className="h-3 w-3" />
                                        {errors.full_name}
                                    </p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-gold-400" />
                                        Email
                                        <span className="text-gold-400">*</span>
                                    </div>
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    className={`w-full px-4 py-2 bg-dark-200 border ${errors.email ? "border-red-500" : "border-gold-400/20"} rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent text-white placeholder-gray-500 transition-all`}
                                    placeholder="Enter your email address"
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                                        <AlertCircle className="h-3 w-3" />
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-gold-400" />
                                        Phone
                                        <span className="text-gold-400">*</span>
                                    </div>
                                </label>
                                <input
                                    type="tel"
                                    value={data.phone}
                                    onChange={(e) =>
                                        setData("phone", e.target.value)
                                    }
                                    className={`w-full px-4 py-2 bg-dark-200 border ${errors.phone ? "border-red-500" : "border-gold-400/20"} rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent text-white placeholder-gray-500 transition-all`}
                                    placeholder="Enter your phone number"
                                />
                                {errors.phone && (
                                    <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                                        <AlertCircle className="h-3 w-3" />
                                        {errors.phone}
                                    </p>
                                )}
                            </div>

                            {/* Skill Level */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    <div className="flex items-center gap-2">
                                        <Briefcase className="h-4 w-4 text-gold-400" />
                                        Skill Level
                                        <span className="text-gold-400">*</span>
                                    </div>
                                </label>
                                <select
                                    value={data.skill_level}
                                    onChange={(e) =>
                                        setData("skill_level", e.target.value)
                                    }
                                    className={`w-full px-4 py-2 bg-dark-200 border ${errors.skill_level ? "border-red-500" : "border-gold-400/20"} rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent text-white placeholder-gray-500 transition-all`}
                                >
                                    <option value="" className="bg-dark-200">
                                        Select skill level
                                    </option>
                                    {Object.entries(skillLevels).map(
                                        ([value, label]) => (
                                            <option
                                                key={value}
                                                value={value}
                                                className="bg-dark-200"
                                            >
                                                {label}
                                            </option>
                                        ),
                                    )}
                                </select>
                                {errors.skill_level && (
                                    <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                                        <AlertCircle className="h-3 w-3" />
                                        {errors.skill_level}
                                    </p>
                                )}
                            </div>

                            {/* Address */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-gold-400" />
                                        Full Address
                                        <span className="text-gold-400">*</span>
                                    </div>
                                </label>
                                <textarea
                                    value={data.address}
                                    onChange={(e) =>
                                        setData("address", e.target.value)
                                    }
                                    rows="3"
                                    className={`w-full px-4 py-2 bg-dark-200 border ${errors.address ? "border-red-500" : "border-gold-400/20"} rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent text-white placeholder-gray-500 transition-all resize-none`}
                                    placeholder="Enter your full address"
                                />
                                {errors.address && (
                                    <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                                        <AlertCircle className="h-3 w-3" />
                                        {errors.address}
                                    </p>
                                )}
                            </div>

                            {/* Resume Upload */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    <div className="flex items-center gap-2">
                                        <FileText className="h-4 w-4 text-gold-400" />
                                        Upload Resume
                                        <span className="text-gold-400">*</span>
                                    </div>
                                </label>
                                <div
                                    className={`relative border-2 border-dashed ${errors.resume ? "border-red-500" : "border-gold-400/30"} rounded-lg p-6 text-center hover:border-gold-400 transition-colors bg-dark-200/50`}
                                >
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        accept=".pdf,.doc,.docx"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <div className="flex flex-col items-center gap-2">
                                        <Upload
                                            className={`h-8 w-8 ${errors.resume ? "text-red-500" : "text-gold-400"}`}
                                        />
                                        <div className="text-sm text-gray-400">
                                            {resumeName ? (
                                                <span className="text-gold-400 font-medium">
                                                    {resumeName}
                                                </span>
                                            ) : (
                                                <>
                                                    <span className="font-medium text-gold-400">
                                                        Click to upload
                                                    </span>{" "}
                                                    or drag and drop
                                                </>
                                            )}
                                        </div>
                                        <p className="text-xs text-gray-500">
                                            PDF, DOC, DOCX (Max 5MB)
                                        </p>
                                    </div>
                                </div>
                                {errors.resume && (
                                    <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                                        <AlertCircle className="h-3 w-3" />
                                        {errors.resume}
                                    </p>
                                )}
                            </div>

                            {/* Agreement Checkbox */}
                            <div className="md:col-span-2 flex items-start gap-3 pt-2">
                                <input
                                    type="checkbox"
                                    checked={data.agree_terms}
                                    onChange={(e) =>
                                        setData("agree_terms", e.target.checked)
                                    }
                                    className="mt-1 w-4 h-4 rounded border-gold-400/30 bg-dark-200 text-gold-400 focus:ring-gold-400 focus:ring-offset-dark-500"
                                />
                                <label className="text-sm text-gray-300">
                                    By using this form you agree with the
                                    storage and handling of your data by this
                                    website.
                                    <span className="text-gold-400">*</span>
                                    {errors.agree_terms && (
                                        <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                                            <AlertCircle className="h-3 w-3" />
                                            {errors.agree_terms}
                                        </p>
                                    )}
                                </label>
                            </div>

                            {/* Submit Button */}
                            <div className="md:col-span-2">
                                <button
                                    type="submit"
                                    disabled={processing || submitted}
                                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gold-400 text-dark-500 rounded-lg font-semibold hover:bg-gold-500 transition-all transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-gold-400/20"
                                >
                                    {processing || submitted ? (
                                        <>
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            <Briefcase className="h-5 w-5" />
                                            Apply Now
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
