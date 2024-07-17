import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/context";
import Link from 'next/link';
import ListPaginate from "@/components/ListPaginate"
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

export default function SpacesList() {

    const context = useAppContext();
    const { getApp, spaces, createSpace } = useAppContext();

    const [app, setApp] = useState(null);

    useEffect(() => {

        const load = async () => {
            let tmpApp = await getApp()
            setApp(tmpApp);
        };

        load();

    }, [getApp]);

    if (!app) {
        return (
            <div>
                <PageTitle text={"Chargement..."} className />
                <Skeleton className="w-[300px] h-[20px] rounded-full" />
            </div>
        );
    }

    const setSpace = async () => { //title, app, index
        let title = 'test' + app.account.spaceCount;
        let index = app.account.spaceCount;

        console.log('setSpace', title, index, app);
        let s = await createSpace(title, app, index);
        console.log("return", s);
        return s;
    }

    console.log('app', app);
    // let test = setSpace('test' + app.account.spaceCount, app.publicKey, app.account.spaceCount);
    // console.log("test", test);

    return (

        <div >
            <div className='flex justify-between items-center'>
                <PageTitle text={"Liste des espaces de votes"} className />
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
                    {spaces?.map((space) => (
                        <TableRow key={space.publicKey}>
                            <TableCell className="font-medium">{space.account.name}</TableCell>
                            <TableCell className="text-right flex flex-row items-center justify-between">
                                <Link href={"/spaces/" + space.publicKey}><ArrowTopRightIcon className='text-purple-400' /></Link>
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
            <div>
                {/* <a onClick={setSpace('test' + app.account.spaceCount, app.publicKey, app.account.spaceCount)}> */}
                <a onClick={setSpace}>
                    Set Space !
                </a>
            </div>
            <Link href="/">Retour à l'accueil</Link>
        </div>
    );
};