"use server"

import { ID, Query } from "node-appwrite";
import { createAdminClient } from "./appwrite";
import { parseStringify } from "./utils";


export const createTransaction = async(transaction:CreateTransactionProps) => {
    try {
        const {database} = await createAdminClient()

        const response = await database.createDocument(
            process.env.DATABASE_ID!,
            process.env.COLLECTIONS_TRANSACTIONS_ID!,
            ID.unique(),
            {
                channel: 'online',
                category: 'transfer',
                ...transaction
            }
        )

        return parseStringify(response)
    } catch (error) {
        console.error("Submitting create transfer request failed: ", error);
    }
}


export const getTransactionsByBankId = async ({bankId}: getTransactionsByBankIdProps) => {
    try {
      const { database } = await createAdminClient();
  
      const senderTransactions = await database.listDocuments(
        process.env.DATABASE_ID!,
        process.env.COLLECTIONS_TRANSACTIONS_ID!,
        [Query.equal('senderBankId', bankId)],
      )
  
      const receiverTransactions = await database.listDocuments(
        process.env.DATABASE_ID!,
        process.env.COLLECTIONS_TRANSACTIONS_ID!,
        [Query.equal('receiverBankId', bankId)],
      );
  
      const transactions = {
        total: senderTransactions.total + receiverTransactions.total,
        documents: [
          ...senderTransactions.documents, 
          ...receiverTransactions.documents,
        ]
      }
  
      return parseStringify(transactions);
    } catch (error) {
      console.log(error);
    }
  }