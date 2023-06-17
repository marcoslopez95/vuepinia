<template>
    <VRow>
        <VCol class="text-center h4 font-weight-bold">
            {{ $t('views.register.step-one.account-data') }}
        </VCol>
    </VRow>
    <VRow>
        <InputComponent id="referref_by" :name="$t('views.register.referred_by')" v-model="form.referred_by" />
        <InputComponent id="username" :name="$t('views.register.username')" v-model="form.username"
            :rules="[validator.required]" />
    </VRow>
    <VRow>
        <InputComponent 
            :type="showPassword ? 'password' : 'text'" 
            id="password" 
            :name="$t('views.register.password')" 
            v-model="form.password" 
            :rules="[validator.required]" 
            @click:append-inner="showPassword=!showPassword"
            :append-icon="showPassword ? 'mdi-eye-off' :'mdi-eye' "
            />
        <InputComponent 
            :type="showPasswordConfirmated ? 'password' : 'text'" 
            id="password_confirmation" 
            :name="$t('views.register.password_confirmation')" 
            v-model="form.password_confirmation"
            @click:append-inner="showPasswordConfirmated=!showPasswordConfirmated"
            :rules="[validator.required]" 
            :append-icon="showPasswordConfirmated ? 'mdi-eye-off' :'mdi-eye' "

            />
    </VRow>
    <VRow>
    </VRow>
</template>

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
import { computed } from "vue";

const { t } = useI18n()
const helper = helperStore()
const router = useRouter()
const { errorsInput } = storeToRefs(helper)
const refForm = ref<any>(null)
const registerStore = RegisterStore()
const { form, steps } = storeToRefs(registerStore)
const showPassword = ref(false)
const showPasswordConfirmated = ref(false)

</script>

<style scoped></style>