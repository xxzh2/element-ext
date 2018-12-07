import More from '../packages/more/index.js';
import Perm from '../packages/perm/index.js';
import Search from '../packages/search/index.js';
import Zone from '../packages/zone/index.js';
import ZoneArea from '../packages/zone-area/index.js';
import ZoneView from '../packages/zone-view/index.js';
import Sift from '../packages/sift/index.js';
import Layout from '../packages/layout/index.js';

export default (Vue) => {
  Vue.component("el-more", More);
  Vue.component("el-perm", Perm);
  Vue.component("el-search", Search);
  Vue.component("el-zone", Zone);
  Vue.component("el-zone-area", ZoneArea);
  Vue.component("el-zone-view", ZoneView);
  Vue.component("el-sift", Sift);
  Vue.component("el-vertical-layout", Layout.VerticalLayout);
}