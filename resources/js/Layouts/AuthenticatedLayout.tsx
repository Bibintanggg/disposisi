import { AppSidebar } from "@/components/app-sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"

import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState } from 'react';

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;
    const page = usePage().component;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const breadcrumpMap: Record<string, string[]> = {
        'Dashboard': ['Home', 'Dashboard'],
        'Admin/Users/Index': ['Home', 'Admin', 'Users'],
        'Admin/Users/Edit': ['Home', 'Admin', 'Users', 'Edit User'],
        'Admin/Reports': ['Home', 'Admin', 'Reports'],
        'Kepala/Dashboard': ['Home', 'Kepala', 'Dashboard'],
    }

    const crumbs = breadcrumpMap[page] || ['Dashboard']

    return (
        <SidebarProvider className="p-6">
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                {crumbs.map((crumb, idx) => (
                                    <span key={idx} className="flex items-center">
                                        {idx < crumbs.length - 1 ? (
                                            <>
                                                <BreadcrumbItem>
                                                    <BreadcrumbLink href="#">{crumb}</BreadcrumbLink>
                                                </BreadcrumbItem>
                                                <BreadcrumbSeparator className="hidden md:block" />
                                            </>
                                        ) : (
                                            <BreadcrumbItem>
                                                <BreadcrumbPage>{crumb}</BreadcrumbPage>
                                            </BreadcrumbItem>
                                        )}
                                    </span>
                                ))}
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
            {children}
            </SidebarInset>
        </SidebarProvider>

    );
}
