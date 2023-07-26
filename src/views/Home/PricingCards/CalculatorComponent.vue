<template>
    <VCard 
        class="h-100">
        <VCardTitle 
            class="text-center"
            :class="[
                !xs 
                    ? 'bg-primary'
                    : 'text-primary '
            ]"
            >
            {{ $t('views.home.calculator.title') }} 
        </VCardTitle>
        <VCardText class="px-3 border-primary">
            <VRow dense class="d-flex justify-lg-space-between px-0">
                <VCol cols="6">
                    <SwitchComponent 
                        v-model="isSell" 
                        title-on="Vender" 
                        title-off="Comprar" 
                        color-off="purple"
                        color-on="red-300">
                    </SwitchComponent>
                </VCol>
                <VCol cols="6">
                    <SwitchComponent 
                        v-model="isBank" 
                        title-on="Banco" 
                        title-off="Efectivo" 
                        color-off="green"
                        color-on="blue-sky">
                    </SwitchComponent>
                </VCol>
            </VRow>
            <VRow dense>
                <VCol>
                    <SelectComponent
                        v-model="cryptoSelect"
                        height="33px"
                        :items="cryptos"
                        item-title="attributes.name"
                        item-value="id"
                        name="Cripto"
                    ></SelectComponent>
                </VCol>
            </VRow>
            <VRow dense>
                <VCol>
                    <InputComponent
                        height="33px"
                        v-model="currencyOrigin"
                        name="Pesos"
                    ></InputComponent>
                </VCol>
            </VRow>
            <VRow dense>
                <VCol>
                    <InputComponent
                        height="33px"
                        v-model="currencyObject"
                        name="USDT"
                    ></InputComponent>
                </VCol>
            </VRow>
        </VCardText>
        <VCardActions class="bg-primary text-white pa-0">
            <VRow class="d-flex align-center my-1 justify-center">
                <div >
                    <VIcon :icon="BtcIcon" size="60" />
                </div>
                <div class="text-center ">
                    <p style="font-size: 30px;" class="font-weight-bold">0.110001 BTC</p>
                    <p style="font-size: 10px;">equivalente a <b>3000 USDT</b></p>
                    <p style="font-size: 10px;">Aproximadamente</p>
                </div>
            </VRow>
        </VCardActions>
    </VCard>
</template>

<script setup lang="ts">
import InputComponent from '@/components/InputComponent.vue';
import SelectComponent from '@/components/SelectComponent.vue';
import SwitchComponent from '@/components/SwitchComponent.vue';
import { computed } from 'vue';
import { ref } from 'vue';
import { onMounted } from 'vue';
import BtcIcon from './BtcIcon.vue'
import { useDisplay } from 'vuetify/lib/framework.mjs';

const { xs } = useDisplay()
const isSell = ref(false)
const buyOrSell = computed(() => isSell.value == true ? 'Comprar' : 'Vender')

const isBank = ref(false)
const efectyOrBank = computed(() => isBank.value == true ? 'Efectivo' : 'Banco')

const currencyOrigin = ref<''|number>('')
const currencyObject = ref<''|number>('')

const cryptoSelect = ref('')
const cryptos = [
    {
        id: 1,
        attributes:{
            name: 'Bitcoin'
        }
    },
    {
        id: 2,
        attributes:{
            name: 'USDT'
        }
    },
]
</script>

<style scoped lang="scss">
.image-container {
        // display: inline-block;
        border: 5px solid #ffffff;
        border-radius: 50%; /* Ajusta el valor según tus necesidades */
        overflow: hidden;
    }

    .image-container img {
        display: block;
        width: 100%;
        height: auto;
    }
    </style>