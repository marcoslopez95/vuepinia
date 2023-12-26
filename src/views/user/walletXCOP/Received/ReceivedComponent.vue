<template>
    <div class="w-100 text-center mt-5">
        <InputComponentVue
            name="Cantidad a Recibir"
            v-model="amount"
            :events="eventsXcop"
            appendText="XCOP"
        >
        </InputComponentVue>
    </div>
    <div class="my-3 " >
        <VAlert
            class="border-primary-alert px-2 cursor-pointer"
            color="primary"
            variant="outlined"
            density="compact"
            rounded="lg"
            @click="showQr = !showQr"
        >
            <div class="d-flex gap-2">
                <div class="my-auto">
                    <VIcon icon="mdi-qrcode" color="table" />
                </div>
                <div class="font-16 text-center w-100 text-table">
                    {{ showQr ? 'Ocultar' : 'Mostrar'  }} QR
                </div>
            </div>
        </VAlert>
        <div class="text-center mt-2" v-if="showQr">
            <QrcodeVue
            class="order-1 order-lg-0"
            foreground="#5043E8"
            :value="getDataForQr"
            render-as="svg"
            :size="$vuetify.display.mdAndDown ? 217 : 130"
        >
        </QrcodeVue>
        <br>
        <span class="text-table ">Por favor Scanee el código desde Xeler</span>
        </div>
    </div>
    <div  class="mt-3 font-weight-regular">
        <!-- <VAlert
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
        </VAlert> -->
        <div class="mt-2 text-table text-13 text-center line-height-15">
            Cualquier envio erroneo es responsabilidad del usuario, verifica
            todos los datos con precaucion.
        </div>
    </div>
</template>

<script setup lang="ts">
import InputComponentVue from "@/components/InputComponent.vue";
import { formatNumberStringToNumber, getUserAuth, helperStore } from "@/helper";
import type { EventComponent } from "@/interfaces/Components.helper";
import type { User } from "@/interfaces/User/User.model";
import { UserStore } from "@/stores/UserStore";
import { amountFormat, keyPressIsNumber } from "@/validator";
import { reactive,  ref,computed } from "vue";
import type { TransactionXCOPCreate } from '@/interfaces/TransactionXCOP/TransactionXCOP.dto'
import dayjs from "dayjs";
import QrcodeVue from "qrcode.vue";

const amount = ref('')
const getDataForQr = computed(() => JSON.stringify({
    user_id: getUserAuth().id,
    username: getUserAuth().username,
    amount: formatNumberStringToNumber(amount.value)
}));

const showQr = ref(false)
//...................
const helper = helperStore();
const userStore = UserStore();
const emits = defineEmits<{
    (e: 'send', value: {
        user:string,
        amount:number,
        date:string,
        number_transaction: string
    }):void
}>()
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
        amount.value = amountFormat(event,1);
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
            users.value = res.data.response 
            // (res.data.response as User[]).forEach((user) => {
            //     users.push(user);
            // });
        }
    } catch (e) {}
    openUsers.value = true;
};

const getFullNameParse = (user: User): string => {
    const newName = user.attributes.first_name
        ? user.attributes.first_name[0] + "***"
        : "***";
    const newLastname = user.attributes.last_name
        ? user.attributes.last_name[0] + "***"
        : "***";
    return `${newName} ${newLastname}`;
};

const clickInUser = (user: User) => {
    form.user_receipt_id = user.id;
    searchUser.value = user.attributes.username;
};

const sendXcop = async () => {
    try {
        const url = "users/send/xcop";
        const data = { 
            user_receipt_id:form.user_receipt_id, 
            xcop_send: formatNumberStringToNumber(form.xcop_send as string),
        };
        const res = (await helper.http(url, "post", { data })).data as Res;

        helper.showNotify('XCOP enviados correctamente',{type:'success'})
        form.user_receipt_id = "";
        form.xcop_send = "";
        searchUser.value = "";
        userStore.updateUserAuth();
        emits('send',{
            amount: res.details.attributes.quantity,
            date: dayjs(res.details.attributes.created_at).format('YYYY-MM-DD | HH:mm'),
            number_transaction: res.details.attributes.tranx_no,
            user: res.user_send.attributes.username
        })
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
</style>
