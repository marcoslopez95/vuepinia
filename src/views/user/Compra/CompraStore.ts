import { helperStore } from '@/helper'
import type { OrderCreate } from '@/interfaces/Order/Order.dto'
import type { ShippingType } from '@/interfaces/ShippingType/ShippingType.model'
import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import type { Order } from '@/interfaces/Order/Order.model'
import type { Wallet } from '@/interfaces/Wallet/Wallet.model'
import type { NetworkType } from '@/interfaces/NetworkType/NetworkType.model'
import { OrderTypes } from '@/enums/OrderTypes.enum'

export const ConfirmOrderStore = defineStore('confirm-order', () => {
    const router = useRouter()
    const helper = helperStore()

    const form = ref<OrderCreate>({
        red_id: '',
        amount_currency: '0',
        currency_id: '',
        currency_price: '0',
        exchange_local: '0',
        exchange_reference: '0',
        fee: '0',
        payment_type_id: '',
        received_amount: '0',
        shipping_type_id: '',
        total_exchange_local: '0',
        total_exchange_reference: '0',
        type: OrderTypes.COMPRA,
        account_delivery_id: '',
        wallet_id: '',
        address_send: '',
        
    })

    const shippingType = ref<ShippingType[]>([])
    const getShippingTypes = async () => {
        const url = 'shipping/types'
        const res = await helper.http(url, 'get', {
            params: { payment_type_id: (form.value.payment_type_id ?? 1) }
        })
        shippingType.value = res.data.response
    }

    const createOrder = async () => {
        const url = 'order'
        form.value.currency_price = parseFloat(form.value.currency_price).toFixed(2)
        form.value.received_amount = parseFloat(form.value.received_amount).toFixed(8)
        const res = await helper.http(url, 'post',{
            data: form.value
        })

        router.push({
            name: 'user-check-buy',
            params:{
                numTransaction: (res.data.response as Order).attributes.tranx_no
            }
        })
    }

    const wallets = ref<Wallet[]>([])
    const getWallets = async () => {
        const url = 'client/wallet'
        const res = await helper.http(url, 'get')
        wallets.value = res.data.response as Wallet[]
    }

    const networkTypes = ref<NetworkType[]>([])
    const getNetworkTypes = async () => {
        const url = 'reds'
        const res = await helper.http(url, 'get')
        networkTypes.value = res.data.response as NetworkType[]
    }
    return {
        form,
        shippingType,
        getShippingTypes,
        createOrder,
        wallets,
        getWallets,
        networkTypes,
        getNetworkTypes
    }
})
