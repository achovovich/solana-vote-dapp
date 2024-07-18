"use client";

import React, { useState } from "react";
import { useAppContext } from "../../context/context";
import { getAppAddress } from "../../utils/program";

import { Skeleton } from "@/components/ui/skeleton"
import PageTitle from "@/components/PageTitle"
import SpacesList from '@/components/Spaces/List';
import SpaceAdd from '@/components/Cards/SpaceAdd';

export default function SpaceWorkSpace() {

    const { getApp } = useAppContext();
    const [app, setApp] = useState(null);

    if (!app) {

        const load = async () => {
            let appPublicKey = await getAppAddress()
            let tmpApp = await getApp(appPublicKey)
            setApp(tmpApp)
        };

        load();

        return (
            <div>
                <Skeleton className="w-[100px] h-[20px] rounded-full" />
            </div>
        );
    }

    return (
        <div >
            <SpacesList app={app} />
            <SpaceAdd app={app} />
        </div>
    );
};