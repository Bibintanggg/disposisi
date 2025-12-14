import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { FileText, Send, Clock, Archive, Bell, BarChart3, CheckCircle, Users, Shield, ArrowRight, Zap, Lock, TrendingUp } from 'lucide-react';

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    return (
        <>
            <Head title="DISPOSISI - Next-Gen Document System" />
            <div className="bg-zinc-950 text-white antialiased overflow-x-hidden">
                {/* Navigation */}
                <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-2xl border-b border-zinc-800">
                    <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
                        <div className="flex justify-between items-center h-24">
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-black tracking-tighter">DISPOSISI</span>
                            </div>
                            
                            <div className="hidden md:flex items-center gap-12">
                                <a href="#about" className="text-sm text-zinc-400 hover:text-white transition-colors">About</a>
                                <a href="#features" className="text-sm text-zinc-400 hover:text-white transition-colors">Features</a>
                                <a href="#roadmap" className="text-sm text-zinc-400 hover:text-white transition-colors">Get Started</a>
                            </div>
                            
                            <div className="flex items-center gap-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-bold tracking-tight rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-200"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="hidden sm:block text-zinc-400 hover:text-white text-sm font-medium transition-colors"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            href={route('login')}
                                            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-bold tracking-tight rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-200"
                                        >
                                            Get Started
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section - Web3 Style */}
                <section className="relative min-h-screen flex items-center pt-24 px-6 lg:px-12 overflow-hidden">
                    {/* Animated Background Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] -z-10"></div>
                    
                    <div className="max-w-[90rem] mx-auto w-full py-20">
                        <div className="grid lg:grid-cols-2 gap-20 items-center">
                            <div className="space-y-8">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
                                    <Zap className="w-4 h-4 text-blue-400" />
                                    <span className="text-xs font-bold text-blue-400 tracking-wider uppercase">Next-Gen Document System</span>
                                </div>
                                
                                <h1 className="text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9]">
                                    <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                                        Manage
                                    </span>
                                    <br />
                                    <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                        Documents
                                    </span>
                                    <br />
                                    <span className="text-zinc-600">Seamlessly</span>
                                </h1>
                                
                                <p className="text-xl text-zinc-400 max-w-xl leading-relaxed">
                                    Revolutionary platform untuk mengelola surat masuk, keluar, dan disposisi dengan teknologi terdepan. Fast, secure, dan intelligent.
                                </p>
                                
                                <div className="flex flex-wrap gap-4 pt-4">
                                    <Link
                                        href={route('login')}
                                        className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-sm tracking-tight rounded-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-200 flex items-center gap-2"
                                    >
                                        Start Free Trial
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                            
                            {/* Hero Image with 3D Effect */}
                            <div className="relative lg:scale-110">
                                <div className="relative aspect-square">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl"></div>
                                    
                                    <div className="relative bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl">
                                        <img 
                                            src="https://images.unsplash.com/photo-1603796846097-bee99e4a601f?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                                            alt="Dashboard"
                                            className="w-full h-full object-cover opacity-80 mix-blend-luminosity"
                                        />
                                        
                                        {/* Floating cards */}
                                        <div className="absolute top-8 right-8 bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6 shadow-2xl animate-float">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg flex items-center justify-center">
                                                    <CheckCircle className="w-5 h-5 text-white" />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-bold text-white">Verified</div>
                                                    <div className="text-xs text-zinc-500">2 mins ago</div>
                                                </div>
                                            </div>
                                            <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                                                <div className="h-full w-3/4 bg-gradient-to-r from-green-400 to-emerald-600"></div>
                                            </div>
                                        </div>

                                        <div className="absolute bottom-8 left-8 bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6 shadow-2xl">
                                            <div className="flex items-center gap-4 mb-4">
                                                <TrendingUp className="w-6 h-6 text-blue-400" />
                                                <span className="text-2xl font-bold text-white">+127%</span>
                                            </div>
                                            <div className="text-xs text-zinc-400">Processing Speed</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <style>{`
                        @keyframes float {
                            0%, 100% { transform: translateY(0px); }
                            50% { transform: translateY(-20px); }
                        }
                        .animate-float {
                            animation: float 3s ease-in-out infinite;
                        }
                    `}</style>
                </section>

                {/* About Section */}
                <section id="about" className="py-32 px-6 lg:px-12 border-t border-zinc-900">
                    <div className="max-w-[90rem] mx-auto">
                        <div className="grid lg:grid-cols-2 gap-20 items-center">
                            <div className="space-y-8">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-full">
                                    <span className="text-xs font-bold text-zinc-400 tracking-wider uppercase">About Us</span>
                                </div>
                                
                                <h2 className="text-5xl lg:text-6xl font-black tracking-tighter leading-tight">
                                    <span className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                                        Revolutionizing
                                    </span>
                                    <br />
                                    <span className="text-zinc-400">Document Management</span>
                                </h2>
                                
                                <p className="text-xl text-zinc-400 leading-relaxed">
                                    DISPOSISI adalah platform manajemen dokumen next-generation yang dirancang khusus untuk organisasi modern di Indonesia. Kami memahami tantangan dalam mengelola ribuan surat dan dokumen setiap harinya.
                                </p>
                                
                                <p className="text-lg text-zinc-500 leading-relaxed">
                                    Dengan teknologi AI dan cloud computing, kami membuat proses disposisi surat menjadi 10x lebih cepat dan efisien. Tim kami terdiri dari engineers berpengalaman dan domain experts dalam digitalisasi administrasi pemerintahan.
                                </p>
                            </div>

                            <div className="relative">
                                <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl blur-3xl"></div>
                                <div className="relative grid grid-cols-2 gap-4">
                                    <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl p-8 border border-zinc-800 space-y-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                            <Zap className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold">Fast</h3>
                                        <p className="text-sm text-zinc-400">Proses disposisi dalam hitungan detik</p>
                                    </div>

                                    <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl p-8 border border-zinc-800 space-y-4 mt-8">
                                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                                            <Shield className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold">Secure</h3>
                                        <p className="text-sm text-zinc-400">Keamanan data tingkat enterprise</p>
                                    </div>

                                    <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl p-8 border border-zinc-800 space-y-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                                            <Users className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold">Collaborative</h3>
                                        <p className="text-sm text-zinc-400">Kerja tim yang seamless</p>
                                    </div>

                                    <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl p-8 border border-zinc-800 space-y-4 mt-8">
                                        <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                                            <TrendingUp className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold">Scalable</h3>
                                        <p className="text-sm text-zinc-400">Tumbuh bersama organisasi Anda</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features - Bento Grid Style */}
                <section id="features" className="py-32 px-6 lg:px-12">
                    <div className="max-w-[90rem] mx-auto">
                        <div className="text-center mb-20">
                            <h2 className="text-6xl lg:text-7xl font-black tracking-tighter mb-6">
                                <span className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                                    Powerful Features
                                </span>
                            </h2>
                            <p className="text-xl text-zinc-500 max-w-2xl mx-auto">
                                Everything you need to revolutionize your document management
                            </p>
                        </div>

                        {/* Bento Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Large Card */}
                            <div className="lg:col-span-2 lg:row-span-2 bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-3xl p-12 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 group relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <FileText className="w-16 h-16 text-blue-400 mb-6" />
                                <h3 className="text-4xl font-bold mb-4 tracking-tight">Digital Document Management</h3>
                                <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                                    Upload, scan, dan kelola semua surat dalam satu dashboard yang powerful. AI-powered categorization dan smart search.
                                </p>
                                <div className="flex gap-2 flex-wrap">
                                    <span className="px-3 py-1 bg-zinc-800 rounded-full text-xs text-zinc-400">OCR Ready</span>
                                    <span className="px-3 py-1 bg-zinc-800 rounded-full text-xs text-zinc-400">Cloud Storage</span>
                                    <span className="px-3 py-1 bg-zinc-800 rounded-full text-xs text-zinc-400">AI Powered</span>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-3xl p-8 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 group">
                                <Clock className="w-12 h-12 text-green-400 mb-4" />
                                <h3 className="text-2xl font-bold mb-3 tracking-tight">Real-time Tracking</h3>
                                <p className="text-zinc-400 text-sm leading-relaxed">
                                    Monitor status dan progress setiap dokumen secara live
                                </p>
                            </div>

                            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-3xl p-8 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 group">
                                <Archive className="w-12 h-12 text-orange-400 mb-4" />
                                <h3 className="text-2xl font-bold mb-3 tracking-tight">Smart Archive</h3>
                                <p className="text-zinc-400 text-sm leading-relaxed">
                                    Arsip digital dengan pencarian instant dan filter canggih
                                </p>
                            </div>

                            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-3xl p-8 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 group">
                                <Bell className="w-12 h-12 text-yellow-400 mb-4" />
                                <h3 className="text-2xl font-bold mb-3 tracking-tight">Instant Alerts <span className="text-sm">*Upcoming Features</span></h3>
                                <p className="text-zinc-400 text-sm leading-relaxed">
                                    Push notification untuk setiap update penting
                                </p>
                            </div>

                            <div className="lg:col-span-2 bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-3xl p-8 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 group">
                                <BarChart3 className="w-12 h-12 text-pink-400 mb-4" />
                                <h3 className="text-2xl font-bold mb-3 tracking-tight">Advanced Analytics</h3>
                                <p className="text-zinc-400 leading-relaxed">
                                    Dashboard analytics yang comprehensive dengan insights dan recommendations untuk meningkatkan workflow efficiency
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Showcase with split screen */}
                <section id="security" className="py-32 px-6 lg:px-12 bg-zinc-950 border-y border-zinc-900">
                    <div className="max-w-[90rem] mx-auto">
                        <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
                            <div className="relative">
                                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl"></div>
                                <img 
                                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80" 
                                    alt="Team Collaboration"
                                    className="relative rounded-3xl shadow-2xl border border-zinc-800"
                                />
                            </div>
                            <div className="space-y-6">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full">
                                    <Users className="w-4 h-4 text-purple-400" />
                                    <span className="text-xs font-bold text-purple-400 tracking-wider uppercase">Team Collaboration</span>
                                </div>
                                <h2 className="text-5xl lg:text-6xl font-black tracking-tighter leading-tight">
                                    Work Together,
                                    <br />
                                    <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                        Anywhere
                                    </span>
                                </h2>
                                <p className="text-xl text-zinc-400 leading-relaxed">
                                    Kolaborasi tim yang seamless dengan multi-level approval, real-time updates, dan automated workflow routing.
                                </p>
                                <ul className="space-y-4 pt-4">
                                    {['Multi-level approval system', 'Real-time collaboration tools', 'Automated workflow routing', 'Team performance analytics'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-zinc-300">
                                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                                                <CheckCircle className="w-4 h-4 text-white" />
                                            </div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-20 items-center">
                            <div className="space-y-6 order-2 lg:order-1">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full">
                                    <Shield className="w-4 h-4 text-green-400" />
                                    <span className="text-xs font-bold text-green-400 tracking-wider uppercase">Enterprise Security</span>
                                </div>
                                <h2 className="text-5xl lg:text-6xl font-black tracking-tighter leading-tight">
                                    <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                                        Keamanan
                                    </span>
                                    <br />
                                    Terjamin
                                </h2>
                                <p className="text-xl text-zinc-400 leading-relaxed">
                                    Data surat Anda aman dan terlindungi. Sistem keamanan berlapis dengan enkripsi tingkat enterprise, backup otomatis, dan akses terkontrol.
                                </p>
                                <ul className="space-y-4 pt-4">
                                    {['Enkripsi data end-to-end', 'Kontrol akses berdasarkan jabatan', 'Backup otomatis setiap hari', 'Audit trail lengkap setiap aktivitas'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-zinc-300">
                                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                                                <Lock className="w-4 h-4 text-white" />
                                            </div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="relative order-1 lg:order-2">
                                <div className="absolute -inset-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-3xl blur-3xl"></div>
                                <img 
                                    src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80" 
                                    alt="Security"
                                    className="relative rounded-3xl shadow-2xl border border-zinc-800"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* How to Get Started Section */}
                <section id="roadmap" className="py-32 px-6 lg:px-12">
                    <div className="max-w-[90rem] mx-auto">
                        <div className="text-center mb-20">
                            <h2 className="text-6xl lg:text-7xl font-black tracking-tighter mb-6">
                                <span className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                                    Cara Memulai
                                </span>
                            </h2>
                            <p className="text-xl text-zinc-500 max-w-2xl mx-auto">
                                Mudah dan cepat! Ikuti 3 langkah sederhana untuk mulai menggunakan DISPOSISI
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Step 1 */}
                            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-3xl p-8 border border-zinc-800 relative overflow-hidden hover:border-zinc-700 transition-all duration-300">
                                <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
                                    <span className="text-2xl font-black text-blue-400">1</span>
                                </div>
                                <div className="mb-6 pt-8">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                                        <Users className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-3xl font-bold">Hubungi Tim Kami</h3>
                                </div>
                                <p className="text-zinc-400 mb-6 leading-relaxed">
                                    Hubungi tim DISPOSISI untuk membuat akun organisasi Anda. Kami akan membantu setup awal dan konfigurasi sistem.
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3 text-zinc-400 text-sm">
                                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                        <span>WhatsApp: <a href="https://wa.me/" className="text-blue-400 hover:text-blue-300">+62 No wa pak kus</a></span>
                                    </li>
                                    <li className="flex items-start gap-3 text-zinc-400 text-sm">
                                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                        <span>Email: <a href="#" className="text-blue-400 hover:text-blue-300">email pakkus</a></span>
                                    </li>
                                    <li className="flex items-start gap-3 text-zinc-400 text-sm">
                                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                        <span>Response time: 1-2 jam kerja</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Step 2 */}
                            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-3xl p-8 border border-zinc-800 relative overflow-hidden hover:border-zinc-700 transition-all duration-300">
                                <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center">
                                    <span className="text-2xl font-black text-purple-400">2</span>
                                </div>
                                <div className="mb-6 pt-8">
                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mb-4">
                                        <FileText className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-3xl font-bold">Verifikasi & Setup</h3>
                                </div>
                                <p className="text-zinc-400 mb-6 leading-relaxed">
                                    Kami akan memverifikasi organisasi Anda dan melakukan setup akun serta struktur organisasi sesuai kebutuhan.
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3 text-zinc-400 text-sm">
                                        <div className="w-5 h-5 rounded-full border-2 border-zinc-700 flex-shrink-0 mt-0.5"></div>
                                        <span>Verifikasi dokumen organisasi</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-zinc-400 text-sm">
                                        <div className="w-5 h-5 rounded-full border-2 border-zinc-700 flex-shrink-0 mt-0.5"></div>
                                        <span>Setup struktur & departemen</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-zinc-400 text-sm">
                                        <div className="w-5 h-5 rounded-full border-2 border-zinc-700 flex-shrink-0 mt-0.5"></div>
                                        <span>Konfigurasi workflow</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-zinc-400 text-sm">
                                        <div className="w-5 h-5 rounded-full border-2 border-zinc-700 flex-shrink-0 mt-0.5"></div>
                                        <span>Pembuatan akun admin & user</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Step 3 */}
                            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-3xl p-8 border border-zinc-800 relative overflow-hidden hover:border-zinc-700 transition-all duration-300">
                                <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center">
                                    <span className="text-2xl font-black text-green-400">3</span>
                                </div>
                                <div className="mb-6 pt-8">
                                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mb-4">
                                        <Zap className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-3xl font-bold">Mulai Gunakan!</h3>
                                </div>
                                <p className="text-zinc-400 mb-6 leading-relaxed">
                                    Setelah setup selesai, Anda bisa langsung login dan mulai mengelola surat dengan DISPOSISI. Kami siap membantu 24/7!
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3 text-zinc-400 text-sm">
                                        <div className="w-5 h-5 rounded-full border-2 border-zinc-700 flex-shrink-0 mt-0.5"></div>
                                        <span>Training & onboarding gratis</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-zinc-400 text-sm">
                                        <div className="w-5 h-5 rounded-full border-2 border-zinc-700 flex-shrink-0 mt-0.5"></div>
                                        <span>Dokumentasi lengkap</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-zinc-400 text-sm">
                                        <div className="w-5 h-5 rounded-full border-2 border-zinc-700 flex-shrink-0 mt-0.5"></div>
                                        <span>Support 24/7 via WhatsApp</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-zinc-400 text-sm">
                                        <div className="w-5 h-5 rounded-full border-2 border-zinc-700 flex-shrink-0 mt-0.5"></div>
                                        <span>Free updates & maintenance</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* CTA Banner */}
                        <div className="mt-16 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-zinc-800 rounded-3xl p-12 text-center">
                            <h3 className="text-3xl font-bold mb-4">Siap Untuk Memulai?</h3>
                            <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
                                Hubungi kami sekarang dan dapatkan demo gratis sistem DISPOSISI untuk organisasi Anda!
                            </p>
                            <div className="flex flex-wrap gap-4 justify-center">
                                <a
                                    href="https://wa.me/"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors"
                                >
                                    <Users className="w-5 h-5" />
                                    Hubungi via WhatsApp
                                </a>
                                <a
                                    href=""
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-lg transition-colors"
                                >
                                    Kirim Email
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section id="pricing" className="py-40 px-6 lg:px-12 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
                    <div className="max-w-4xl mx-auto text-center relative">
                        <h2 className="text-6xl lg:text-8xl font-black tracking-tighter mb-8 leading-none">
                            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Ready to Transform?
                            </span>
                        </h2>
                        <p className="text-2xl text-zinc-400 mb-12">
                            Lets using DISPOSISI!!
                        </p>
                        <Link
                            href={route('login')}
                            className="inline-flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-full hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-200"
                        >
                            Start Free Trial
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </section>

                {/* Footer */}
                <footer className="py-20 px-6 lg:px-12 border-t border-zinc-900">
                    <div className="max-w-[90rem] mx-auto">
                        <div className="grid md:grid-cols-4 gap-12 mb-12">
                            <div className="md:col-span-2">
                                <div className="flex items-center gap-2 mb-6">
                                    <span className="text-2xl font-black tracking-tighter">DISPOSISI</span>
                                </div>
                                <p className="text-zinc-500 max-w-md leading-relaxed">
                                    Next-generation document management platform. Built for modern organizations.
                                </p>
                            </div>

                            <div>
                                <h4 className="font-bold mb-4 text-white">Product</h4>
                                <ul className="space-y-3 text-zinc-400 text-sm">
                                    <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                                    <li><a href="#security" className="hover:text-white transition-colors">Security</a></li>
                                    <li><a href="#roadmap" className="hover:text-white transition-colors">Get Started</a></li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-bold mb-4 text-white">Company</h4>
                                <ul className="space-y-3 text-zinc-400 text-sm">
                                    <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                                    <li><a href="#features" className="hover:text-white transition-colors">Why Choose Us</a></li>
                                    <li><a href={route('login')} className="hover:text-white transition-colors">Get Started</a></li>
                                    <li><a href="mailto:bintangyuda08@gmail.com" className="hover:text-white transition-colors">Contact</a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="text-sm text-zinc-600">
                                © 2024 DISPOSISI. All rights reserved.
                            </div>
                            <div className="text-sm text-zinc-600">
                                Instagram bintang.ydha_ or Email bintangyuda08@gmail.com
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}