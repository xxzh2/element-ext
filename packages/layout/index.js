import VerticalLayout from "./src/vertical";
import HorizontalLayout from "./src/horizontal";

/* istanbul ignore next */
VerticalLayout.install = function (Vue) {
  Vue.component(VerticalLayout.name, VerticalLayout);
};

HorizontalLayout.install = function (Vue) {
  Vue.component(HorizontalLayout.name, HorizontalLayout);
};


export default {
  VerticalLayout,
  HorizontalLayout
};