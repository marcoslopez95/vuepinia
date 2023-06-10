<template>
    <div class="d-flex justify-space-between" >
        <VResponsive max-width="500px">
            <v-text-field
            class="custom-text-field"
            :loading="helper.loading"
            density="compact"
            variant="solo"
            append-inner-icon="mdi-magnify"
            single-line
            v-model="search"
            bg-color="#E1E7EC"
            hide-details
            @click:append-inner="getSearch"
          >
          <template #label>
            <span class="font-weight-bold" style="color: #809FB8;">{{ $t('general-views.search') }}1</span>
          </template>
        </v-text-field>
        </VResponsive>
        <VBtn 
            @click="openModal"
            prepend-icon="mdi-plus"
            class="rounded-xl"
            >
            {{$t('buttons.add')}}
        </VBtn>
    </div>
    
    <CrudComponent :singular="$t('views.type_documents.title')" :rows="rows"></CrudComponent>
    <!-- <h3>{{$t('views.type_documents.title',2)}}</h3> -->
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
import type { Permission } from '@/interfaces/Permission/Permission.model';
import type { Head } from '@/interfaces/TableComponent.helper';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import type { PermissionCreate } from '@/interfaces/Permission/PermissionCreate.dto'
import type { TypeDocument } from '@/interfaces/TypeDocument/TypeDocument.model';
import type { TypeDocumentCreate } from '@/interfaces/TypeDocument/TypeDocument.dto';
const helper = helperStore()
helper.url = 'type/documents'

helper.index()

const search = ref<string>('')
const getSearch = () => {
    helper.index({
        type_document: search.value
    })
}
const openUpdate = (item:TypeDocument) => {
    itemH.value = item
    const itemUpdate: TypeDocumentCreate = {
        type_document: item.attributes.type_document
    }
    formCrud.value = itemUpdate
    openModalCrud.value = true;
}

const openModal = async () => {
    itemH.value = false
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
                label: 'Nombre',
                type: 'text',
                valueForm: 'type_document',

            }
        ]
    }
]

const headers: Head[] = [
    {
        name: t('general-views.name'),
        value: 'attributes.type_document',
    },

]


</script>

<style scoped>
.custom-text-field .v-input__control {
  border-radius: 50px;
}
</style>