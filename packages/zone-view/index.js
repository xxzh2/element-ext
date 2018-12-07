import ZoneView from "./src/main";

/* istanbul ignore next */
ZoneView.install = function (Vue) {
  Vue.component(ZoneView.name, ZoneView);
};

export default ZoneView;