<template>
    <!-- <VRow class="d-flex my-2 align-center px-15"> -->
    <!-- <VCol v-if="label" class="mr-2 custom-label text-right" cols="3" sm="4" lg="3">
            {{label}}:
        </VCol> -->
    <VCol :class="class">
        <!-- <VResponsive> -->
            <v-text-field :id="id" 
                auto 
                v-model="modelValue" 
                :type="type ?? 'text'" 
                variant="plain" 
                :label="label"
                color="#5C6776" 
                :rules="rules" 
                autocomplete="off" 
                @click:append-inner="emits('click:append-inner',$event)"
                class="rounded-pill pl-3 border pa-0 mb-2 mt-2 pr-5"
                :class="getErrorInput ? 'color-border-danger' : 'color-border-primary'"
                style="max-height: 40px!important; color:#5C6776;" 
                @update:model-value="emits('update:model-value', $event)">
                <template #label="{isActive,isFocused}">
                    <span 
                        class="font-weight-bold"
                        style="margin-top: -5px;" 
                        :style="(isActive || isFocused)? 'font-size:14px;':''">
                        {{ label }}
                    </span>
                </template>
                <template v-if="appendIcon" #append-inner="{}">
                    <VBtn 
                        @click.prevent="emits('click:append-inner',$event)" 
                        :icon="appendIcon" 
                        color="transparent" 
                        :active="false"
                        style="margin-top: -5px;"
                        />
                </template>
                <template #message class="">
                    <div style="margin-top: -9px;">
                        {{ getErrorInput }}
                    </div>
                </template>
            </v-text-field>
        <!-- </VResponsive> -->

    </VCol>
    <!-- </VRow> -->
</template>

<script setup lang="ts">
import { helperStore } from '@/helper';
import { toRefs, computed } from 'vue'
const props = defineProps<{
    modelValue: any,
    id: string,
    type?: string,
    label?: string,
    rules?: any[],
    class?: Array<string>
    appendIcon?: any
}>()
const { modelValue } = toRefs(props)
const emits = defineEmits(['update:model-value','click:append-inner'])

const helper = helperStore()

const getErrorInput = computed(() => {
    if (helper.errorsInput.length === 0) return ''
    return helper.errorsInput
        .find(e => e.id === props.id)
        ?.errorMessages[0] ?? ''
})
</script>

<style scoped>
.color-border-primary {
    border-color: #5043E9 !important;
}

.color-border-danger {
    border-color: #FF0000 !important;
}

.v-field__input input {
    margin-top: 211px;
}
</style>