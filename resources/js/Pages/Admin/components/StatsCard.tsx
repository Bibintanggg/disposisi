import { ChevronRight } from "lucide-react";

interface StatCardProps {
    icon: React.ReactNode;
    title: string;
    value: number;
    buttonText: string;
    onClick: () => void;
    accentColor: string;
    bgPattern: string;
}

export default function StatCard ({ icon, title, value, buttonText, onClick, accentColor, bgPattern }: StatCardProps) {
    return (
        <div className="relative overflow-hidden bg-white rounded-xl border border-gray-200 p-6 transition-all duration-500 hover:border-gray-300 hover:shadow-xl group cursor-pointer">
            <div className={`absolute inset-0 opacity-[0.02] ${bgPattern}`} 
                 style={{ 
                     backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(0 0 0) 1px, transparent 0)',
                 backgroundSize: '24px 24px'
             }} 
        />
        
        {/* Accent line */}
        <div className={`absolute top-0 left-0 right-0 h-0.5 ${accentColor} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out`} />
        
        <div className="relative z-10">
            <div className="flex items-start justify-between mb-8">
                <div className={`p-3 bg-gray-50 rounded-lg border border-gray-100 group-hover:border-gray-200 transition-colors`}>
                    {icon}
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 rounded-md">
                    <div className={`w-1.5 h-1.5 ${accentColor} rounded-full`} />
                    <span className="text-xs font-medium text-gray-600">Live</span>
                </div>
            </div>
            
            <div className="mb-1 text-xs font-medium text-gray-500 uppercase tracking-wider">{title}</div>
            <div className="mb-8 text-5xl font-bold text-gray-900 tracking-tight tabular-nums">
                {value.toLocaleString('id-ID')}
            </div>
            
            <button 
                onClick={onClick}
                className="flex items-center justify-between w-full px-4 py-3 bg-gray-900 hover:bg-gray-800 rounded-lg transition-all duration-300 group/btn"
            >
                <span className="text-sm font-medium text-white">{buttonText}</span>
                <ChevronRight className="w-4 h-4 text-white transition-transform group-hover/btn:translate-x-1" />
            </button>
        </div>
    </div>
)}
