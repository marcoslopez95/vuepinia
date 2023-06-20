import { helperStore } from "@/helper";
import type { Bank } from "@/interfaces/Bank/Bank.model";
import type { Currency } from "@/interfaces/Currency/Currency.model";
import type { PaymentMethod } from "@/interfaces/PaymentMethod/PaymentMethod.model";
import type { TypeBankAccount } from "@/interfaces/TypeBankAccount/TypeBankAccount.model";
import { defineStore } from "pinia";
import { ref } from "vue";

export const CompanyAccountStore = defineStore('CompanyAccounts', () => {
    const helper = helperStore()

    const banks = ref<Bank[]>([])
    const getBanks = async () => {
        const res = await helper.http('banks','get')
        banks.value = res.data.response as Bank[];
    }

    const currencies = ref<Currency[]>([])
    const getCurrencies = async () => {
        const res = await helper.http('currency','get')
        currencies.value = res.data.response as Currency[];
    }

    const paymentMethods = ref<PaymentMethod[]>([])
    const getPaymentMethods = async () => {
        const res = await helper.http('type/company/accounts','get')
        paymentMethods.value = res.data.response as PaymentMethod[]
    }

    const typeBankAccounts = ref<TypeBankAccount[]>([])
    const getTypeBankAccounts = async () => {
        const res = await helper.http('type/company/bank/accounts','get')
        typeBankAccounts.value = res.data.response as TypeBankAccount[]
    }
    return {
        banks,
        getBanks,
        currencies,
        getCurrencies,
        paymentMethods,
        getPaymentMethods,
        typeBankAccounts,
        getTypeBankAccounts,
    }
})