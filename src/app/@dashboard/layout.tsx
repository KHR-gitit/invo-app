import { ReactNode, useState} from "react";
import Head from "next/head";
import DashboardWraper from "../_components/dashboard/dashboardWraper";
import { getServerAuthSession } from '~/server/auth';
import {useParams} from "next/navigation";
import { set } from "zod";




type Props = {
    children: ReactNode;
    business: ReactNode;
    client: ReactNode;
    invoice: ReactNode;
    qoute: ReactNode;
    title: string;
};



const Layout = async ({children, title }: Props) => {

    

    const session = await getServerAuthSession();
    
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <DashboardWraper user={session?.user}>
                {children}
            </DashboardWraper>
        </>
    );
};

export default Layout;
