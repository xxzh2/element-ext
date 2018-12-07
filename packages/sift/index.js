import Sift from "./src/main";

/* istanbul ignore next */
Sift.install = function (Vue) {
  Vue.component(Sift.name, Sift);
};

export default Sift;