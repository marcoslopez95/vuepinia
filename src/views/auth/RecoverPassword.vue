
<script setup lang="ts">
import { ref } from "vue";
import InputComponent from "@/components/InputComponent.vue";
import { helperStore } from "@/helper";
import * as validator from '@/validator'
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import { useI18n } from "vue-i18n";
import { computed } from "vue";
import { reactive } from "vue";

const { t } = useI18n()
const form = reactive({
    email: '',
    password: '',
    code: ''
})
const dialog = ref(false)
const helper = helperStore()
const router = useRouter()
const { formRef } = storeToRefs(helper)
const showPassword = ref(false)

const emailValid = computed(() => validator.email(form.email) === true)


const sendCodeVerification = async () => {
    const url = 'send/reset/password/code'
    try{
        const res = await helper.http(url,'post',{data:{email:form.email}})
        dialog.value = true
    }catch(e) {
        
    }
}
const changePassword = async () => {
    const { valid } = await formRef.value?.validate()
    if (!valid) {
        return
    }
    helper
        .http('reset/password', 'post', { data: form })
        .then((res) => {
            toast.success('Cambio Realizado')
            router.push({ name: 'Login' })
        })
}
</script>

<template>
    <v-toolbar color="transparent" class="text-center">
        <v-toolbar-title class="font-weight-medium text-primary">
            Recuperar Contraseña
        </v-toolbar-title>
    </v-toolbar>
    <div v-show="!dialog" class="">
        <VForm ref="formRef" class="mx-3"
        @submit.prevent="()=>{}"
        >
            <template #default>
                <VRow>
                    <VCol cols="12">
                        <InputComponent 
                            :placeholder="$t('views.users.email')" 
                            withoutLabel :name="$t('views.users.email')" v-model="form.email"
                            :rules="[validator.required]" />
                    </VCol>
                </VRow>
            </template>
        </VForm>
        <div class="text-center mt-5">
            <VBtnPrimary @click="sendCodeVerification" :disabled="!emailValid">
                Continuar
            </VBtnPrimary>
        </div>
    </div>
    <div v-show="dialog" class="text-table">
        <VRow dense>
            <VCol cols="12" class="text-center">
                Introduzca el código enviado a su correo electrónico.
            </VCol>
            <VCol cols="12" sm="4" class="mx-auto">
                <InputComponent v-model="form.code" name="" withoutLabel>
                </InputComponent>
            </VCol>
        </VRow>
        <VRow dense>
            <VCol cols="12" class="text-center">
                Introduzca la nueva contraseña.
            </VCol>
            <VCol cols="12" sm="4" class="mx-auto">
                <InputComponent 
                    :name="$t('views.users.password')"
                    withoutLabel
                    :placeholder="$t('views.users.password')"
                    v-model="form.password"
                    :rules="[validator.required,validator.password]"
                    :type="!showPassword? 'password' : 'text'"
                    :appendIcon="!showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append-icon="showPassword = !showPassword"
                    />
                    <br>
                <span class="text-table">
                    La contraseña debe cumplir con:<br>
                    <ul class="ml-8">
                        <li>1 mayúscula</li>
                        <li>1 caractér especial (./_*?¿)</li>
                        <li>1 número</li>
                        <li>mínimo 8 dígitos</li>
                    </ul>
                </span>
            </VCol>
        </VRow>
        <div class="text-center mt-5">
            <VBtnPrimary @click="changePassword" :disabled="!(form.code && form.password)">
                Continuar
            </VBtnPrimary>
        </div>
    </div>
    <VRow>
        <VCol class="text-center text-table mt-3">
            {{ $t('views.register.you-have-an-account') }}
            <RouterLink :to="{ name: 'Login' }" class="text-primary font-weight-bold" style="text-decoration: none;">
                {{ $t('views.register.login') }}
            </RouterLink>
        </VCol>
    </VRow>
</template>
<style >

</style>