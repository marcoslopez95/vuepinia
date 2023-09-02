import { helperStore } from "@/helper";
import type { Method } from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const TwoFactorAuthStore = defineStore('TwoFactorAuth', ()=>{
    const helper = helperStore()
    const modal = ref(false)
    const code = ref('')
    const url = ref('')
    const form = ref<Object>()
    const method = ref<Method>('get')
    const callback = ref<Function>(()=>{});
    const ejectFunction = ():Promise<boolean> => {
        return new Promise<boolean>(async (resolve, reject) => {
            try{
                const data = {
                    ...form.value,
                    google2fa_secret: code.value
                }
                await helper.http(url.value,method.value, {data})
                modal.value = false
                callback.value()
                resolve(true)
            }catch(err){
                reject(false)
            }
        })
    }
    return {
        modal,
        ejectFunction,
        code,
        url,
        form,
        callback,
        method
    }
})