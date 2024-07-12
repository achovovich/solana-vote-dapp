import React from 'react';
import { useMemo } from "react";
import Link from 'next/link';
import Layout from '../layout';
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

import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl } from "@solana/web3.js";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { AppProvider } from "../../context/context";

import ViewVotes from '@/components/Votes/ViewVotes';

export default function AboutPage() {

    //TODO Load from program
    const invoices = [
        {
            invoice: "Proposal #1",
            paymentStatus: "Running",
            totalAmount: "250 / 1000",
            paymentMethod: "Credit Card",
        },
        {
            invoice: "Proposal #2",
            paymentStatus: "Closed",
            totalAmount: "150 / 1000",
            paymentMethod: "PayPal",
        },
        {
            invoice: "Proposal #3",
            paymentStatus: "Running",
            totalAmount: "350 / 1000",
            paymentMethod: "Bank Transfer",
        },
        {
            invoice: "Proposal #4",
            paymentStatus: "Running",
            totalAmount: "450 / 1000",
            paymentMethod: "Credit Card",
        },
        {
            invoice: "Proposal #5",
            paymentStatus: "Running",
            totalAmount: "550 / 1000",
            paymentMethod: "PayPal",
        },
        {
            invoice: "Proposal #6",
            paymentStatus: "Closed",
            totalAmount: "200 / 1000",
            paymentMethod: "Bank Transfer",
        },
        {
            invoice: "Proposal #7",
            paymentStatus: "Unpaid",
            totalAmount: "300 / 1000",
            paymentMethod: "Credit Card",
        },
    ]

    return (
        <Layout>

            <ViewVotes />



        </Layout>
    );
};

AboutPage;