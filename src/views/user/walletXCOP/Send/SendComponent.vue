<template>
    <div class="d-flex justify-space-around w-100">
        <!-- <div>
            <VBtnPrimary
                :active="clickIn == 'inner'"
                density="compact"
                variant="outlined"
                class=""
                @click="clickIn = 'inner'"
            >
                Usuario Xeler
            </VBtnPrimary>
        </div>
        
        <div v-if="false">
            <VBtnDangerT
                :active="clickIn == 'external'"
                density="compact"
                variant="outlined"
                style="background-color: white !important"
                @click="clickIn = 'external'"
            >
                Dirección Externa
            </VBtnDangerT>
        </div> -->
    </div>
    <div class="mt-3 text-center">
        <VBtn variant="outlined" @click="showCamera = !showCamera" rounded="xl"
            >Escanear QR</VBtn
        >
        <div v-if="showCamera" class="center stream">
            <QrcodeStream @detect="qrDecode" class="my-3">
                <div style="color: #5043E8" class="frame"></div>
            </QrcodeStream>
        </div>
        <code>{{ qrCode }}</code>
    </div>
    <div class="w-100 text-center mt-5">
        <VMenu v-model="openUsers">
            <template #activator="{ props }">
                <VLabel
                    class="pl-3 text-capitalize font-weight-light text-table"
                    style=""
                >
                    Email o Usuario
                </VLabel>
                <div class="border-primary rounded-xl">
                    <VTextField
                        rounded="xl"
                        class="rounded-pill"
                        color="transparent"
                        bgColor="transparent"
                        density="compact"
                        hideDetails
                        singleLine
                        v-model="searchUser"
                        v-bind="props"
                    >
                        <template #append-inner>
                            <span
                                @click="getUser"
                                class="text-primary cursor-pointer"
                            >
                                <VIcon
                                    icon="mdi-account-search"
                                    color="primary"
                                />
                            </span>
                        </template>
                    </VTextField>
                </div>
            </template>
            <v-card min-width="250" elevation="50" class="rounded-xl">
                <v-list class="">
                    <v-list-item
                        class="cursor-pointer"
                        v-for="(user, i) in users"
                        :key="i"
                        :title="user.attributes.username"
                        @click="clickInUser(user)"
                        :subtitle="getFullNameParse(user)"
                    >
                    </v-list-item>
                </v-list>
            </v-card>
        </VMenu>
        <div class="my-3" />
        <span
            v-if="users.find((u) => u.id.toString() == form.user_receipt_id)"
            class="text-table"
        >
            Nombre:
            {{
                getFullNameParse(
                    users.find((u) => u.id.toString() == form.user_receipt_id)!
                )
            }}
        </span>
        <br />
        <InputComponentVue
            name="Cantidad a enviar"
            v-model="form.xcop_send"
            :events="eventsXcop"
            appendText="XCOP"
        >
        </InputComponentVue>
        <div class="my-4" />

        <InputComponentVue
            v-if="clickIn == 'external'"
            name="Dirección Destino"
            v-model="form.xcop_send"
            :events="eventsXcop"
        >
        </InputComponentVue>
    </div>
    <div class="text-center mt-6">
        <VBtnPrimary
            @click="sendXcop"
            :disabled="form.user_receipt_id == '' || form.xcop_send == ''"
            >Enviar</VBtnPrimary
        >
    </div>
    <div class="mt-3 font-weight-regular">
        <VAlert
            class="border-primary-alert px-2"
            color="primary"
            variant="tonal"
            density="compact"
        >
            <div class="d-flex gap-2">
                <div class="my-auto">
                    <VIcon icon="mdi-information" color="primary" />
                </div>
                <div class="text-13 line-height-15">
                    Las transacciones internas se abonan de manera imediata en
                    la cuenta del usuario y son 100% gratuitas.
                </div>
            </div>
        </VAlert>
        <div class="mt-2 text-table text-13 text-center line-height-15">
            Cualquier envio erroneo es responsabilidad del usuario, verifica
            todos los datos con precaucion.
        </div>
    </div>
</template>

<script setup lang="ts">
import InputComponentVue from "@/components/InputComponent.vue";
import { formatNumberStringToNumber, helperStore } from "@/helper";
import type { EventComponent } from "@/interfaces/Components.helper";
import type { User } from "@/interfaces/User/User.model";
import { UserStore } from "@/stores/UserStore";
import { amountFormat, keyPressIsNumber } from "@/validator";
import { reactive, ref } from "vue";
import type { TransactionXCOPCreate } from "@/interfaces/TransactionXCOP/TransactionXCOP.dto";
import dayjs from "dayjs";
import { QrcodeStream } from "vue-qrcode-reader";
import { TwoFactorAuthStore } from "@/stores/TwoFactorAuthStore";

