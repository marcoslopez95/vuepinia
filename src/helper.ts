import { ref, reactive } from 'vue'
import type { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import axios from 'axios';
import { defineStore } from 'pinia';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { type ToastOptions, toast } from 'vue3-toastify';
import type { CheckedOrBlockedType, StatusOperationVerified } from './db';
import db from './db';
import type { UserAuth } from './interfaces/User/User.auth';
import type { ROLES } from './interfaces/Role/Role.enum';
import type { User } from './interfaces/User/User.model';
import type { Image } from './interfaces/Image.model';

export const helperStore = defineStore('helper', <T>() => {
  const { t } = useI18n()

  const baseUrl = ref(import.meta.env.VITE_API_URL)
  const loading = ref(false);

  const items = ref()
  const item = ref();

  const router = useRouter()
  const form = ref()
  const paginated = ref({
    "currentPage": 1,
    "perPage": 6,
  })


  const isAutenticated = () => {
    return localStorage.getItem('token') || false
  }

  const http = (url: string, method: Method = 'get', options: AxiosRequestConfig = {}, notification = '', disabledLoading = false) => {
    return new Promise<AxiosResponse>(async (resolve, reject) => {
      try {
        if (!disabledLoading) {
          loading.value = true
        }

        let config: AxiosRequestConfig = {
          url,
          method,
          baseURL: baseUrl.value,
          ...options
        }
        if (isAutenticated()) {
          config.headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
        let response: AxiosResponse = await axios(config)
        if (notification) {
          showNotify(notification)
        }
        resolve(response)
      } catch (error: AxiosResponse | any) {
        let messages: string[] | string;
        if (error.response && error.response.status >= 500) {
          messages = t('commons.system-error')
        } {
          const data = error.response.data 
          messages = data.message ?? data.data?.errors ?? data.errors.message
        }

        if (typeof messages === 'string') {
          showNotify(messages, { type: 'error' })
        } else {
          getErrors(error.response.data.data.errors)
        }
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          router.push('/login')
        }
        reject(error)
      } finally {
        if (!disabledLoading) {
          loading.value = false
        }
      }
    })
  }

  const getErrors = (errors: any) => {
    let error: string[] = []
    let op: ToastOptions = {
      type: 'error',
    }
    if (errors) {
      for (let err in errors) {
        error.push(errors[err])
      }
    }
    console.log(error)
    error.forEach(er => showNotify(er, op))

  }

  const showNotify = (msg: string, options: ToastOptions = { type: 'success' }) => {
    toast(msg, {
      theme: 'colored',
      ...options
    }); // ToastOptions
  }

  const url = ref('')


  const pagination = reactive({
    perPage: 15,
    currentPage: 1,
    to: 1,
    total: 0,
  })

  const perPage = [
    5, 10, 15
  ]

  const defaultParams = ref<any>({})
  const index = async (params: any = {}) => {
    items.value = []
    let response: any = await http(url.value, 'get', {
      params: {
        ...params,
        perPage: pagination.perPage,
        page: pagination.currentPage,
        pag: pagination.perPage,
        ...defaultParams.value
      }
    })
    items.value = response.data.response?.data ?? response.data.response
    pagination.to = response.data.response?.to
    pagination.total = response.data.response?.last_page
  }

  const show = (id: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await http(url.value + '/' + id, 'get',)

        resolve(response)
      } catch (err) {
        reject(err)
      }
    })
  }

  const put = (id: any, data: any, notification: boolean = true) => {
    return new Promise(async (resolve, reject) => {
      try {
        let message = notification ? t("general-messages.editedSuccessfully") : ''
        let response = await http(url.value + '/' + id, 'put', {
          data: {
            ...data,
            ...defaultParamsByCrud.value
          }
        }, message)

        resolve(response)
      } catch (err) {
        reject(err)
      }
    })
  }

  const defaultParamsByCrud = ref<any>({})
  const create = (data: any, notificacion: boolean = true) => {
    return new Promise(async (resolve, reject) => {
      try {
        let message = notificacion ? t("general-messages.createdSuccessfully") : ''
        let response = await http(url.value, 'post', {
          data: {
            ...data,
            ...defaultParamsByCrud.value
          }
        }, message)

        resolve(response)
      } catch (err) {
        reject(err)
      }
    })
  }


  const deleted = (id: any, notificacion: boolean = true) => {

    return new Promise(async (resolve, reject) => {
      try {
        let message = ''
        if (notificacion) {
          message = isDeleted(id) ? t("general-messages.restoredSuccessfully") : t("general-messages.deletedSuccessfully")
        }
        let response;
        if (isDeleted(id)) {
          response = await http(url.value + '/restore/' + id, 'get', {}, message)
        } else {
          response = await http(url.value + '/' + id, 'delete', {}, message)
        }
        resolve(response)
      } catch (err) {
        reject(err)
      }
    })
  }

  const isDeleted = (id: any) => {
    let bool = false;

    console.log('items', items.value)
    let element = items.value.find((item: any) => item.id === id)

    if (element.attributes.deletedAt || element.attributes.deleted_at) {
      bool = true
    }
    return bool
  }


  const upsert = (data: any, notify: boolean = true): Promise<any> => {
    return new Promise((resolve, reject) => {
      try {
        let res;
        if (item.value) {
          res = put(item.value.id, data, notify)
        } else {
          res = create(data, notify)
        }
        resolve(res)
      } catch (err) {
        reject(err)
      }
    })
  }


  const clickIn = ref<'Show' | 'Edit' | 'Create' | ''>('')
  const formCrud = ref<any>({})
  const formRef = ref<any>()
  const errorsInput = ref<{
    id: string,
    errorMessages: string[]
  }[]>([])
  const getErrorInput = (id: string) => {
    if (errorsInput.value.length === 0) return ''
    return errorsInput.value
      .find(e => e.id === id)
      ?.errorMessages[0] ?? ''
  }
  const openModalCrud = ref<boolean>(false)
  const methodVerificatedStatus = ref<StatusOperationVerified>()
  const checkedOrBlocked = (baseUrl: string, type: CheckedOrBlockedType, message: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!item.value) resolve(true)
        const method = db.methodVerificatedStatus[methodVerificatedStatus.value!] as Method
        const options = { baseURL: baseUrl }
        const response = await http(`${url.value}/${item.value.id}/${type}`, method, options, message)
          .then(() => {
            index()
          })
        resolve(response)
      } catch (err) {
        reject(err)
      }
    })

  }

  return {
    checkedOrBlocked,
    methodVerificatedStatus,
    errorsInput,
    getErrorInput,
    pagination,
    isAutenticated,
    items,
    item,
    http,
    paginated,
    form,
    showNotify,
    getErrors,
    index,
    show,
    put,
    create,
    deleted,
    url,
    perPage,
    isDeleted,
    baseUrl,
    loading,
    upsert,
    clickIn,
    formCrud,
    formRef,
    openModalCrud,
    defaultParams,
    defaultParamsByCrud,
  }
})

