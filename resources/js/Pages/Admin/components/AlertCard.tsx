import { ChevronRight } from "lucide-react";

interface AlertCardProps {
    icon: React.ReactNode;
    title: string;
    count: number;
    description: string;
    color: string;
}

export default function AlertCard({ icon, title, count, description, color }: AlertCardProps) {
    return (

        <div className="relative overflow-hidden bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 group cursor-pointer">
            <div className={`absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 ${color} opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity`} />

            <div className="relative z-10">
                <div className="flex items-start gap-4">
                    <div className={`p-3 ${color} bg-opacity-10 rounded-xl`}>
                        {icon}
                    </div>
                    <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                            <div>
                                <div className="text-sm font-medium text-gray-500 mb-1">{title}</div>
                                <div className="text-3xl font-bold text-gray-900">{count}</div>
                            </div>
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <ChevronRight className="w-5 h-5 text-gray-400" />
                            </button>
                        </div>
                        <p className="text-sm text-gray-600">{description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}