import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password · The 900 Residences" />

            <div className="text-center mb-6">
                <div className="text-[10px] font-extrabold uppercase tracking-[2px] text-[#c77950] mb-1">
                    ✦ ACCOUNT RECOVERY ✦
                </div>
                <h1 className="text-2xl font-cormorant font-bold text-[#1a1f2c]">
                    Forgot Password?
                </h1>
                <p className="text-xs text-[#5a627a] mt-1.5 leading-relaxed">
                    Enter your email address and we'll send you a password reset link to recover your account.
                </p>
            </div>

            {status && (
                <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-700 text-center">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <InputLabel htmlFor="email" value="Email Address" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        placeholder="you@the900apts.com"
                        className="w-full"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-1.5" />
                </div>

                <div className="pt-2">
                    <PrimaryButton className="w-full h-11" disabled={processing}>
                        Send Password Reset Link
                    </PrimaryButton>
                </div>

                <div className="text-center pt-3 border-t border-[#e8e9f0]">
                    <Link
                        href={route('login')}
                        className="text-xs text-[#5a627a] hover:text-[#c77950] font-semibold transition"
                    >
                        ← Back to Sign In
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
