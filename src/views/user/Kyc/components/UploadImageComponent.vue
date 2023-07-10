<template>
    <div 
        class="d-flex justify-center my-6" 
        id="container-img-kyc"
    >
        <div 
            id="img" 
            @click="uploadImage" 
            class="cursor-pointer v-text-field__slot px-4 py-3 border-md"
            :style="[
                `max-width: ${sizeImage ?? 284}px`,
                `min-width: ${sizeImage ?? 284}px`,
            ]
            "
        >
            <span v-if='!input'>
                <VIcon 
                    size="57" 
                    color="primary" 
                    :icon="UploadIcon">
                </VIcon>
                <p class="text-table" style="font-size: 17px;" v-html="text">
                </p>
            </span>
            <VImg v-else :src="input" width="100%" class="mx-auto"></VImg>
        </div>
        <div v-if="image" name="kyc" class="mx-4 my-auto">
            <VImg :src="image" height="150" width="145"></VImg>
        </div>
        <div style="display: none;">
            <input type="file" ref="refInput" @change="changeInput" />
        </div>
    </div>
</template>

<script setup lang="ts">
import UploadIcon from '@/assets/icons/kyc/UploadIcon.vue'
import { helperStore } from '@/helper';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useDisplay } from 'vuetify/lib/framework.mjs';

const widthWindow = ref(useDisplay().width)
const helper = helperStore()
const { t } = useI18n()
const emits = defineEmits<{
    (e: 'update:model-value', value: Blob): void
}>()
const props = defineProps<{
    image?: string,
    text: string,
    modelValue: any,
    sizeImage?: number
}>()
const input = ref(props.modelValue)
const refInput = ref<HTMLInputElement>()

const uploadImage = () => {
    refInput.value!.click()
}

const changeInput = () => {
    let acceptTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']

    if (!acceptTypes.includes(refInput.value!.files![0].type)) {
        helper.showNotify(t('commons.invalid-format'), { type: 'error' })
        return
    }
    input.value = URL.createObjectURL(refInput.value!.files![0])
    emits('update:model-value', refInput.value!.files![0])
}
</script>

<style scoped>
@media (max-width:800px) {
    #container-img-kyc{
        flex-flow: column;
        align-items: center;
        gap: 20px;
    }

    #container-img-kyc>#img {
        order: 2;
    }

    #container-img-kyc>#kyc {
        order: 1;
    }
}
</style>