import Link from "next/link";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BankTabItem } from "./BanksTabsItem";
import BankInfo from "./BankInfo";
import TransactionTable from "./TransactionTable";
import { getTransactions } from "@/app/(root)/page";
import { Pagination } from "./Pagination";

const RecentTransactions = ({
  accounts,
  appwriteItemId,
  page = 1,
}: RecentTransactionsProps) => {

  const rowsPerPage = 10

  const indexOfLastTransaction = page * rowsPerPage
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage

  return (
    <section className="flex w-full flex-col gap-6">
      <header className="flex items-center justify-between">
        <h2 className="text-20 md:text-24 font-semibold text-gray-900">Recent Transactions</h2>
        <Link
          href={`/transaction-history/?id=${appwriteItemId}`}
          className="view-all-btn"
        >
          View All
        </Link>
      </header>

      <Tabs defaultValue={appwriteItemId} className="w-full">
        <TabsList className="custom-scrollbar mb-8 flex w-full flex-nowrap">
          {accounts.map((account: Account) => {
            return (
            <TabsTrigger key={account.id} value={account.appwriteItemId}>
                <BankTabItem 
                    key={account.id}
                    account={account}
                    appwriteItemId={appwriteItemId}
                />
            </TabsTrigger>
            )})}
        </TabsList>

        {accounts.map(async (account:Account) => {
          const transactions = await getTransactions(account.appwriteItemId)
          
          const totalPages = Math.ceil(transactions.length / rowsPerPage)

          const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction)

          return (
            <TabsContent
                key={account.id}
                value={account.appwriteItemId}
                className="space-y-4"
            >
                <BankInfo 
                    account={account}
                    appwriteItemId={appwriteItemId}
                    type="full" />

                <TransactionTable transactions={currentTransactions}/>

                {totalPages > 1 && (
                <div className="my-4 w-full">
                  <Pagination totalPages={totalPages} page={page}/>
                </div>
                )}
            </TabsContent>
        )})}
          
      </Tabs>
    </section>
  );
};

export default RecentTransactions;
