"use server"

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "./appwrite";
import { cookies } from "next/headers";
import { encryptId, extractCustomerIdFromUrl, parseStringify } from "./utils";
import { CountryCode, ProcessorTokenCreateRequest, ProcessorTokenCreateRequestProcessorEnum, Products } from "plaid";
import { plaidClient } from "./plaid";
import { addFundingSource, createDwollaCustomer } from "./dwolla.actions";
import { revalidatePath } from "next/cache";


export async function getLoggedInUser() {
    try {
      const { account } = await createSessionClient();
      const user = await account.get();

      return parseStringify(user);
    } catch (error) {
      return null;
    }
  }

export async function signUp({password ,...userData}: SignUpParams) {

  let newUserAccount

    try {
        const { account, database } = await createAdminClient();
    
        newUserAccount = await account.create(ID.unique(), userData.email, password, `${userData.firstName} ${userData.lastName}`);

        if(!newUserAccount) throw new Error("Account not created");

        const dwollaCustomerUrl = await createDwollaCustomer({
          ...userData,
          ssn: '467693654',
          type: "personal",
        })

        // if(!dwollaCustomerUrl) throw new Error("Dwolla Customer not created");

        const dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl!);
    
        const session = await account.createEmailPasswordSession(userData.email, password);
    
        cookies().set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        const newUser = await database.createDocument(
          process.env.DATABASE_ID!,
          process.env.COLLECTIONS_USERS_ID!,
          ID.unique(),
          {
            ...userData,
            userId : newUserAccount.$id,
            dwollaCustomerId,
            dwollaCustomerUrl,
          }
        )

        return parseStringify(newUser);
    } catch (error) {
        console.error(error);
    }
}

export async function signIn({email, password}: {email:string, password:string}){
  try {
    const { account } = await createAdminClient();

    const session = await account.createEmailPasswordSession(email, password);
    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
  });

  return parseStringify(session);

  } catch (error) {
    console.error(error);
  }
}
  

export const logoutAccount = async () => {
  try {
    const { account } = await createSessionClient()
    cookies().delete('appwrite-session')
    const response = await account.deleteSession('current')
    return parseStringify(response)
  } catch (error) {
    console.error(error);
  }
}

export const createLinkToken = async (user: User) => {
  try {
    const tokenParams = {
      user: {
        client_user_id: user.$id,
      },
      client_name: `${user.firstName} ${user.lastName}`,
      products: ['auth'] as Products[],
      language: 'en',
      country_codes: ['US'] as CountryCode[],
    }

    const response = await plaidClient.linkTokenCreate(tokenParams)

    return parseStringify({linkToken : response.data.link_token})
  } catch (error) {
    console.error(error);
  }
}

export const createBankAccount = async (
 { userId,
  bankId,
  accountId,
  accessToken,
  fundingSourceUrl,
  sharableId,} : createBankAccountProps
) => {
  try {
    const {database} = await createAdminClient()

    const response = await database.createDocument(
      process.env.DATABASE_ID!,
      process.env.COLLECTIONS_BANKS_ID!,
      ID.unique(),
      {
        userId,
        bankId,
        accountId,
        accessToken,
        fundingSourceUrl,
        sharableId,
      }
    )

    return parseStringify(response)
  } catch (error) {
    console.error(error);
  }
}

// This function exchanges a public token for an access token and item ID
export const exchangePublicToken = async ({
  publicToken,
  user,
}: exchangePublicTokenProps) => {
  try {
    // Exchange public token for access token and item ID
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });

    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;

    // Get account information from Plaid using the access token
    const accountsResponse = await plaidClient.accountsGet({
      access_token: accessToken,
    });

    const accountData = accountsResponse.data.accounts[0];

    // Create a processor token for Dwolla using the access token and account ID
    const request: ProcessorTokenCreateRequest = {
      access_token: accessToken,
      account_id: accountData.account_id,
      processor: "dwolla" as ProcessorTokenCreateRequestProcessorEnum,
    };

    const processorTokenResponse =
      await plaidClient.processorTokenCreate(request);
    const processorToken = processorTokenResponse.data.processor_token;

    // Create a funding source URL for the account using the Dwolla customer ID, processor token, and bank name
    const fundingSourceUrl = await addFundingSource({
      dwollaCustomerId: user.dwollaCustomerId,
      processorToken,
      bankName: accountData.name,
    });

    // If the funding source URL is not created, throw an error
    if (!fundingSourceUrl) throw Error;

    // Create a bank account using the user ID, item ID, account ID, access token, funding source URL, and sharable ID
    await createBankAccount({
      userId: user.$id,
      bankId: itemId,
      accountId: accountData.account_id,
      accessToken,
      fundingSourceUrl,
      sharableId: encryptId(accountData.account_id),
    });

    // Revalidate the path to reflect the changes
    revalidatePath("/");

    // Return a success message
    return parseStringify({
      publicTokenExchange: "complete",
    });
  } catch (error) {
    // Log any errors that occur during the process
    console.error("An error occurred while creating exchanging token:", error);
  }
};