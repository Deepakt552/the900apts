import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Search, RotateCcw, Copy, ExternalLink } from 'lucide-react';

export default function RouteList() {
    const [routes, setRoutes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [methodFilter, setMethodFilter] = useState("");
    const [protectedFilter, setProtectedFilter] = useState("");
    const [middlewareFilter, setMiddlewareFilter] = useState("");

    useEffect(() => {
        axios
            .get("/all-routes")
            .then((res) => {
                setRoutes(res.data);
            })
            .finally(() => setLoading(false));
    }, []);

    const filteredRoutes = useMemo(() => {
        return routes.filter((route) => {
            const term = search.toLowerCase();

            const matchesSearch =
                !search ||
                [
                    route.name,
                    route.uri,
                    route.url,
                    route.controller,
                    route.controller_method,
                    route.action,
                    route.prefix,
                    route.domain,
                    (route.methods || []).join(" "),
                    (route.middleware || []).join(" "),
                    (route.parameters || []).join(" "),
                ]
                    .join(" ")
                    .toLowerCase()
                    .includes(term);

            const matchesMethod =
                !methodFilter || (route.methods || []).includes(methodFilter);

            const matchesProtected =
                !protectedFilter ||
                (protectedFilter === "protected" && route.protected) ||
                (protectedFilter === "public" && !route.protected);

            const matchesMiddleware =
                !middlewareFilter ||
                (route.middleware || []).includes(middlewareFilter);

            return (
                matchesSearch &&
                matchesMethod &&
                matchesProtected &&
                matchesMiddleware
            );
        });
    }, [routes, search, methodFilter, protectedFilter, middlewareFilter]);

    const middlewareOptions = useMemo(() => {
        return [
            ...new Set(routes.flatMap((route) => route.middleware || [])),
        ].sort();
    }, [routes]);

    const getMethodColor = (method) => {
        const colors = {
            GET: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
            POST: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
            PUT: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300',
            PATCH: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300',
            DELETE: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300',
        };
        return colors[method] || 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    };

    if (loading) {
        return (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400 transition-colors duration-200">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                <p className="mt-2">Loading Routes...</p>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-200">
            <div className="flex flex-wrap gap-3 justify-between items-center mb-5">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 transition-colors duration-200">
                        Route List
                    </h1>

                    <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200">
                        Showing {filteredRoutes.length} of {routes.length}{" "}
                        Routes
                    </p>
                </div>

                <div className="flex flex-wrap gap-3">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search routes..."
                            className="w-72 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 pl-9 pr-4 py-2 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors duration-200"
                        />
                    </div>

                    {/* Method */}
                    <select
                        value={methodFilter}
                        onChange={(e) => setMethodFilter(e.target.value)}
                        className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors duration-200"
                    >
                        <option value="">All Methods</option>
                        <option>GET</option>
                        <option>POST</option>
                        <option>PUT</option>
                        <option>PATCH</option>
                        <option>DELETE</option>
                    </select>

                    {/* Protected */}
                    <select
                        value={protectedFilter}
                        onChange={(e) => setProtectedFilter(e.target.value)}
                        className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors duration-200"
                    >
                        <option value="">All Routes</option>
                        <option value="protected">Protected</option>
                        <option value="public">Public</option>
                    </select>

                    {/* Middleware */}
                    <select
                        value={middlewareFilter}
                        onChange={(e) => setMiddlewareFilter(e.target.value)}
                        className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 min-w-[180px] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors duration-200"
                    >
                        <option value="">All Middleware</option>
                        {middlewareOptions.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>

                    <button
                        onClick={() => {
                            setSearch("");
                            setMethodFilter("");
                            setProtectedFilter("");
                            setMiddlewareFilter("");
                        }}
                        className="flex items-center gap-2 rounded-lg bg-red-500 dark:bg-red-600 px-4 py-2 text-white hover:bg-red-600 dark:hover:bg-red-700 transition-colors duration-200"
                    >
                        <RotateCcw className="h-4 w-4" />
                        Reset
                    </button>
                </div>
            </div>

            <div className="overflow-auto rounded-lg border border-gray-200 dark:border-gray-700 transition-colors duration-200">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-100 dark:bg-gray-800 sticky top-0 z-10 transition-colors duration-200">
                        <tr>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">#</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Name</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">URI</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Methods</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Controller</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Method</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Middleware</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Protected</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Guest</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Prefix</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Parameters</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">URL</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredRoutes.map((route, index) => (
                            <tr
                                key={index}
                                className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200"
                            >
                                <td className="px-3 py-2 text-gray-900 dark:text-gray-100">
                                    {index + 1}
                                </td>

                                <td className="px-3 py-2 font-medium text-gray-900 dark:text-gray-100">
                                    {route.name || "-"}
                                </td>

                                <td className="px-3 py-2 text-gray-700 dark:text-gray-300 font-mono text-xs">
                                    {route.uri}
                                </td>

                                <td className="px-3 py-2">
                                    <div className="flex gap-1 flex-wrap">
                                        {route.methods.map((method) => (
                                            <span
                                                key={method}
                                                className={`rounded px-2 py-1 text-xs font-medium ${getMethodColor(method)} transition-colors duration-200`}
                                            >
                                                {method}
                                            </span>
                                        ))}
                                    </div>
                                </td>

                                <td className="px-3 py-2 text-gray-700 dark:text-gray-300 text-xs">
                                    {route.controller}
                                </td>

                                <td className="px-3 py-2 text-gray-700 dark:text-gray-300 text-xs">
                                    {route.controller_method || "-"}
                                </td>

                                <td className="px-3 py-2">
                                    <div className="flex flex-wrap gap-1">
                                        {route.middleware.map((item) => (
                                            <span
                                                key={item}
                                                className="rounded bg-gray-200 dark:bg-gray-700 px-2 py-1 text-xs text-gray-700 dark:text-gray-300 transition-colors duration-200"
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </td>

                                <td className="px-3 py-2">
                                    {route.protected ? (
                                        <span className="rounded bg-green-100 dark:bg-green-900/30 px-2 py-1 text-xs font-medium text-green-800 dark:text-green-300 transition-colors duration-200">
                                            Yes
                                        </span>
                                    ) : (
                                        <span className="rounded bg-red-100 dark:bg-red-900/30 px-2 py-1 text-xs font-medium text-red-800 dark:text-red-300 transition-colors duration-200">
                                            No
                                        </span>
                                    )}
                                </td>

                                <td className="px-3 py-2">
                                    {route.guest_only ? (
                                        <span className="rounded bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 text-xs font-medium text-yellow-800 dark:text-yellow-300 transition-colors duration-200">
                                            Guest
                                        </span>
                                    ) : (
                                        "-"
                                    )}
                                </td>

                                <td className="px-3 py-2 text-gray-700 dark:text-gray-300 text-xs">
                                    {route.prefix || "-"}
                                </td>

                                <td className="px-3 py-2 text-gray-700 dark:text-gray-300 text-xs">
                                    {(route.parameters || []).join(", ") || "-"}
                                </td>

                                <td className="px-3 py-2">
                                    <div className="flex gap-2">
                                        <a
                                            href={route.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200"
                                        >
                                            <ExternalLink className="h-3 w-3" />
                                            Open
                                        </a>

                                        <button
                                            onClick={() =>
                                                navigator.clipboard.writeText(
                                                    route.url,
                                                )
                                            }
                                            className="flex items-center gap-1 text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition-colors duration-200"
                                        >
                                            <Copy className="h-3 w-3" />
                                            Copy
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}