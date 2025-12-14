import ApplicationLogo from '@/components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">
            <div>
                <Link href="/" className='flex flex-col items-center text-center'>
                    <p className='text-black font-black text-4xl'>Disposisi</p>
                    <p className='text-black font-semibold text-lg'>Login untuk terhubung kedalam aplikasi website surat menyurat</p>
                </Link>
            </div>

            <div className="mt-10 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
