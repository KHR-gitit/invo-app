import React from 'react'
import Layout from './layout'
import Business from './@business/page'
import Client from './@client/page'
import Invoice from './@invoice/page'
import Qoute from './@qoute/page'
import { useParams } from 'next/navigation'
import { set } from 'zod';


function Dashboard({
  params,
  searchParams,
}: {
  params: { slug: string };
  // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const active = searchParams?.active
  console.log(active)

  

  if (active === "Businesses") {
      return <Business/>
  }else if (active === "Clients") {
      return <Client/>
  }else if (active === "Invoices") {
      return <Invoice/>
  }else if (active === "Qoutes") {
      return <Qoute/>
  }else{
    return <h1>
      this is the dashbord
    </h1>
  }
}

export default Dashboard
