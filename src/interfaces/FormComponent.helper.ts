import type { Ref } from "vue"

export declare interface Row {
  fields: Field[]
  rowClass?: Array<string>
}

export declare interface Field{
  label: string
  valueForm: string
  type: typeField
  rules?: Array<any> 
  select?: Select
  colClass?: Array<string>
  fieldClass?: Array<string>
  
}

interface Select {
  itemValue: string
  itemTitle: string
  items: Ref<any[]>
  menuProps?: Object
  multiple?: boolean
}

type typeField = 'text'
| 'select'
| 'date'
| 'textarea'
| 'number'
| 'password'
| 'hidden'
