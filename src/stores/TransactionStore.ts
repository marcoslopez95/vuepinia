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

    return {
        order,
        getOrderByNum
    }
})