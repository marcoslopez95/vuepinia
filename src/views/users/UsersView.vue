<template>
    <TableComponentVue
    :optionsHabilit="false"
    :headers="headers"
    :items="helper.items"
    />
</template>

<script setup lang="ts">
import TableComponentVue from '@/components/global/TableComponent.vue';
import { helperStore } from '@/helper';
import type { Head } from '@/interfaces/TableComponent.helper';

const headers: Head[] = [
    {
        name: 'Usuario',
        value: 'attributes.username',
    },
    {
        name: 'Email',
        value: 'attributes.email',
    },
    // {
    //     name: 'Estado de verificacion',
    //     value: 'attributes.username',
    // },
    // {
    //     name: 'Referido por',
    //     value: 'attributes.username',
    // },
    {
        name: 'Estado',
        value: 'attributes.deleted_at',
        status: 'deleted'
    },
]

const helper = helperStore()
helper.url = 'users'

helper.index()
</script>

<style scoped>

</style>