<template>
    <div 
        :class="[
            'switch mt-2 rounded-pill cursor-pointer d-flex px-1',
            isActive ? `bg-${colorOn} on` : `bg-${colorOff}`,
            `text-${color}`
        ]"
        @click="emits('update:model-value',!isActive);isActive= !isActive">
        <div class="circle bg-white rounded-circle my-auto" :style="{ left: isActive ? 'calc(100% - 34px)' : '0' }">
        </div>
        <span class="my-auto textOn font-weight-bold" :style="{ 
            display: isActive ? 'block' : 'none'
            }">
            {{ titleOn }}
        </span>
        <span class="my-auto textOff font-weight-bold" :style="{ 
            display: !isActive ? 'block' : 'none'
            }">
            {{ titleOff }}
        </span>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<Props>()
const emits = defineEmits<{
    (e: 'update:model-value', value: boolean): void
}>()


const isActive = ref(props.modelValue)

const colorOn = ref(props.colorOn ?? 'info')
const colorOff = ref(props.colorOff ?? 'table')
const color = ref(props.color ?? 'white')
const titleOff = ref(props.titleOff ?? '')
const titleOn = ref(props.titleOn ?? '')
interface Props {
    modelValue: boolean
    colorOn?:string
    colorOff?:string
    color?:string
    titleOff?: string
    titleOn?: string
}
</script>

<style scoped lang="scss">
.switch {
    width: 100%;
    height: 39px;
    transition: 300ms;
}

.circle {
    min-width: 34px;
    height: 34px;
    transition: left 500ms;
    // transition-delay: left;
    position: relative;
}

.textOn {
    margin-right: auto;
    margin-left: -10%;
}

.textOff {
    margin-left: auto;
    margin-right: 6%;
}

.switch>span {
    transition: opacity 0.5s;

}
</style>