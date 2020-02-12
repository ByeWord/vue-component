<template>
    <div>

    </div>
</template>

<script>
  export default {
    name: "WTableColumn",
    props:{
      width:{
        type:String|Number
      },
      text:{
        type: String
      },
      sortable:{
        type:Boolean,
        default:false
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>