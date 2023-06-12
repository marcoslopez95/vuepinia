
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
import StepOne from './Register/StepOne.vue'
import StepTwo from './Register/StepTwo.vue'
import { UserStore } from "@/stores/UserStore";
import StepThree from "./Register/StepThree.vue";
import StepFour from "./Register/StepFour.vue";

const { t } = useI18n()
const helper = helperStore()
const router = useRouter()
const { errorsInput } = storeToRefs(helper)
const refForm = ref<any>(null)
const registerStore = RegisterStore()
const { form, steps } = storeToRefs(registerStore)
const userStore = UserStore()
userStore.getCountries()
userStore.getDepartaments()
userStore.getMunicipalities()

const SigUp = async () => {
    const { valid, errors } = await refForm.value?.validate()
    if (!valid) {
        errorsInput.value = errors
        steps.value = 1
        return
    }
    helper
        .http('register', 'post', { data: form.value })
        .then((res) => {
            toast.success(t('views.register.success'))
            router.push({ name: 'Login' })
        })
        .catch((err) => {
            steps.value = 1
        })
}

const finished = ref(false)
const getStep = computed(() => {
    switch (steps.value) {
        case 1:
            return StepOne;
        case 2:
            return StepTwo;
        case 3:
            return StepThree;
        case 4:
            return StepFour;
    }
})

const clickInNext = () => {
    if(steps.value < 4){
        steps.value++
        return
    }
    SigUp()
}
</script>

<template>
    <v-row class="d-flex justify-center align-center h-100">
        <v-col cols="12" sm="12" lg="11">
            <v-card class="py-5">
                <VRow>
                    <VCol class="text-center">
                        <v-toolbar color="transparent">
                            <v-toolbar-title class="font-weight-medium">
                                {{ $t('views.register.title') }}
                            </v-toolbar-title>
                        </v-toolbar>
                        <v-divider />
                        <div class="ma-7">
                            <VForm 
                                ref="refForm"
                                class="mx-3" 
                                style="min-height: 212px;">
                                <template #default>
                                    <Component :is="getStep" />
                                </template>
                            </VForm>
                            <VRow>
                                <VCol>
                                    <VBtn @click="steps ===1 ? null :steps--" :disabled="steps===1" color="error" class="w-25" rounded="pill">
                                        {{ $t('general-views.back') }}
                                    </VBtn>
                                </VCol>
                                <VCol>
                                    <VBtnPrimary 
                                        @click="clickInNext">
                                        {{ steps === 4 ? $t('views.register.button') : $t('general-views.next') }}
                                    </VBtnPrimary>
                                </VCol>
                            </VRow>
                        </div>
                        <VRow>
                            <VCol>
                                {{ $t('views.register.you-have-an-account') }} <RouterLink :to="{ name: 'Login' }">{{
                                    $t('views.register.login') }}</RouterLink>
                            </VCol>
                        </VRow>
                    </VCol>
                </VRow>
                <VSpacer></VSpacer>

            </v-card>
        </v-col>
    </v-row>
</template>
<style >
.custom-label {
    color: gray;
}

.v-field__field input {
    padding-top: 0px;
    text-align: center;
}

.v-field {
    --v-input-control-height: 48px !important;
    --v-field-input-padding-top: 0px !important;
    --v-field-input-padding-bottom: 0px !important;
    --v-field-input-min-height: 42px !important;
    --v-input-padding-top: 2px !important;
    --v-field-padding-top: 0px !important;
    --v-field-padding-bottom: 1px !important;
}
</style>