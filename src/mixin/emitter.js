export default {
  methods: {
    broadcast(componentName, eventName, payload) {
      this.$children.forEach(child => {
        const name = child.$options.name;
        if (componentName === name) {
          child.$emit.apply(child, [eventName].concat(payload))
        } else {
          this.broadcast.apply(child, [componentName, eventName, payload]);
        }
      });
    },
    dispatch(componentName, eventName, payload) {
      let parent = this.$parent || this.$root;
      let name = parent.$options.name;
      while (parent && name !== componentName && name) {
        parent = parent.$parent;
        if (parent) {
          name = parent.$options.name;
        } else {
          name = undefined;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName, payload]);
      }
    }
  }
}