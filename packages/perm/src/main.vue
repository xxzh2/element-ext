<template>
	<span class="el-perm" v-if="show">
		<slot></slot>
	</span>
</template>
<script>
export default {
  name: "ElPerm",
  props: {
    check: {},
    disabled: {
      type: Boolean,
      value: false
    }
  },
  data() {
    return {
      show: false
    };
  },
  mounted() {
    this.hasPermisions(this.check);
  },
  computed: {},
  methods: {
    hasPermisions(check) {
      // console.log(this.$route)
      if (this.$route.meta.p)
        this.show = this.disabled || this.$route.meta.p.indexOf(check) > -1;
      else this.show = true;
    }
  }
};
</script>
