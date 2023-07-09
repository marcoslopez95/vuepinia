<template>
    <!-- <VResponsive class="v-text-field__slot cursor-pointer"> -->
        <VBtn 
            :type="type"
            color="transparent" 
            :icon="appendIcon" 
            :disabled="disabled"
            class="v-text-field__slot"
            style="max-height: 40px;"
            @click="emits('click:append-icon')">
            <slot></slot>
        </VBtn>
    <!-- </VResponsive> -->
</template>

<script setup lang="ts">
const emits = defineEmits<{
    (e: 'click:append-icon'): void
}>()
const props = defineProps<{
    type?: string
    appendIcon?: string
    disabled?: boolean
}>()

</script>

<style scoped>
.v-text-field__slot {
    background: linear-gradient(white, white) padding-box, linear-gradient(180deg, rgba(2, 0, 36, 1) 0%, rgba(80, 67, 233, 1) 0%, rgba(22, 180, 229, 1) 100%) border-box;
    border: 1px solid transparent;
    border-radius: 20px;
    text-align: center;
    color: #5D5FEF;
}
</style>