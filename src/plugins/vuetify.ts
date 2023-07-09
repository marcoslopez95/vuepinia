import { createVuetify } from "vuetify";
import type { ThemeDefinition } from "vuetify";

import "@mdi/font/css/materialdesignicons.css";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const Lighttheme: ThemeDefinition = {
  variables: {
    'v-input-control-height': '48px', /* Ejemplo: altura deseada */
  },
  colors: {
    // primary: "#ee8a6a",
    primary: "#5043E8",
    table: "#5C6776",
    info: "#0cb9c5",
    success: "#8AE250",
    accent: "#fc4b6c",
    warning: "#EF5DA8",
    error: "#fc4b6c",
    secondary: "#0cb9c5",
    active: '#6E60E8',
    disabled: '#809FB8',
    sky: '#20ABE6',
    'bg-ok':'#BBF3E0',
    'bg-erro':'#E9AAC4',
    'ok':'#1AD598',
    'erro':'#D51A1A',
    'tab': '#809FB8',
    //....................
    'purple': '#7415AE',
    'green': '#15AE49',
    'red-300': '#DF4385',
    'blue-sky': '#1697DF'

  },
};

export default createVuetify({
  components,
  directives,
  theme: {
    themes: {
      light: Lighttheme,
    },
  },
  aliases:{
    VBtnDegree: components.VBtn,
    VBtnPrimary: components.VBtn,
    VBtnSecondary: components.VBtn,
    VBtnSuccess: components.VBtn,
    VBtnDanger: components.VBtn,
    //--------
    VChipSuccess: components.VChip,
    VChipError: components.VChip,
    VChipWarning: components.VChip,
    //--------
    VAlertSuccess: components.VAlert,
    VAlertError: components.VAlert,
    VAlertWarning: components.VAlert,
  },
  defaults: {
    VAlertSuccess: {
      color: 'ok',
      class: 'font-weight-bold ',
      variant: 'tonal',
      type:"success"
    },
    VAlertError: {
      color: 'erro',
      class: 'font-weight-bold ',
      variant: 'tonal',
      type:"error"
    },
    VAlertWarning: {
      color: 'disabled',
      class: 'font-weight-bold ',
      variant: 'tonal',
      type:"info"
    },
    //...........
    VChipSuccess: {
      color: 'ok',
      class: 'font-weight-bold text-uppercase',
      variant: 'outlined'
    },
    VChipError: {
      color: 'erro',
      class: 'font-weight-bold text-uppercase',
      variant: 'outlined'
    },
    VChipWarning: {
      color: 'disabled',
      class: 'font-weight-bold text-uppercase',
      variant: 'outlined'
    },
    //--------------------------------
    VBtnDegree: {
      rounded: 'pill',
      type: 'button',
      variant: 'flat',
      class: 'text-table font-weight-bold v-text-field__slot',
    },
    VBtnSuccess: {
      rounded: 'pill',
      style: 'color: #1AD598 !important; background-color: #BBF3E0 !important;',
      type: 'button',
      variant: 'flat'
    },
    VBtnDanger: {
      rounded: 'pill',
      style: 'color: #D51A1A !important; background-color: #E9AAC4 !important;',
      type: 'button',
      variant: 'flat'
    },
    // 
    VBtnPrimary: {
      color: 'primary',
      rounded: 'pill',
      class: 'w-25',
      style:"min-width:140px",
      type: 'button'
    },
    VBtnSecondary: {
      color:  'primary',
      rounded:'pill',
      style:  "min-width:140px",
      type:   'button',
      variant: 'outlined'
    },
    VBtn: {
      color: "primary",
      rounded: "md",
      flat: true,
      fontWeight: "400",
      letterSpacing: "0",
      type: 'button'
    },
    VCard: {
      flat: true,
      elevation: 10,
    },
    VTextField:{
      variant:"outlined",
      class: ''
    },
    VCheckbox: {
      color: "primary",
    }
  },
});
