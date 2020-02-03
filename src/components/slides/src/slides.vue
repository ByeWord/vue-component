<template>
    <div class="w-slides">
        <div class="w-slides-window" ref="window">
            <div class="w-slides-wrapper">
                <slot></slot>
            </div>
        </div>
        <ul class="w-slides-dots">
            <li class="w-slides-dot" :class="{active:selectedIndex===(n-1)}" v-for="n in dotsCount" :key="n"
                @click="switchTo(n-1)">
                {{n}}
            </li>
        </ul>
    </div>
</template>

<script>
  export default {
    name: "WSlides",
    props: {
      selected: {
        type: String,
      },
      autoPlay: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        dotsCount: 0,
        lastSelectedIndex: undefined
      }
    },
    mounted() {
      this.updateChildren();
      this.autoPlay && this.playAutomatically();
      this.dotsCount = this.$children.length;
    },
    updated() {
      this.updateChildren();
    },
    computed: {
      names() {
        return this.$children.map(child => child.name);
      },
      selectedIndex() {
        return this.names.indexOf(this.selected) || 0;
      }
    },
    methods: {
      updateChildren() {
        let selected = this.getSelected();
        this.$children.forEach(vm => {
          // Vue的异步更新，导致dom操作reverse类更新不及时
          vm.reverse = this.selectedIndex <= this.lastSelectedIndex;
          this.$nextTick(()=>{
            vm.selected = selected;
          });
        });
      },
      getSelected() {
        let first = this.$children[0];
        return this.selected || first.name;
      },
      playAutomatically() {
        let index = this.names.indexOf(this.getSelected());
        let play = () => {
          index = (++index) % this.names.length; // 正向
          this.switchTo(index);
          setTimeout(play, 5000)
        };
        play();
      },
      switchTo(index) {
        this.lastSelectedIndex = this.selectedIndex;
        this.$emit('update:selected', this.names[index]);
      }
    }
  }
</script>

<style lang="scss" scoped>
    .w-slides {
        border: 1px solid black;
        position: relative;
        &-window {
            overflow: hidden;
        }
        &-wrapper {
            position: relative;
        }
        &-dots {
            padding: 0;
            margin: 0;
            list-style: none;
            position: absolute;
            border-bottom: 0;
            left: 50%;
            transform: translateX(-50%);
        }
        &-dot {
            height: 16px;
            width: 16px;
            font-size: 12px;
            cursor: pointer;
            display: inline-block;
            line-height: 16px;
            text-align: center;
            border-radius: 50%;
            background-color: #cccccc;
            transition: background-color 0.8s ease-in-out;
            &.active {
                background-color: crimson;
            }
            &:hover {
                background-color: crimson;
            }
            &:not(:last-child) {
                margin-right: 12px;
            }
        }
    }
</style>