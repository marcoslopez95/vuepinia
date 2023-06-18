<template>
    Soy Kyc
    <VImg v-for="k,i in kyc" :key="i" :src="k.attributes.url_aws_front"></VImg>
</template>

<script setup lang="ts">
import { helperStore } from '@/helper';
import { ref } from 'vue'

const kyc = ref<any>([])
const helper = helperStore()


helper.http('kyc','get').then((res)=>{
    kyc.value = res.data.response
})
</script>

<style scoped>

</style>