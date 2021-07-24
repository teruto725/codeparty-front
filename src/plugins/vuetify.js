import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
      themes: {
        light: {
          primary: "#79C5BA",
          secondary: "#C76488",
          thirdary:"#9BACD8",
          error: "#C76488",
          warning: "#ffc107",
          info: "#ff5722",
          success: "#795548",
          background: "#F2F2F2",
        },
      },
    },
  });