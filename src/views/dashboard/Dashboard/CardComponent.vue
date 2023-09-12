<template>
    <div class="border-degree py-2 text-table">
        <div class="d-flex justify-space-around pt-1">
            <div class="font-weight-semibold">Total Vendido</div>
            <div class="contenedor" id="asd">
                <!-- <VResponsive
                class="border-degree d-flex align-center justify-center"
                style="width:110px; height:30px"
                > -->
                <VSelect
                    class="border-degree"
                    style="width: 120px"
                    variant="plain"
                    single-line
                    v-model="timeSelect"
                    density="compact"
                    id="as"
                    hide-details
                    item-title="title"
                    :items="times"
                    @update:model-value="getFilter"
                >
                </VSelect>
                <!-- </VResponsive> -->
            </div>
        </div>
        <div>
            <div>
                <VIcon :color="typeOrder.toLocaleLowerCase() == 'compra' ? 'warning' : 'ok'" size="41">
                    <svg
                        width="41"
                        height="41"
                        viewBox="0 0 41 41"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                            cx="20.5"
                            cy="20.5"
                            r="20.5"
                            fill="currentColor"
                            fill-opacity="0.2"
                        />
                        <path
                            d="M27.5 29.6102H23.5625C23.2531 29.6102 23 29.3485 23 29.0287V27.0901C23 26.7702 23.2531 26.5085 23.5625 26.5085H27.5C28.3297 26.5085 29 25.8155 29 24.9577V15.6526C29 14.7947 28.3297 14.1017 27.5 14.1017H23.5625C23.2531 14.1017 23 13.84 23 13.5201V11.5816C23 11.2617 23.2531 11 23.5625 11H27.5C29.9844 11 32 13.084 32 15.6526V24.9577C32 27.5263 29.9844 29.6102 27.5 29.6102ZM25.2969 19.8689L17.4219 11.727C16.7188 11 15.5 11.5089 15.5 12.5509V17.2034H9.125C8.50156 17.2034 8 17.722 8 18.3665V23.0191C8 23.6637 8.50156 24.1822 9.125 24.1822H15.5V28.8348C15.5 29.8768 16.7188 30.3857 17.4219 29.6587L25.2969 21.5167C25.7328 21.0612 25.7328 20.3245 25.2969 19.8689Z"
                            fill="currentColor"
                        />
                    </svg>
                </VIcon>
            </div>
            <div>
                {{ formatNumber(amount) }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import ArrowWithSquareIcon from "@/assets/icons/ArrowWithSquareIcon.vue";
import type { OrderTypes } from "@/enums/OrderTypes.enum";
import { formatNumber, helperStore } from "@/helper";
import dayjs from "dayjs";
import { onMounted } from "vue";
import { ref } from "vue";

const props = defineProps<{
    url: string;
    icon: any;
    type: "currency" | "number";
    title: string;
    typeOrder: OrderTypes
}>();

const helper = helperStore()
const timeSelect = ref("1 months");
const quantityMonths = 4;
const times = ref<TimeSelector[]>([]);
const amount = ref(0)

const setTimes = () => {
    return new Promise((ok,reject)=> {
        for(let i = 0; i < quantityMonths; i++){
            const quantity = i === 0 ? 1 : ((i) * 4)
            const fec_ini = dayjs().subtract(quantity,'months').date(1).format('YYYY-MM-DD');
            const fec_end = dayjs().subtract(quantity,'months').endOf('month').format('YYYY-MM-DD');
            const  title =  quantity + ' months'
            times.value.push({
                title,
                fec_ini,
                fec_end
            })
        }
        ok(true)
    })
}

const getFilter = async () => {
    const url = '/order/total/types'
    try{
        const time = times.value.find(r => r.title == timeSelect.value);
        const res = await helper.http(url,'get',{
            params: {
                fec_ini: time!.fec_ini,
                fec_end: time!.fec_end,
                type: props.typeOrder
            }
        })
        amount.value = res.data.pesos
    }catch(e) {

    }
}

onMounted(()=> {
    setTimes().then(()=>getFilter())
    
})

const currency = "";

interface TimeSelector{
    title: string,
    fec_ini: string,
    fec_end: string
}
</script>

<style lang="scss">
/*.v-field__input > input#as{
    --v-field-input-padding-top: 0px
}*/
/*.v-field__input{
    --v-field-input-padding-top: 0px
}*/
$top: 5px;
.contenedor .v-field__input {
    /* Tu estilo personalizado aquí */
    --v-field-input-padding-top: $top;
    --v-field-padding-start: 15px;
}
.contenedor .v-field__append-inner {
    padding-top: $top !important;
}
</style>
