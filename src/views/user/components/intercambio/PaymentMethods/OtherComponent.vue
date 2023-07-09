<template>
    <div>
Esto es un pago por otro
{{ itemsDetails }}
    </div>
</template>

<script setup lang="ts">
import type { OtherAccount } from '@/interfaces/CompanyAccount/OtherAccount/OtherAccount.model';
defineProps<{
    itemsDetails: any
}>()
</script>

<style scoped>

</style>