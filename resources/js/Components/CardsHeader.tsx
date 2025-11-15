import React from "react"

interface CardsHeaderProps {
    title: string
    total: number
    subtitle: string
    icon: React.ReactNode
}

export default function CardsHeader({ title, total, subtitle, icon }: CardsHeaderProps) {
    return (
        <div className="max-w-xs h-36 bg-[#fafafa] rounded-xl">
            <div className="p-5">

                <div className="flex items-center justify-between">
                    <h3 className="scroll-m-20 text-2xl font-normal tracking-tight">
                        {title}
                    </h3>

                    <div className="bg-black/10 w-10 rounded-full h-10 flex items-center justify-center">
                        <div className="-rotate-[150deg] opacity-45">
                            {icon}
                        </div>
                    </div>
                </div>

                <div className="mt-1">
                    <h1 className="scroll-m-20 text-start text-4xl font-extrabold tracking-tight text-balance">
                        {total}
                    </h1>

                    <h4 className="scroll-m-20 text-sm font-normal tracking-tight">
                        {subtitle}
                    </h4>
                </div>
            </div>

        </div>
    )
}