import DemoPage from "./table/page"

interface RightBarprops {
    title: string
    total: number
    subtitle: string
    icon: React.ReactNode
}

export default function RightBar({ title, total, subtitle, icon }: RightBarprops) {
    return (
        <div>
            <div className="max-w-xs h-80 bg-[#fafafa] rounded-xl">
                <div className="p-5">

                    <div className="flex items-center justify-between">
                        <h3 className="scroll-m-20 text-2xl font-normal tracking-tight">
                            {title}
                        </h3>

                        <div className="bg-black/10 w-10 rounded-full h-10 flex items-center justify-center">
                            <div className=" opacity-45">
                                {icon}
                            </div>
                        </div>
                    </div>  

                    <h4 className="scroll-m-20 text-sm border-b font-normal tracking-tight mt-2">
                        Tugas Masuk
                    </h4>

                    <DemoPage/>
                    
                </div>

            </div>
        </div>
    )
}