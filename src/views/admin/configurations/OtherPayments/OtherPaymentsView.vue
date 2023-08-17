<template>
    <div class="d-flex justify-space-between flex-column flex-sm-row mb-8">
        <SearchInputComponentVue v-model="search" @onSearch="getSearch" />
        <div>
            <VBtn @click="openModal" prepend-icon="mdi-plus" class="rounded-xl">
                {{ $t('buttons.add') }}
            </VBtn>
        </div>
    </div>

    <CrudComponent :singular="$t('views.other-payments.title')" :rows="rows"></CrudComponent>
    <TableComponentVue
    optionsHabilit
    icon-update
    icon-delete
    simple
    :headers="headers"
    @update="openUpdate"
    :items="helper.items"
    :options-simple="{value: 'attributes.name', max_columns:1}"
    >
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
import type { OtherPayment } from '@/interfaces/OtherPayment/OtherPayment.model';
import type { OtherPaymentCreate, OtherPaymentUpdate } from '@/interfaces/OtherPayment/OtherPayment.dto';
import SearchInputComponentVue from '@/components/global/SearchInputComponent.vue';
import * as validator from '@/validator'
import { OtherPaymentStore } from '@/stores/OtherPaymentStore';
import { PAYMENT_METHODS_AVAILABLE } from '@/enums/PaymentMethod.enum';
import { onUnmounted } from 'vue';
const helper = helperStore()
helper.url = 'sub/payment/type'
helper.index()
helper.defaultParamsByCrud = {
    payment_method_id: PAYMENT_METHODS_AVAILABLE.OTHER
}
onUnmounted(() => {
    helper.defaultParamsByCrud = {}
})
const otherPaymentStore = OtherPaymentStore()
otherPaymentStore.getPaymentMethods()
const { paymentMethods } = storeToRefs(otherPaymentStore)
const search = ref<string>('')
const getSearch = () => {
    helper.index({
        name: search.value
    })
}

const openUpdate = (item: OtherPayment) => {
    itemH.value = item
    const itemUpdate: OtherPaymentUpdate = {
        name: item.attributes.name,
        description: item.attributes.description,
        payment_type_id: item.relationships?.payment?.id ?? '',
        file: item.relationships?.images && item.relationships?.images.length > 0 ? item.relationships?.images[0].attributes.aws_url : ''
    }
    formCrud.value = itemUpdate
    formCrud.value['payment_type_id'] = PAYMENT_METHODS_AVAILABLE.OTHER
    openModalCrud.value = true;
}

const openModal = async () => {
    itemH.value = {}
    formCrud.value = {}
    formCrud.value['payment_type_id'] = PAYMENT_METHODS_AVAILABLE.OTHER
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
                colClass: ['v-col-12 v-col-sm-6'],
                rules: [
                    validator.required
                ]
            },
            {
                label: t('general-views.description'),
                type: 'text',
                colClass: ['v-col-12 v-col-sm-6'],
                valueForm: 'description',
                rules: []
            },
            // {
            //     label: t('views.type-company-account.title'),
            //     type: 'select',
            //     valueForm: 'payment_',
            //     rules: []
            // },
        ]
    },
    {
        fields: [
            {
                label: t('general-views.image'),
                type: 'image',
                valueForm: 'file',
                rules: [
                    validator.required
                ]
            }
        ]
    },
]

const headers: Head[] = [
    {
        name: t('general-views.name'),
        value: 'attributes.name',
    },
    // {
    //     name: t('general-views.description'),
    //     value: 'attributes.description',
    // },
    {
        name: t('general-views.status'),
        value: 'deleted',
        status: true
    },
]


</script>

<style scoped>

</style>