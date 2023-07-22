import { defineStore, storeToRefs } from "pinia";
import { CompanyAccountStore } from "./CompanyAccountStore";

export const OtherPaymentStore = defineStore('OtherPaymentStore', () => {
    const companyAccount = CompanyAccountStore()
    const { paymentMethods } = storeToRefs(companyAccount)
    const { getPaymentMethods } = companyAccount
    return{
        paymentMethods,
        getPaymentMethods
    }
})