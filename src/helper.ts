import { ref,reactive } from 'vue'
import type { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import axios from 'axios';
import { defineStore } from 'pinia';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import {type ToastOptions, toast } from 'vue3-toastify';
import type { CheckedOrBlockedType, StatusOperationVerified } from './db';
import db from './db';
import type { UserAuth } from './interfaces/User/User.auth';
import type { ROLES } from './interfaces/Role/Role.enum';

export const helperStore = defineStore('helper',<T>() => {
  const { t } = useI18n()

  const baseUrl = ref(import.meta.env.VITE_API_URL)
  const loading = ref(false);
    
  const items = ref()
  const item = ref();
  
  const router = useRouter()
  const form = ref()
  const paginated = ref({
    "currentPage":1,
    "perPage":6,
  })


  const isAutenticated = () => {
    return localStorage.getItem('token') || false
  }

  const http = (url:string,method: Method = 'get', options: AxiosRequestConfig = {}, notification = '') => {
    return new Promise<AxiosResponse>(async (resolve, reject) => {
      try{
        loading.value = true

        let config: AxiosRequestConfig = {
          url,
          method,
          baseURL: baseUrl.value,
          ...options
        }
        if(isAutenticated()){
          config.headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
        let response: AxiosResponse = await axios(config)
        if(notification){
          showNotify(notification)
        }
        resolve(response)
      }catch(error: AxiosResponse | any){
        let messages: string[] | string;
        if(error.response && error.response.status >= 500){
          messages = t('commons.system-error')
        }{
          messages = error.response.data.message ?? error.response.data.data.errors
        }

        if(typeof messages === 'string'){
          showNotify(messages,{type:'error'})
        }else{
          getErrors(error.response.data.data.errors)
        }
        if(error.response && error.response.status === 401) {
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          router.push('/login')
        }
        reject(error)
      }finally{
        loading.value = false
      }
    })
  }

  const getErrors = (errors:any) => {
    let error:string[] = []
    let op:ToastOptions = {
      type: 'error',
    }
    if(errors){
      for(let err in errors){
        error.push(errors[err])
      }
    }
    console.log(error)
    error.forEach(er => showNotify(er,op))
    
  }

  const showNotify = (msg:string, options: ToastOptions = {type:'success'}) => {
    toast(msg, {
      theme: 'colored',
      ...options
    }); // ToastOptions
  }

  const url = ref('')

  
  const pagination = reactive({
    perPage : 15,
    currentPage : 1,
    to: 1,
    total: 0,
  })

  const perPage = [
    5, 10, 15
  ]

  const index = async (params:any = {}) => {
    items.value = []
    let response:any = await http(url.value,'get',{
      params: {
        ...params,
        perPage: pagination.perPage,
        page: pagination.currentPage,
        pag: pagination.perPage
      }
    })
    items.value = response.data.response?.data ?? response.data.response
    pagination.to = response.data.response?.data.to 
    pagination.total = response.data.response?.data.last_page
  }

  const show = (id:any) => {
    return new Promise(async (resolve, reject) => {
      try{
        let response = await http(url.value+'/'+id,'get',)
        
        resolve(response)
      }catch(err){
        reject(err)
      }
    })
  }

  const put = (id:any, data:any, notification: boolean = true) => {
    return new Promise(async (resolve, reject) => {
      try{
        let message = notification ? t("general-messages.editedSuccessfully") : ''
        let response = await http(url.value+'/'+id,'put',{data},message)
        
        resolve(response)
      }catch(err){
        reject(err)
      }
    })
  }

  const create = (data:any, notificacion: boolean = true) => {
    return new Promise(async (resolve, reject) => {
      try{
        let message = notificacion ? t("general-messages.createdSuccessfully") : ''
        let response = await http(url.value,'post',{data}, message)
        
        resolve(response)
      }catch(err){
        reject(err)
      }
    })
  }

  
  const deleted = (id: any, notificacion: boolean = true) => {
    
    return new Promise(async (resolve, reject) => {
      try {
        let message = ''
        if(notificacion){
          message = isDeleted(id) ? t("general-messages.restoredSuccessfully") : t("general-messages.deletedSuccessfully")
        }
        let response;
        if(isDeleted(id)){
          response = await http(url.value + '/restore/' + id, 'put',{},message)
        }else{
          response = await http(url.value + '/' + id, 'delete',{},message)
        }
        resolve(response)
      } catch (err) {
        reject(err)
      }
    })
  }

  const isDeleted = (id: any) => {
    let bool = false;

    console.log('items',items.value)
    let element = items.value.find((item:any) => item.id === id)
  
    if(element.deletedAt || element.deleted_at){
      bool = true
    }
    return bool
  }
  

  const upsert = (data: any, notify: boolean = true): Promise<any> => {
      return new Promise((resolve, reject) => {
        try{
          let res;
          if(item.value){
            res = put(item.value.id,data,notify)
          }else{
            res = create(data,notify)
          }
          resolve(res)
        }catch(err){
          reject(err)
        }
      })
  }

  
  const clickIn = ref<'Show'|'Edit' | 'Create' | ''>('')
  const formCrud = ref<any>({})
  const formRef = ref<any>()
  const errorsInput = ref<{
    id:string,
    errorMessages: string[] }[]>([])
  const getErrorInput = (id:string) => {
    if (errorsInput.value.length === 0) return ''
    return errorsInput.value
          .find(e => e.id === id)
          ?.errorMessages[0] ?? ''
  }
  const openModalCrud = ref<boolean>(false)
  const methodVerificatedStatus = ref<StatusOperationVerified>()
  const checkedOrBlocked =  (baseUrl:string, type: CheckedOrBlockedType, message:string) => {
    return new Promise(async (resolve, reject) => {
      try {
        if(!item.value) resolve(true)
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
    openModalCrud
  }
})

export const isAutenticated = () => {
  return localStorage.getItem('token') || false
}

export const formatNumber = (number: number,decimals:string = '.',miles:string = ','): string => {
    return Intl.NumberFormat(["ban", "id"])
                .format(number)
                .replace('.','|')
                .replace(',',decimals)
                .replace('|',miles)
}

export const getUserAuth = () : UserAuth=> {
  return JSON.parse(localStorage.getItem('user')!) as UserAuth
}

export const isRole = (role: ROLES): boolean => {
  return getUserAuth()?.roles[0].name === role
}