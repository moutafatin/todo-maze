import {Head} from '@inertiajs/react';
import {PageProps} from '@/types';
import {SidebarLayout} from "@/Layouts/SidebarLayout";

export default function Welcome(props: PageProps<{ laravelVersion: string, phpVersion: string }>) {


    return (
        <>
            <Head title="Welcome"/>
            <SidebarLayout>
                <h1>Hello there</h1>
            </SidebarLayout>
        </>
    );
}
