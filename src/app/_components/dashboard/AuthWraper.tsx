"use client"
import type { Session } from 'next-auth'
import DashboardWraper from './dashboardWraper'
import { useState } from 'react'
import Business from '~/app/@dashboard/@business/page'
import Client from '~/app/@dashboard/@client/page'
import Qoute from '~/app/@dashboard/@qoute/page'
import Invoice from '~/app/@dashboard/@invoice/page'


function AuthWraper({session}:{session:Session}) {
    const [active, setActive] = useState("dashboard")
    return(
    <DashboardWraper user={session.user} activeMenu={setActive}>
        {active==="Businesses"?<Business/>:active === "Clients" ? <Client/> : active === "Qoutes" ? <Qoute/> : active === "Invoices" ? <Invoice/> : <Dashboard/>}
    </DashboardWraper>
      ) 
  }




  export default AuthWraper



  function Dashboard() {
    return (
      <div>Dashboard</div>
    )
  }