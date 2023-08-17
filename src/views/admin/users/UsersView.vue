<template>
    <div v-if="helper.clickIn != 'Show'">
        <div class="d-flex justify-space-between flex-column flex-sm-row mb-8">
            <h3 class="text-primary">Lista de {{ $t("views.users.title", 2) }}</h3>
            <SearchInputComponentVue v-model="search" @onSearch="getSearch" />
            <div>
                <VBtn @click="openModal" prepend-icon="mdi-plus" class="rounded-xl">
                    {{ $t("buttons.add") }}
                </VBtn>
            </div>
        </div>
        <!-- <VBtn @click="openModal">{{ $t('buttons.create') }}</VBtn> -->
        <v-tabs class="mb-5" v-model="role_id" color="primary">
            <v-tab v-for="(role, i) in userStore.roles.filter(role => role.id)" :value="role.id">
                {{ role.attributes.name }}
            </v-tab>
        </v-tabs>
        <CrudComponent
            :singular="$t('views.users.title', 2)"
            :rows="rows"
        ></CrudComponent>
        <TableComponentVue
            :optionsHabilit="true"
            icon-show
            icon-update
            icon-delete
            text-delete="Desactivar"
            :headers="headers"
            :items="helper.items"
            new-buttons
            @show="showDetailUser"
            @update="openUpdate"
        >
            <template #cel-attributes.username="{ data }">
                <span class="text-primary">
                    {{ data.attributes.username }}
                </span>
            </template>

            <template #cel-verificate-state="{ data }">
                <span class="text-table">
                    <VIcon
                        :icon="CheckedIcon"
                        :color="emailVerificated(data) ? 'success' : 'inactive'"
                    >
                    </VIcon>
                    Email
                </span>
                <span class="text-table">
                    <VIcon
                        :icon="CheckedIcon"
                        :color="phoneVerificated(data) ? 'success' : 'inactive'"
                    >
                    </VIcon>
                    Teléfono
                </span>
                <span class="text-table">
                    <VIcon
                        :icon="CheckedIcon"
                        :color="kycVerificated(data) ? 'success' : 'inactive'"
                    >
                    </VIcon>
                    Kyc
                </span>
            </template>
            <!-- Botones -->
            <template #newButtons="{ data }">
                <OptionsMenu
                    :user="data"
                    @click:send-email="
                        openModalSendNotification(data, TypeNotification.EMAIL)
                    "
                    @click:send-sms="
                        openModalSendNotification(data, TypeNotification.SMS)
                    "
                >
                </OptionsMenu>
            </template>
        </TableComponentVue>
    </div>
    <send-message
        ref="sendMessageRef"
        :user="userSelect!"
        @close-modal="userSelect = undefined"
        :type="typeNotification!"
    >
    </send-message>
    <DetailUserView
        v-if="userSelect && helper.clickIn == 'Show'"
        :user="userSelect!"
        @back="
            userSelect = undefined;
            helper.clickIn = '';
        "
    />
</template>

<script setup lang="ts">
import DetailUserView from "@/views/admin/users/DetailUser/DetailUserView.vue";
import SendMessage from "./OptionsMenu/SendMessage.vue";
import CrudComponent from "@/components/global/CrudComponent.vue";
import TableComponentVue from "@/components/global/TableComponent.vue";
import { helperStore } from "@/helper";
import type { Row } from "@/interfaces/FormComponent.helper";
import type { Head } from "@/interfaces/TableComponent.helper";
import { UserStore } from "@/stores/UserStore";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import CheckedIcon from "@/assets/icons/CheckedIcon.vue";
import { TypeNotification, type User } from "@/interfaces/User/User.model";
import { KYC_STATUS } from "@/enums/Kyc.enum";
import { ref, watch } from "vue";
import SearchInputComponentVue from "@/components/global/SearchInputComponent.vue";
import OptionsMenu from "./OptionsMenu/OptionsMenu.vue";
import type { Profile } from "@/interfaces/User/User.dto";
import { computed } from "vue";

const helper = helperStore();
helper.url = "users";

const role_id = ref<number | "">("");

const typeNotification = ref<TypeNotification>();
const sendMessageRef = ref<InstanceType<typeof SendMessage> | null>();
const userSelect = ref<User>();

const openModalSendNotification = (
    user: User,
    typeNotificationI: TypeNotification
) => {
    userSelect.value = user;
    typeNotification.value = typeNotificationI;
    sendMessageRef.value!.modal = true;
};

// helper.index();
const search = ref<string>("");
const getSearch = () => {
    helper.index({
        name: search.value,
        role_id: role_id.value,
    });
};
const userStore = UserStore();
userStore.getDepartaments();
userStore.getMunicipalities();
userStore.getUsers();

userStore.getRoles().then(() => {
    if (userStore.roles.length > 0) {
        role_id.value = userStore.roles[1].id;
    }
    getSearch();
});
userStore.getCountries();
userStore.getTypeDocuments();

watch(role_id, () => {
    getSearch();
});

const { departaments, municipalities, users, roles, countries, typeDocuments } =
    storeToRefs(userStore);

const openModal = async () => {
    itemH.value = {};
    formCrud.value = {};
    clickIn.value = "Create";
    openModalCrud.value = true;
};
const { t } = useI18n();
const {
    formCrud,
    openModalCrud,
    item: itemH,
    clickIn,
    formRef,
} = storeToRefs(helper);

