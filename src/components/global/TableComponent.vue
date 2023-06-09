<script lang="ts" setup >
import type { Head } from '@/interfaces/TableComponent.helper';
import { storeToRefs } from 'pinia'
import type { CheckedOrBlockedType, Status, StatusOperationVerifiedValue, StatusOperationVerified } from '@/db';
import db from '@/db';
import { formatNumber, helperStore } from '@/helper';
import DialogConfirm from '@/components/global/DialogConfirm.vue';
import dayjs from 'dayjs';
import { type Ref, ref,inject,toRefs, computed, reactive } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
const helper = helperStore()
const itemHelper2 = inject<Ref<any>>('item') 

const { methodVerificatedStatus, item:itemHelper,clickIn} = storeToRefs(helper)
const props = defineProps<Props>()

const { headers } = toRefs(props)
const emit = defineEmits(['show', 'update', 'delete'])
if (!headers.value.find(item => item.value === 'actions') && props.optionsHabilit) {
  headers.value.push({
    name: t('commons.Actions'),
    value: 'actions'
  })
}
const statusText = ((text: string | boolean) => {
  let status: Status
  switch (text) {
    case true:
      status = "Active"
      break;
    case false:
      status = "Inactive"
      break;
    case "EN VERIFICACION":
      status = "Verification"
      break;
    case "EN ESPERA DE COMPROBANTE":
      status = "Awaiting"
      break;
    case "ACEPTADO":
      status = "Accept"
      break;
    case "RECHAZADO":
      status = "Reject"
      break;

    default:
      status = "Active"
      break;
  }
  return status
})


const getValue = (item: any, head: Head) => {
  const value = head.value
  let valueArray = value.split('.')
  let res = item;

  valueArray.forEach((pos: string) => {
    res = res[pos] ?? ''
  })

  switch (head.type) {
    case 'date':
      return dayjs(res).format(head.format)
    case 'number':
      return formatNumber(res)
    case 'text':
      return res
    default:
      return res
  }
}

const setNameHead = (head: string) => head.toLocaleLowerCase().replace(' ', '-')


const title = ref("")
const content = ref("")
const message = ref("")
const idAccount = ref<string | number>("")
const dialogAction = ref(false)
const modalOpen = ref<'deleted' | 'acceptReject'>('deleted')

const openConfirmModal = (id: number) => {
  modalOpen.value = 'deleted'
  const deleted = isDeleted(id)
  title.value = deleted ? t('commons.restore.title') : t('commons.delete.title')
  content.value = deleted ? t('commons.restore.content') : t('commons.delete.content')
  title.value += ` ${props.singularName ?? ''}`
  content.value += ` ${props.singularName ?? ''}?`
  idAccount.value = id
  dialogAction.value = true
}

const isDeleted = (id: any) => {
  let bool = false;
  let element = props.items.find((item: any) => item.id === id)

  if (element.deletedAt || element.deleted_at) {
    bool = true
  }
  return bool
}

const okDeletedRestore = () => {
  emit('delete', idAccount.value)
  helper
    .deleted(idAccount.value)
    .then(() => {
      helper.index()
      dialogAction.value = false
    })
}

const getStatusColor = (item: any, head: Head) => {
  if (head.status === 'deleted') {
    return db.statusColor[statusText(!isDeleted(item.id))]
  }
  return db.statusColor[statusText(getValue(item, head))]
}

const getStatus = (item: any, head: Head) => {
  if (head.status === 'deleted') {
    return db.status[statusText(!isDeleted(item.id))]
  }
  return db.status[statusText(getValue(item, head))]
}

const elementIsVerificated = (item: any) => {
  if (!props.acceptReject) return
  const head: Head = {
    name: 'confirm',
    value: db.verificateStatusField[props.acceptReject]
  }
  const value = getValue(item, head)
  const statusValue = db.verificateStatusField[props.acceptReject] as StatusOperationVerifiedValue
  return value === db.verificateStatusValue[statusValue]
}

