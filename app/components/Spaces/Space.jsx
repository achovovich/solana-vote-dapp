import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/context";
import { Skeleton } from "@/components/ui/skeleton"
import ProposalList from "../Proposals/List";
import PageTitle from "@/components/PageTitle"

export default function Space({ spaceKey }) {

    const { getSpace, proposals, getProposal } = useAppContext();
    const [space, setSpace] = useState(null);

    useEffect(() => {
        const loadSpace = async () => {
            const spaceData = await getSpace(spaceKey);
            setSpace(spaceData);
        };

        loadSpace();

    }, [spaceKey, getSpace]);

    if (!space) {
        return (
            <div>
                <Skeleton className="w-[100px] h-[20px] rounded-full" />
            </div>
        );
    }

    return (
        <div >
            <PageTitle text={"Bienvenue dans votre espace " + space.name} />
            <ProposalList spaceKey={spaceKey} proposalCount={space.proposalCount} />
        </div>
    );
};