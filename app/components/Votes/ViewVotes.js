import { useAppContext } from "../../context/context";
import Link from 'next/link';
import Vote from "./Vote";
import style from './ViewVotes.module.css';

import PageTitle from "@/components/PageTitle"
import ListPaginate from "@/components/ListPaginate"
import { BarChartIcon, ArrowTopRightIcon } from '@radix-ui/react-icons'

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
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function ViewVotes() {

    const context = useAppContext();
    const { votes } = useAppContext();
    
    votes?.map((vote) => (
        console.log(vote)
    ));
    return (
        
        <div >
            <div className='flex justify-between items-center'>
                <PageTitle text={"Liste des votes"} />
                <div className='flex items-center'>
                    <Switch id="archive-mode" className='mr-2' />
                    <Label htmlFor="archive-mode" className='items-center'>Archive</Label>
                </div>
            </div>
            <Table>
                <TableCaption></TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[300px]">Titre</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Count</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {votes?.map((vote) => (
                        <TableRow key={vote.publicKey}>
                            <TableCell className="font-medium">{vote.account.title}</TableCell>
                            <TableCell>{vote.account.choices.length}</TableCell>
                            <TableCell className="text-right">VOTE / TOTAL</TableCell>
                            <TableCell className="text-right flex flex-row items-center justify-between">
                                <Link href="#"><BarChartIcon className='text-purple-400' /></Link>
                                <Link href="#"><ArrowTopRightIcon className='text-purple-400' /></Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={4}>
                            <ListPaginate />
                        </TableCell>
                        {/* <TableCell className="text-right">$2,500 / 1000</TableCell> */}
                    </TableRow>
                </TableFooter>
            </Table>

            <Link href="/">Retour à l'accueil</Link>
        </div>  

        // <div>
        //     {votes?.map((vote) => (
        //         <div key={vote.publicKey} className="mb-2 p-2 rounded shadow">
        //             <Vote key={vote.publicKey} {...vote} />
        //         </div>
        //     ))}
        // </div>
    );
};

// margin-bottom: 20px;
// padding: 15px;
// border-radius: 10px;
// box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);