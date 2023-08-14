
<script setup lang="ts">
import { ref } from "vue";
import InputComponent from "@/components/InputComponent.vue";
import { getUserAuth, helperStore } from "@/helper";
import * as validator from '@/validator'
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { ROLES } from "@/interfaces/Role/Role.enum";
const helper = helperStore()
const router = useRouter()
const { formRef,errorsInput } = storeToRefs(helper)
const form = ref({
    email: "",
    password: "",
})

const showPassword = ref(false)
const SigIn = async () => {
    const { valid } = await formRef.value?.validate()
    if (!valid) {
        return
    }
    helper
        .http('login', 'post', { data: form.value })
        .then((res) => {
            const { user, token } = res.data
            setLocalStorage(token)
            setUser(user)

            let name = 'Dashboard'
            if(getUserAuth().roles[0].name === ROLES.USER){
                name = 'user-buy'
            }
            router.push({ name })
        })
}

const setLocalStorage = (token: string) => {
    const getToken = token.split('|')[1]
    localStorage.setItem('token', getToken)
}
const setUser = (user: Object) => {
    localStorage.setItem('user', JSON.stringify(user))
}
</script>

<template>
    <v-toolbar color="transparent" class="text-center">
        <v-toolbar-title class="font-weight-medium text-primary">
            {{ $t('views.login.title') }}
        </v-toolbar-title>
    </v-toolbar>
    <div class="">
        <VForm ref="formRef" @keypress.enter="SigIn">
            <template #default>
                <VRow>
                    <VCol cols="12">
                        <InputComponent id="email" without-label placeholder="Email" name="Email" v-model="form.email" :rules="[validator.required]" />
                    </VCol>
                    <VCol cols="12">
                        <InputComponent 
                            without-label
                            :placeholder="$t('views.users.password')"
                            :name="$t('views.users.password')" 
                            v-model="form.password"
                            :rules="[
                                validator.required,
                            ]"
                            :type="!showPassword? 'password' : 'text'"
                            :appendIcon="!showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            @click:append-icon="showPassword = !showPassword"
                            />
                    </VCol>
                </VRow>
            </template>
        </VForm>
    </div>
    <div class="text-center mt-6">
        <VBtnPrimary @click="SigIn" >
            {{ $t('views.login.button') }}
        </VBtnPrimary>
    </div>
    <VRow>
        <VCol class="text-table text-center mt-3">
            {{ $t('views.login.you-donnot-have-an-account') }} 
            <RouterLink  :to="{ name: 'Register' }" class="text-primary font-weight-bold" style="text-decoration: none;">
                {{ $t('views.login.register') }}
            </RouterLink>
        </VCol>
    </VRow>
    <VRow>
        <VCol class="text-table text-center">
            ¿Olvidaste tu contraseña?<br>
            <RouterLink  :to="{ name: 'recover-password' }" class="text-primary font-weight-bold" style="text-decoration: none;">
                Recuperar Contraseña
            </RouterLink>
        </VCol>
    </VRow>
</template>
<style>
</style>