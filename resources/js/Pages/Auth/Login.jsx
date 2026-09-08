import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <GuestLayout>
            <Head title="Sign In · The 900 Residences" />

            <div className="text-center mb-6">
                <div className="text-[10px] font-extrabold uppercase tracking-[2px] text-[#c77950] mb-1">
                    ✦ MANAGEMENT PORTAL ✦
                </div>
                <h1 className="text-2xl font-cormorant font-bold text-[#1a1f2c]">
                    Welcome Back
                </h1>
                <p className="text-xs text-[#5a627a] mt-1.5 leading-relaxed">
                    Sign in to access your administrative dashboard
                </p>
            </div>

            {status && (
                <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-700 text-center">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                {/* Email Field */}
                <div>
                    <InputLabel htmlFor="email" value="Email Address" />

                    <div className="relative">
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            placeholder="admin@the900apts.com"
                            className="w-full pl-10"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData("email", e.target.value)}
                            required
                        />
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8c94a8]">
                            <svg
                                className="w-4 h-4 text-[#c77950]"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                viewBox="0 0 24 24"
                            >
                                <circle cx="12" cy="7" r="4" />
                                <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" />
                            </svg>
                        </div>
                    </div>

                    <InputError message={errors.email} className="mt-1.5" />
                </div>

                {/* Password Field */}
                <div>
                    <InputLabel htmlFor="password" value="Password" />

                    <div className="relative">
                        <TextInput
                            id="password"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={data.password}
                            placeholder="••••••••••••"
                            className="w-full pl-10 pr-10"
                            autoComplete="current-password"
                            onChange={(e) => setData("password", e.target.value)}
                            required
                        />
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8c94a8]">
                            <svg
                                className="w-4 h-4 text-[#c77950]"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                viewBox="0 0 24 24"
                            >
                                <rect x="5" y="10" width="14" height="11" rx="2" />
                                <path d="M8 10V7a4 4 0 018 0v3" />
                                <circle cx="12" cy="15" r="1" />
                            </svg>
                        </div>
                        <button
                            type="button"
                            onClick={togglePassword}
                            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#8c94a8] hover:text-[#c77950] transition"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d={
                                        showPassword
                                            ? "M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z M12 8a4 4 0 100 8 4 4 0 000-8z"
                                            : "M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z M12 8a4 4 0 100 8 4 4 0 000-8z M4 4l16 16"
                                    }
                                />
                            </svg>
                        </button>
                    </div>

                    <InputError message={errors.password} className="mt-1.5" />
                </div>

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between gap-2 pt-1">
                    <label className="flex items-center gap-2 text-xs text-[#5a627a] cursor-pointer select-none">
                        <input
                            type="checkbox"
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData("remember", e.target.checked)
                            }
                            className="w-4 h-4 rounded border-[#d6d8e5] text-[#c77950] focus:ring-[#c77950]"
                        />
                        <span>Remember me</span>
                    </label>

                    {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="text-xs text-[#c77950] hover:text-[#994e2e] transition font-semibold"
                        >
                            Forgot password?
                        </Link>
                    )}
                </div>

                {/* Login Button */}
                <div className="pt-2">
                    <PrimaryButton
                        type="submit"
                        disabled={processing}
                        className="w-full h-11"
                    >
                        <span>Sign In to Dashboard</span>
                        <svg
                            className="w-4 h-4 ml-2"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            viewBox="0 0 24 24"
                        >
                            <path d="M5 12h14" />
                            <path d="M13 6l6 6-6 6" />
                        </svg>
                    </PrimaryButton>
                </div>

                {/* Return link */}
                <div className="text-center pt-3 border-t border-[#e8e9f0]">
                    <Link
                        href="/"
                        className="text-xs text-[#5a627a] hover:text-[#c77950] font-medium transition inline-flex items-center gap-1"
                    >
                        <span>← Return to Public Website</span>
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}