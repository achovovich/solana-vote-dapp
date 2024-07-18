"use client";

import React from 'react';
import Layout from '../layout';
import SpacesList from '@/components/Spaces/List';
import SpaceAdd from '@/components/Cards/SpaceAdd';
import SpaceWorkSpace from '@/components/Spaces/SpaceWorkspace';

export default function SpacesListPage() {


    return (
        <Layout>
            <SpaceWorkSpace />
        </Layout>
    );
};