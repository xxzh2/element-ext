import ZoneArea from "./src/main";

/* istanbul ignore next */
ZoneArea.install = function (Vue) {
  Vue.component(ZoneArea.name, ZoneArea);
};

export default ZoneArea;