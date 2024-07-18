"use client";

import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/context";
import { Skeleton } from "@/components/ui/skeleton"
import ProposalList from "../Proposals/List";
import PageTitle from "@/components/PageTitle"
import ProposalAdd from '@/components/Cards/ProposalAdd';

export default function Space({ spaceKey }) {

    const { getSpace } = useAppContext();
    const [space, setSpace] = useState(null);

    const loadSpace = async () => {
        console.log('spaceKey', spaceKey)
        const spaceData = await getSpace(spaceKey);
        setSpace(spaceData);
        console.log('space', spaceData)
    };

    // loadSpace();

    if (!space) {
        loadSpace();
    }

    return (
        <>
            {!space ? (
                <div>
                    <PageTitle text={"Chargement..."} />
                    <Skeleton className="w-[100px] h-[20px] rounded-full" />
                </div>
            ) : (
                <div >
                    <PageTitle text={"Bienvenue dans votre espace " + space.name} />
                    <ProposalList space={space} />
                    <ProposalAdd space={space} />
                </div>
            )}
        </>
    );
};