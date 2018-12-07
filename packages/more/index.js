import More from "./src/main";

/* istanbul ignore next */
More.install = function (Vue) {
  Vue.component(More.name, More);
};

export default More;