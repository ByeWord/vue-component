<template>
    <div class="w-col" :class="colClass" :style="colStyle">
        <slot></slot>
    </div>
</template>

<script>
  let validator = (value) => {
    let keys = Object.keys(value);
    let valid = true;
    keys.forEach(key => {
      if (!['span', 'offset'].includes(key)) {
        valid = false;
      }
    });
    return valid;
  };
  export default {
    name: "WCol",
    props: {
      span: [Number, String],
      offset: [Number, String],
      phone: {type: Object, validator},
      pad: {type: Object, validator},
      narrowPc: {type: Object, validator},
      widePc: {type: Object, validator}
    },
    data() {
      return {
        gutter: 0
      }
    },
    computed: {
      colStyle() {
        let {gutter} = this;
        return !!gutter ? {paddingLeft: `${gutter / 2}px`, paddingRight: `${gutter / 2}px`} : ''
      },
      colClass() {
        let {span, offset, phone, pad, narrowPc, pc, widePc} = this;

        let createClasses = (data, str = "") => {
          if (!data) return [];
          let array = [];
          if (data.span) {
            array.push(`w-col-${str}${data.span}`)
          }

          if (data.offset) {
            array.push(`w-col-offset-${str}${data.offset}`)
          }
          return array;
        };
        span = span ? span : 24;
        return [
          ...createClasses({span, offset}),
          ...createClasses(phone, 'phone-'),
          ...createClasses(pad, 'pad-'),
          ...createClasses(narrowPc, 'narrow-pc-'),
          ...createClasses(pc, 'pc-'),
          ...createClasses(widePc, 'wide-pc-')
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
    $colPrefix: w-col;
    $offsetPrefix: w-col-offset;
    .w-col {
        float: left;
        box-sizing: border-box;
    }

    @for $i from 1 through 24 {
        .#{$colPrefix}-#{$i} {
            width: 100%*$i/24;
        }
        .#{$offsetPrefix}-#{$i} {
            margin-left: 100%*$i/24;
        }
    }

    /*wide-pc*/
    @media only screen and (min-width: 1201px) {
        @for $i from 1 through 24 {
            .#{$colPrefix}-wide-pc-#{$i} {
                width: 100%*$i/24;
            }
            .#{$offsetPrefix}-wide-pc-#{$i} {
                margin-left: 100%*$i/24;
            }
        }
    }

    /*pc*/
    @media only screen and (max-width: 1200px) {
        @for $i from 1 through 24 {
            .#{$colPrefix}-pc-#{$i} {
                width: 100%*$i/24;
            }
            .#{$offsetPrefix}-pc-#{$i} {
                margin-left: 100%*$i/24;
            }
        }
    }

    /*narrow-pc*/
    @media only screen and (max-width: 993px) {
        @for $i from 1 through 24 {
            .#{$colPrefix}-narrow-pc-#{$i} {
                width: 100%*$i/24;
            }
            .#{$offsetPrefix}-narrow-pc-#{$i} {
                margin-left: 100%*$i/24;
            }
        }
    }

    /*pad*/
    @media only screen and (max-width: 769px) {
        @for $i from 1 through 24 {
            .#{$colPrefix}-pad-#{$i} {
                width: 100%*$i/24;
            }
            .#{$offsetPrefix}-pad-#{$i} {
                margin-left: 100%*$i/24;
            }
        }
    }

    /*phone*/
    @media only screen and (max-width: 576px) {
        @for $i from 1 through 24 {
            .#{$colPrefix}-phone-#{$i} {
                width: 100%*$i/24;
            }
            .#{$offsetPrefix}-phone-#{$i} {
                margin-left: 100%*$i/24;
            }
        }
    }

</style>