// components/ContactForm.jsx
import React from "react";
import { useForm } from "@inertiajs/react";
import toast, { Toaster } from "react-hot-toast";
import {
    User,
    Mail,
    Phone,
    Home,
    Building,
    MapPin,
    Hash,
    Megaphone,
    MessageSquare,
    Send,
    ChevronDown,
    CheckCircle2,
    LayoutGrid,
} from "lucide-react";

export default function ContactForm() {
    const { data, setData, post, processing, errors, reset } = useForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        unitSize: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        hearAbout: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post("/contact/inquiries", {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Thank you! Our leasing team will contact you shortly.", {
                    duration: 5000,
                    style: {
                        background: "#ffffff",
                        color: "#1a1f2c",
                        border: "1px solid #c77950",
                        borderRadius: "12px",
                        padding: "14px 18px",
                        boxShadow: "0 10px 30px rgba(199,121,80,0.15)",
                    },
                });
                reset();
            },
            onError: (errs) => {
                const errorMessages = Object.values(errs).flat().join("\n");
                toast.error(errorMessages || "Please check the required fields.", {
                    duration: 5000,
                    style: {
                        background: "#ffffff",
                        color: "#dc2626",
                        border: "1px solid #ef4444",
                        borderRadius: "12px",
                        padding: "14px 18px",
                        boxShadow: "0 10px 30px rgba(239,68,68,0.15)",
                    },
                });
            },
        });
    };

    const hasError = (fieldName) => errors[fieldName] && errors[fieldName].length > 0;
    const getError = (fieldName) => errors[fieldName] || "";

    return (
        <div className="relative bg-white border border-[#d6d8e5] rounded-3xl p-6 sm:p-8 shadow-[0_15px_45px_rgba(30,35,60,0.08)] overflow-hidden">
            {/* Corner Fretwork Accents */}
            <div className="absolute top-3.5 left-3.5 w-4 h-4 border-t border-l border-[#c77950]/30 rounded-tl-xs pointer-events-none" />
            <div className="absolute top-3.5 right-3.5 w-4 h-4 border-t border-r border-[#c77950]/30 rounded-tr-xs pointer-events-none" />
            <div className="absolute bottom-3.5 left-3.5 w-4 h-4 border-b border-l border-[#c77950]/30 rounded-bl-xs pointer-events-none" />
            <div className="absolute bottom-3.5 right-3.5 w-4 h-4 border-b border-r border-[#c77950]/30 rounded-br-xs pointer-events-none" />

            <Toaster position="top-right" />

            {/* Header */}
            <div className="mb-6">
                <span className="text-[11px] uppercase tracking-[2px] font-bold text-[#c77950]">
                    Direct Inquiry
                </span>
                <h3 className="font-cormorant text-2xl sm:text-3xl font-bold text-[#1a1f2c] mt-1">
                    Send Us a Message
                </h3>
                <p className="text-xs sm:text-sm text-[#5a627a] mt-1 font-normal">
                    Fill out the form below and our leasing directors will respond promptly.
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* First Name & Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="contact-firstName" className="block text-xs font-semibold text-[#333a4d] mb-1.5 flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-[#c77950]" aria-hidden="true" />
                            <span>First Name</span>
                            <span className="text-[#c77950]" aria-hidden="true">*</span>
                        </label>
                        <input
                            id="contact-firstName"
                            type="text"
                            name="firstName"
                            value={data.firstName}
                            onChange={handleChange}
                            placeholder="First Name"
                            required
                            aria-required="true"
                            aria-invalid={hasError("firstName") ? "true" : "false"}
                            aria-describedby={hasError("firstName") ? "error-firstName" : undefined}
                            className={`w-full bg-[#f8f9fc] border ${
                                hasError("firstName")
                                    ? "border-red-500 bg-red-50/30"
                                    : "border-[#d6d8e5] focus:border-[#c77950] focus:bg-white"
                            } text-[#1a1f2c] placeholder-[#9aa0b3] rounded-xl px-3.5 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#c77950]/20`}
                        />
                        {hasError("firstName") && (
                            <p id="error-firstName" role="alert" className="text-red-500 text-[11px] mt-1 font-medium">{getError("firstName")}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="contact-lastName" className="block text-xs font-semibold text-[#333a4d] mb-1.5 flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-[#c77950]" aria-hidden="true" />
                            <span>Last Name</span>
                            <span className="text-[#c77950]" aria-hidden="true">*</span>
                        </label>
                        <input
                            id="contact-lastName"
                            type="text"
                            name="lastName"
                            value={data.lastName}
                            onChange={handleChange}
                            placeholder="Last Name"
                            required
                            aria-required="true"
                            aria-invalid={hasError("lastName") ? "true" : "false"}
                            aria-describedby={hasError("lastName") ? "error-lastName" : undefined}
                            className={`w-full bg-[#f8f9fc] border ${
                                hasError("lastName")
                                    ? "border-red-500 bg-red-50/30"
                                    : "border-[#d6d8e5] focus:border-[#c77950] focus:bg-white"
                            } text-[#1a1f2c] placeholder-[#9aa0b3] rounded-xl px-3.5 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#c77950]/20`}
                        />
                        {hasError("lastName") && (
                            <p id="error-lastName" role="alert" className="text-red-500 text-[11px] mt-1 font-medium">{getError("lastName")}</p>
                        )}
                    </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="contact-email" className="block text-xs font-semibold text-[#333a4d] mb-1.5 flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5 text-[#c77950]" aria-hidden="true" />
                            <span>Email Address</span>
                            <span className="text-[#c77950]" aria-hidden="true">*</span>
                        </label>
                        <input
                            id="contact-email"
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            placeholder="name@example.com"
                            required
                            aria-required="true"
                            aria-invalid={hasError("email") ? "true" : "false"}
                            aria-describedby={hasError("email") ? "error-email" : undefined}
                            className={`w-full bg-[#f8f9fc] border ${
                                hasError("email")
                                    ? "border-red-500 bg-red-50/30"
                                    : "border-[#d6d8e5] focus:border-[#c77950] focus:bg-white"
                            } text-[#1a1f2c] placeholder-[#9aa0b3] rounded-xl px-3.5 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#c77950]/20`}
                        />
                        {hasError("email") && (
                            <p id="error-email" role="alert" className="text-red-500 text-[11px] mt-1 font-medium">{getError("email")}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="contact-phone" className="block text-xs font-semibold text-[#333a4d] mb-1.5 flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5 text-[#c77950]" aria-hidden="true" />
                            <span>Phone Number</span>
                        </label>
                        <input
                            id="contact-phone"
                            type="tel"
                            name="phone"
                            value={data.phone}
                            onChange={handleChange}
                            placeholder="(213) 000-0000"
                            aria-invalid={hasError("phone") ? "true" : "false"}
                            aria-describedby={hasError("phone") ? "error-phone" : undefined}
                            className={`w-full bg-[#f8f9fc] border ${
                                hasError("phone")
                                    ? "border-red-500 bg-red-50/30"
                                    : "border-[#d6d8e5] focus:border-[#c77950] focus:bg-white"
                            } text-[#1a1f2c] placeholder-[#9aa0b3] rounded-xl px-3.5 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#c77950]/20`}
                        />
                        {hasError("phone") && (
                            <p id="error-phone" role="alert" className="text-red-500 text-[11px] mt-1 font-medium">{getError("phone")}</p>
                        )}
                    </div>
                </div>

                {/* Street Address (Optional) */}
                <div>
                    <label htmlFor="contact-address" className="block text-xs font-semibold text-[#333a4d] mb-1.5 flex items-center gap-1.5">
                        <Home className="w-3.5 h-3.5 text-[#c77950]" aria-hidden="true" />
                        <span>Current Address (Optional)</span>
                    </label>
                    <input
                        id="contact-address"
                        type="text"
                        name="address"
                        value={data.address}
                        onChange={handleChange}
                        placeholder="Street address, Apt or Suite"
                        aria-invalid={hasError("address") ? "true" : "false"}
                        aria-describedby={hasError("address") ? "error-address" : undefined}
                        className={`w-full bg-[#f8f9fc] border ${
                            hasError("address")
                                ? "border-red-500 bg-red-50/30"
                                : "border-[#d6d8e5] focus:border-[#c77950] focus:bg-white"
                        } text-[#1a1f2c] placeholder-[#9aa0b3] rounded-xl px-3.5 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#c77950]/20`}
                    />
                    {hasError("address") && (
                        <p id="error-address" role="alert" className="text-red-500 text-[11px] mt-1 font-medium">{getError("address")}</p>
                    )}
                </div>

                {/* City, State, Zip */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <label htmlFor="contact-city" className="block text-xs font-semibold text-[#333a4d] mb-1.5 flex items-center gap-1.5">
                            <Building className="w-3.5 h-3.5 text-[#c77950]" aria-hidden="true" />
                            <span>City</span>
                        </label>
                        <input
                            id="contact-city"
                            type="text"
                            name="city"
                            value={data.city}
                            onChange={handleChange}
                            placeholder="Los Angeles"
                            aria-invalid={hasError("city") ? "true" : "false"}
                            aria-describedby={hasError("city") ? "error-city" : undefined}
                            className={`w-full bg-[#f8f9fc] border ${
                                hasError("city")
                                    ? "border-red-500 bg-red-50/30"
                                    : "border-[#d6d8e5] focus:border-[#c77950] focus:bg-white"
                            } text-[#1a1f2c] placeholder-[#9aa0b3] rounded-xl px-3.5 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#c77950]/20`}
                        />
                        {hasError("city") && (
                            <p id="error-city" role="alert" className="text-red-500 text-[11px] mt-1 font-medium">{getError("city")}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="contact-state" className="block text-xs font-semibold text-[#333a4d] mb-1.5 flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-[#c77950]" aria-hidden="true" />
                            <span>State</span>
                        </label>
                        <input
                            id="contact-state"
                            type="text"
                            name="state"
                            value={data.state}
                            onChange={handleChange}
                            placeholder="CA"
                            aria-invalid={hasError("state") ? "true" : "false"}
                            aria-describedby={hasError("state") ? "error-state" : undefined}
                            className={`w-full bg-[#f8f9fc] border ${
                                hasError("state")
                                    ? "border-red-500 bg-red-50/30"
                                    : "border-[#d6d8e5] focus:border-[#c77950] focus:bg-white"
                            } text-[#1a1f2c] placeholder-[#9aa0b3] rounded-xl px-3.5 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#c77950]/20`}
                        />
                        {hasError("state") && (
                            <p id="error-state" role="alert" className="text-red-500 text-[11px] mt-1 font-medium">{getError("state")}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="contact-zip" className="block text-xs font-semibold text-[#333a4d] mb-1.5 flex items-center gap-1.5">
                            <Hash className="w-3.5 h-3.5 text-[#c77950]" aria-hidden="true" />
                            <span>Zip Code</span>
                        </label>
                        <input
                            id="contact-zip"
                            type="text"
                            name="zip"
                            value={data.zip}
                            onChange={handleChange}
                            placeholder="90006"
                            aria-invalid={hasError("zip") ? "true" : "false"}
                            aria-describedby={hasError("zip") ? "error-zip" : undefined}
                            className={`w-full bg-[#f8f9fc] border ${
                                hasError("zip")
                                    ? "border-red-500 bg-red-50/30"
                                    : "border-[#d6d8e5] focus:border-[#c77950] focus:bg-white"
                            } text-[#1a1f2c] placeholder-[#9aa0b3] rounded-xl px-3.5 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#c77950]/20`}
                        />
                        {hasError("zip") && (
                            <p id="error-zip" role="alert" className="text-red-500 text-[11px] mt-1 font-medium">{getError("zip")}</p>
                        )}
                    </div>
                </div>

                {/* Preferred Unit Size & How Did You Hear About Us */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Unit Size Dropdown */}
                    <div>
                        <label htmlFor="contact-unitSize" className="block text-xs font-semibold text-[#333a4d] mb-1.5 flex items-center gap-1.5">
                            <LayoutGrid className="w-3.5 h-3.5 text-[#c77950]" aria-hidden="true" />
                            <span>Preferred Unit Size</span>
                        </label>
                        <div className="relative">
                            <select
                                id="contact-unitSize"
                                name="unitSize"
                                value={data.unitSize}
                                onChange={handleChange}
                                aria-invalid={hasError("unitSize") ? "true" : "false"}
                                aria-describedby={hasError("unitSize") ? "error-unitSize" : undefined}
                                className={`w-full appearance-none bg-[#f8f9fc] border ${
                                    hasError("unitSize")
                                        ? "border-red-500 bg-red-50/30"
                                        : "border-[#d6d8e5] focus:border-[#c77950] focus:bg-white"
                                } text-[#1a1f2c] rounded-xl px-3.5 py-2.5 text-sm pr-10 transition-all focus:outline-none focus:ring-2 focus:ring-[#c77950]/20 cursor-pointer`}
                            >
                                <option value="" className="text-[#8f96ac]">
                                    Select unit size...
                                </option>
                                <option value="Studio">Studio</option>
                                <option value="1 Bed">1 Bed</option>
                                <option value="2 Bed">2 Bed</option>
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8f96ac]" aria-hidden="true" />
                        </div>
                        {hasError("unitSize") && (
                            <p id="error-unitSize" role="alert" className="text-red-500 text-[11px] mt-1 font-medium">{getError("unitSize")}</p>
                        )}
                    </div>

                    {/* How Did You Hear About Us */}
                    <div>
                        <label htmlFor="contact-hearAbout" className="block text-xs font-semibold text-[#333a4d] mb-1.5 flex items-center gap-1.5">
                            <Megaphone className="w-3.5 h-3.5 text-[#c77950]" aria-hidden="true" />
                            <span>How did you hear about us?</span>
                        </label>
                        <div className="relative">
                            <select
                                id="contact-hearAbout"
                                name="hearAbout"
                                value={data.hearAbout}
                                onChange={handleChange}
                                aria-invalid={hasError("hearAbout") ? "true" : "false"}
                                aria-describedby={hasError("hearAbout") ? "error-hearAbout" : undefined}
                                className={`w-full appearance-none bg-[#f8f9fc] border ${
                                    hasError("hearAbout")
                                        ? "border-red-500 bg-red-50/30"
                                        : "border-[#d6d8e5] focus:border-[#c77950] focus:bg-white"
                                } text-[#1a1f2c] rounded-xl px-3.5 py-2.5 text-sm pr-10 transition-all focus:outline-none focus:ring-2 focus:ring-[#c77950]/20 cursor-pointer`}
                            >
                                <option value="" className="text-[#8f96ac]">
                                    Select an option...
                                </option>
                                <option value="Apartments.com">Apartments.com</option>
                                <option value="Zillow">Zillow / Trulia</option>
                                <option value="Online Search">Online Search (Google / Bing)</option>
                                <option value="Instagram / Social Media">Instagram / Social Media</option>
                                <option value="Referred by a Friend">Referred by a Friend</option>
                                <option value="Drive By / Signage">Drive By / Signage</option>
                                <option value="Radio Korea">Radio Korea</option>
                                <option value="Other">Other</option>
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8f96ac]" aria-hidden="true" />
                        </div>
                        {hasError("hearAbout") && (
                            <p id="error-hearAbout" role="alert" className="text-red-500 text-[11px] mt-1 font-medium">{getError("hearAbout")}</p>
                        )}
                    </div>
                </div>

                {/* Message */}
                <div>
                    <label htmlFor="contact-message" className="block text-xs font-semibold text-[#333a4d] mb-1.5 flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-[#c77950]" aria-hidden="true" />
                        <span>Message</span>
                    </label>
                    <textarea
                        id="contact-message"
                        name="message"
                        value={data.message}
                        onChange={handleChange}
                        rows="3"
                        placeholder="Please tell us about your preferred move-in date, bedroom layout, or questions..."
                        aria-invalid={hasError("message") ? "true" : "false"}
                        aria-describedby={hasError("message") ? "error-message" : undefined}
                        className={`w-full bg-[#f8f9fc] border ${
                            hasError("message")
                                ? "border-red-500 bg-red-50/30"
                                : "border-[#d6d8e5] focus:border-[#c77950] focus:bg-white"
                        } text-[#1a1f2c] placeholder-[#9aa0b3] rounded-xl px-3.5 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#c77950]/20`}
                    />
                    {hasError("message") && (
                        <p id="error-message" role="alert" className="text-red-500 text-[11px] mt-1 font-medium">{getError("message")}</p>
                    )}
                </div>

                {/* Submit & Assurance */}
                <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <button
                        type="submit"
                        disabled={processing}
                        className={`w-full sm:w-auto px-8 py-3.5 rounded-full font-bold uppercase text-xs tracking-[1.5px] text-white bg-gradient-to-r from-[#c77950] to-[#b3633b] hover:from-[#b3633b] hover:to-[#9c4f29] shadow-[0_6px_25px_rgba(199,121,80,0.35)] transition-all flex items-center justify-center gap-2 ${
                            processing ? "opacity-75 cursor-not-allowed" : "hover:-translate-y-0.5 active:translate-y-0"
                        }`}
                    >
                        <Send className={`w-3.5 h-3.5 ${processing ? "animate-pulse" : ""}`} />
                        <span>{processing ? "Sending..." : "Submit Message"}</span>
                    </button>

                    <div className="flex items-center gap-1.5 text-[#6c748c] text-xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#c77950] shrink-0" />
                        <span>Confidential & No Spam Guarantee</span>
                    </div>
                </div>
            </form>
        </div>
    );
}

