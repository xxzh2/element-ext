<template>
	<el-tooltip :content="zoneArea" placement="top"  v-if="showTips()">
		<span>{{zoneArea.substring(0, 12) + ' ...'}}</span>
	</el-tooltip>
	<span class="el-zone-area" v-else >
		{{zoneArea}}
	</span>
</template>
<script>
import { getZone } from "@/api/tool";
export default {
  name: "ElZoneView",
  model: { prop: "value", event: "handleZoneChanged" },
  props: {
    value: {},
    // col:{},
    showTip: {}
  },
  data() {
    return {
      _zone: {},
      zoneArea: "",
      isTip: false
    };
  },
  created() {
    this.load();
  },
  watch: {
    "value.id": {
      handler: function(val, oldVal) {
        this.load();
      },
      deep: true
    }
  },
  computed: {},
  methods: {
    showTips() {
      this.isTip = this.showTip || false;
      if (!this.isTip) return false;
      if (this.zoneArea && this.zoneArea.length > 12) return true;
      else return false;
    },

    load() {
      let param = Object.assign({ province: { id: "" } }, this.value);
      delete param.id;
      getZone(param).then(response => {
        this._zone = response.result.zone;
        this.zoneArea =
          this.nvl(this._zone.province.name) +
          "·" +
          this.nvl(this._zone.city.name) +
          "·" +
          this.nvl(this._zone.region.name);
        this.zoneArea = this.zoneArea.replace("··", "");
      });
    },
    nvl(str) {
      return str == null ? "" : str;
    }
  }
};
</script>

<style lang="scss">
.el-row {
  .el-col {
    margin: 5px 0;
  }
}
.el-zone-area {
  overflow: auto;
  white-space: nowrap;
}
</style>
