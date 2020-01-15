<template>
    <div class="w-row" :class="[flexClass,alignClass]" :style="rowStyle">
        <slot></slot>
    </div>
</template>

<script>
  export default {
    name: "WRow",
    props: {
      type: String,
      gutter: [String, Number],
      align: {
        type: String,
        validator(prop) {
          return ['', 'end', 'start', 'center'].indexOf(prop) >= 0;
        }
      }
    },
    computed: {
      rowStyle() {
        let {gutter} = this;
        return !!gutter ? {marginLeft: `${-gutter / 2}px`, marginRight: `${-gutter / 2}px`} : ''
      },
      flexClass() {
        if (this.type) {
          return `w-row--${this.type}`;
        } else {
          return '';
        }
      },
      alignClass() {
        if (this.type === 'flex' && this.align) {
          return `flex--${this.align}`
        } else {
          return '';
        }
      }
    },
    mounted() {
      this.$children.forEach(child => {
        child.gutter = this.gutter
      })
    }
  }
</script>

<style lang="scss" scoped>
    .w-row {
        &::before, &::after {
            content: '';
            display: table;
        }
        &::after {
            clear: both;
        }
    }

    .w-row--flex {
        display: flex;
        flex-wrap: wrap;
    }

    .flex--start {
        justify-content: flex-start;
    }

    .flex--end {
        justify-content: flex-end;
    }

    .flex--center {
        justify-content: center;
    }
</style>