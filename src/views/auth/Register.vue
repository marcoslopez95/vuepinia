
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
            {{ $t('views.register.title') }}
        </v-toolbar-title>
    </v-toolbar>
    <div class="">
        <VForm ref="formRef" class="mx-3" style="min-height: 212px;">
            <template #default>
                <VRow>
                    <VCol cols="12">
                        <InputComponent :name="$t('views.users.username')" v-model="form.username"
                            :rules="[validator.required]" />
                    </VCol>
                    <VCol cols="12">
                        <InputComponent :name="$t('views.users.first_name')" v-model="form.first_name"
                            :rules="[validator.required]" />
                    </VCol>
                    <VCol cols="12">
                        <InputComponent :name="$t('views.users.last_name')" v-model="form.last_name"
                            :rules="[validator.required]" />
                    </VCol>
                    <VCol cols="12">
                        <InputComponent :name="$t('views.users.email')" v-model="form.email"
                            :rules="[validator.required]" />
                    </VCol>
                    <VCol cols="12">
                        <TelInput v-model="phoneFormat" @phone="(phone) => form.phone = phone"
                            @phoneCode="(code) => form.code_phone = code" :name="$t('views.profile.personal-data.phone')"
                            required @isValid="(bool) => isPhoneValid = bool" />
                    </VCol>
                    <VCol cols="12">
                        
                        <InputComponent 
                            :name="$t('views.users.password')" 
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
                    <VCol cols="12">
                        <InputComponent 
                            :name="$t('views.users.password-confirmation')" 
                            v-model="form.password_confirmation"
                            :rules="[
                                validator.required,
                                validator.password,
                                validator.confirmPassword(form.password_confirmation, form.password)
                            ]"
                            :type="!showPasswordConfirmation? 'password' : 'text'"
                            :appendIcon="!showPasswordConfirmation ? 'mdi-eye' : 'mdi-eye-off'"
                            @click:append-icon="showPasswordConfirmation = !showPasswordConfirmation"
                            />
                    </VCol>
                </VRow>
            </template>
        </VForm>
    </div>
    <VCheckbox v-model="accepTerms">
        <template #label>
            <div v-html="$t('views.register.accept-terms-and-conditions')">
            </div>
        </template>
    </VCheckbox>
    <div class="text-center mt-1">
        <VBtnPrimary @click="SigUp" :disabled="!accepTerms">
            {{ $t('views.register.button') }}
        </VBtnPrimary>
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