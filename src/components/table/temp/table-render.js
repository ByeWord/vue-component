export default {
  functional: true,
  props: {
    row: Object,
    column: Object,
    index: Number,
    render: {
      type: Function,
      required: true
    }
  },
  render: (h, ctx) => {
    let {row, column, index, render} = ctx.props;
    let params = {
      row, column, index, render
    };
    return ctx.props.render(h, params);
  }
}