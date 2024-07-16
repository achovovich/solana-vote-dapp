import { useAppContext } from "../../context/context";
import Link from 'next/link';
import ListPaginate from "@/components/ListPaginate"
import { BarChartIcon, ArrowTopRightIcon } from '@radix-ui/react-icons'
import PageTitle from "@/components/PageTitle"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

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
    const { spaces, viewSpaces } = useAppContext();

    // spaces?.map((space) => (
    //     console.log(space)
    // ));

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

            <Link href="/">Retour à l'accueil</Link>
        </div>
    );
};