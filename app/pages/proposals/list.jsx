import React from 'react';
import Layout from '../layout';
import ViewVotes from '@/components/Votes/ViewVotes';
import ProposalWorkspace from '@/components/Proposals/ProposalWorkspace';

export default function ProposalsList() {

    return (
        <Layout>
            Proposal list
            <ProposalWorkspace />
        </Layout>
    );
};