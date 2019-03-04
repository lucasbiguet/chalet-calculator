// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import "milligram/dist/milligram.min.css";
import AirbnbStyleDatepicker from "vue-airbnb-style-datepicker";
import "vue-airbnb-style-datepicker/dist/vue-airbnb-style-datepicker.min.css";
import ToggleButton from "vue-js-toggle-button";
// see docs for available options
const datepickerOptions = {};

// make sure we can use it in our components
Vue.use(AirbnbStyleDatepicker, datepickerOptions);
Vue.use(ToggleButton);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  components: { App },
  template: "<App/>"
});
