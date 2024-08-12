import React from 'react'
import HeaderBox from '@/components/HeaderBox'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import RightSidebar from '@/components/RightSidebar'

const Home = () => {
  const loggedIn = {firstName: 'John', lastName: 'Doe', email: 'something123@gmail.com'}
  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          
          <HeaderBox 
            type="greeting"
            title="Welcome "
            user={'user'}
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
        user={loggedIn}
        transactions={[]}
        banks={[{currentBalance: 1250}, {currentBalance: 500}]}
      />
    </section>
  )
}

export default Home