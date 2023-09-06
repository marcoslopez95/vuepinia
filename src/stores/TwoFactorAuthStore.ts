import { getUserAuth, helperStore } from "@/helper";
import { ROLES } from "@/interfaces/Role/Role.enum";
import type { Method } from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

export const TwoFactorAuthStore = defineStore('TwoFactorAuth', () => {
    const helper = helperStore()
    const router = useRouter();
    const modal = ref(false)
    const code = ref('')
    const url = ref('')
    const form = ref<Object>()
    const method = ref<Method>('get')
    const callback = ref<Function>(() => { });
    const ejectFunction = (): Promise<boolean> => {
        return new Promise<boolean>(async (resolve, reject) => {
            try {
                const data = {
                    ...form.value,
                    google2fa_secret: code.value
                }
                const res = await helper.http(url.value, method.value, { data })
                console.log(res.data)
                setAllLogin(res.data)
                modal.value = false
                resolve(true)
            } catch (err) {
                console.log(err)
                reject(err)
            }
        })
    }

    const setAllLogin = (data: { user: any; token: any }) => {
        console.log("asd");

        const { user, token } = data;
        setLocalStorage(token);
        setUser(user);

        let name = "Dashboard";
        if (getUserAuth().roles[0].name === ROLES.USER) {
            name = "user-buy";
        }
        router.push({ name });

    };

    const setLocalStorage = (token: string) => {
        const getToken = token.split("|")[1];
        localStorage.setItem("token", getToken);
    };
    const setUser = (user: Object) => {
        localStorage.setItem("user", JSON.stringify(user));
    };
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