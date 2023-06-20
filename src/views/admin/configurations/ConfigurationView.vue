<template>
    <h2 class="text-table font-weight-bold">{{ $t('views.configurations.title', 2) }}</h2>

    <v-card >
        <div class="border-b-md">
            <v-tabs 
                v-model="tabActive" 
                bg-color="transparent"
                >
                <v-tab 
                    v-for="item,i in tabs" 
                    :value="item.value"
                    >
                    {{item.name}}
                </v-tab>
            </v-tabs>
        </div>

        <v-card-text>
            <v-window v-model="tabActive">
                <Component :key="tabActive" :is="tabActive" />
            </v-window>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import CountryView from './countries/CountryView.vue';
import DepartamentsView from './departaments/DepartamentsView.vue';
import MunicipalitiesView from './municipalities/MunicipalitiesView.vue';
import TypeDocumentsView from './type-documents/TypeDocumentsView.vue';
import { helperStore } from '@/helper';
import { storeToRefs } from 'pinia';
import { watch , shallowRef} from 'vue';
import BanksView from './banks/BanksView.vue';
import CurrencyView from './currencies/CurrencyView.vue';
import PaymentMethodView from './PaymentMethod/PaymentMethodView.vue';
import TypeBankAccountView from './TypeBankAccount/TypeBankAccountView.vue';
import CategoriesFaqView from './Faq/CategoriesFaqView.vue';
import FaqView from './Faq/FaqView.vue';
const { t } = useI18n()
const helper = helperStore()
const tabActive = ref('')
const tabs = shallowRef<{name:string,value:any}[]>([
    {
        name: t('views.countries.title',2),
        value: CountryView
    },
    {
        name: t('views.departaments.title',2),
        value: DepartamentsView
    },
    {
        name: t('views.municipalities.title',2),
        value: MunicipalitiesView
    },
    {
        name: t('views.type_documents.title',2),
        value: TypeDocumentsView
    },
    {
        name: t('views.banks.title',2),
        value: BanksView
    },
    {
        name: t('views.currencies.title',2),
        value: CurrencyView
    },
    {
        name: t('views.type-company-account.title',2),
        value: PaymentMethodView
    },
    {
        name: t('views.type-bank-account.title',2),
        value: TypeBankAccountView
    },
    {
        name: t('views.categories-faq.title',2),
        value: CategoriesFaqView
    },
    {
        name: t('views.faq.title',2),
        value: FaqView
    },
])

</script>

<style scoped></style>