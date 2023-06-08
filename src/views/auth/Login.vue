
<script setup lang="ts">
import { ref } from "vue";
import InputComponent from "@/components/InputComponent.vue";
import { helperStore } from "@/helper";
import * as validator from '@/validator'
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
const helper = helperStore()
const router = useRouter()
const { errorsInput } = storeToRefs(helper)
const refForm = ref<any>(null)
const form = ref({
    email: "",
    password: "",
})

const SigIn = async () => {
    const {valid, errors} = await refForm.value?.validate()
    if (!valid){
        errorsInput.value = errors
    }
    helper
        .http('login','post',{data: form.value})
        .then((res)=>{
            const {user,token} = res.data
            setLocalStorage(token)
            setUser(user)
            router.push({name:'Dashboard'})
        })
}

const setLocalStorage = (token:string) => {
    const getToken = token.split('|')[1]
    localStorage.setItem('token', getToken)
}
const setUser = (user:Object) => {
    localStorage.setItem('user', JSON.stringify(user))
}
</script>

<template>
    <v-row class="d-flex justify-center align-center h-100">
        <v-col cols="12" sm="12" lg="11">
            <v-card class="py-5">
                <VRow>
                    <VCol cols="12" sm="6"  class="text-center d-flex align-center">
                        <div class="mx-auto">
                            Esto es un logo
                        </div>
                    </VCol>
                    <VCol cols="12" sm="6" class="text-center">
                        <v-toolbar color="transparent">
                            <v-toolbar-title class="font-weight-medium">
                                {{ $t('views.login.title')}}
                            </v-toolbar-title>
                        </v-toolbar>
                        <v-divider />
                        <div class="pa-1">
                            <VForm ref="refForm">
                                <template #default>
                                    <InputComponent id="email" label="Email" v-model="form.email" :rules="[validator.required]"/>
                                    <InputComponent id="password" label="Contraseña" type="password" v-model="form.password" :rules="[validator.required]"/>
                                </template>
                            </VForm>
                        </div>
                        <div class="pa-5 px-15">
                            <v-btn @click="SigIn" color="primary" class="w-75" rounded="pill">
                                {{$t('views.login.button')}}
                            </v-btn>
                        </div>
                    </VCol>
                </VRow>
            </v-card>
        </v-col>
    </v-row>
</template>
<style>
.custom-label {
    color: gray;
}

.v-field__field input {
    padding-top: 0px;
    text-align: center;
}
.v-field{
    --v-input-control-height: 48px !important;
    --v-field-input-padding-top: 0px !important;
    --v-field-input-padding-bottom: 0px !important;
    --v-field-input-min-height:42px !important;
    --v-input-padding-top: 2px !important;
    --v-field-padding-top: 0px !important;
    --v-field-padding-bottom: 1px !important;
}
</style>