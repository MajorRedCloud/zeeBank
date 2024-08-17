import HeaderBox from '@/components/HeaderBox'
import PaymentForm from '@/components/PaymentForm'
import { getLoggedInUser } from '@/lib/actions'
import { getAccounts } from '@/lib/bank.actions'

import React from 'react'

const PaymentTransfer = async () => {
  const loggedInUser = await getLoggedInUser()

  const accounts = await getAccounts({ userId: loggedInUser?.userId })

  return (
    <section className='no-scrollbar flex flex-col overflow-y-scroll bg-gray-25 p-8 md:max-h-screen xl:py-12'>
      <HeaderBox 
        title='Payment Transfer'
        desc='Send money to your friends and family'
      />

      <section className='size-full  pt-5'>
        <PaymentForm accounts = {accounts?.data} />
      </section>
    </section>
  )
}

export default PaymentTransfer