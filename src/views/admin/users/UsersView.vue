<template>
    <VBtn @click="openModal">{{$t('buttons.create')}}</VBtn>

    <CrudComponent singular="Users" :rows="rows"></CrudComponent>
    <h3>Usuarios</h3>
    <TableComponentVue
    :optionsHabilit="false"
    :headers="headers"
    :items="helper.items"
    >
    <template #cel-attributes.username="{data}">
        <span class="text-primary"> 
            {{ data.attributes.username }}
        </span>
    </template>
    </TableComponentVue>
</template>

<script setup lang="ts">
import CrudComponent from '@/components/global/CrudComponent.vue';
import TableComponentVue from '@/components/global/TableComponent.vue';
import { helperStore } from '@/helper';
import type { Row } from '@/interfaces/FormComponent.helper';
import type { Head } from '@/interfaces/TableComponent.helper';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
const helper = helperStore()
helper.url = 'users'

helper.index()
const openModal = async () => {
  formCrud.value = {}
  clickIn.value = 'Create'
  openModalCrud.value = true;
}
const { t } = useI18n()
const {formCrud,openModalCrud,clickIn,formRef} = storeToRefs(helper)
const rows: Row[] = [
    {
        fields: [
            {
                label: t('views.users.first_name'),
                type: 'text',
                valueForm:'first_name'
            },
            {
                label: t('views.users.second_name'),
                type: 'text',
                valueForm:'second_name'
            },
            {
                label: t('views.users.last_name'),
                type: 'text',
                valueForm:'last_name'
            },
            {
                label: t('views.users.second_last_name'),
                type: 'text',
                valueForm:'second_last_name'
            },
            {
                label: t('views.users.email'),
                type: 'text',
                valueForm:'email'
            },
            {
                label: t('views.users.password'),
                type: 'text',
                valueForm:'password'
            },
            {
                label: t('views.users.code_phone'),
                type: 'text',
                valueForm:'code_phone'
            },
            {
                label: t('views.users.phone'),
                type: 'text',
                valueForm:'phone'
            },
            {
                label: t('views.users.username'),
                type: 'text',
                valueForm:'username'
            },
            {
                label: t('views.users.referred_by'),
                type: 'text',
                valueForm:'referred_by'
            },
            {
                label: t('views.roles.title'),
                type: 'text',
                valueForm:'role_id'
            },
            {
                label: t('views.countries.title'),
                type: 'text',
                valueForm:'country_id'
            },
            {
                label: t('views.type_documents.title'),
                type: 'text',
                valueForm:'type_documents_id'
            },
            {
                label: t('views.departments.title'),
                type: 'text',
                valueForm:'department_id'
            },
            {
                label: t('views.municipalities.title'),
                type: 'text',
                valueForm:'municipalitie_id'
            },
            {
                label: t('views.users.document'),
                type: 'text',
                valueForm:'document'
            },
            {
                label: t('views.users.address'),
                type: 'text',
                valueForm:'address'
            },
            {
                label: t('views.users.birth'),
                type: 'text',
                valueForm:'birth'
            },
        ]
    }
]

const headers: Head[] = [
    {
        name: t('views.users.user'),
        value: 'attributes.username',
    },
    {
        name: t('views.users.email'),
        value: 'attributes.email',
    },
    {
        name: t('views.users.estate-verification'),
        value: '',
    },
    {
        name: t('views.users.referred-by'),
        value: '',
    },
    {
        name: t('genereal-views.state'),
        value: 'attributes.deleted_at',
        status: 'deleted'
    },
    {
        name: t('views.users.created_at'),
        value: 'attributes.created_at',
        type: 'date',
        format: 'YYYY-MM-DD | HH:mm:ss'
    },
]


</script>

<style scoped>

</style>