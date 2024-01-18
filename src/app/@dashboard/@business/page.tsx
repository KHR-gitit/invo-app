"use client"
import React, { useState } from 'react'
import BusinessComp  from '~/app/_components/dashboard/business'
import ListComp from '~/app/_components/dashboard/listComp'
import TabComp from '~/app/_components/dashboard/tabcomp'
import { api } from '~/trpc/react'
function Business() {
  const {data} = api.bussiness.getBussinessData.useQuery()

  console.log(data?.data)
 
const [tab, setTab] = useState([
  { name: 'Overview', current: false },
  { name: 'Create',  current: true },
])
  return (
    <>
    <TabComp tabs={tab} setTab={setTab}/>
  {
    tab[0]?.current?
    !data? 'loading...':
    <ListComp list={data?.data}/>:<BusinessComp/>
  }

    
    </>
  )
}

export default Business