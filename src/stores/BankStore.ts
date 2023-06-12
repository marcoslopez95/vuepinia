import { defineStore, storeToRefs } from "pinia";
import { UserStore } from "./UserStore";

export const BankStore = defineStore('bank',() => {
    const userStore = UserStore()
    const { countries } = storeToRefs(userStore)
    const { getCountries } = userStore
    return {
        countries,
        getCountries
    }
})