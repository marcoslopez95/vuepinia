import { helperStore } from "@/helper";
import type { Permission } from "@/interfaces/Permission/Permission.model";
import { defineStore } from "pinia";
import { ref } from "vue";

export const RoleStore = defineStore('role', () =>{
    const helper = helperStore()
    const permissions = ref<Permission[]>([])
    const getPermissions = (): Promise<Boolean> => {
        return new Promise( async (resolve, reject) =>{
            try{
                const res = await helper.http('permissions','get')
                permissions.value = res.data.response
                resolve(true)
            }catch(err){
                reject(false)
            }
        })
    }
    return{
        permissions,
        getPermissions
    }
})