const confirmOrReject = ref<CheckedOrBlockedType>('accept')

const confirmAction = (item: any, bool: CheckedOrBlockedType) => {
  console.log(itemHelper)
  console.log(item, bool)
  modalOpen.value = 'acceptReject'
  console.log('aqui',itemHelper)
  itemHelper.value = item
  itemHelper2!.value = item
  confirmOrReject.value = bool
  title.value = t('commons.Update')
  content.value = bool == 'accept' ? t('commons.accept.content') : t('commons.reject.content')
  content.value += ` ${props.singularName ?? ''}?`
  message.value = `${props.singularName ?? ''} `
  message.value += bool == 'accept' ? t('commons.accept.message') : t('commons.reject.message')
  dialogAction.value = true
  console.log(item)

}

const pagination = reactive({
  perPage: 15,
  currentPage: 1,
  to: 1,
  total: 0,
})

const perPage = [
  5, 10, 15, 20, 50, 100
]

const itemsNew = computed(() => {
  if (!props.paginatedFront) return props.items
  pagination.total = Math.ceil(props.items.length / pagination.perPage)
  const start = pagination.perPage * (pagination.currentPage - 1)
  const end = start + pagination.perPage
  return props.items.slice(start, end)
})

if (props.acceptReject) {
  methodVerificatedStatus.value = props.acceptReject
}
const actionModal = {
  deleted: okDeletedRestore,
  acceptReject: async () => {
    await helper.checkedOrBlocked(props.acceptRejectURL!, confirmOrReject.value, message.value)
    dialogAction.value = false
  }
}
/**
 * Interfaces
 */

interface Props {
  optionsHabilit: boolean
  headers: Head[]
  items: any[]
  iconShow?: boolean
  iconUpdate?: boolean,
  iconDelete?: boolean,
  iconVoucher?: boolean,
  fixedHeader?: boolean,
  heightTable?: string,
  singularName?: string
  newButtons?: boolean,
  paginatedFront?: boolean,
  acceptReject?: StatusOperationVerified,
  acceptRejectURL?: string,
}

</script>

