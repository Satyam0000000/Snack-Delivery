// appwrite.js
import { Client, Account, Databases } from "appwrite";

// Initialize Appwrite client and authentication
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Replace with your Appwrite endpoint
  .setProject("673cd6f4002b5b776b19"); // Replace with your Appwrite project ID

const account = new Account(client);
export const databases = new Databases(client);

export { client, account };