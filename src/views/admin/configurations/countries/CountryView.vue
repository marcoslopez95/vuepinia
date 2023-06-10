<template>
    <div class="d-flex justify-space-between">
        <VResponsive max-width="500px" class="rounded-xl">
            <v-text-field class="" :loading="helper.loading" density="compact" variant="solo"
                append-inner-icon="mdi-magnify" single-line v-model="search" bg-color="#E1E7EC" hide-details
                @click:append-inner="getSearch">
                <template #label>
                    <span class="font-weight-bold" style="color: #809FB8;">{{ $t('general-views.search') }}</span>
                </template>
            </v-text-field>
        </VResponsive>
        <VBtn @click="openModal" prepend-icon="mdi-plus" class="rounded-xl">
            {{ $t('buttons.add') }}
        </VBtn>
    </div>

    <CrudComponent :singular="$t('views.countries.title')" :rows="rows"></CrudComponent>
    <!-- <h3>{{$t('views.countries.title',2)}}</h3> -->
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
import { ref } from 'vue';
import CrudComponent from '@/components/global/CrudComponent.vue';
import TableComponentVue from '@/components/global/TableComponent.vue';
import { helperStore } from '@/helper';
import type { Row } from '@/interfaces/FormComponent.helper';
import type { Head } from '@/interfaces/TableComponent.helper';
import { storeToRefs} from 'pinia';
import { useI18n } from 'vue-i18n';
import type { Country } from '@/interfaces/Country/Country.model';
import type { CountryCreate } from '@/interfaces/Country/Country.dto';
const helper = helperStore()
helper.url = 'countrys'

helper.index()
const search = ref<string>('')
const getSearch = () => {
    helper.index({
        type_document: search.value
    })
}
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