<template>
    <div class="d-flex justify-space-between flex-column flex-sm-row mb-8">
        <SearchInputComponentVue v-model="search" @onSearch="getSearch" />
        <div>
            <VBtn @click="openModal" prepend-icon="mdi-plus" class="rounded-xl">
                {{ $t('buttons.add') }}
            </VBtn>
        </div>
    </div>

    <CrudComponent 
        singular="Compañía" 
        :rows="rows"
        @click:post="postCurrency"
    >
    </CrudComponent>
    <TableComponentVue
    optionsHabilit
    icon-update
    icon-delete
    :headers="headers"
    @update="openUpdate"
    :items="helper.items"
    >
    <template #cel-relationships.user.attributes.fullname="{data}">
        {{ getFullName(data.relationships.user as User) }}
    </template>
    </TableComponentVue>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CrudComponent from '@/components/global/CrudComponent.vue';
import TableComponentVue from '@/components/global/TableComponent.vue';
import { getFullName, helperStore, itemHaveImages } from '@/helper';
import type { Row } from '@/interfaces/FormComponent.helper';
import type { Head } from '@/interfaces/TableComponent.helper';
import { storeToRefs} from 'pinia';
import { useI18n } from 'vue-i18n';
import type { Currency } from '@/interfaces/Currency/Currency.model';
import type { CurrencyCreate } from '@/interfaces/Currency/Currency.dto';
import SearchInputComponentVue from '@/components/global/SearchInputComponent.vue';
import * as validator from '@/validator'
import { CurrencyStore } from '@/stores/CurrencyStore';
import type { BussinessUpdate } from '@/interfaces/Bussiness/Bussiness.dto'
import type { Bussiness } from '@/interfaces/Bussiness/Bussiness.model'
import { UserStore } from '@/stores/UserStore';
import type { User } from '@/interfaces/User/User.model';
const helper = helperStore()
helper.url = 'companys'

helper.index()
const currencyStore = CurrencyStore()
currencyStore.getCurrencyTypes()
const userStore = UserStore()

userStore.getCountries()
userStore.getDepartaments()
userStore.getMunicipalities()

const { countries,departaments,municipalities } = storeToRefs(userStore)

const currency  = (item:any): Currency => item as Currency

const { currencyTypes } = storeToRefs(currencyStore)
const search = ref<string>('')
const getSearch = () => {
    helper.index({
        name: search.value
    })
}
const openUpdate = (item: Bussiness) => {
    itemH.value = item
    const itemUpdate: BussinessUpdate = {
        id: item.id,
        address: item.attributes.address,
        code_phone: item.attributes.code_phone,
        country_id: item.attributes.country_id,
        department_id: item.attributes.department_id,
        name: item.attributes.name,
        nic: item.attributes.nic,
        phone: item.attributes.phone,
        municipalitie_id: item.attributes.municipalitie_id,
        verified: item.attributes.verified,

        address_verification: item.relationships?.kyc?.attributes.url_aws_address_verification ?? '',
        banking_certification: item.relationships?.kyc?.attributes.url_aws_banking_certification ?? '',
        chamber_commerce_certificate: item.relationships?.kyc?.attributes.url_aws_chamber_commerce_certificate ?? '',
        rut: item.relationships?.kyc?.attributes.url_aws_rut ?? '',
        shareholding_structure: item.relationships?.kyc?.attributes.url_aws_shareholding_structure ?? '',

    }
    formCrud.value = {
        ...itemUpdate,
        phoneFormat: `+${itemUpdate.code_phone}${itemUpdate.phone}`
    }
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
                rules: [
                    validator.required
                ],
                colClass: ['v-col-12 v-col-sm-6']
            },
            {
                label: 'Nit',
                type: 'text',
                valueForm: 'nic',
                colClass: ['v-col-12 v-col-sm-6'],
                rules: [
                    validator.required
                ]
            },
            {
                label: t("views.users.phone"),
                valueForm: "phoneFormat",
                rules: [],
                type: "phone",
                phone: {
                    fieldCode: "code_phone",
                    fieldPhone: "phone",
                    fieldValid: "phoneIsValid",
                },
            },
        ]
    },
    {
        fields: [
            {
                label: t('views.countries.title'),
                type: 'select',
                valueForm: 'country_id',
                colClass: ['v-col-12 v-col-sm-6'],
                rules: [
                    validator.required
                ],
                select: {
                    items: countries,
                    itemTitle: 'attributes.name',
                    itemValue: 'id'
                }
            },
            {
                label: t('views.departaments.title'),
                type: 'select',
                valueForm: 'department_id',
                colClass: ['v-col-12 v-col-sm-6'],
                rules: [
                    validator.required
                ],
                select: {
                    items: departaments,
                    itemTitle: 'attributes.name',
                    itemValue: 'id'
                }
            },
            {
                label: 'municipio',
                type: 'select',
                valueForm: 'municipalitie_id',
                colClass: ['v-col-12 v-col-sm-6'],
                rules: [
                    validator.required
                ],
                select: {
                    items: municipalities,
                    itemTitle: 'attributes.name',
                    itemValue: 'id'
                }
            }
        ]
    },
    {
        fields: [
            {
                text: '<div class="text-primary">Composición Accionaria</div>',
                label: 'corrresponde a un certificado emitido por el contador de la empresa',
                type: 'image',
                valueForm: 'shareholding_structure',
                rules: [ validator.required ]
            },
            {
                text: '<div class="text-primary">Certificado camara de comercio</div>',
                label: '',
                type: 'image',
                valueForm: 'chamber_commerce_certificate',
                rules: [ validator.required ]
            },
            {
                text: '<div class="text-primary">Rut</div>',
                label: '',
                type: 'image',
                valueForm: 'rut',
                rules: [ validator.required ]
            },
            {
                text: '<div class="text-primary">Certificacion Bancaria</div>',
                label: '',
                type: 'image',
                valueForm: 'banking_certification',
                rules: [ validator.required ]
            },
            {
                text: '<div class="text-primary">Verificacion Domicion</div>',
                label: '',
                type: 'image',
                valueForm: 'address_verification',
                rules: [ validator.required ]
            },
        ]
    },
]

const headers: Head[] = [

    {
        name: t('general-views.name'),
        value: 'attributes.name',
    },
    {
        name: 'nic',
        value: 'attributes.nic',
    },
    {
        name: 'usuario',
        value: 'relationships.user.attributes.fullname',
    },

]

const postCurrency = async (item: CurrencyCreate) => {
    const data = new FormData()

    for(let key in formCrud.value){
        if(key == 'icon'){
            continue
        }
        data.append(key,formCrud.value[key])
    }
    const url = clickIn.value == 'Create' ? 'currency' : `currency/${itemH.value}`
    const method = clickIn.value == 'Create' ? 'post' : 'put'
    // const res = (await helper.http(url, method,{data}))
    console.log(data)
    // return
    const res = clickIn.value == 'Edit' 
            ? await helper.put(itemH.value.id, data)
            : await helper.create(data)

    if (res === false) return
    formRef.value.reset()
    openModalCrud.value = false
    helper.index()
}
</script>

<style scoped>

</style>