export const isAutenticated = () => {
  return localStorage.getItem('token') || false
}

export const formatNumber = (number: number, decimalSeparator: string = '.', thousandSeparator: string = ',', decimals = 3): string => {
  const partInt = Math.trunc(number)
  let roundedNumber: number;

  if ((number - partInt) > 0) {
    roundedNumber = parseFloat(number.toFixed(decimals));
  } else {
    roundedNumber = partInt;
    decimals = 0
  }

  const options: Intl.NumberFormatOptions = {
    style: 'decimal',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    minimumIntegerDigits: 1, // Mínimo de dígitos enteros
    useGrouping: true, // Habilitar el separador de miles
  };
  const formattedNumber = new Intl.NumberFormat('ban', options).format(roundedNumber);

  // Si el separador decimal es diferente de '.', reemplazar el separador predeterminado
  if (decimalSeparator !== '.') {
    return formattedNumber.replace('.', decimalSeparator);
  }

  return formattedNumber;
}

export const getUserAuth = (): UserAuth => {
  return JSON.parse(localStorage.getItem('user')!) as UserAuth
}

export const isRole = (role: ROLES): boolean => {
  return getUserAuth()?.roles[0].name === role
}

export const getWalletFormated = (wallet: string, start = 6, finish = 5): string => {
  const init = wallet.slice(0, start)
  const length = wallet.length - 1
  const end = wallet.slice(length - finish, length)
  return `${init}...${end}`
}

export const copyToClipboard = (value: string | number) => {
  navigator.clipboard.writeText(value.toString())
}

export const getDns = (): string => {
  const protocol = window.location.protocol
  const hostname = window.location.hostname
  return `${protocol}//${hostname}`
}

export const getFullName = (user: User): string => {
  const name = user.attributes.first_name + ' ' + (user.attributes.second_name ?? '')
  const lastname = user.attributes.last_name + ' ' + (user.attributes.second_last_name ?? '')
  return `${name} ${lastname}`
}

export const itemHaveImages = (images?: Image[]): false | string => {
  if (!images || images?.length == 0) return false
  return images[0].attributes.aws_url
}

export const formatCrypoAmount = (value: string) => {
  const fixed = parseFloat(value).toFixed(6)
  return formatNumber(parseFloat(fixed), '.', ',', 6)
}