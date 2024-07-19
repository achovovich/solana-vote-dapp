import React from 'react';
import Layout from '../layout';
import { useRouter } from 'next/router';
import PageTitle from "@/components/PageTitle"
import Proposal from "@/components/Proposals/Proposal"

export default function ProposalPage({ params }) {

    const router = useRouter();
    const { slug } = router.query;

    return (
        <Layout>
            <div>
                <Proposal proposalKey={slug} />
            </div>

        </Layout>
    );
};