import Zone from "./src/main";

/* istanbul ignore next */
Zone.install = function (Vue) {
  Vue.component(Zone.name, Zone);
};

export default Zone;