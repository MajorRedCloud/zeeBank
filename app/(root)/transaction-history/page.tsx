import HeaderBox from '@/components/HeaderBox'
import { Pagination } from '@/components/Pagination'
import TransactionTable from '@/components/TransactionTable'
import { getLoggedInUser } from '@/lib/actions'
import { getAccount, getAccounts } from '@/lib/bank.actions'
import { formatAmount } from '@/lib/utils'
import React from 'react'

const TransactionHistory = async ({searchParams: {id, page}}: SearchParamProps) => {
  const currentPage = Number(page as string) || 1
  const loggedInUser = await getLoggedInUser()
  const accounts = await getAccounts({ userId: loggedInUser?.userId })
 
  const appwriteItemId = (id as string) || accounts?.data[0]?.appwriteItemId;

  const account = await getAccount({appwriteItemId})
  
  const rowsPerPage = 10
  const indexOfLastTransaction = currentPage * rowsPerPage
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage
  const totalPages = Math.ceil(account?.transactions.length / rowsPerPage)

  const currentTransactions = account?.transactions.slice(indexOfFirstTransaction, indexOfLastTransaction)


  return (
    <section className='transactions'>
      <div className='transactions-header'>
        <HeaderBox 
          title='Transaction History'
          desc='Check your transaction history'
        />
      </div>

      <div className='space-y-6'>
        <div className='transactions-account'>
          <div className='flex flex-col gap-2'>
            <h2 className='text-18 font-bold text-white'>
              {account?.data.name}
            </h2>
            <p className='text-14 text-blue-25'>
              {account?.data.officialName}
            </p>
            <p className='text-14 font-semibold tracking-[1.1px] text-white'>
            ●●●● ●●●● ●●●● {account?.data.mask}
            </p>
          </div>
          <div className='transactions-account-balance'>
            <p className='text-14'>
              Current Balance
            </p>
            <p className='text-24 text-center font-bold'>
              {formatAmount(account?.data.currentBalance)}
            </p>
          </div>
        </div>

        <section className='flex w-full flex-col gap-6'>
          <TransactionTable 
            transactions={currentTransactions}
          />

                {totalPages > 1 && (
                <div className="my-4 w-full">
                  <Pagination totalPages={totalPages} page={currentPage}/>
                </div>
                )}
          
        </section>
      </div>
    </section>
  )
}

export default TransactionHistory