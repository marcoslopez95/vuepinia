<template>
    <div class="text-center mt-2">
        <VBtn :disabled="!isValidEmail" @click="openModal">Validar</VBtn>
    </div>
    <DialogGlobalVue :dialog="openDialog" @close-dialog="openDialog = false">
        <template #title>
            {{ $t('views.profile.personal-data.validation-email.title') }}
        </template>

        <template #content>
            <p class="text-table">
                {{ $t('views.profile.personal-data.validation-phone.content') }}
            </p>
            <VRow>
                <VCol cols="4" class="mx-auto">
                    <NewInputComponentVue v-model="code"
                        :name="$t('views.profile.personal-data.validation-phone.code-verification')" />
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
const emits = defineEmits(['updateEmail'])
const openDialog = ref(false)
const code = ref('')
const userStore = UserStore()
const helper = helperStore()
const {
    email,
} = defineProps<{
    email: string
    isValidEmail: boolean
}>()

const openModal = async () => {
    const isEqualsPhone = email == userStore.userAuth?.attributes.email
    // console.log(phone)
    // console.log(userStore.userAuth?.attributes.phone)
    openDialog.value = true
    if (!isEqualsPhone) {
        await updateEmail()
    }
    sendCode()
}

const updateEmail = (): Promise<boolean> => {
    return new Promise<boolean>(async (resolve, reject) => {
        const url = 'users/update/profile'
        const data = {
            email
        }
        try {
            await helper
                .http(url, 'put', { data })
            emits('updateEmail')
            resolve(true)
        } catch (e) {
            reject(false)
        }
    })
}

const sendCode = () => {
    const url = 'send/vefificate/email/code'
    helper.http(url, 'get', {})
}

const verificateCode = async () => {
    const url = 'email/vefificate/code/' + code.value
    await helper.http(url, 'get', {}, t('views.profile.personal-data.validation-phone.success'))
    emits('updateEmail')
    openDialog.value = false
}
</script>

<style scoped></style>