<template>
  <VTable :fixed-header="fixedHeader" :height="fixedHeader ? heightTable : ''" hide-default-footer disable-sort>
    <thead style="background-color: #FBFBFB; font-size: 16px;">
      <tr>
        <slot v-for="head, i in headers" :name="setNameHead(head.value)">
          <th class="text-center text-primary text-capitalize">
            {{ head.name }}
          </th>
        </slot>
      </tr>
    </thead>
    <tbody style="font-size: 18px;">
      <tr v-for="(item, i) in itemsNew" :key="i">
        <td v-for="(head, j) in headers" :key="j" class="text-center text-table font-weight-bold">
          <slot :name="`cel-${head.value}`" :data="item">
            <!-- 54 6f 64 6f 20 65 73 74 6f 20 6c 6f 20 68 61 67 6f 20 70 6f 72 20 65 6c 6c 61 20 3c 33 -->

            <VChip v-if="head.status === true || head.status === 'deleted'" small :color="getStatusColor(item, head)"
              class="font-weight-medium">
              {{ getStatus(item, head) }}
            </VChip>

            <span v-else>{{ getValue(item, head) }}</span>
            <div v-if="optionsHabilit && head.value == 'actions'" class="d-flex justify-center" style="gap: 8px">
              <VBtn v-if="iconShow && !isDeleted(item.id)" :title="'Show'" color="transparent" size="x-small"
                elevation="0" icon>
                <VIcon @click="() => {clickIn='Show';emit('show', item)}" size="24" icon="mdi-eye-outline" />
              </VBtn>
              <VBtn v-if="iconUpdate && !isDeleted(item.id)" :title="'Update'" color="transparent" size="x-small"
                elevation="0" icon>
                <VIcon @click="() => {clickIn='Edit';emit('update', item)}" size="24" icon="mdi-pencil-outline" />
              </VBtn>
              <slot v-if="newButtons" name="newButtons" :data="item"></slot>
              <VBtn v-if="iconDelete" :title="!isDeleted(item.id) ? 'Delete' : 'Restore'" color="transparent" size="x-small"
                elevation="0" icon>
                <VIcon @click="openConfirmModal(item.id)" size="24"
                  :icon="!isDeleted(item.id) ? 'mdi-delete' : 'mdi-delete-restore'" />
              </VBtn>
              <div v-if="acceptReject && elementIsVerificated(item)" class="d-flex">
                <VBtn @click="confirmAction(item, 'accept')" size="x-small" color="transparent" elevation="0" icon
                  :title="$t('commons.Accept')">
                  <VIcon icon="mdi-check-bold" />
                </VBtn>

                <VBtn color="transparent" @click="confirmAction(item, 'reject')" size="x-small" elevation="0" icon
                  :title="$t('commons.Reject')">
                  <VIcon icon="mdi-block-helper" />
                </VBtn>
              </div>
            </div>
          </slot>
        </td>
      </tr>
    </tbody>
  </VTable>
  <VRow class="mt-2 px-5 py-2" v-if="!paginatedFront">
    <VCol>
      <VRow>
        <VCol cols="4">
          <!-- <VSelect v-model="helper.pagination.perPage" :items="helper.perPage" label="Pagination"
            @update:modelValue="helper.index()">
          </VSelect> -->
        </VCol>
      </VRow>
    </VCol>
    <VCol>
      <VPagination 
        :total-visible="6" 
        v-model="helper.pagination.currentPage" 
        :length="helper.pagination.total"
        active-color="#B46BFE"
        color="#75757578"
        variant="outlined"
        @update:model-value="helper.index">
        <template #prev="{onClick,disabled,icon}">
          <button 
            :disabled="disabled" 
            @click="onClick" 
            class="v-btn v-btn--icon v-theme--light v-btn--density-default v-btn--size-default v-btn--variant-outlined" aria-label="Next page" 
            aria-disabled="false" 
            style="color: rgba(117, 117, 117, 0.47); caret-color: rgba(117, 117, 117, 0.47);"
            :style="disabled ?'background-color:#809fb880': ''">
            <VIcon :icon="icon" :color="disabled ? '#f1f5f9' :'#809FB8'"></VIcon>
          </button>
        </template>
        <template #next="{onClick,disabled,icon}">
          <button 
            :disabled="disabled" 
            @click="onClick" 
            class="v-btn v-btn--icon v-theme--light v-btn--density-default v-btn--size-default v-btn--variant-outlined" aria-label="Next page" 
            aria-disabled="false" 
            style="color: rgba(117, 117, 117, 0.47); caret-color: rgba(117, 117, 117, 0.47);"
            :style="disabled ?'background-color:#809fb880': ''">
            <VIcon :icon="icon" :color="disabled ? '#f1f5f9' :'#809FB8'"></VIcon>
          </button>
        </template>
      </VPagination>
    </VCol>
    <VCol></VCol>
  </VRow>

  <VRow class="mt-2 px-5 py-2" v-else>
    <VCol>
      <VRow>
        <VCol cols="4">
          <VSelect v-model="pagination.perPage" :items="perPage" label="Pagination" @update:model-value="pagination.currentPage = 1">
          </VSelect>
        </VCol>
      </VRow>
    </VCol>
    <VCol>
      <VPagination :total-visible="6" v-model="pagination.currentPage" :length="pagination.total">
      </VPagination>
    </VCol>
    <VCol></VCol>
  </VRow>
  <DialogConfirm :title="title" :content="content" :dialog="dialogAction" @closeDialog="dialogAction = false"
    @ok="actionModal[modalOpen]" :btnCancelText="$t('commons.Cancel')" :btnAcceptText="$t('commons.Accept')" />
</template>
