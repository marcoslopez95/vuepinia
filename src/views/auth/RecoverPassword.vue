
<script setup lang="ts">
import { ref } from "vue";
import InputComponent from "@/components/InputComponent.vue";
import { helperStore } from "@/helper";
import * as validator from '@/validator'
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import { useI18n } from "vue-i18n";
import { RegisterStore } from '@/stores/RegisterStore'
import TelInput from '@/components/TelInput.vue';
import { computed } from "vue";

const { t } = useI18n()
const helper = helperStore()
const router = useRouter()
const { formRef } = storeToRefs(helper)
const registerStore = RegisterStore()
const { form } = storeToRefs(registerStore)
const isPhoneValid = ref(false)
const phoneFormat = ref('')
const accepTerms = ref(false)

const showPassword = ref(false)
const showPasswordConfirmation = ref(false)

const SigUp = async () => {
    const { valid } = await formRef.value?.validate()
    if (!valid) {
        return
    }
    helper
        .http('register', 'post', { data: form.value })
        .then((res) => {
            toast.success(t('views.register.success'))
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
    <div class="">
        <VForm ref="formRef" class="mx-3">
            <template #default>
                <VRow>
                    <VCol cols="12">
                        <InputComponent 
                            :placeholder="$t('views.users.email')" 
                            withoutLabel :name="$t('views.users.email')" v-model="form.username"
                            :rules="[validator.required]" />
                    </VCol>
                </VRow>
            </template>
        </VForm>
        <div class="text-center mt-5">
            <VBtnPrimary @click="SigUp" :disabled="!accepTerms">
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