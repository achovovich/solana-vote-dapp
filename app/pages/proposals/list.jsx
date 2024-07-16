import React from 'react';
import Layout from '../layout';
import ViewVotes from '@/components/Votes/ViewVotes';

export default function ProposalsList() {

    return (
        <Layout>
            Proposal
            <ViewVotes />
        </Layout>
    );
};