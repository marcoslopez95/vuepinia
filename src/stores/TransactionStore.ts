import { helperStore } from "@/helper";
import type { Order } from "@/interfaces/Order/Order.model";
import { defineStore } from "pinia";
import { ref } from "vue";

export const TransactionStore = defineStore('Transaction',() => {
    const helper = helperStore()
    const order = ref<Order|null>(null)

    const getOrderByNum = ( tranx_no: string): Promise<Order | false> => {
        return new Promise(async (resolve, reject) => {
            try{
                const url = 'order'
                const params = { tranx_no }
                const res = await helper.http(url,'get',{params})
                if(res.data.response.length == 0 ){
                    resolve(false)
                }
                order.value = res.data.response[0]
                resolve(res.data.response[0])
            }catch(err){
                reject(false)
            }
        })
    }

    const showPreviewOrder = ref(false)
    const feeMiner = ref('')
    const feeAdministrative = ref('3000')

    const takeOrder = (order_id:number):Promise<boolean> => {
        return new Promise<boolean>( async (resolve, reject) => {
            try{
                const url = 'order/take/accept'
                const data = {order_id}
                const res = await helper.http(url,'post',{data})
                resolve(true)
            }catch(e){
                reject(false)
            }

        })
    }

    const releaseOrder = (order_id:number):Promise<boolean> => {
        return new Promise<boolean>( async (resolve, reject) => {
            try{
                const url = 'order/release/'+order_id
                const res = await helper.http(url,'get')
                resolve(true)
            }catch(e){
                reject(false)
            }

        })
    }
    return {
        order,
        getOrderByNum,
        showPreviewOrder,
        feeMiner,
        feeAdministrative,
        takeOrder,
        releaseOrder
    }
})