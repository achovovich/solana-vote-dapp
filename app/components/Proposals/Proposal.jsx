import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/context";
import { getProposalAddress } from "../../utils/program";

import { Skeleton } from "@/components/ui/skeleton"
import PageTitle from "@/components/PageTitle"
import VoteAdd from "@/components/Cards/VoteAdd";


export default function Proposal({ proposalKey }) {

    const { getProposal } = useAppContext();
    const [proposal, setProposal] = useState(null);

    let options = [];

    const loadProposal = async () => {

        const p = await getProposal(proposalKey);
        console.log('proposalKey', proposalKey);
        console.log('proposal', p);
        setProposal(p);

        options = p.options;


        // const spaceData = await getSpace(spaceKey);
        // setSpace(spaceData);
        // console.log(spaceData);
        // proposalPubKey = getProposalAddress(spaceKey, 0);
        // console.log(proposalPubKey);

        // for (let i = 0; i < spaceData.proposalCount; i++) {
        //     const proposalPubKey = await getProposalAddress(spaceKey, i);
        //     console.log(proposalPubKey)
        //     console.log(`Proposal ${i} PubKey:`, proposalPubKey);
        //     // prp = await getProposal(proposalPubKey);
        //     // proposalList.push(prp);

        // }
        // console.log(proposalList);
    };

    if (!proposal) {
        loadProposal();
    }

    return (
        <>
            {!proposal ? (
                <div>
                    <PageTitle text={"Chargement..."} />
                    <Skeleton className="w-[100px] h-[20px] rounded-full" />
                </div>
            ) : (
                <div >
                    <PageTitle text={"Vote " + proposal.title} />
                    <h2>{proposal.description}</h2>
                    <VoteAdd proposal={proposal} />
                </div>
            )}
        </>
    );
};
