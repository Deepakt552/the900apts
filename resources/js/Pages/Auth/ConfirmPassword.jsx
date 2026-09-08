import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Confirm Password · The 900 Residences" />

            <div className="text-center mb-6">
                <div className="text-[10px] font-extrabold uppercase tracking-[2px] text-[#c77950] mb-1">
                    ✦ SECURITY CHECK ✦
                </div>
                <h1 className="text-2xl font-cormorant font-bold text-[#1a1f2c]">
                    Confirm Password
                </h1>
                <p className="text-xs text-[#5a627a] mt-1.5 leading-relaxed">
                    This is a secure area of the application. Please confirm your password before continuing.
                </p>
            </div>

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        placeholder="••••••••••••"
                        className="w-full"
                        isFocused={true}
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-1.5" />
                </div>

                <div className="pt-2">
                    <PrimaryButton className="w-full h-11" disabled={processing}>
                        Confirm Access
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
