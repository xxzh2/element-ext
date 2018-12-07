<template>
  <div class="el-zone">
    <el-cascader :options="zone" v-model="selectedZone" @active-item-change="handleItemChange" :props="props" separator="·" clearable filterable style="width: 100%"></el-cascader>
  </div>
</template>
<script>
export default {
  name: "ElZone",
  model: { prop: "value", event: "handleZoneChanged" },
  props: {
    "get-item": {},
    "get-zone": {},
    "active-item-change": {},
    value: {}
  },
  data() {
    return {
      zone: [],
      selectedZone: [],
      props: {
        value: "value",
        children: "cities"
      }
    };
  },
  watch: {
    selectedZone(val) {
      this.$emit("handleZoneChanged", val);
    },
    value() {
      this.selectedZone = this.value;
      this.handleItemChange(this.selectedZone);
    }
  },
  mounted() {
    this.init();
    setTimeout(() => {
      if (Array.isArray(this.value) && this.value.length > 2) {
        this.handleItemChange(this.value);
      }
    }, 300);
  },
  computed: {},
  methods: {
    init() {
      if (typeof this.getItem == "function") {
        this.initItem();
      } else if (typeof this.getZone == "function") {
        this.initZone();
      }
    },
    handleItemChange(val) {
      if (typeof this.getItem == "function") {
        this.itemChange(val);
      } else if (typeof this.getZone == "function") {
        this.zoneChange(val);
      }
    },
    zoneChange(val) {
      if (!Array.isArray(val) || val.length < 1) return;
      this.getZone({
        province: { id: val[0] },
        city: { id: val[1] },
        region: { id: val[2] }
      }).then(response => {
        var pIndex = this.zone.findIndex(v => {
          return v.value == val[0];
        });
        Object.assign(this.zone[pIndex], {
          cities: response.result.cityList.map(v => {
            return {
              value: v.id,
              label: v.name,
              cities: []
            };
          })
        });

        var cIndex = this.zone[pIndex].cities.findIndex(v => {
          return v.value == val[1];
        });
        Object.assign(this.zone[pIndex].cities[cIndex], {
          cities: response.result.regionList.map(v => {
            return {
              value: v.id,
              label: v.name
            };
          })
        });
      });
      this.selectedZone = val;
      if (typeof this.activeItemChange == "function") {
        this.activeItemChange(val);
      }
    },
    initZone() {
      this.getZone({
        province: { id: "" }
      }).then(response => {
        this.zone = response.result.provinceList.map(v => {
          return {
            value: v.id,
            label: v.name,
            cities: []
          };
        });
      });
    },
    initItem() {
      this.getItem({
        parentId: ""
      }).then(response => {
        this.zone = response.result.map(v => {
          return {
            value: v.id,
            label: v.name,
            cities: []
          };
        });
      });
    },
    itemChange(val) {
      if (!Array.isArray(val) || val.length < 1) return;
      this.getObject(this.zone, val.concat()).then(resp => {
        const i = resp.findIndex(v => {
          return v.value === val[val.length - 1];
        });
        this.getItem({
          parentId: val[val.length - 1]
        }).then(response => {
          if (Array.isArray(response.result) && response.result.length > 0) {
            this.hasNext(response.result[0].id).then(hasCities => {
              if (hasCities) {
                resp[i].cities = response.result.map(v => {
                  return {
                    value: v.id,
                    label: v.name,
                    cities: []
                  };
                });
              } else {
                resp[i].cities = response.result.map(v => {
                  return {
                    value: v.id,
                    label: v.name
                  };
                });
              }
            });
          } else {
            for (var l in resp) {
              delete resp[l].cities;
            }
          }
        });
      });
      this.selectedZone = val;
      if (typeof this.activeItemChange == "function") {
        this.activeItemChange(val);
      }
    },
    getObject(target, val) {
      if (val.length > 1 && target) {
        var i = val.shift();
        var t = target.findIndex(v => {
          return v.value == i;
        });
        return new Promise((resolve, reject) => {
          this.getItem({
            parentId: i
          })
            .then(response => {
              if (response.result && t > 0) {
                target[t].cities = response.result.map(v => {
                  return {
                    value: v.id,
                    label: v.name,
                    cities: []
                  };
                });
                resolve(this.getObject(target[t].cities, val.concat()));
              }
            })
            .catch(error => {
              reject(error);
            });
        });
      } else {
        return new Promise((resolve, reject) => {
          resolve(target);
        });
      }
    },
    hasNext(id) {
      return new Promise((resolve, reject) => {
        this.getItem({
          parentId: id
        })
          .then(response => {
            if (Array.isArray(response.result)) {
              resolve(true);
            } else {
              resolve(false);
            }
            resolve(this.getObject(target[t].cities, val.concat()));
          })
          .catch(error => {
            reject(error);
          });
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
