import Checkbox from '@/components/Checkbox';
import InputError from '@/components/InputError';
import InputLabel from '@/components/InputLabel';
import PrimaryButton from '@/components/PrimaryButton';
import TextInput from '@/components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { motion } from 'framer-motion';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        identity: '',
        password: '',
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Log in" />

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=DM+Sans:wght@400;500;700&display=swap');
                
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                
                body {
                    font-family: 'Sora', -apple-system, sans-serif;
                }
                
                .gradient-text {
                    background: linear-gradient(135deg, #0f172a 0%, #1e40af 50%, #0f172a 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                
                .glass-card {
                    background: rgba(255, 255, 255, 0.7);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.5);
                }
                
                .input-enhanced {
                    transition: all 0.3s ease;
                }
                
                .input-enhanced:focus {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 24px rgba(234, 88, 12, 0.12);
                }
                
                .btn-primary-enhanced {
                    position: relative;
                    overflow: hidden;
                    transition: all 0.3s ease;
                }
                
                .btn-primary-enhanced:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 12px 28px rgba(220, 38, 38, 0.25);
                }
                
                .btn-primary-enhanced::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
                    transition: left 0.5s ease;
                }
                
                .btn-primary-enhanced:hover::before {
                    left: 100%;
                }
            `}</style>

            <div className="min-h-screen relative overflow-hidden" style={{
                background: '#09090b'
            }}>
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-20"
                        style={{
                            background: 'radial-gradient(circle, #dc2626 0%, transparent 70%)',
                        }}
                        animate={{
                            y: [0, -20, 0],
                            rotate: [0, 5, 0],
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />

                    <motion.div
                        className="absolute top-1/3 -left-32 w-80 h-80 rounded-full opacity-20"
                        style={{
                            background: 'radial-gradient(circle, #ea580c 0%, transparent 70%)',
                        }}
                        animate={{
                            y: [0, -20, 0],
                            rotate: [0, -5, 0],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1
                        }}
                    />

                    <motion.div
                        className="absolute -bottom-24 right-1/4 w-72 h-72 rounded-full opacity-20"
                        style={{
                            background: 'radial-gradient(circle, #b45309 0%, transparent 70%)',
                        }}
                        animate={{
                            y: [0, -20, 0],
                            rotate: [0, 5, 0],
                        }}
                        transition={{
                            duration: 7,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 2
                        }}
                    />

                    {/* Grid pattern */}
                    <div className="absolute inset-0 opacity-30" style={{
                        backgroundImage: `
                            linear-gradient(rgba(180, 83, 9, 0.05) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(180, 83, 9, 0.05) 1px, transparent 1px)
                        `,
                        backgroundSize: '50px 50px',
                    }} />
                </div>

                <div className="relative min-h-screen flex">
                    {/* Left Side - Hero Section */}
                    <motion.div
                        className="hidden lg:flex lg:w-1/2 flex-col justify-center px-16 xl:px-24"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="space-y-8 max-w-xl">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                            >
                                <div className="flex items-center space-x-2 mb-6">
                                    <motion.div
                                        className="w-2 h-2 rounded-full bg-red-600"
                                        animate={{ opacity: [1, 0.6, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />
                                    <motion.div
                                        className="w-2 h-2 rounded-full bg-orange-600"
                                        animate={{ opacity: [1, 0.6, 1] }}
                                        transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                                    />
                                    <motion.div
                                        className="w-2 h-2 rounded-full bg-amber-600"
                                        animate={{ opacity: [1, 0.6, 1] }}
                                        transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                                    />
                                </div>

                                <h1 className="text-6xl xl:text-7xl font-bold mb-6 leading-tight" style={{
                                    fontFamily: "'Sora', sans-serif",
                                }}>
                                    <span className="gradient-text">Disposisi</span>
                                </h1>
                            </motion.div>

                            <motion.p
                                className="text-xl text-gray-600 leading-relaxed"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                style={{ fontFamily: "'DM Sans', sans-serif" }}
                            >
                                Platform surat menyurat modern untuk
                                <span className="font-semibold text-white"> efisiensi maksimal</span> dan
                                <span className="font-semibold text-white"> kolaborasi tim</span> yang lebih baik.
                            </motion.p>

                            <motion.div
                                className="space-y-4 pt-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.6 }}
                            >
                                {[
                                    {
                                        icon: (
                                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        ),
                                        title: "Proses Cepat & Efisien",
                                        desc: "Kelola disposisi surat dengan sistem real-time",
                                        gradient: "from-red-600 to-red-700"
                                    },
                                    {
                                        icon: (
                                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                        ),
                                        title: "Keamanan Terjamin",
                                        desc: "Data terenkripsi dengan standar keamanan tinggi",
                                        gradient: "from-orange-600 to-orange-700"
                                    },
                                    {
                                        icon: (
                                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                        ),
                                        title: "Kolaborasi Tim",
                                        desc: "Koordinasi antar departemen jadi lebih mudah",
                                        gradient: "from-amber-600 to-amber-700"
                                    }
                                ].map((feature, index) => (
                                    <motion.div
                                        key={index}
                                        className="flex items-start space-x-4 group cursor-pointer"
                                        whileHover={{ x: 8 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <motion.div
                                            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center flex-shrink-0`}
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            {feature.icon}
                                        </motion.div>
                                        <div>
                                            <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                                            <p className="text-sm text-gray-600">{feature.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right Side - Login Form */}
                    <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
                        <motion.div
                            className="w-full max-w-md"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            {/* Mobile Logo */}
                            <motion.div
                                className="lg:hidden text-center mb-8"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>
                                    <span className="gradient-text">Disposisi</span>
                                </h1>
                                <p className="text-sm text-gray-600">Masuk untuk melanjutkan</p>
                            </motion.div>

                            <motion.div
                                className="glass-card rounded-3xl shadow-2xl p-8 md:p-10"
                                initial={{ scale: 0.95 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                <div className="mb-8">
                                    <h2 className="text-3xl font-bold text-gray-500 mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>
                                        Selamat Datang!
                                    </h2>
                                    <p className="text-gray-600">Silakan login untuk mengakses akun Anda</p>
                                </div>

                                {status && (
                                    <motion.div
                                        className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        <p className="text-sm font-medium text-green-600">{status}</p>
                                    </motion.div>
                                )}

                                <form onSubmit={submit} className="space-y-6">
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        <InputLabel htmlFor="identity" value="Email atau Username" className="text-gray-700 font-semibold mb-2" />
                                        <TextInput
                                            id="identity"
                                            type="text"
                                            name="identity"
                                            value={data.identity}
                                            className="mt-1 block w-full input-enhanced rounded-xl border-gray-300 focus:border-orange-600 focus:ring-orange-600 px-4 py-3 text-base"
                                            autoComplete="username"
                                            isFocused={true}
                                            onChange={(e) => setData('identity', e.target.value)}
                                            placeholder="masukkan email atau username"
                                        />
                                        <InputError message={errors.identity} className="mt-2" />
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        <InputLabel htmlFor="password" value="Password" className="text-gray-700 font-semibold mb-2" />
                                        <TextInput
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            className="mt-1 block w-full input-enhanced rounded-xl border-gray-300 focus:border-orange-600 focus:ring-orange-600 px-4 py-3 text-base"
                                            autoComplete="current-password"
                                            onChange={(e) => setData('password', e.target.value)}
                                            placeholder="masukkan password"
                                        />
                                        <InputError message={errors.password} className="mt-2" />
                                    </motion.div>

                                    <motion.div
                                        className="flex items-center justify-between"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.6 }}
                                    >
                                        <label className="flex items-center cursor-pointer group">
                                            <Checkbox
                                                name="remember"
                                                checked={data.remember}
                                                onChange={(e) => setData('remember', e.target.checked as false)}
                                                className="rounded border-gray-300 text-orange-600 focus:ring-orange-600 transition-all"
                                            />
                                            <span className="ms-2 text-sm text-gray-600 group-hover:text-white transition-colors">
                                                Ingat Aku
                                            </span>
                                        </label>

                                        {canResetPassword && (
                                            <Link
                                                href={route('password.request')}
                                                className="text-sm text-orange-700 hover:text-orange-800 font-medium transition-colors hover:underline"
                                            >
                                                Lupa Password?
                                            </Link>
                                        )}
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.7 }}
                                    >
                                        <motion.button
                                            type="submit"
                                            disabled={processing}
                                            className="w-full btn-primary-enhanced bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 text-white font-semibold py-4 rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                            whileHover={{ scale: processing ? 1 : 1.02 }}
                                            whileTap={{ scale: processing ? 1 : 0.98 }}
                                        >
                                            {processing ? (
                                                <span className="flex items-center justify-center">
                                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Memproses...
                                                </span>
                                            ) : (
                                                'Masuk Sekarang'
                                            )}
                                        </motion.button>
                                    </motion.div>
                                </form>
                            </motion.div>

                            {/* Footer */}
                            <motion.div
                                className="mt-6 text-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                            >
                                <p className="text-sm text-gray-500">
                                    © 2025 Disposisi All rights reserved.
                                </p>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    );
}