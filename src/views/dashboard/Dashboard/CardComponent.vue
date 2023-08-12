<template>
    <div class="border-degree py-2 text-table">
        <div class="d-flex justify-space-around">
            <div class="">
                Total Vendido
            </div>
            <div class="">
                <VResponsive
                class="border-degree d-flex align-center justify-center"
                style="width:100px; height:28px"
                >
                    <VSelect
                        style="width:90px;"
                        variant="plain" 
                        single-line
                        v-model="timeSelect"
                        hide-details
                        :items="times"
                    >
                    </VSelect>
                </VResponsive>
            </div>
        </div>
        <div>
            <div>
                <VIcon/>
            </div>
            <div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    url: string,
    icon: any,
    type: 'currency' | 'number'
    title: string
}>()

const timeSelect = '1 month'
const times = [
    '1 month',
    '3 months',
    '6 months',
    '12 months',
]

const amount = 0
const currency = ''
</script>

<style scoped>

</style>