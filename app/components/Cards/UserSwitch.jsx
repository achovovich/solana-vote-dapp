"use client";

import React, { useState, useCallback, useEffect } from "react"
import { useAppContext } from "../../context/context";


import VoteAdd from "@/components/Cards/VoteAdd";
import UserVote from "@/components/Cards/UserVote";
import VoteResult from "@/components/Cards/VoteResult";

export default function UserSwitch({ proposal }) {

    const { getUserVote } = useAppContext();

    const [uVote, setUVote] = useState(null);

    const loadUserVote = async () => {
        const uv = await getUserVote(proposal.publicKey)
        setUVote(uv);
    }

    if (!uVote) {
        loadUserVote();
    }


    return (
        <>
            {!uVote ? (
                <VoteAdd proposal={proposal} />
            ) : (
                <UserVote proposal={proposal} userVote={uVote} />
            )}
            <div className="mt-5"></div>
            <VoteResult proposal={proposal} />
        </>
    );

} 