const helper = helperStore();
const userStore = UserStore();
const showCamera = ref(false);
const twoFactor = TwoFactorAuthStore();
const emits = defineEmits<{
    (
        e: "send",
        value: {
            user: string;
            amount: number;
            date: string;
            number_transaction: string;
        }
    ): void;
}>();
const qrCode = ref<any>();
const qrDecode = (value: any) => {
    if(!value) {
        return
    }
    const format_code = value[0].format
    if(format_code !== 'qr_code'){
        return
    }
    const rawValue = JSON.parse(value[0].rawValue as string)
    // qrCode.value = value;
    searchUser.value = rawValue.username
    form.user_receipt_id = rawValue.user_id
    form.xcop_send = rawValue.amount as number
    showCamera.value = false
};
const clickIn = ref<ClickIn>("");
const form = reactive<TransactionXCOPCreate>({
    user_receipt_id: "",
    xcop_send: "",
});
userStore.updateUserAuth();

const eventsXcop: EventComponent = {
    keypress: (event: any) => {
        if (!keyPressIsNumber(event) && event.key != "Backscape") {
            event.preventDefault();
            return;
        }
        // amountFiat.value = amountFormat(event)
    },
    keyup: (event: any) => {
        form.xcop_send = amountFormat(event, 1);
    },
};

const searchUser = ref("");

const openUsers = ref(false);
const users = ref<User[]>([]);
const getUser = async () => {
    openUsers.value = false;
    try {
        const url = "users";
        const params = {
            user: searchUser.value,
        };
        const res = await helper.http(url, "get", { params });
        if (res.data.response) {
            users.value = res.data.response.splice(0, 3);
            // (res.data.response as User[]).forEach((user) => {
            //     users.push(user);
            // });
        }
    } catch (e) {}
    openUsers.value = true;
};

const getFullNameParse = (user: User): string => {
    const newName = user.attributes.first_name
        ? user.attributes.first_name[0] + user.attributes.first_name[1] + "***"
        : "***";
    const newLastname = user.attributes.last_name
        ? user.attributes.last_name[0] + user.attributes.last_name[1] + "***"
        : "***";
    return `${newName} ${newLastname}`;
};

const clickInUser = (user: User) => {
    form.user_receipt_id = user.id;
    searchUser.value = user.attributes.username;
};

const sendXcop = async () => {
    // if (localStorage.getItem("2fa")) {
        twoFactor.modal = true;
        twoFactor.newFlow = true;
        twoFactor.callback = {
            fn: completeSend,
        };
        // twoFactor.ejectFunction2(changePassword)
        return;
    // }
    completeSend();
};

const completeSend = async () => {
    try {
        const url = "users/send/xcop";
        const data = {
            user_receipt_id: form.user_receipt_id,
            xcop_send: formatNumberStringToNumber(form.xcop_send as string),
        };
        const res = (await helper.http(url, "post", { data })).data as Res;

        helper.showNotify("XCOP enviados correctamente", { type: "success" });
        form.user_receipt_id = "";
        form.xcop_send = "";
        searchUser.value = "";
        userStore.updateUserAuth();
        emits("send", {
            amount: res.details.attributes.quantity,
            date: dayjs(res.details.attributes.created_at).format(
                "YYYY-MM-DD | HH:mm"
            ),
            number_transaction: res.details.attributes.tranx_no,
            user: res.user_send.attributes.username,
        });
    } catch (e) {}
};
type ClickIn = "inner" | "external" | "";

interface Res {
    message: string;
    user: User;
    user_send: User;
    details: Details;
}

interface Details {
    id: number;
    attributes: Attributes3;
    relationships: any[];
}

interface Attributes3 {
    tranx_no: string;
    user_send: number;
    user_receipt: number;
    quantity: number;
    created_at: string;
    updated_at: string;
    deleted_at?: any;
}
</script>

<style scoped lang="scss">
@import "@/scss/variables.scss";

.border-primary-alert {
    border: 1px solid $color-primary;
}
.stream {
    max-height: 500px;
    max-width: 500px;
    margin: auto;
}
.frame {
    border-style: solid;
    border-width: 2px;
    border-color: #5043E8;
    height: 200px;
    width: 200px;
    position: absolute;
    top: 0px;
    bottom: 0px;
    right: 0px;
    left: 0px;
    margin: auto;
}
</style>
