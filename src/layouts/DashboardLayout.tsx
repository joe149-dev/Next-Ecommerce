import Footer from "@/components/footer";
import Header from "@/components/header";
import React, {useEffect} from "react";
import {Inter} from "next/font/google";

const inter = Inter({subsets: ['latin']})

interface Props {
    children: React.ReactNode
}

const DashboardLayout: React.FC<Props> = ({children}) => {
    return (
        <div className={`min-h-screen ${inter.className}`}>
           <Header/>
            <div className="w-full p-10">
                {children}
            </div>
        </div>
    );
}

export default DashboardLayout;
