import { defineStore, storeToRefs } from "pinia";
import { MunicipalityStore } from "./MunicipalityStore";
import type { Municipality } from "@/interfaces/Municipality/Municipality.model";
import { computed, ref } from "vue";
import { getUserAuth, helperStore, isAutenticated } from "@/helper";
import type { User } from "@/interfaces/User/User.model";
import type { Role } from "@/interfaces/Role/Role.model";
import type { Country } from "@/interfaces/Country/Country.model";
import type { TypeDocument } from "@/interfaces/TypeDocument/TypeDocument.model";
import type { Permission, PermissionAttributes } from "@/interfaces/Permission/Permission.model";
import type { PERMISSION_ENUM } from "@/enums/Permissions.enum";
import type { UserAuth } from "@/interfaces/User/User.auth";

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

    const userAuth = ref<User>()
    const updateUserAuth = (): Promise<void> =>{
        return new Promise<void>(async (resolve,reject) =>{
            const url = 'users/activite/user'
            let res = await helper.http(url,'get',{},'',true)
            userAuth.value = res.data.response as User
            resolve()
        })
    }

    // const permiss = computed((): PermissionAttributes[] => {
    //     const user = JSON.parse(localStorage.getItem('user')!) as UserAuth
    //     if(!isAutenticated()) return []
    //     return (user.roles[0].permissions as unknown) as PermissionAttributes[]
    // })
    const permiss = ref<PermissionAttributes[]>([]);

    const can = ( permission: PERMISSION_ENUM | string, reference: PERMISSION_ENUM ):boolean => {
        return !!permiss.value.find(p => { 
            console.log('p.name',p.name)
            console.log("reference + '.' + permission",reference + '.' + permission)
            console.log("p.name == reference + '.' + permissionn",p.name == reference + '.' + permission)
            return p.name == reference + '.' + permission
        })
    }
    const uploadPermiss = ():void => {
        const user = getUserAuth()
        if(permiss.value.length > 0 ) return
        //@ts-ignore
        permiss.value = user.roles[0].permissions as PermissionAttributes[]
      }
    return {
        can,
        uploadPermiss,
        permiss,
        userAuth,
        updateUserAuth,
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