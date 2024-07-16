import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/context";
import { Skeleton } from "@/components/ui/skeleton"
import { getProposalAddress } from "../../utils/program";
// import ProposalList from "@/components/Proposals/list";
import ProposalList from "../Proposals/List";

export default function Space({ spaceKey }) {

    const { getSpace, proposals, getProposal } = useAppContext();
    const [space, setSpace] = useState(null);
    const [spaceProposals, setSpaceProposals] = useState(null);

    let proposalPubKey;
    let proposalList = [];

    useEffect(() => {
        const loadSpace = async () => {
            const spaceData = await getSpace(spaceKey);
            setSpace(spaceData);
            console.log(spaceData);
            proposalPubKey = getProposalAddress(spaceKey, 0);
            console.log(proposalPubKey);

            //Move this to ProposalList component, when it works !
            for (let i = 0; i < spaceData.proposalCount; i++) {
                const proposalPubKey = await getProposalAddress(spaceKey, i);
                console.log(proposalPubKey)
                console.log(`Proposal ${i} PubKey:`, proposalPubKey);

                // FAIL a cause des seed qui ne match pas
                // prp = await getProposal(proposalPubKey);
                // proposalList.push(prp);

            }
            // console.log(proposalList);
        };

        loadSpace();


        //TMP
        setSpaceProposals(proposals);

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
            Bienvenue dans votre espace "{space.name}"
            <ProposalList spaceKey={spaceKey} spaceName={space.name} proposalList={proposals} />
        </div>
    );
};

// On doit tomber sur ca, via "mon space 1" dans proposalList
// 66650233, 17471581, 52991045, 43891596, 8741835, 64812138, 39406725, 49981591, 39594824, 3386004, 0
// 34521874, 37972438, 17949686, 65687763, 3565664, 58767368, 40314705, 1691698, 12652113, 2630429, 0