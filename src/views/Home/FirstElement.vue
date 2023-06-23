<template>
    <VRow class="d-flex align-center">
        <VCol class="">
            <VImg class="mx-auto" :src="FirstImage" width="573px" height="369px" />
        </VCol>
        <VCol class="text-primary font-weight-bold text-h3 text-wrap">
            <!-- <div class="text-primary font-weight-bold text-h1" > -->
            Xeler go es la plataforma más rápida y eficiente para comprar y vender Tether en Colombia.
            <!-- </div> -->
        </VCol>
    </VRow>
    <VRow>
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
const email = ref('')
</script>

<style scoped></style>