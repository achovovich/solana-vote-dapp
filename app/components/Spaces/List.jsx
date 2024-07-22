"use client";

import React, { useState, useEffect } from "react";
import { useAppContext } from "../../context/context";

import Link from 'next/link';
import ListPaginate from "@/components/ListPaginate"
import PageTitle from "@/components/PageTitle"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowTopRightIcon, RowsIcon } from '@radix-ui/react-icons'

import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow, }
    from "@/components/ui/table"

export default function SpacesList({ app }) {

    const [spaces, setSpaces] = useState();
    const { getSpaces, refresh, setRefresh } = useAppContext();

    const load = async () => {
        let s = await getSpaces()
        setSpaces(s)
    }

    useEffect(() => {
        if (refresh) {
            load();
        }
        setRefresh(false);
    }, [refresh]);

    if (!spaces) {
        load();
        return (
            <div>
                <PageTitle text={"Chargement..."} />
                <Skeleton className="w-[100px] h-[20px] rounded-full" />
            </div>
        );
    }

    return (
        <div >
            <div className='flex items-center my-5'>
                <RowsIcon className="text-purple-600 mr-2" />
                <PageTitle text={"Liste des espaces de votes"} />
            </div>
            <Table className="border-purple-100 border-2">
                <TableCaption></TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[300px] text-purple-400">Titre</TableHead>
                        <TableHead className="text-right text-purple-400">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {spaces.length >= 1 ? (
                        spaces?.map((space) => (
                            <TableRow key={space.publicKey}>
                                <TableCell className="font-medium">{space.account.name}</TableCell>
                                <TableCell className="text-right flex flex-row-reverse items-center justify-between">
                                    <Link href={"/spaces/" + space.publicKey}><ArrowTopRightIcon className='text-purple-400' /></Link>
                                </TableCell>
                            </TableRow>
                        ))) : null}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={4}>
                            {spaces.length >= 1 ? (
                                <ListPaginate />
                            ) : (
                                <div className="text-center">
                                    Aucun vote disponible
                                </div>
                            )}
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
};