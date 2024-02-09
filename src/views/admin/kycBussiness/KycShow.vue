<template>
    <div class="d-flex justify-space-between mx-5 mb-2 flex-column flex-sm-row">
        <h2
            class="text-table font-weight-bold"
            v-html="$t('views.admin.kyc.show.title', { fullname: fullname })"
        ></h2>

        <VBtnSecondary @click="back">
            {{ $t("general-views.back") }}
        </VBtnSecondary>
    </div>
    <VDivider class="" />

    <div class="mt-10 d-lg-flex">
        <div
            class="px-2 border-primary rounded-lg text-table font-weight-bold py-5 mx-auto"
            style="max-width: 345px; max-height: 540px;"
        >

            <VRow class="justify-space-between" dense>
                <VCol cols="12" sm="7"  class="pb-0 mb-0">
                    Nombre de Empresa:
                </VCol>
                <VCol cols="12" sm="5" class="text-center">
                    {{ kyc.relationships?.company.attributes.name}}
                </VCol>

                <VCol cols="12" sm="7" class="pb-0 mb-0">
                    Dirección:
                </VCol>
                <VCol cols="12" sm="5" class="text-center">
                    {{ kyc.relationships?.company.attributes.address }}
                </VCol>

                <VCol cols="12" sm="7" class="pb-0 mb-0">
                    NIC:
                </VCol>
                <VCol cols="12" sm="5" class="text-center">
                    {{ kyc.relationships?.company.attributes.nic }}
                </VCol>

                <VCol cols="12" sm="7" class="pb-0 mb-0">
                    Teléfono:
                </VCol>
                <VCol cols="12" sm="5" class="text-center">
                    {{ kyc.relationships?.company.attributes.code_phone }} {{ kyc.relationships?.company.attributes.phone }}
                </VCol>

                <VCol cols="12" sm="7"> Departamento: </VCol>
                <VCol cols="12" sm="5" class="text-center">
                    {{ kyc.relationships?.company.relationships?.department?.attributes.name ?? '' }}
                </VCol>

                <VCol cols="12" sm="7"> Municipio : </VCol>
                <VCol cols="12" sm="5" class="text-center">
                    {{ kyc.relationships?.company.relationships?.municipalitie?.attributes.name ?? '' }}
                </VCol>

            </VRow>
        </div>

        <!-- Imagenes del kyc -->
        <VRow class="my-auto ml-3 mx-auto" style="gap: 15px">
            <VCol
                :class="$vuetify.display.mdAndDown ? 'mt-10' : ''"
                class="mx-auto"
                style="min-width: 210px; max-width: 210px"
                v-for="(image, i) in images"
                :key="i + ' ' + image.status"
            >
                <div class="text-center">
                    <span class="text-18 font-weight-light text-table">{{
                        image.name
                    }}</span>
                </div>
                <VCard
                    elevation="0"
                    style="min-width: 210px; max-width: 210px"
                    class="mx-auto bg-sky-1"
                >
                    <template #title>
                        <div class="d-flex justify-center">
                            <VImg
                                class=""
                                :style="`transform: rotate(${
                                    rotateImg[image.value]
                                }deg);`"
                                v-if="image.image"
                                sizes="180px"
                                :src="image.image"
                            >
                                <template #error>
                                    <VIcon
                                        class=""
                                        size="180"
                                        icon="mdi-image-off-outline"
                                    ></VIcon>
                                </template>
                            </VImg>
                        </div>
                    </template>
                    <VCardText class="mb-0 pb-1 d-flex">
                        <div class="d-flex gap-2">
                            <VIcon
                                @click="rotateImg[image.value] -= 45"
                                class="cursor-pointer"
                                :icon="ArrowLeft"
                            />
                            <VIcon
                                @click="rotateImg[image.value] += 45"
                                class="cursor-pointer"
                                :icon="ArrowRight"
                            />
                        </div>
                        <VSpacer></VSpacer>
                        <div>
                            <VIcon
                                class="cursor-pointer"
                                :icon="ZoomOut"
                                @click="showImgZoom(image.image, image.value)"
                            />
                        </div>
                    </VCardText>
                </VCard>

                <div
                    class="d-flex mt-2"
                    style="width: 210px"
                    v-if="image.status === KYC_STATUS.IN_VERIFICATION"
                >
                    <VBtnSuccess
                        class="text-uppercase font-weight-bold"
                        style=""
                        elevation="10"
                        @click="rejectOrAccept(image.value, 'accept')"
                    >
                        Aprobar
                    </VBtnSuccess>
                    <VSpacer />
                    <VBtnDanger
                        @click="rejectOrAccept(image.value, 'reject')"
                        class="text-uppercase font-weight-bold"
                        style=""
                        elevation="10"
                    >
                        Rechazar
                    </VBtnDanger>
                </div>
                <div v-else class="w-100 mt-2 text-center">
                    <VChip
                        class="mx-auto font-weight-bold text-uppercase"
                        :color="
                            image.status === KYC_STATUS.ACCEPT ? 'ok' : 'erro'
                        "
                        variant="outlined"
                    >
                        {{ image.status }}
                    </VChip>
                </div>
            </VCol>
            <DialogGlobal :dialog="openModal" @close-dialog="openModal = false">
                <template #content>
                    <VImg
                        :style="`transform: rotate(${rotateImageModal}deg);`"
                        :src="imgModal"
                    ></VImg>
                </template>
            </DialogGlobal>
        </VRow>
    </div>
</template>

<script setup lang="ts">
import { helperStore } from "@/helper";
import type { Kyc } from "@/interfaces/User/Kyc/Kyc.model";
import { computed, ref } from "vue";
import dayjs from "dayjs";
import ArrowLeft from "@/assets/icons/kyc/GireLeftIcon.vue";
import ArrowRight from "@/assets/icons/kyc/GireRightIcon.vue";
import ZoomOut from "@/assets/icons/kyc/ZoomOutIcon.vue";
import { useI18n } from "vue-i18n";
import { KYC_STATUS } from "@/enums/Kyc.enum";
import DialogGlobal from "@/components/global/DialogGlobal.vue";
import type { BussinessKyc } from "@/interfaces/Bussiness/Bussiness.model";

const emits = defineEmits<{
    (e: "back"): void;
}>();
const { t } = useI18n();
const helper = helperStore();
const kyc = ref<BussinessKyc>(helper.item);

const back = () => {
    helper.clickIn = "";
    emits("back");
};
const fullname = computed((): string => {
    const user = kyc.value.relationships!.company.relationships!.user!;
    return user.attributes.first_name + " " + user.attributes.last_name;
});
const user = kyc.value.relationships!.company.relationships!.user;

const getDateLastConnection = (): string => {
    const last_connection =
        user?.relationships?.last_connection.attributes.created_at;
    return dayjs(last_connection).format("YYYY-MM-DD | HH:mm:ss");
};

const images = computed(
    (): {
        value: imageType;
        name: string;
        image: string;
        status: KYC_STATUS;
    }[] => {
        return [
            {
                name: 'Composición Accionaria',
                image:
                    kyc.value.attributes.url_aws_shareholding_structure ?? "",
                status: kyc.value.attributes.shareholding_structure_status as KYC_STATUS,
                value: "shareholding_structure",
            },
            {
                name: 'Certificado camara de comercio',
                image:
                    kyc.value.attributes.url_aws_chamber_commerce_certificate ?? "",
                status: kyc.value.attributes.chamber_commerce_certificate_status as KYC_STATUS,
                value: "chamber_commerce_certificate",
            },
            {
                name: 'Rut',
                image:
                    kyc.value.attributes.url_aws_rut ?? "",
                status: kyc.value.attributes.rut_status as KYC_STATUS,
                value: "rut",
            },
            {
                name: 'Certificacion Bancaria',
                image:
                    kyc.value.attributes.url_aws_banking_certification ?? "",
                status: kyc.value.attributes.banking_certification_status as KYC_STATUS,
                value: "banking_certification",
            },
            {
                name: 'Verificacion Domicion',
                image:
                    kyc.value.attributes.url_aws_address_verification ?? "",
                status: kyc.value.attributes.address_verification_status as KYC_STATUS,
                value: "address_verification",
            },
        ];
    }
);

const rejectOrAccept = async (type: imageType, action: keyof Actions) => {
    const company_id = kyc.value.relationships?.company.id
    const data = {
        field: type,
        status: action
    };
    
    const url = `companys/kyc/${company_id}`;
    const res = (await helper.http(url, "put", { data })).data.response as BussinessKyc;

    kyc.value = res;
};

const openModal = ref(false);
const imgModal = ref("");
const rotateImg = ref({
    chamber_commerce_certificate: 0,
    rut: 0,
    banking_certification: 0,
    address_verification: 0,
    shareholding_structure: 0,
});
const rotateImageModal = ref(0);
const showImgZoom = (src: string, type: imageType) => {
    imgModal.value = src;
    openModal.value = true;
    rotateImageModal.value = rotateImg.value[type];
};
// --------------------------------
type imageType = "shareholding_structure" |
"chamber_commerce_certificate" | 
"rut" | 
'banking_certification' | 
'address_verification';

const actions = {
    reject: KYC_STATUS.REJECT,
    accept: KYC_STATUS.ACCEPT,
};

interface Actions {
    reject: KYC_STATUS;
    accept: KYC_STATUS;
}

interface putKyc {
    status_all?: KYC_STATUS;
    front_identity_document_status?: KYC_STATUS;
    reverse_identity_document_status?: KYC_STATUS;
    selfie_identity_document_status?: KYC_STATUS;
}
</script>

<style lang="scss">
@import "@/scss/variables.scss";

.border-primary {
    border: 1px solid;
    border-color: $color-primary !important;
}
</style>
