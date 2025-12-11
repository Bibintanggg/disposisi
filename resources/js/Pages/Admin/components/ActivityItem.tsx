import { FileText, Send } from "lucide-react";

interface ActivityItemProps {
    type: 'masuk' | 'keluar';
    nomor: string;
    detail: string;
    verifikator: string;
    timestamp: string;
}



export default function ActivityItem ({ type, nomor, detail, verifikator, timestamp }: ActivityItemProps) {
    return (

        <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors group">
        <div className={`p-2.5 rounded-xl ${type === 'masuk' ? 'bg-emerald-100' : 'bg-blue-100'} group-hover:scale-110 transition-transform`}>
            {type === 'masuk' ? (
                <FileText className="w-5 h-5 text-emerald-600" />
            ) : (
                <Send className="w-5 h-5 text-blue-600" />
            )}
        </div>
        <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
                <div className="font-semibold text-gray-900 truncate">{nomor}</div>
                <span className="text-xs text-gray-500 whitespace-nowrap">{timestamp}</span>
            </div>
            <div className="text-sm text-gray-600 mb-1 truncate">{detail}</div>
            <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                    {verifikator.charAt(0)}
                </div>
                <span className="text-xs text-gray-500">{verifikator}</span>
            </div>
        </div>
    </div>
)}
