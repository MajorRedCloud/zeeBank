import BankCard from '@/components/BankCard'
import HeaderBox from '@/components/HeaderBox'
import { getLoggedInUser } from '@/lib/actions'
import { getAccounts } from '@/lib/bank.actions'
import { redirect } from 'next/navigation'
import React from 'react'

const MyBanks = async () => {
  const loggedInUser = await getLoggedInUser()
  if(!loggedInUser){
    redirect('/sign-in')
  }

  const accounts = await getAccounts({ userId: loggedInUser?.userId })

  return (
    <section className='flex'>
      <div className='my-banks'>
        <HeaderBox 
          title='My Banks'
          desc='Manage your bank accounts'
        />

        <div className='space-y-4'>
          <h2 className='header-2'>
            Your Cards
          </h2> 
          <div className='flex flex-wrap gap-6'>
            {accounts && accounts.data.map((a: Account) => (
              <BankCard 
                account={a}
                key={a.appwriteItemId}
                userName={loggedInUser?.firstName}
                showBalance={true}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MyBanks