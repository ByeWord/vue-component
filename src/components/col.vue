<template>
    <div class="w-col" :class="colClass" :style="colStyle">
        <slot></slot>
    </div>
</template>

<script>
  export default {
    name: "WCol",
    props: {
      span: [Number, String],
      offset: [Number, String]
    },
    data(){
      return {
        gutter: 0
      }
    },
    computed:{
      colStyle(){
        let {gutter} = this;
        return !!gutter?{paddingLeft:`${gutter/2}px`,paddingRight:`${gutter/2}px`}:''
      },
      colClass(){
        let {span,offset} = this;
        return [span&&`w-col--${span}`,offset&&`w-col--offset-${offset}`]
      }
    }
  }
</script>

<style lang="scss" scoped>
    .w-col{
        float: left;
        box-sizing: border-box;
    }
    @for $i from 1 through 24{
        .w-col--#{$i}{
            width: 100%*$i/24;
        }
        .w-col--offset-#{$i}{
            margin-left: 100%*$i/24;
        }
    }
</style>