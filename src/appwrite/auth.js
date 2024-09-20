import conf from '../config/conf.js';
import {Client, Account, ID} from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    // create account method

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                return this.login({email, password});  

            } else {
                return userAccount;
            }
        } catch(error) {
            throw error
        }
    }

    // login Method

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);

        } catch (error) {
            throw error;
        }
    }

    // getCurrentUser method

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }

        return null;
    }

    // Logout method

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService;