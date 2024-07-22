"use client";

import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/context";
import { Skeleton } from "@/components/ui/skeleton"
import ProposalList from "../Proposals/List";
import PageTitle from "@/components/PageTitle"
import ProposalAdd from '@/components/Cards/ProposalAdd';
import { BoxModelIcon } from '@radix-ui/react-icons'

export default function Space({ spaceKey }) {

    const { getSpace } = useAppContext();
    const [space, setSpace] = useState(null);

    const loadSpace = async () => {
        const spaceData = await getSpace(spaceKey);
        setSpace(spaceData);
        console.log('space', spaceData)
    };

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
                    <div className="flex items-center ">
                        <PageTitle text={"Bienvenue dans l&rsquo;espace " + space.name} />
                    </div>
                    <ProposalList space={space} />
                    <ProposalAdd space={space} />
                </div>
            )}
        </>
    );
};