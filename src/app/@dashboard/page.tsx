import React, { useState } from 'react'
import { getServerAuthSession } from "~/server/auth";
import AuthWraper from '../_components/dashboard/AuthWraper';



async function DashboardAuth(){
  const session = await getServerAuthSession()
  if(!session){
    return(
      <h1>not session</h1>
    )
  }
  return(
  <div><AuthWraper session={session}/></div>
  )

}



export default DashboardAuth
