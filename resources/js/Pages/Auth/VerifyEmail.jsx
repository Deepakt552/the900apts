import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Email Verification · The 900 Residences" />

            <div className="text-center mb-6">
                <div className="text-[10px] font-extrabold uppercase tracking-[2px] text-[#c77950] mb-1">
                    ✦ EMAIL CONFIRMATION ✦
                </div>
                <h1 className="text-2xl font-cormorant font-bold text-[#1a1f2c]">
                    Verify Your Email
                </h1>
                <p className="text-xs text-[#5a627a] mt-1.5 leading-relaxed">
                    Thanks for registering! Please verify your email by clicking the link we sent to your inbox.
                </p>
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-700 text-center">
                    A new verification link has been sent to your email address.
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                <div className="pt-2">
                    <PrimaryButton className="w-full h-11" disabled={processing}>
                        Resend Verification Email
                    </PrimaryButton>
                </div>

                <div className="text-center pt-3 border-t border-[#e8e9f0]">
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="text-xs text-red-600 hover:text-red-700 font-bold transition"
                    >
                        Sign Out
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
