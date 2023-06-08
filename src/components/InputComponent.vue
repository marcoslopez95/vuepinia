<template>
    <VRow class="d-flex my-2 align-center px-15">
        <VCol v-if="label" class="mr-2 custom-label text-right" cols="3" sm="4" lg="3">
            {{label}}:
        </VCol>
        <VCol>
            <v-text-field 
                :id="id"
                auto
                v-model="modelValue" 
                :type="type ?? 'text'"
                variant="plain"
                single-line 
                color="#5C6776"
                :rules="rules"
                autocomplete="off"
                class="rounded-pill pl-3 border" 
                :class="getErrorInput ? 'color-border-danger' : 'color-border-primary' "
                style="max-height: 40px!important; color:#5C6776"
                @update:model-value="emits('update:model-value',$event)"
                >
                <template #message class="">
                    <div style="margin-top: -9px;">
                        {{ getErrorInput }}
                    </div>
                </template>
            </v-text-field>
        </VCol>
    </VRow>
</template>

<script setup lang="ts">
import { helperStore } from '@/helper';
import { toRefs, computed } from 'vue'
const props = defineProps<{
    modelValue:any,
    id:string,
    type?:string,
    label?:string,
    rules?: any[],
}>()
const { modelValue } = toRefs(props)
const emits = defineEmits(['update:model-value'])

const helper = helperStore()

const getErrorInput = computed(()=>{
    if (helper.errorsInput.length === 0) return ''
    return helper.errorsInput
          .find(e => e.id === props.id)
          ?.errorMessages[0] ?? ''
})
</script>

<style scoped>
.color-border-primary{
    border-color: #5043E9!important; 
}
.color-border-danger{
    border-color: #FF0000!important;
}
.v-field__input input{
    margin-top: 211px;
}
</style>