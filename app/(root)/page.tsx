import React from 'react'
import HeaderBox from '@/components/HeaderBox'
import TotalBalanceBox from '@/components/TotalBalanceBox'

const Home = () => {
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
      </div>
    </section>
  )
}

export default Home