<template>
    <h2 class="text-table font-weight-bold">{{ $t('views.profile.title') }}</h2>
    

    <!-- <v-card > -->
        <div class="border-b-md">
            <v-tabs v-model="menuActive" bg-color="transparent" show-arrows>
                <v-tab
                    v-for="(item, i) in tabs"
                    @click.prevent="clickInTab(i, item,item.nameRoute)"
                    :value="item.name"
                >
                    <span
                        :class="
                            menuActive == item.name
                                ? 'text-primary'
                                : 'text-tab'
                        "
                        v-if="!item.children"
                        >{{ item.name }}</span
                    >
                    <v-menu v-else class="w-100 h-100" v-model="menusOpened[i]">
                        <template v-slot:activator="{ props }">
                            <v-btn
                                variant="plain"
                                rounded="0"
                                class="align-self-center font-weight-bold w-100 h-100"
                                height="100%"
                                v-bind="props"
                                :color="
                                    item.children.some(
                                        (ch) => ch.name === submenuActive
                                    )
                                        ? 'primary'
                                        : 'tab'
                                "
                            >
                                {{ item.name }}
                                <v-icon end icon="mdi-menu-down"></v-icon>
                            </v-btn>
                        </template>

                        <v-list class="bg-grey-lighten-3 border-primary rounded-xl">
                            <v-list-item
                                v-for="(child, j) in item.children"
                                :key="j"
                                @click="
                                    clickInSubMenu(
                                        child.value,
                                        child.name,
                                        item.name,
                                        child.nameRoute
                                    )
                                "
                                :active="submenuActive == child.name"
                                color="primary"
                            >
                                {{ child.name }}
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-tab>
            </v-tabs>
        </div>

        <v-card-text>
            <v-window v-model="tabActive">
                <!-- <Component :key="tabActive" :is="tabActive" /> -->
                <RouterView />
            </v-window>
        </v-card-text>
    <!-- </v-card> -->
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import PersonalData from './Profile/PersonalData.vue';
import { helperStore } from '@/helper';
import { storeToRefs } from 'pinia';
import { watch , shallowRef} from 'vue';
import KycView from './Kyc/KycView.vue';
import WalletView from './wallet/WalletView.vue';
import BankAccountView from './Accounts/Bank/BankAccountView.vue';
import OtherAccountView from './Accounts/Other/OtherAccountView.vue';
import ReferredView from './Refer/ReferredView.vue'
import PasswordTab from '../admin/profile/PasswordTab.vue';
import { useRoute, useRouter } from 'vue-router';

const { t } = useI18n()
const helper = helperStore()
const tabActive = ref(PersonalData)
const tabs = shallowRef<ItemTab[]>([
    {
        name: t('views.profile.personal-data.title'),
        value: PersonalData,
        nameRoute: 'user-personal-data'
    },
    
    {
        name: t('views.wallets.title',2),
        value: WalletView,
        nameRoute: 'user-wallets'
    },
    {
        name: t('views.accounts.title',2),
        value: 'cuentas',
        nameRoute: '#',
        children:[
            {
                name: t("views.company-accounts.bank.title", 2),
                value: BankAccountView,
                nameRoute: 'user-bank-accounts'

            },
            // {
            //     name: t("views.company-accounts.efecty.title", 2),
            //     value: EfectyAccountCompanyView,
            // },
            {
                name: t("views.company-accounts.other.title", 2),
                value: OtherAccountView,
                nameRoute: 'user-other-accounts'

            },
        ]
    },
    {
        name: t('views.refer.title',2),
        value: ReferredView,
        nameRoute: 'user-referreds'
    },
    {
        name: 'Contraseñas',
        value: PasswordTab,
        nameRoute: 'user-password'
    },
])

if(!(!!localStorage.getItem('2fa'))){
    tabs.value.push({
        name: t('views.profile.kyc.title'),
        value: KycView,
        nameRoute: 'user-kyc'
    },)
}


const submenuActive = ref("");
const menuActive = ref(t('views.profile.personal-data.title'));
const router = useRouter()

const clickInSubMenu = (
    component: any,
    name: string,
    parent: string,
    to: string
) => {
    submenuActive.value = name;
    tabActive.value = component;
    menuActive.value = parent;
    router.push({name:to})
};

const menusOpened = ref(
    tabs.value.filter((item) => item.children).map((item) => false)
);

const clickInTab = (
    i: number,
    item: ItemTab,
    to: string
    ) => {
    menusOpened.value[i] = true;
    submenuActive.value = "";
    if (!item.children) {
        tabActive.value = item.value;
        menuActive.value = item.name;
        router.push({name:to})
    }
};

const route = useRoute()
const verificatedUrl = ():void => {
    const itemChildren = tabs.value.filter(t => t.children)
                            .find(
                                t => t.children!.find( t => t.nameRoute == route.name)
                            )
                            
    if(itemChildren){
        const children = itemChildren.children?.find( t => t.nameRoute == route.name)!
        submenuActive.value = children.name;
        menuActive.value = itemChildren.name;
        return
    }
    const item = tabs.value.find( t => t.nameRoute == route.name)!
    menuActive.value = item.name;
}
verificatedUrl()
interface ItemTab {
    name: string;
    value: any;
    nameRoute: string;
    children?: ItemTab[];
}
</script>

<style scoped></style>