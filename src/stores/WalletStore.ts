import { defineStore, storeToRefs } from "pinia";
import { CompanyAccountStore } from "./CompanyAccountStore";

export const WalletStore = defineStore('wallet', () => {
    const companyAccountStore = CompanyAccountStore()
    const { currencies } = storeToRefs(companyAccountStore)
    const { getCurrencies } = companyAccountStore
    return {
        currencies,
        getCurrencies
    }
})