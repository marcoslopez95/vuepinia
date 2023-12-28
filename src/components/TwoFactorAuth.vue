<template>
    <DialogGlobal @close-dialog="closeModal" class-title="text-center mb-0 text-primary" footer :dialog="twoFactorAuthStore.modal">
        <template #title>
            Authenticación a dos pasos
        </template>
        <div class="d-flex justify-center">
            <div style="width: 300px;">
                <InputComponent
                    v-model="twoFactorAuthStore.code"
                    name=""
                    :placeholder="!with2fa() ? 'Contraseña' : 'Código de la aplicación'"
                    :type="!with2fa() ? 'password' : 'text'"
                >
                </InputComponent>
            </div>
        </div>
        <template #actions>
            <div
            class="paddingBtn d-flex w-100 justify-center justify-sm-space-between flex-wrap gap-2"
        >
            <div class="order-1 order-sm-0">
                <VBtnPrimary variant="outlined" @click="closeModal()">
                    {{ $t("buttons.cancel") }}
                </VBtnPrimary>
            </div>
            <div class="order-0 order-sm-1">
                <VBtnPrimary
                    variant="elevated"
                    @click="twoFactorAuthStore.ejectFunction"
                    v-if="!twoFactorAuthStore.newFlow"
                >
                    Continuar
                </VBtnPrimary>
                <VBtnPrimary
                    variant="elevated"
                    @click="twoFactorAuthStore.ejectFunction2"
                    v-else
                >
                    Continuar
                </VBtnPrimary>
            </div>
        </div>
        </template>
    </DialogGlobal>
</template>

<script setup lang="ts">
import DialogGlobal from './global/DialogGlobal.vue';
import InputComponent from './InputComponent.vue';
import { TwoFactorAuthStore } from '@/stores/TwoFactorAuthStore';

const twoFactorAuthStore = TwoFactorAuthStore()
const closeModal = () => {
    twoFactorAuthStore.code = ''
    twoFactorAuthStore.modal = false
}
const with2fa = ():boolean => !!localStorage.getItem('2fa')
</script>

<style scoped>

</style>