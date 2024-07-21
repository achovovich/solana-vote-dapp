"use client";

import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/context";
import Link from 'next/link';
import ListPaginate from "@/components/ListPaginate"
import { getProposalAddress } from "../../utils/program";
import { BarChartIcon, ArrowTopRightIcon, RowsIcon } from '@radix-ui/react-icons'
import PageTitle from "@/components/PageTitle"
import { Skeleton } from "@/components/ui/skeleton"

import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function ProposalList({ space }) {

    const context = useAppContext();

    let spaceKey = space.publicKey;
    let proposalCount = space.proposalCount;

    const { loadSpaceProposals, refresh, setRefresh } = useAppContext();
    const [spaceProposals, setSpaceProposals] = useState();

    const load = async () => {
        let proposalList = [];
        proposalList = await loadSpaceProposals(spaceKey, proposalCount)
        setSpaceProposals(proposalList);
    };

    useEffect(() => {
        if (refresh) {
            load();
        }
        setRefresh(false);
    }, [refresh]);

    if (!spaceProposals) {
        load();
    }

    const getStatus = (proposal) => {
        const deadline = proposal.deadline.toString() * 1000;
        const now = new Date().getTime();
        const diff = deadline - now;
        return diff > 0 ? "En cours" : "Terminé";
    }

    return (
        <>
            {!spaceProposals ? (
                <div>
                    <PageTitle text={"Chargement..."} />
                    <Skeleton className="w-[100px] h-[20px] rounded-full" />
                </div>
            ) : (
                <div >
                    <div className='flex items-center my-5'>
                        <RowsIcon className="text-purple-600 mr-2" />
                        <h2>Liste des votes disponible</h2>
                    </div>
                    <Table className="border-purple-100 border-2">
                        <TableCaption></TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[300px] text-purple-400">Titre</TableHead>
                                <TableHead className="w-[100px] text-purple-400">Status</TableHead>
                                <TableHead className="text-right text-purple-400">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {spaceProposals?.map((proposal) => (
                                <TableRow key={proposal.publicKey}>
                                    <TableCell className="font-medium">{proposal.title}</TableCell>
                                    <TableCell className="font-medium">{getStatus(proposal)}</TableCell>
                                    <TableCell className="text-right flex flex-row-reverse items-center justify-between">
                                        <Link href={"/proposals/" + proposal.publicKey}><ArrowTopRightIcon className='text-purple-600' /></Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={4}>
                                    <ListPaginate />
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            )}
        </>
    );
};