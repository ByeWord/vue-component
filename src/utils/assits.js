function findComponentUpward(context, componentName) {
  let parent = context.$parent;
  let name = parent.$options.name;
  while (parent && (name !== componentName || !name)) {
    parent = parent.$parent;
    if (parent) name = parent.$options.name;
  }
  return parent;
}

function findComponentDownward(context, componentName) {
  let children = context.$children;
  let result = null;
  if (children.length) {
    for (const child of children) {
      if (child.$options.name === componentName) {
        result = child;
        break;
      } else {
        result = findComponentDownward(child, componentName);
      }
    }
  }
  return result;
}

function findBrotherComponents(context, componentName, exceptMe = true) {
  let brother = context.$parent.$children;
  let res = brother.filter(item => item.$options.name === componentName);
  let index = res.findIndex(item => item._uid === context._uid);
  if (exceptMe) res.splice(index, 1);
  return res;
}

function findComponentsDownward(context, componentName) {
  let children = context.$children;
  let result = [];
  if (children.length){
    for (const child of children){
      if (child.$options.name === componentName){
        result.push(child);
      } else {
        result.concat(findComponentsDownward(child,componentName))
      }
    }
  }
  return result;
}

export {
  findComponentUpward,
  findComponentDownward,
  findBrotherComponents,
  findComponentsDownward
}