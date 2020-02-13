<template>
    <div class="new-table-wrapper">
        <template v-for="column in columns">
            <template v-if="column.render">
                <v-nodes :vnodes="column.render({value:column.text})"></v-nodes>
            </template>
            <template v-else>
                {{column.text}}
            </template>
        </template>
    </div>
</template>

<script>
  export default {
    components: {
      vNodes: {
        functional: true,
        render: (h, ctx) => ctx.props.vnodes
      }
    },
    data() {
      return {
        columns: []
      }
    },
    name: "WNewTable",
    mounted() {
      const vNodes = this.$slots.default;
      this.columns = vNodes.map(vm => {
        console.log(vm)
        let {width, text} = vm.data.attrs;
        let render = vm.data.scopedSlots && vm.data.scopedSlots.default;
        return {
          width, text, render
        }
      })
    }
  }
</script>

<style lang="scss" scoped>

</style>