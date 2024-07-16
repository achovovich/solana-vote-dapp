import React from 'react';
import Layout from '../layout';
import { useRouter } from 'next/router';
import PageTitle from "@/components/PageTitle"
import Space from "@/components/Spaces/Space"
import Link from 'next/link';

export default function SpacePage({ params }) {

    const router = useRouter();
    const { slug } = router.query;

    return (
        <Layout>
            <div>
                <PageTitle text={"Space " + slug} />
                <Space spaceKey={slug} />
                <Link className="my-3" href="/spaces/list"> Retour aux Spaces</Link>
            </div>

        </Layout>
    );
};