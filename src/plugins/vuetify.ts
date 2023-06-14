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
    sky: '#20ABE6'
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
    VBtnPrimary: components.VBtn,
    // VBtnPrimary: components.VBtn,
  },
  defaults: {
    VBtnPrimary: {
      color: 'primary',
      rounded: 'pill',
      class: 'w-25'
    },
    VBtn: {
      color: "primary",
      rounded: "md",
      flat: true,
      fontWeight: "400",
      letterSpacing: "0",
    },
    VCard: {
      flat: true,
      elevation: 10,
    },
    VTextField:{
      variant:"outlined",
      class: ''
    }
  },
});
