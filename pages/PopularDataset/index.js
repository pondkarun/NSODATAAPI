import React, { useEffect, useState, } from 'react'
import Layouts from '../../components/Layouts';
import Page from '../../pages/index';
import Head from 'next/head';
import { useRouter } from 'next/router'


const Populardataset = () => {
    const router = useRouter();

    useEffect(() => {
        router.push({
            pathname: router.pathname,
            query: { sort:"views_recent+desc" },
          })

    }, []);

    return (
        <Page poppular={true} />
    )
}

export default Populardataset
