<template>
    <VRow>
        <VCol class="text-center h4 font-weight-bold">
            {{ $t('views.register.step-one.personal-data') }}
        </VCol>
    </VRow>
    <VRow>
        <InputComponent 
        id="first_name" 
        :name="$t('views.register.first_name')" 
        v-model="form.first_name"
            :rules="[validator.required]" />
        <InputComponent id="second_name" :name="$t('views.register.second_name')" v-model="form.second_name" :rules="[]" />
    </VRow>
    <VRow>
        <InputComponent id="lastname" :name="$t('views.register.lastname')" v-model="form.last_name"
            :rules="[validator.required]" />
        <InputComponent id="second_lastname" :name="$t('views.register.second_lastname')" v-model="form.second_last_name"
            :rules="[]" />
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