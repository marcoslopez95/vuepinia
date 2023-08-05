<template>
    <VRow class="d-flex align-center">
        <VCol class="">
            <VImg class="mx-auto" :src="FirstImage" width="573px" height="369px" />
        </VCol>
        <VCol 
            class="text-primary font-weight-bold text-h5 text-sm-h4 text-lg-h3 text-wrap"
            :class="[isMobile ? 'text-center':'']">
            <!-- <div class="text-primary font-weight-bold text-h1" > -->
            Xeler go es la plataforma más rápida y eficiente para comprar y vender <VueTyper v-bind="propVueType"></VueTyper> en Colombia.
            <!-- </div> -->
            
        </VCol>
    </VRow>
    <VRow v-if="!isMobile">
        <VCol cols="6">
            <VRow>

                <VCol cols="8">
                    <InputComponent name="email" v-model="email"></InputComponent>
                </VCol>
                <VCol cols="4" class="my-auto pt-9">
                    <VBtnPrimary style="min-height: 40px;">
                        Registrarse
                    </VBtnPrimary>
                </VCol>
            </VRow>
        </VCol>
    </VRow>
</template>

<script setup lang="ts">
import FirstImage from '@/assets/images/home/FirstImage.png'
import InputComponent from '@/components/InputComponent.vue';
import { ref } from 'vue'
import { useDisplay } from 'vuetify/lib/framework.mjs'
//@ts-ignore
import VueTyper from 'vue3-typer'
import "vue3-typer/dist/vue-typer.css"

const isMobile = ref(useDisplay().smAndDown)
const email = ref('')

const propVueType = {
    'text':["Bitcoin","Ethereum","BitcoinCash","Litecoin","Dash"],
    'repeat':'Infinity',
    'shuffle':'false',
    'initial-action':'typing',
    'pre-type-delay':70,
    'type-delay':70,
    'pre-erase-delay':2000,
    'erase-delay':250,
    'erase-style':'select-all',
    'aret-animation':'blink',
    'erase-on-complete':false,
}
</script>

<style scoped lang="scss">
@import "@/scss/variables.scss";

.vue-typer{
    --char-typed-color: $color-primary;
    --char-selected-color: $color-primary;
    --char-typed-background-color: transparent;
    --char-selected-background-color: #ACCEF7;
}
</style>