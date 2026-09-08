import React, { useState, useEffect, useRef, useCallback } from "react";
import { useForm, Link as InertiaLink } from "@inertiajs/react";
import {
    Link,
    Globe,
    Save,
    X,
    CheckCircle,
    CircleOff,
    Search,
    Loader2,
    XCircle,
} from "lucide-react";
import { toast } from "react-toastify";
import config from "../../../Pages/config";
import RouteList from "@/Pages/Admin/RouteList";

export default function PublicLinkForm({ publicLink }) {
    const [showRouteList, setShowRouteList] = useState(false);
    const isEditing = !!publicLink;

    const { data, setData, post, put, processing, errors, reset } = useForm({
        label: publicLink?.label || "",
        route_name: publicLink?.route_name || "",
        url: publicLink?.url || "",
        status: publicLink?.status ?? true,
    });

    // State for autocomplete
    const [routeSuggestions, setRouteSuggestions] = useState([]);
    const [urlSuggestions, setUrlSuggestions] = useState([]);
    const [routeOpen, setRouteOpen] = useState(false);
    const [urlOpen, setUrlOpen] = useState(false);
    const [routeLoading, setRouteLoading] = useState(false);
    const [urlLoading, setUrlLoading] = useState(false);
    const [routeSelectedIndex, setRouteSelectedIndex] = useState(-1);
    const [urlSelectedIndex, setUrlSelectedIndex] = useState(-1);
    const [routeValidation, setRouteValidation] = useState(null);
    const [urlValidation, setUrlValidation] = useState(null);

    // Refs
    const routeInputRef = useRef(null);
    const urlInputRef = useRef(null);
    const routeDropdownRef = useRef(null);
    const urlDropdownRef = useRef(null);
    const routeAbortControllerRef = useRef(null);
    const urlAbortControllerRef = useRef(null);
    const routeDebounceRef = useRef(null);
    const urlDebounceRef = useRef(null);
    useEffect(() => {
        if (isEditing) {
            if (data.route_name) {
                searchRoutes(data.route_name, "route");
            }

            if (data.url) {
                searchRoutes(data.url, "url");
            }
        }
    }, []);
    // Search routes function
    const searchRoutes = useCallback(async (searchTerm, type) => {
        if (!searchTerm || searchTerm.length < 1) {
            if (type === "route") {
                setRouteSuggestions([]);
                setRouteOpen(false);
                setRouteValidation(null);
            } else {
                setUrlSuggestions([]);
                setUrlOpen(false);
                setUrlValidation(null);
            }
            return;
        }

        // Cancel previous request
        const abortController =
            type === "route" ? routeAbortControllerRef : urlAbortControllerRef;
        if (abortController.current) {
            abortController.current.abort();
        }
        abortController.current = new AbortController();

        try {
            if (type === "route") {
                setRouteLoading(true);
            } else {
                setUrlLoading(true);
            }

            // Use the route helper for Inertia
            const searchUrl = `/admin/search-routes?q=${encodeURIComponent(searchTerm)}`;

            const response = await fetch(searchUrl, {
                signal: abortController.current.signal,
                headers: {
                    Accept: "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                    "X-CSRF-TOKEN":
                        document.querySelector('meta[name="csrf-token"]')
                            ?.content || "",
                },
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(
                    errorData.message ||
                        `HTTP error! status: ${response.status}`,
                );
            }

            const results = await response.json();

            if (type === "route") {
                setRouteSuggestions(results);
                setRouteOpen(results.length > 0);
                setRouteValidation(results.length > 0 ? "valid" : "not-found");
                setRouteSelectedIndex(-1);
            } else {
                setUrlSuggestions(results);
                setUrlOpen(results.length > 0);
                setUrlValidation(results.length > 0 ? "valid" : "not-found");
                setUrlSelectedIndex(-1);
            }
        } catch (error) {
            if (error.name !== "AbortError") {
                console.error("Error searching routes:", error);
                toast.error("Failed to search routes. Please try again.");
                if (type === "route") {
                    setRouteSuggestions([]);
                    setRouteOpen(false);
                    setRouteValidation("error");
                } else {
                    setUrlSuggestions([]);
                    setUrlOpen(false);
                    setUrlValidation("error");
                }
            }
        } finally {
            if (type === "route") {
                setRouteLoading(false);
            } else {
                setUrlLoading(false);
            }
        }
    }, []);

    // Debounced search
    const debouncedSearch = useCallback(
        (searchTerm, type) => {
            const debounceRef =
                type === "route" ? routeDebounceRef : urlDebounceRef;

            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }

            debounceRef.current = setTimeout(() => {
                searchRoutes(searchTerm, type);
            }, 300);
        },
        [searchRoutes],
    );

    // Handle route name input change
    const handleRouteNameChange = (e) => {
        const value = e.target.value;
        setData("route_name", value);
        setRouteValidation(null);

        if (value.length < 1) {
            setRouteSuggestions([]);
            setRouteOpen(false);
            return;
        }

        debouncedSearch(value, "route");
    };

    // Handle URL input change
    const handleUrlChange = (e) => {
        const value = e.target.value;
        setData("url", value);
        setUrlValidation(null);

        if (value.length < 1) {
            setUrlSuggestions([]);
            setUrlOpen(false);
            return;
        }

        debouncedSearch(value, "url");
    };

    // Handle route selection
    const handleRouteSelect = (suggestion) => {
        setData({
            ...data,
            route_name: suggestion.name,
            url: suggestion.url,
        });
        setRouteSuggestions([]);
        setRouteOpen(false);
        setRouteSelectedIndex(-1);
        setRouteValidation("valid");
        setUrlValidation("valid");
    };

    // Handle URL selection
    const handleUrlSelect = (suggestion) => {
        setData({
            ...data,
            route_name: suggestion.name,
            url: suggestion.url,
        });
        setUrlSuggestions([]);
        setUrlOpen(false);
        setUrlSelectedIndex(-1);
        setRouteValidation("valid");
        setUrlValidation("valid");
    };

    // Keyboard navigation for route dropdown
    const handleRouteKeyDown = (e) => {
        if (!routeOpen || routeSuggestions.length === 0) {
            if (e.key === "Escape") {
                setRouteOpen(false);
                setRouteSelectedIndex(-1);
            }
            return;
        }

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setRouteSelectedIndex((prev) =>
                    prev < routeSuggestions.length - 1 ? prev + 1 : prev,
                );
                break;
            case "ArrowUp":
                e.preventDefault();
                setRouteSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
                break;
            case "Enter":
                e.preventDefault();
                if (
                    routeSelectedIndex >= 0 &&
                    routeSelectedIndex < routeSuggestions.length
                ) {
                    handleRouteSelect(routeSuggestions[routeSelectedIndex]);
                }
                break;
            case "Escape":
                e.preventDefault();
                setRouteOpen(false);
                setRouteSelectedIndex(-1);
                break;
            default:
                break;
        }
    };

    // Keyboard navigation for URL dropdown
    const handleUrlKeyDown = (e) => {
        if (!urlOpen || urlSuggestions.length === 0) {
            if (e.key === "Escape") {
                setUrlOpen(false);
                setUrlSelectedIndex(-1);
            }
            return;
        }

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setUrlSelectedIndex((prev) =>
                    prev < urlSuggestions.length - 1 ? prev + 1 : prev,
                );
                break;
            case "ArrowUp":
                e.preventDefault();
                setUrlSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
                break;
            case "Enter":
                e.preventDefault();
                if (
                    urlSelectedIndex >= 0 &&
                    urlSelectedIndex < urlSuggestions.length
                ) {
                    handleUrlSelect(urlSuggestions[urlSelectedIndex]);
                }
                break;
            case "Escape":
                e.preventDefault();
                setUrlOpen(false);
                setUrlSelectedIndex(-1);
                break;
            default:
                break;
        }
    };

    // Click outside handlers
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                routeDropdownRef.current &&
                !routeDropdownRef.current.contains(event.target) &&
                routeInputRef.current &&
                !routeInputRef.current.contains(event.target)
            ) {
                setRouteOpen(false);
                setRouteSelectedIndex(-1);
            }
            if (
                urlDropdownRef.current &&
                !urlDropdownRef.current.contains(event.target) &&
                urlInputRef.current &&
                !urlInputRef.current.contains(event.target)
            ) {
                setUrlOpen(false);
                setUrlSelectedIndex(-1);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (routeAbortControllerRef.current) {
                routeAbortControllerRef.current.abort();
            }
            if (urlAbortControllerRef.current) {
                urlAbortControllerRef.current.abort();
            }
            if (routeDebounceRef.current) {
                clearTimeout(routeDebounceRef.current);
            }
            if (urlDebounceRef.current) {
                clearTimeout(urlDebounceRef.current);
            }
        };
    }, []);

    // Check if form can be submitted
    const canSubmit = () => {
        // If route_name has a value, it must be valid
        if (data.route_name && data.route_name.trim() !== "") {
            return routeValidation === "valid";
        }
        // If url has a value, it must be valid
        if (data.url && data.url.trim() !== "") {
            return urlValidation === "valid";
        }
        // If both are empty, we can't submit
        return false;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!canSubmit()) {
            toast.error("Please provide a valid route name or URL.");
            return;
        }

        const options = {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(
                    isEditing
                        ? "Public link updated successfully."
                        : "Public link created successfully.",
                );
            },
            onError: (errors) => {
                toast.error("Please fix the validation errors below.");
            },
        };

        if (isEditing) {
            put(route("admin.public-links.update", publicLink.id), options);
        } else {
            post(route("admin.public-links.store"), options);
        }
    };

    // Render validation status
    const renderValidationStatus = (validation, loading) => {
        if (loading) {
            return <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />;
        }
        if (validation === "valid") {
            return <CheckCircle className="w-4 h-4 text-green-500" />;
        }
        if (validation === "not-found" || validation === "error") {
            return <XCircle className="w-4 h-4 text-red-500" />;
        }
        return null;
    };

    // Render validation message
    const renderValidationMessage = (validation) => {
        if (validation === "valid") {
            return (
                <span className="text-sm text-green-600 dark:text-green-400">
                    ✓ Valid Route
                </span>
            );
        }
        if (validation === "not-found") {
            return (
                <span className="text-sm text-red-600 dark:text-red-400">
                    ✗ Route not found
                </span>
            );
        }
        if (validation === "error") {
            return (
                <span className="text-sm text-red-600 dark:text-red-400">
                    ✗ Error searching routes
                </span>
            );
        }
        return null;
    };

    // Render dropdown suggestions
    const renderSuggestions = (suggestions, selectedIndex, onSelect, type) => {
        if (!suggestions.length) {
            return (
                <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                    No routes found
                </div>
            );
        }

        return suggestions.map((suggestion, index) => (
            <button
                key={suggestion.name}
                onClick={() => onSelect(suggestion)}
                onMouseEnter={() => {
                    if (type === "route") {
                        setRouteSelectedIndex(index);
                    } else {
                        setUrlSelectedIndex(index);
                    }
                }}
                className={`
                    w-full px-4 py-3 text-left transition-colors duration-150
                    ${
                        index === selectedIndex
                            ? "bg-indigo-50 dark:bg-indigo-900/30"
                            : "hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    }
                `}
            >
                <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {suggestion.name}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                        {suggestion.url}
                    </span>
                </div>
            </button>
        ));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Label Field */}
            <div>
                <label
                    htmlFor="label"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                >
                    Label <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
                    <input
                        type="text"
                        id="label"
                        value={data.label}
                        onChange={(e) => setData("label", e.target.value)}
                        maxLength="255"
                        className={`w-full pl-9 pr-3 py-2 bg-gray-100 dark:bg-gray-700/50 border ${
                            errors.label
                                ? "border-red-500 dark:border-red-500"
                                : "border-gray-200 dark:border-gray-600"
                        } rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                        placeholder="e.g., Documentation"
                        disabled={processing}
                    />
                </div>
                {errors.label && (
                    <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                        {errors.label}
                    </p>
                )}
            </div>

            {/* Route Name Field with Autocomplete */}
            <div>
                <div className="flex items-center justify-between mb-1.5">
                    <label
                        htmlFor="route_name"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Route Name
                    </label>

                    <button
                        type="button"
                        onClick={() => setShowRouteList(true)}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm transition"
                    >
                        <Search className="w-4 h-4" />
                        Route List
                    </button>
                </div>
                <div className="relative">
                    <div className="relative">
                        <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
                        <input
                            ref={routeInputRef}
                            type="text"
                            id="route_name"
                            value={data.route_name}
                            onChange={handleRouteNameChange}
                            onKeyDown={handleRouteKeyDown}
                            onFocus={() => {
                                if (
                                    data.route_name &&
                                    routeSuggestions.length > 0
                                ) {
                                    setRouteOpen(true);
                                }
                            }}
                            maxLength="255"
                            className={`
                                w-full pl-9 pr-10 py-2 bg-gray-100 dark:bg-gray-700/50 
                                border ${errors.route_name ? "border-red-500 dark:border-red-500" : "border-gray-200 dark:border-gray-600"}
                                rounded-lg text-gray-900 dark:text-white 
                                placeholder-gray-500 dark:placeholder-gray-400
                                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                                transition-all
                            `}
                            placeholder="Search route name..."
                            disabled={processing}
                            autoComplete="off"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            {renderValidationStatus(
                                routeValidation,
                                routeLoading,
                            )}
                            {!routeLoading &&
                                !routeValidation &&
                                data.route_name && (
                                    <Search className="w-4 h-4 text-gray-400" />
                                )}
                        </div>
                    </div>

                    {/* Validation message */}
                    {routeValidation && (
                        <div className="mt-1.5">
                            {renderValidationMessage(routeValidation)}
                        </div>
                    )}

                    {/* Dropdown */}
                    {routeOpen && routeSuggestions.length > 0 && (
                        <div
                            ref={routeDropdownRef}
                            className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden"
                        >
                            <div className="max-h-60 overflow-y-auto">
                                {renderSuggestions(
                                    routeSuggestions,
                                    routeSelectedIndex,
                                    handleRouteSelect,
                                    "route",
                                )}
                            </div>
                        </div>
                    )}
                </div>
                {errors.route_name && (
                    <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                        {errors.route_name}
                    </p>
                )}
            </div>

            {/* URL Field with Autocomplete */}
            <div className="mb-4">
                <label
                    htmlFor="url"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                >
                    URL
                </label>

                <div className="flex items-center">
                    <span className="px-4 py-2 bg-gray-100 dark:bg-gray-700/50 border border-r-0 border-gray-300 dark:border-gray-600 rounded-l-lg text-gray-600 dark:text-gray-400 whitespace-nowrap text-sm">
                        {config.ORIGIN}
                    </span>

                    <div className="relative flex-1">
                        <input
                            ref={urlInputRef}
                            type="text"
                            id="url"
                            value={data.url}
                            onChange={handleUrlChange}
                            onKeyDown={handleUrlKeyDown}
                            onFocus={() => {
                                if (data.url && urlSuggestions.length > 0) {
                                    setUrlOpen(true);
                                }
                            }}
                            maxLength={255}
                            placeholder="Search or enter URL..."
                            disabled={processing}
                            className={`
                                w-full px-4 py-2 bg-gray-100 dark:bg-gray-700/50 
                                border ${errors.url ? "border-red-500 dark:border-red-500" : "border-gray-300 dark:border-gray-600"}
                                rounded-r-lg text-gray-900 dark:text-white 
                                placeholder-gray-500 dark:placeholder-gray-400
                                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                                transition-all
                            `}
                            autoComplete="off"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            {renderValidationStatus(urlValidation, urlLoading)}
                            {!urlLoading && !urlValidation && data.url && (
                                <Search className="w-4 h-4 text-gray-400" />
                            )}
                        </div>

                        {/* Dropdown */}
                        {urlOpen && urlSuggestions.length > 0 && (
                            <div
                                ref={urlDropdownRef}
                                className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden"
                            >
                                <div className="max-h-60 overflow-y-auto">
                                    {renderSuggestions(
                                        urlSuggestions,
                                        urlSelectedIndex,
                                        handleUrlSelect,
                                        "url",
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Validation message */}
                {urlValidation && (
                    <div className="mt-1.5">
                        {renderValidationMessage(urlValidation)}
                    </div>
                )}
                {errors.url && (
                    <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                        {errors.url}
                    </p>
                )}
            </div>

            {/* Status Toggle */}
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Status
                </label>
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => setData("status", true)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
                            data.status
                                ? "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300"
                                : "border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400"
                        }`}
                        disabled={processing}
                    >
                        <CheckCircle className="w-4 h-4" />
                        Active
                    </button>
                    <button
                        type="button"
                        onClick={() => setData("status", false)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
                            !data.status
                                ? "border-gray-500 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                                : "border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400"
                        }`}
                        disabled={processing}
                    >
                        <CircleOff className="w-4 h-4" />
                        Inactive
                    </button>
                </div>
                {errors.status && (
                    <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                        {errors.status}
                    </p>
                )}
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                    type="submit"
                    disabled={processing}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {processing ? (
                        <>
                            <svg
                                className="animate-spin h-4 w-4 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save className="w-4 h-4" />
                            Save
                        </>
                    )}
                </button>
                <InertiaLink
                    href={route("admin.public-links.index")}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors duration-150"
                >
                    <X className="w-4 h-4" />
                    Cancel
                </InertiaLink>
            </div>
            {showRouteList && (
                <div className="fixed inset-0 z-[9999] bg-black/70 flex items-center justify-center">
                    <div className="w-[90vw] h-[90vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Route Explorer
                            </h2>

                            <button
                                type="button"
                                onClick={() => setShowRouteList(false)}
                                className="p-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="flex-1 overflow-auto p-4">
                            <RouteList />
                        </div>
                    </div>
                </div>
            )}
        </form>
    );
}

// // resources/js/Pages/Admin/PublicLinks/PublicLinkForm.jsx

// import React from "react";
// import { useForm, Link as InertiaLink } from "@inertiajs/react";
// import {
//     Link,
//     Globe,
//     Hash,
//     Save,
//     X,
//     CheckCircle,
//     CircleOff,
// } from "lucide-react";
// import { toast } from "react-toastify";
// import config from "../../../Pages/config";

// export default function PublicLinkForm({ publicLink }) {
//     const isEditing = !!publicLink;

//     const { data, setData, post, put, processing, errors, reset } = useForm({
//         number: publicLink?.number || "",
//         label: publicLink?.label || "",
//         route_name: publicLink?.route_name || "",
//         url: publicLink?.url || "",
//         sort_order: publicLink?.sort_order || 0,
//         status: publicLink?.status ?? true,
//     });

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         const options = {
//             preserveScroll: true,
//             onSuccess: () => {
//                 toast.success(
//                     isEditing
//                         ? "Public link updated successfully."
//                         : "Public link created successfully.",
//                 );
//             },
//             onError: (errors) => {
//                 toast.error("Please fix the validation errors below.");
//             },
//         };

//         if (isEditing) {
//             put(route("admin.public-links.update", publicLink.id), options);
//         } else {
//             post(route("admin.public-links.store"), options);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Number Field */}
//                 <div>
//                     <label
//                         htmlFor="number"
//                         className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
//                     >
//                         Number <span className="text-red-500">*</span>
//                     </label>
//                     <div className="relative">
//                         <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
//                         <input
//                             type="text"
//                             id="number"
//                             value={data.number}
//                             onChange={(e) => setData("number", e.target.value)}
//                             maxLength="10"
//                             className={`w-full pl-9 pr-3 py-2 bg-gray-100 dark:bg-gray-700/50 border ${
//                                 errors.number
//                                     ? "border-red-500 dark:border-red-500"
//                                     : "border-gray-200 dark:border-gray-600"
//                             } rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
//                             placeholder="e.g., LINK-001"
//                             disabled={processing}
//                         />
//                     </div>
//                     {errors.number && (
//                         <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
//                             {errors.number}
//                         </p>
//                     )}
//                 </div>

//                 {/* Sort Order Field */}
//                 <div>
//                     <label
//                         htmlFor="sort_order"
//                         className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
//                     >
//                         Sort Order <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                         type="number"
//                         id="sort_order"
//                         value={data.sort_order}
//                         onChange={(e) =>
//                             setData("sort_order", parseInt(e.target.value) || 0)
//                         }
//                         min="0"
//                         className={`w-full px-3 py-2 bg-gray-100 dark:bg-gray-700/50 border ${
//                             errors.sort_order
//                                 ? "border-red-500 dark:border-red-500"
//                                 : "border-gray-200 dark:border-gray-600"
//                         } rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
//                         placeholder="0"
//                         disabled={processing}
//                     />
//                     {errors.sort_order && (
//                         <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
//                             {errors.sort_order}
//                         </p>
//                     )}
//                 </div>
//             </div>

//             {/* Label Field */}
//             <div>
//                 <label
//                     htmlFor="label"
//                     className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
//                 >
//                     Label <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                     <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
//                     <input
//                         type="text"
//                         id="label"
//                         value={data.label}
//                         onChange={(e) => setData("label", e.target.value)}
//                         maxLength="255"
//                         className={`w-full pl-9 pr-3 py-2 bg-gray-100 dark:bg-gray-700/50 border ${
//                             errors.label
//                                 ? "border-red-500 dark:border-red-500"
//                                 : "border-gray-200 dark:border-gray-600"
//                         } rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
//                         placeholder="e.g., Documentation"
//                         disabled={processing}
//                     />
//                 </div>
//                 {errors.label && (
//                     <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
//                         {errors.label}
//                     </p>
//                 )}
//             </div>

//             {/* Route Name Field */}
//             <div>
//                 <label
//                     htmlFor="route_name"
//                     className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
//                 >
//                     Route Name
//                 </label>
//                 <div className="relative">
//                     <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
//                     <input
//                         type="text"
//                         id="route_name"
//                         value={data.route_name}
//                         onChange={(e) => setData("route_name", e.target.value)}
//                         maxLength="255"
//                         className="w-full pl-9 pr-3 py-2 bg-gray-100 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
//                         placeholder="e.g., admin.public-links.index"
//                         disabled={processing}
//                     />
//                 </div>
//                 {errors.route_name && (
//                     <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
//                         {errors.route_name}
//                     </p>
//                 )}
//             </div>

//             {/* URL Field */}
//             <div className="mb-4">
//                 <label
//                     htmlFor="url"
//                     className="block text-base font-semibold text-gray-900 dark:text-gray-100 mb-2"
//                 >
//                     URL
//                 </label>

//                 <div className="flex items-center">
//                     <span className="px-4 py-3 bg-gray-100 dark:bg-gray-900 border border-r-0 border-gray-300 dark:border-gray-700 rounded-l-xl text-gray-600 dark:text-gray-400 whitespace-nowrap">
//                         {config.HOME_URL}
//                     </span>

//                     <input
//                         type="text"
//                         id="url"
//                         value={data.url}
//                         onChange={(e) => setData("url", e.target.value)}
//                         maxLength={255}
//                         placeholder="/page-name"
//                         disabled={processing}
//                         className={`flex-1 px-4 py-3 text-base border rounded-r-xl focus:ring-2 transition-all
//                 ${
//                     errors.url
//                         ? "border-red-500 focus:ring-red-500 bg-red-50 dark:bg-red-900"
//                         : "border-gray-300 dark:border-gray-700 focus:ring-indigo-500 bg-gray-100 dark:bg-gray-900"
//                 }
//                 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400
//             `}
//                     />
//                 </div>

//                 {errors.url && (
//                     <p className="mt-1 text-sm text-red-500">{errors.url}</p>
//                 )}
//             </div>

//             {/* Status Toggle */}
//             <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
//                     Status
//                 </label>
//                 <div className="flex items-center gap-3">
//                     <button
//                         type="button"
//                         onClick={() => setData("status", true)}
//                         className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
//                             data.status
//                                 ? "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300"
//                                 : "border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400"
//                         }`}
//                         disabled={processing}
//                     >
//                         <CheckCircle className="w-4 h-4" />
//                         Active
//                     </button>
//                     <button
//                         type="button"
//                         onClick={() => setData("status", false)}
//                         className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
//                             !data.status
//                                 ? "border-gray-500 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
//                                 : "border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400"
//                         }`}
//                         disabled={processing}
//                     >
//                         <CircleOff className="w-4 h-4" />
//                         Inactive
//                     </button>
//                 </div>
//                 {errors.status && (
//                     <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
//                         {errors.status}
//                     </p>
//                 )}
//             </div>

//             {/* Buttons */}
//             <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
//                 <button
//                     type="submit"
//                     disabled={processing}
//                     className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                     {processing ? (
//                         <>
//                             <svg
//                                 className="animate-spin h-4 w-4 text-white"
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                             >
//                                 <circle
//                                     className="opacity-25"
//                                     cx="12"
//                                     cy="12"
//                                     r="10"
//                                     stroke="currentColor"
//                                     strokeWidth="4"
//                                 ></circle>
//                                 <path
//                                     className="opacity-75"
//                                     fill="currentColor"
//                                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                                 ></path>
//                             </svg>
//                             Saving...
//                         </>
//                     ) : (
//                         <>
//                             <Save className="w-4 h-4" />
//                             Save
//                         </>
//                     )}
//                 </button>
//                 <InertiaLink
//                     href={route("admin.public-links.index")}
//                     className="inline-flex items-center gap-2 px-6 py-2.5 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors duration-150"
//                 >
//                     <X className="w-4 h-4" />
//                     Cancel
//                 </InertiaLink>
//             </div>
//         </form>
//     );
// }
