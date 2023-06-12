<template>
    <VRow>
        <VCol class="text-center h4 font-weight-bold">
            {{ $t('views.register.step-one.ubication-data') }}
        </VCol>
    </VRow>
    <VRow>
        <VCol>
            <SelectComponentVue
                :label="$t('views.countries.title')"
                :items="userStore.countries"
                itemTitle="attributes.name"
                itemValue="id"
                :firstElement="{id:'',attributes:{ name:'Seleccione un país'}}"
                v-model="form.country_id"
                id="country"
            ></SelectComponentVue>
        </VCol>
        <VCol>
            <SelectComponentVue
                :label="$t('views.departaments.title')"
                :items="userStore.departaments"
                itemTitle="attributes.name"
                itemValue="id"
                :firstElement="{id:'',attributes:{ name:'Seleccione un departamento'}}"
                v-model="form.department_id"
                id="departament"
            ></SelectComponentVue>
        </VCol>
        <VCol>
            <SelectComponentVue
                :label="$t('views.municipalities.title')"
                :items="userStore.municipalities"
                itemTitle="attributes.name"
                itemValue="id"
                :firstElement="{id:'',attributes:{ name:'Seleccione un Municipio'}}"
                v-model="form.municipalitie_id"
                id="municipalities"
            ></SelectComponentVue>
        </VCol>
    </VRow>
    <VRow>
        <InputComponent 
            id="dirrecion" 
            :label="$t('views.register.address')" 
            v-model="form.address"
            :rules="[validator.required]" />
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
import { UserStore } from "@/stores/UserStore";
import SelectComponentVue from "@/components/global/SelectComponent.vue";

const { t } = useI18n()
const helper = helperStore()
const router = useRouter()
const { errorsInput } = storeToRefs(helper)
const refForm = ref<any>(null)
const registerStore = RegisterStore()
const { form, steps } = storeToRefs(registerStore)
const userStore = UserStore()

</script>

<style scoped></style>