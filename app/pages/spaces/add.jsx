import React from 'react';
import Link from 'next/link';
import Layout from '../layout';
import PageTitle from "@/components/PageTitle"
import SpaceAdd from "../../components/Cards/SpaceAdd"


export default function SpacesAdd() {


    return (
        <Layout>
            <PageTitle title="Creez votre espace de votes" />
            <SpaceAdd />
        </Layout>
    );
};