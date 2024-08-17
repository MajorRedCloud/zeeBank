import React from 'react'
import HeaderBox from '@/components/HeaderBox'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import RightSidebar from '@/components/RightSidebar'
import { getBanks, getLoggedInUser } from '@/lib/actions'
import { redirect } from 'next/navigation'
import { getAccount, getAccounts } from '@/lib/bank.actions'
import RecentTransactions from '@/components/RecentTransactions'

export const getTransactions = async (appwriteItemId: string) => {
  const account = await getAccount({appwriteItemId})
  return account?.transactions
}

const Home = async ({searchParams: {id, page}}: SearchParamProps) => {

  const currentPage = Number(page as string) || 1

  const loggedInUser = await getLoggedInUser()
  if(!loggedInUser){
    redirect('/sign-in')
  }

  const accounts = await getAccounts({ userId: loggedInUser?.userId })
 
  const appwriteItemId = (id as string) || accounts?.data[0]?.appwriteItemId;

  const transactions = await getTransactions(appwriteItemId)

  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          
          <HeaderBox 
            type="greeting"
            title="Welcome "
            userName={loggedInUser?.firstName}
            desc="Access and manage your account as well as your transactions."
          />

          <TotalBalanceBox 
            accounts = {accounts?.data}
            totalBanks = {accounts?.totalBanks}
            totalCurrentBalance = {accounts?.totalCurrentBalance}
          />

        </header>

        <RecentTransactions 
          accounts={accounts?.data}
          transactions={transactions}
          appwriteItemId={appwriteItemId}
          page={currentPage}
        />
      </div>

      <RightSidebar 
        user={loggedInUser}
        transactions={accounts?.transactions}
        banks={accounts?.data?.slice(0,2)}
      />
    </section>
  )
}

export default Home