const rows: Row[] = [
    {
        fields: [
            {
                label: t("views.users.first_name"),
                type: "text",
                colClass: ['v-col-12 v-col-md-3 v-col-sm-6'],
                valueForm: "first_name",
            },
            {
                label: t("views.users.second_name"),
                type: "text",
                colClass: ['v-col-12 v-col-md-3 v-col-sm-6'],
                valueForm: "second_name",
            },
            {
                label: t("views.users.last_name"),
                type: "text",
                colClass: ['v-col-12 v-col-md-3 v-col-sm-6'],
                valueForm: "last_name",
            },
            {
                label: t("views.users.second_last_name"),
                type: "text",
                colClass: ['v-col-12 v-col-md-3 v-col-sm-6'],
                valueForm: "second_last_name",
            },
        ],
    },
    {
        fields: [
            {
                label: t("views.users.email"),
                type: "text",
                valueForm: "email",
            },
            {
                label: t("views.users.password"),
                type: "text",
                valueForm: "password",
            },
        ],
    },
    {
        fields: [
            {
                label: t('views.users.phone'),
                valueForm: 'phoneFormat',
                rules: [
                ],
                colClass: ['v-col-12 v-col-sm-6'],
                type: 'phone',
                phone: {
                    fieldCode: 'code_phone',
                    fieldPhone: 'phone',
                    fieldValid: 'phoneIsValid'
                }
            },
            {
                label: t("views.users.username"),
                type: "text",
                valueForm: "username",
            },
        ],
    },
    {
        fields: [
            {
                label: t("views.users.referred_by"),
                type: "select",
                colClass: ['v-col-12 v-col-sm-4'],
                valueForm: "referred_by",
                select: {
                    items: users,
                    itemTitle: "attributes.username",
                    itemValue: "id",
                },
            },
            {
                label: t("views.roles.title"),
                type: "select",
                colClass: ['v-col-12 v-col-sm-4'],
                valueForm: "role_id",
                select: {
                    items: roles,
                    itemTitle: "attributes.name",
                    itemValue: "id",
                },
            },
            {
                label: t("views.countries.title"),
                type: "select",
                colClass: ['v-col-12 v-col-sm-4'],
                valueForm: "country_id",
                select: {
                    items: countries,
                    itemTitle: "attributes.name",
                    itemValue: "id",
                },
            },
        ],
    },
    {
        fields: [
            {
                label: t("views.departments.title"),
                type: "select",
                colClass: ['v-col-12 v-col-sm-6'],
                valueForm: "department_id",
                select: {
                    items: departaments,
                    itemTitle: "attributes.name",
                    itemValue: "id",
                },
            },
            {
                label: t("views.municipalities.title"),
                type: "select",
                colClass: ['v-col-12 v-col-sm-6'],
                valueForm: "municipalitie_id",
                select: {
                    items: municipalities,
                    itemTitle: "attributes.name",
                    itemValue: "id",
                },
            },
        ],
    },
    {
        fields: [
            {
                label: t("views.type_documents.title"),
                type: "select",
                valueForm: "type_documents_id",
                select: {
                    items: typeDocuments,
                    itemTitle: "attributes.type_document",
                    itemValue: "id",
                },
            },
            {
                label: t("views.users.document"),
                type: "text",
                valueForm: "document",
            },
            {
                label: t("views.users.birth"),
                type: "date",
                valueForm: "birth",
            },
            {
                label: t("views.users.address"),
                colClass: ['v-col-12 v-col-sm-12'],
                type: "text",
                valueForm: "address",
            },
        ],
    },
];

const headers: Head[] = [
    {
        name: t("views.users.user"),
        value: "attributes.username",
    },
    {
        name: t("views.users.email"),
        value: "attributes.email",
    },
    {
        name: t("views.users.estate-verification"),
        value: "verificate-state",
        style: "min-width:350px",
    },
    {
        name: t("views.users.referred-by"),
        value: "",
    },
    {
        name: t("genereal-views.state"),
        value: "attributes.deleted_at",
        status: "deleted",
    },
    {
        name: t("views.users.created_at"),
        value: "attributes.created_at",
        type: "date",
        format: "YYYY-MM-DD | HH:mm:ss",
        style: "min-width:250px",
    },
];

const emailVerificated = (user: User): boolean => {
    return user.attributes.email_verified_at ? true : false;
};
const phoneVerificated = (user: User): boolean => {
    return user.attributes.phone_verified_at ? true : false;
};
const kycVerificated = (user: User): boolean => {
    return user.relationships?.kyc?.attributes.status == KYC_STATUS.ACCEPT
        ? true
        : false;
};

const showDetailUser = (user: User) => {
    userSelect.value = user;
};

const openUpdate = (user: User) => {
    const itemUpdate: Profile & {role_id:number| ''} = {
        address: user.relationships?.userDetail.attributes.address ?? '',
        birth: user.relationships?.userDetail.attributes.birth ?? '',
        code_phone: user.attributes.code_phone,
        country_id: user.relationships?.userDetail.attributes.country_id ?? '',
        department_id: user.relationships?.userDetail.attributes.department_id ?? '',
        document: user.relationships?.userDetail.attributes.document ?? '',
        email: user.attributes.email,
        first_name: user.attributes.first_name,
        last_name: user.attributes.last_name,
        municipalitie_id: user.relationships?.userDetail.attributes.municipalitie_id ?? '',
        nationality_id: user.relationships?.userDetail.attributes.nationality_id ?? '',
        phone: user.attributes.phone,
        second_last_name: user.attributes.second_last_name,
        second_name: user.attributes.second_name,
        type_documents_id: user.relationships?.userDetail.attributes.type_documents_id ?? '',
        username: user.attributes.username,
        role_id: user.relationships?.roles[0].id ?? ''
    }
    formCrud.value = itemUpdate
    openModalCrud.value = true;
}
</script>

<style scoped></style>
