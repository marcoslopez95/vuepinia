
<script setup lang="ts">
import { ref } from "vue";
import InputComponent from "@/components/InputComponent.vue";
import { helperStore } from "@/helper";
import * as validator from '@/validator'
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
const helper = helperStore()
const router = useRouter()
const { formRef,errorsInput } = storeToRefs(helper)
const form = ref({
    email: "",
    password: "",
})

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
            router.push({ name: 'Dashboard' })
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
                        <InputComponent id="email" name="Email" v-model="form.email" :rules="[validator.required]" />
                    </VCol>
                    <VCol cols="12">
                        <InputComponent id="password" name="Contraseña" type="password" v-model="form.password"
                            :rules="[validator.required]" />
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
</template>
<style>
</style>