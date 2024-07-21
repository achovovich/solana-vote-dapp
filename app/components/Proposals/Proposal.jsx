import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/context";
import { getProposalAddress } from "../../utils/program";

import { Skeleton } from "@/components/ui/skeleton"
import PageTitle from "@/components/PageTitle"
import VoteAdd from "@/components/Cards/VoteAdd";
import UserVote from "@/components/Cards/UserVote";
import VoteResult from "@/components/Cards/VoteResult";
import { EnvelopeClosedIcon } from '@radix-ui/react-icons'


export default function Proposal({ proposalKey }) {

    const { getProposal } = useAppContext();
    const [proposal, setProposal] = useState(null);

    let options = [];

    const isOpen = (proposal) => {
        const deadline = proposal.deadline.toString() * 1000;
        const now = new Date().getTime();
        const diff = deadline - now;
        return diff > 0 ? true : false;
    }

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
                    <div className="flex items-center ">
                        <EnvelopeClosedIcon className="text-purple-600 mr-2" />
                        <PageTitle text={"Vote " + proposal.title} />
                    </div>
                    <h2 className="pl-6">{proposal.description}</h2>
                    <>
                        {isOpen(proposal) ? (
                            <>
                                <VoteAdd proposal={proposal} />
                                <UserVote proposal={proposal} />
                            </>
                        ) : (
                            <VoteResult proposal={proposal} />
                        )}
                    </>
                </div>
            )}
        </>
    );
};
