import React from 'react'
import HeaderBox from '@/components/HeaderBox'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import RightSidebar from '@/components/RightSidebar'
import { getLoggedInUser } from '@/lib/actions'
import { redirect } from 'next/navigation'

const Home = async () => {

  const loggedInUser = await getLoggedInUser()
  if(!loggedInUser){
    redirect('/sign-in')
  }

  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          
          <HeaderBox 
            type="greeting"
            title="Welcome "
            userName={loggedInUser.name}
            desc="Access and manage your account as well as your transactions."
          />

          <TotalBalanceBox 
            accounts = {[]}
            totalBanks = {1}
            totalCurrentBalance = {1250}
          />

        </header>

        Recent transactions
      </div>

      <RightSidebar 
        user={loggedInUser}
        transactions={[]}
        banks={[{currentBalance: 1250}, {currentBalance: 500}]}
      />
    </section>
  )
}

export default Home