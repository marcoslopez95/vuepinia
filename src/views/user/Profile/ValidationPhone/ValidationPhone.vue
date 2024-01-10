<template>
    <div class="text-center mt-2">
        <VBtn  @click="openModal">Validar</VBtn>
    </div>
    <DialogGlobalVue
    :dialog="openDialog"
    @close-dialog="openDialog = false"
    >
        <template #title>
            {{ $t('views.profile.personal-data.validation-phone.title') }}
        </template>

        <template #content>
            <p class="text-table">
                {{ $t('views.profile.personal-data.validation-phone.content') }}
            </p>
            <VRow>
                <VCol cols="12" sm="4" class="mx-auto">
                    <NewInputComponentVue 
                        v-model="code"
                        :placeholder="$t('views.profile.personal-data.validation-phone.code-verification')"
                        name=""
                     />
                </VCol>
                <VCol cols="12" class="text-center">
                    <VBtnPrimary :disabled="!code" @click.prevent="verificateCode">
                        {{ $t('commons.verificate') }}
                    </VBtnPrimary>
                </VCol>
            </VRow>
        </template>
    </DialogGlobalVue>
</template>

<script setup lang="ts">
import DialogGlobalVue from '@/components/global/DialogGlobal.vue';
import NewInputComponentVue from '@/components/InputComponent.vue'
import { helperStore } from '@/helper';
import { UserStore } from '@/stores/UserStore';
import { ref } from 'vue'
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
const emits = defineEmits(['updatePhone'])
const openDialog = ref(false)
const code = ref('')
const userStore = UserStore()
const helper = helperStore()
const {
    codePhone,
    phone
} = defineProps<{
    codePhone:string
    phone:string
    isValidPhone:boolean
}>()

const openModal = async () =>{
    const isEqualsPhone = phone == userStore.userAuth?.attributes.phone
    // console.log(phone)
    // console.log(userStore.userAuth?.attributes.phone)
    openDialog.value = true
    if(!isEqualsPhone){
        await updatePhone()
    }
    sendCode()
}

const updatePhone = ():Promise<boolean> =>{
    return new Promise<boolean>(async (resolve, reject) =>{
        const url = 'users/update/profile'
        const data ={
            code_phone: codePhone,
            phone
        }
        try{
            await helper
                .http(url,'put',{data})
                emits('updatePhone')
            resolve(true)
        }catch(e){
            reject(false)
        }
    })
}

const sendCode = () => {
    const url = 'send/vefificate/phone'
    helper.http(url,'get',{})
}

const verificateCode = async () => {
    const url = 'vefificate/code/phone/' + code.value
    await helper.http(url,'get',{},t('views.profile.personal-data.validation-phone.success'))
    emits('updatePhone')

    openDialog.value = false
}
</script>

<style scoped></style>