import React from 'react';
import Layout from '../layout';
import { useRouter } from 'next/router';
import PageTitle from "@/components/PageTitle"
import Space from "@/components/Spaces/Space"

export default function ProposalPage({ params }) {

    const router = useRouter();
    const { slug } = router.query;

    return (
        <Layout>
            <div>
                <PageTitle text={"Proposal:" + slug} />
                <Space proposalKey={slug} />
            </div>

        </Layout>
    );
};