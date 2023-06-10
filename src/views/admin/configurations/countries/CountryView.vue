<template>
    <VBtn @click="openModal">{{$t('buttons.create')}}</VBtn>

    <CrudComponent :singular="$t('views.countries.title')" :rows="rows"></CrudComponent>
    <h3>{{$t('views.countries.title',2)}}</h3>
    <TableComponentVue
    optionsHabilit
    icon-update
    icon-delete
    :headers="headers"
    @update="openUpdate"
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
import type { Permission } from '@/interfaces/Permission/Permission.model';
import type { Head } from '@/interfaces/TableComponent.helper';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import type { PermissionCreate } from '@/interfaces/Permission/PermissionCreate.dto'
import type { TypeDocument } from '@/interfaces/TypeDocument/TypeDocument.model';
import type { TypeDocumentCreate } from '@/interfaces/TypeDocument/TypeDocument.dto';
import type { Country } from '@/interfaces/Country/Country.model';
import type { CountryCreate } from '@/interfaces/Country/Country.dto';
const helper = helperStore()
helper.url = 'countrys'

helper.index()

const openUpdate = (item:Country) => {
    itemH.value = item
    const itemUpdate: CountryCreate = {
        code: item.attributes.code,
        name: item.attributes.name
    }
    formCrud.value = itemUpdate
    openModalCrud.value = true;
}

const openModal = async () => {
    itemH.value = {}
    formCrud.value = {}
    clickIn.value = 'Create'
    openModalCrud.value = true;
}

const { t } = useI18n()
const {
    formCrud,
    openModalCrud,
    clickIn,
    formRef,
    item:itemH} = storeToRefs(helper)
const rows: Row[] = [
    {
        fields: [
            {
                label: t('general-views.name'),
                type: 'text',
                valueForm: 'name',
            },
            {
                label: t('general-views.code'),
                type: 'text',
                valueForm: 'code',
            }
        ]
    }
]

const headers: Head[] = [
    {
        name: t('general-views.name'),
        value: 'attributes.name',
    },
    {
        name: t('general-views.code'),
        value: 'attributes.code',
    },

]


</script>

<style scoped>

</style>