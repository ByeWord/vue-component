<template>
    <div class="w-slides">
        <div
                class="w-slides-window"
                ref="window"
                @touchstart="onTouchStart"
                @touchmove="onTouchMove"
                @touchend="onTouchEnd"
        >
            <div class="w-slides-wrapper">
                <slot></slot>
            </div>
        </div>
        <ul class="w-slides-dots">
            <li class="w-slides-dot" :class="{active:selectedIndex===(n-1)}" v-for="n in dotsCount" :key="n"
                @click="switchTo(n-1)"
                @mouseenter="pause"
                @mouseleave="onMouseLeave"
            >
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
      },
    },
    data() {
      return {
        dotsCount: 0,
        lastSelectedIndex: undefined,
        timeId: null
      }
    },
    mounted() {
      this.updateChildren();
      console.log(this.$children)
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
        let index = this.names.indexOf(this.selected);
        return index === -1 ? 0 : index;
      }
    },
    methods: {
      onTouchStart(e) {
        if (e.touches.length > 1) return;
        this.pause();
      },
      onTouchMove(e) {
        console.log('onTouchMove')
      },
      onTouchEnd(e) {
        let endTouch = e.changedTouches[0];
        console.log(endTouch)
      },
      updateChildren() { // 核心更新方法
        let selected = this.getSelected(); // 获取更新后的selected
        this.$children.forEach(vm => {
          // Vue的异步更新，导致dom操作reverse类更新不及时
          let reverse = this.selectedIndex <= this.lastSelectedIndex;
          if (this.timeId) {
            if (this.lastSelectedIndex === this.$children.length - 1) {
              reverse = false;
            }
          }
          vm.reverse = reverse;
          this.$nextTick(() => {
            vm.selected = selected;
          });
        });
      },
      getSelected() {
        let first = this.$children[0];
        return this.selected || first.name;
      },
      onMouseLeave() {
        if (!this.timeId) { //为了防止timeId被重复播放
          this.playAutomatically();
        }
      },
      playAutomatically() {
        let play = () => {
          let index = this.names.indexOf(this.getSelected());
          index = (++index) % this.names.length; // 正向
          this.switchTo(index);
          this.timeId = setTimeout(play, 5000)
        };
        play();
      },
      pause() {
        this.timeId && window.clearTimeout(this.timeId);
        this.timeId = null;
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