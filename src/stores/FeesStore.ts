import axios from "axios";
import { defineStore, storeToRefs } from "pinia";
import { reactive, ref } from "vue";
import { helperStore } from "@/helper";
import { WalletStore } from "./WalletStore";


export const FeesStore = defineStore('fees', () => {
    const walletStore = WalletStore()
    const { currencyTicker } = storeToRefs(walletStore)
    const helper = helperStore()

    const dataCoinBase = reactive<DataCoinBase>({
        amount: '',
        base: '',
        currency: '',
    })
    const dataMempoolFees = reactive<DataMempool>({
        economyFee: 0,
        fastestFee:0,
        halfHourFee:0,
        hourFee:0,
        minimumFee:0
    })

    const getFeesPrice = async() => {
        
        try{
            const url = 'https://mempool.space/api/v1/fees/recommended'
            const headers = {
                "content-type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
              }
              const res = await fetch(url, {
                method: 'get',
                headers
              })
              console.log(await res.json())
            //   const res = await (await axios.get(url,{headers})).data as DataMempool
            // const res = (await helper.http(url,'get',{headers})).data as DataMempool
            dataMempoolFees.economyFee = res.economyFee
            dataMempoolFees.fastestFee = res.fastestFee
            dataMempoolFees.halfHourFee = res.halfHourFee
            dataMempoolFees.hourFee = res.hourFee
            dataMempoolFees.minimumFee = res.minimumFee
        }catch(e){
            helper.showNotify('Ha ocurrido un error, por favor intente mas tarde',{type:'error'})
            // setTimeout(() => {window.location.reload()},5000)
        }
    }

    const labelToFees:LabelToFees = {
        sendNormal: 'minimumFee',
        groupTransaction: 'economyFee',
        payFee: 'halfHourFee',
        feesPriority: 'fastestFee',
    }

    const checkboxes = reactive<Checkboxes[]>([
        {
            label: "groupTransaction",
            text: `<span class="text-primary font-weight-bold">Agrupar</span> mi transaccion con otras de esta manera se paga una
                comision mas alta por todas y esto hace que se confirme mas
                rapido el tiempo de espera es de (1-3 horas).`,
            fees: "0",
            feesBtc:''
        },
        {
            label: "payFee",
            text: ` <span class="text-primary font-weight-bold">Pagar</span> una comision normal de {btc} BTC equivalentes a -
                ({usd} USD) con esta opcion es mas probable tener una
                confirmacion mas rapido.`,
            fees: "0",
            feesBtc:''
        },
        {
            label: "sendNormal",
            text: ` <span class="text-primary font-weight-bold">Enviar</span> mi transaccion inmediatamente con la comision que xeler
                puede asumir entiendo que no hay tiempo estimado de confirmacion
                pueden ser varias horas.`,
            fees: "0",
            feesBtc:''
        },
        {
            label: "feesPriority",
            text: ` <span class="text-primary font-weight-bold">Pagar</span> una comision de envio prioritario de 0.00015 BTC
                equivalentes a ({usd} USD) esta opcion el envio se envia con la
                comision mas alta posible para ser confirmado en diez minutos o
                maximo 20.`,
            fees: "0",
            feesBtc:''
        },
    ]);

    const getPriceBitcoin = async () => {
        try{
            const url = 'https://api.coinbase.com/v2/prices/BTC-USD/spot'
            const res = await (await helper.http(url)).data as DataResponseCoinBase
            dataCoinBase.amount = res.data.amount
            dataCoinBase.base = res.data.base
            dataCoinBase.currency = res.data.currency
        }catch(e){
            helper.showNotify('Ha ocurrido un error, por favor intente mas tarde',{type:'error'})
            setTimeout(() => {window.location.reload()},5000)
        }
    }

    const convertInBtc = (value:number):number => (value/100000000)
    const  convertBtcInBytes = (value:number):number => (value * 256)

    const setCheckbox = async() => {
        await getPriceBitcoin()
        await getFeesPrice()
        const btc = currencyTicker.value.find(c => c.symbol === 'BTC');
        for(let label in labelToFees){
            const feeName = labelToFees[label as keyof LabelToFees] as keyof DataMempool
            const feeValue = dataMempoolFees[feeName]
            const feesInBtc = convertInBtc(feeValue)
            const feesInBytes = convertBtcInBytes(feesInBtc)
            const newFeePrice = feesInBytes * parseFloat(btc?.oficial_usd??'')
            checkboxes.find(check => check.label === label)!
            checkboxes.find(check => check.label === label)!.fees = newFeePrice.toFixed(2)
            checkboxes.find(check => check.label === label)!.feesBtc = feesInBtc.toFixed(8)
            checkboxes.find(check => check.label === label)!.text.replace('{usd}',newFeePrice.toFixed(2))
                        .replace('{btc}',feesInBtc.toFixed(8))
        }
    }
    
    
    return {
        checkboxes,
        getPriceBitcoin,
        getFeesPrice,
        setCheckbox
    }


})
// ++++++++++++++++++++++++++++++++++++++++++++
interface LabelToFees {
    sendNormal: string
    groupTransaction: string
    payFee: string
    feesPriority: string
}
interface Checkboxes {
    label: keyof Comisiones;
    text: string;
    fees: string;
    feesBtc: string
}

interface Comisiones {
    groupTransaction: boolean;
    payFee: boolean;
    sendNormal: boolean;
    feesPriority: boolean;
}

interface DataResponseCoinBase {
    data: DataCoinBase;
}

interface DataCoinBase {
    amount: string;
    base: string;
    currency: string;
}

interface DataMempool {
  fastestFee: number;
  halfHourFee: number;
  hourFee: number;
  economyFee: number;
  minimumFee: number;
}