<template>
    <span class="el-zone-area">
        {{zoneArea}}
    </span>
</template>
<script>
export default {
  name: "ElZoneArea",
  model: { prop: "value", event: "handleZoneChanged" },
  props: {
    row: {},
    col: {}
  },
  data() {
    return {
      _zone: {},
      zoneArea: "",
      zonedata: {},
      province: "province",
      city: "city",
      region: "region"
    };
  },
  created() {
    this.check(this.col), this.zoneFormatter(this.row);
    this.load();
  },
  watch: {
    row() {
      this.check(this.col), this.zoneFormatter(this.row), this.load();
    }
  },
  computed: {},
  methods: {
    check(col) {
      if (col && col.province) {
        (this.province = col.province),
          (this.city = col.city),
          (this.region = col.region);
      }
    },
    zoneFormatter(row) {
      this.zonedata = {
        province: { id: row[this.province] },
        city: { id: row[this.city] },
        region: { id: row[this.region] }
      };
    },

    load() {
      this.getZone(this.zonedata).then(resp => {
        this._zone = resp;
        this.showZone();
      });
    },
    showZone() {
      this.zoneArea =
        this.nvl(this._zone.province.name) +
        "·" +
        this.nvl(this._zone.city.name) +
        "·" +
        this.nvl(this._zone.region.name);
      this.zoneArea = this.zoneArea.replace("··", "");
    },
    nvl(str) {
      return str == null ? "" : str;
    },
    getKey(keyObj) {
      if (keyObj) {
        return (
          "__key" +
          "_p_" +
          keyObj.province.id +
          "_c_" +
          keyObj.city.id +
          "_r_" +
          keyObj.region.id
        );
      } else {
        return "__key";
      }
    },
    getZone(keyObj) {
      let key = this.getKey(keyObj);
      let value = { province: "", city: "", region: "" };

      return new Promise((resolve, reject) => {
        if (!this.$store.getters.hasOwnProperty("zoneCache")) {
          console.log("cached, store is not ready ...");
          resolve(value);
        } else {
          var hasKey = this.$store.getters.zoneCache.some(v => {
            return v.key == key;
          });

          if (hasKey) {
            let cached = this.$store.getters.zoneCache.find(v => {
              return v.key == key;
            });
            Object.assign(value, cached.value.zone);
            resolve(value);
          } else {
            this.$store.dispatch("getZoneCache", keyObj).then(resp => {
              value = resp.result.zone;
              resolve(value);
            });
          }
        }
      });
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
</style>
