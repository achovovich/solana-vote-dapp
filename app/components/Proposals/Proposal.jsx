import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/context";

import { Skeleton } from "@/components/ui/skeleton"
import PageTitle from "@/components/PageTitle"

import UserSwitch from "@/components/Cards/UserSwitch";
import VoteResult from "@/components/Cards/VoteResult";
import { EnvelopeClosedIcon } from '@radix-ui/react-icons'
import Link from 'next/link';


export default function Proposal({ proposalKey }) {

    const { getProposal } = useAppContext();
    const [proposal, setProposal] = useState(null);

    const isOpen = (proposal) => {
        const deadline = proposal.deadline.toString() * 1000;
        const now = new Date().getTime();
        const diff = deadline - now;
        return diff > 0 ? true : false;
    }

    const loadProposal = async () => {
        const p = await getProposal(proposalKey);
        setProposal(p);
    }

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
                            <UserSwitch proposal={proposal} />
                        ) : (
                            <VoteResult proposal={proposal} />
                        )}
                        <Link href={"/spaces/" + proposal.spaceKey.toString()}>Retour sur l'espace</Link>
                    </>
                </div>
            )}
        </>
    );
};

