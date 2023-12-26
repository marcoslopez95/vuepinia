<template>
    <div style="max-width: 340px" class="mx-auto">
        <div
            class="d-flex justify-center align-center flex-column text-primary font-weight-light"
        >
            <h3 class="">Wallet XCOP</h3>
            <div class="my-3 font-30 d-flex">
                <VIcon :icon="XcopIcon"></VIcon>
                {{ xelerCop }}
            </div>
        </div>
        <div class="d-flex gap-2 justify-center">
            <VBtnPrimary @click="clickInOption = IndexComponent" style="min-width: 90px">
                <VIcon icon="mdi-clipboard-text" />Transac.
            </VBtnPrimary>
            <VBtnPrimary @click="clickInOption = ReceivedComponent" style="min-width: 90px">
                <VIcon icon="mdi-qrcode" />Recibir
            </VBtnPrimary>
            <VBtnPrimary @click="clickInOption = SendComponent" style="min-width: 90px">
                <VIcon icon="mdi-play" />Enviar
            </VBtnPrimary>
            <VBtnPrimary @click="clickInOption = SwapComponent" style="min-width: 90px">
                <VIcon>
                    <svg
                        width="16"
                        height="17"
                        viewBox="0 0 16 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M0 4.76051V4.08058C0 3.51731 0.319213 3.06069 0.712993 3.06069H11.4079V1.02091C11.4079 0.112908 12.1773 -0.340732 12.6251 0.299718L15.0017 3.69936C15.2801 4.09767 15.2801 4.74343 15.0017 5.1417L12.6251 8.54134C12.179 9.17928 11.4079 8.73197 11.4079 7.82019V5.7804H0.712993C0.319213 5.7804 0 5.32379 0 4.76051ZM14.4975 11.2198H3.80263V9.18004C3.80263 8.27429 3.03432 7.81679 2.58546 8.45885L0.208818 11.8585C-0.069606 12.2568 -0.069606 12.9026 0.208818 13.3008L2.58546 16.7005C3.03192 17.339 3.80263 16.8903 3.80263 15.9793V13.9395H14.4975C14.8913 13.9395 15.2105 13.4829 15.2105 12.9196V12.2397C15.2105 11.6764 14.8913 11.2198 14.4975 11.2198Z"
                            fill="white"
                        />
                    </svg>
                </VIcon>
                Retiro
            </VBtnPrimary>
        </div>
        <div class="mt-7">
            <component @send="setSend" :is="clickInOption" />
        </div>
        <MessageModal 
            :dialog="openModal" 
            @closeDialog="closeDialog" 
            :date="send?.date ?? ''"
            :amount="send?.amount ?? 0"
            :external="false"
            :user="send?.user ?? ''"
            :number_transaction="send?.number_transaction ?? ''"
            type="send" />
    </div>
</template>

<script setup lang="ts">
import XcopIcon from "@/assets/icons/XcopIcon.vue";
import { formatNumber } from "@/helper";
import { UserStore } from "@/stores/UserStore";
import { computed } from "vue";
import SendComponent from '@/views/user/walletXCOP/Send/SendComponent.vue'
import { ref } from "vue";
import MessageModal from "./MessageModal.vue";
import ReceivedComponent from '@/views/user/walletXCOP/Received/ReceivedComponent.vue'
import SwapComponent from "./Swap/SwapComponent.vue";
import IndexComponent from '@/views/user/walletXCOP/Index/IndexComponent.vue'
const clickInOption = ref<any>('')
const userStore = UserStore();

userStore.updateUserAuth();

const xelerCop = computed(() => {
    return formatNumber(userStore.userAuth?.attributes.xcop ?? 0, '.',',',0) + " Xelercop";
});

const openModal = ref(false)

const send = ref<Send>()

interface Send{
    user:string,
    amount:number,
    date:string,
    number_transaction: string
}

const setSend = (value:Send) => {
    send.value = value
    openModal.value = true
}

const closeDialog = () => {
    openModal.value = false
    send.value = undefined
}
</script>

<style scoped lang="scss"></style>
