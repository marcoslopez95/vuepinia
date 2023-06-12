<template>
    <VRow>
        <VCol class="text-center h4 font-weight-bold">
            {{ $t('views.register.step-one.general-data') }}
        </VCol>
    </VRow>
    <VRow>
        <InputComponent id="email" :label="$t('views.register.email')" v-model="form.email" :rules="[validator.required]" />
        <InputComponent id="code_phone" :label="$t('views.register.code_phone')" v-model="form.code_phone"
            :rules="[validator.required]" />
        <InputComponent id="phone" :label="$t('views.register.phone')" v-model="form.phone" :rules="[]" />
    </VRow>
    <VRow>
        <InputComponent
            id="birth" 
            :label="$t('views.register.birth')" 
            type="date"
            v-model="form.birth" 
            :rules="[validator.required]" />
        <VCol cols="8"></VCol>
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
</script>

<style scoped></style>