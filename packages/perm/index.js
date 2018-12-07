import Perm from "./src/main";

/* istanbul ignore next */
Perm.install = function(Vue) {
  Vue.component(Perm.name, Perm);
};

export default Perm;
