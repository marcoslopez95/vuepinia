import { defineStore, storeToRefs } from "pinia";
import { MunicipalityStore } from "./MunicipalityStore";
import type { Municipality } from "@/interfaces/Municipality/Municipality.model";
import { ref } from "vue";
import { helperStore } from "@/helper";
import type { User } from "@/interfaces/User/User.model";
import type { Role } from "@/interfaces/Role/Role.model";
import type { Country } from "@/interfaces/Country/Country.model";
import type { TypeDocument } from "@/interfaces/TypeDocument/TypeDocument.model";

export const UserStore = defineStore('user', () => {
    const helper = helperStore()

    const municipalityStore = MunicipalityStore()
    const { getDepartaments } = municipalityStore
    const { departaments } = storeToRefs(municipalityStore)

    const municipalities = ref<Municipality[]>([])
    const getMunicipalities = (): Promise<Boolean> => {
        return new Promise( async (resolve, reject) =>{
            try{
                const res = await helper.http('municipalitys','get')
                municipalities.value = res.data.response
                resolve(true)
            }catch(err){
                reject(false)
            }
        })
    }

    const users = ref<User[]>([])
    const getUsers =  (): Promise<Boolean> => {
        return new Promise( async (resolve, reject) =>{
            try{
                const res = await helper.http('users','get')
                users.value = res.data.response
                resolve(true)
            }catch(err){
                reject(false)
            }
        })
    }

    const roles = ref<Role[]>([])
    const getRoles = (): Promise<Boolean> => {
        return new Promise( async (resolve, reject) =>{
            try{
                const res = await helper.http('roles','get')
                roles.value = res.data.response
                resolve(true)
            }catch(err){
                reject(false)
            }
        })
    }

    const countries = ref<Country[]>([])
    const getCountries = (): Promise<Boolean> => {
        return new Promise( async (resolve, reject) =>{
            try{
                const res = await helper.http('countrys','get')
                countries.value = res.data.response
                resolve(true)
            }catch(err){
                reject(false)
            }
        })
    }

    const typeDocuments = ref<TypeDocument[]>([])
    const getTypeDocuments = (): Promise<Boolean> => {
        return new Promise( async (resolve, reject) =>{
            try{
                const res = await helper.http('type/documents','get')
                typeDocuments.value = res.data.response
                resolve(true)
            }catch(err){
                reject(false)
            }
        })
    }
    return {
        getDepartaments,
        departaments,
        municipalities,
        getMunicipalities,
        users,
        getUsers,
        roles,
        getRoles,
        countries,
        getCountries,
        typeDocuments,
        getTypeDocuments
    }
})