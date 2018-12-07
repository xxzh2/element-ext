<template> 
  <div class="el-more">
    <el-popover placement="bottom" width="width" trigger="hover">
      <el-form ref="form">
        <slot></slot> 
        <el-row>
          <el-col :span="12">
            <el-checkbox label="全选" v-model="columns.selectionAll"></el-checkbox>
          </el-col>
        </el-row>
      </el-form>
      <el-button slot="reference" plain style="" icon="el-icon-arrow-down" size="mini"></el-button>
    </el-popover>
  </div>
</template>
<script>
export default {
  name: "ElMore",
  props: {
    columns: {},
    width: {
      type: Number,
      value: 180
    }
  },
  data() {
    return {};
  },
  mounted() {},
  computed: {},
  methods: {},
  watch: {
    "columns.selectionAll": function() {
      for (var index in this.columns) {
        this.columns[index] = this.columns["selectionAll"];
        // console.log(this.columns[index]);
        // console.log(index);
      }
    }
  }
};
</script>
