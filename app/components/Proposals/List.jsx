"use client";

import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/context";
import Link from 'next/link';
import ListPaginate from "@/components/ListPaginate"
import { getProposalAddress } from "../../utils/program";
import { BarChartIcon, ArrowTopRightIcon } from '@radix-ui/react-icons'
import PageTitle from "@/components/PageTitle"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Skeleton } from "@/components/ui/skeleton"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default function ProposalList({ space }) {

    const context = useAppContext();

    let spaceKey = space.publicKey;
    let proposalCount = space.proposalCount;

    const { loadSpaceProposals } = useAppContext();
    const [spaceProposals, setSpaceProposals] = useState();

    console.log('space', space)

    let proposalList = [];
    const load = async () => {
        proposalList = await loadSpaceProposals(spaceKey, proposalCount)
        setSpaceProposals(proposalList);
    };

    if (!spaceProposals) {
        load();
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
                    <div className='flex justify-between items-center'>
                        <h2>Liste des votes disponible</h2>
                    </div>
                    <Table>
                        <TableCaption></TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[300px]">Titre</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {spaceProposals?.map((proposal) => (
                                <TableRow key={proposal.publicKey}>
                                    <TableCell className="font-medium">{proposal.title}</TableCell>
                                    <TableCell className="text-right flex flex-row-reverse items-center justify-between">
                                        <Link href={"/proposals/" + proposal.publicKey}><ArrowTopRightIcon className='text-purple-400' /></Link>
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