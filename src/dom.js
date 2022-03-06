window.dom = {
  create(string) {
    const container = document.createElement('template')
    container.innerHTML = string.trim()
    return container.content.firstChild
  },
  //在node后面插入node2
  after(node, node2) {
    node.parentNode.insertBefore(node2, node.nextSibling)
  },
  //在node前面插入node2
  before(node, node2) {
    node.parentNode.insertBefore(node2, node)
  },
  //在parent中插入孩子node
  append(parent, node) {
    parent.appentChild(node)
  },
  //给node插入一个新爹，原来的爹变成爷爷
  wrap(node, parent) {
    dom.before(node, parent)
    dom.append(parent, node)
  },
  //删除一个节点
  remove(node) {
    node.parentNode.removeChild(node)
    return node
  },
  //清空一个节点
  empty(node) {
    const array = []
    let x = node.firstChild
    while (x) {
      array.push(dom.remove(node.firstChild))
      x = node.firstChild
    }
    return array
  },
  //为一个标签的属性添加属性值
  attr(node, name, value) {
    if (arguments.length === 3) {
      node.setAttribute(name, value)
    } else if (arguments.length === 2) {
      return node.getAttribute(name)
    }
  },
  //修改文本
  text(node, string) {
    if (arguments.length === 2) {
      if ('innerText' in node) {
        //适配ie
        node.innerText = string
      } else {
        node.textContent = string //适配Firefox和Chrome
      }
    } else if (arguments.length === 1) {
      if ('innerText' in node) {
        return node.innerText
      } else {
        return node.textContent
      }
    }
  },
  //读修改HTML内容
  html(node, string) {
    if (arguments.length === 2) {
      node.innerHTMl = string
    } else if (arguments.length === 1) {
      return node.innerHTML
    }
  },
  //根据不同的参数和参数个数，判断是要查看样式还是修改样式
  style(node, name, value) {
    if (arguments.length === 3) {
      node.style[name] = value
    } else if (arguments.length === 2) {
      if (typeof name === 'string') {
        return node.style[name]
      } else if (name instanceof Object) {
        const object = name
        for (key in object) {
          node.style[key] = object[key]
        }
      }
    }
  },
  //添加类名、删除类名、检测是否含有类名
  class: {
    add(node, className) {
      node.classList.add(className)
    },
    remove(node, className) {
      node.classList.remove(className)
    },
    has(node, className) {
      return node.classList.contains(className)
    },
  },
  //为节点添加监听事件
  on(node, eventName, fn) {
    node.addEventListener(eventName, fn)
  },
  //去除节点添加监听事件
  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn)
  },
  //获取标签或者标签们
  find(selector, scope) {
    return (scope || document).querySelectorAll(selector)
  },
  //返回父亲节点
  parent(node) {
    return node.parentNode
  },
  //返回孩子节点
  children(node) {
    return node.children
  },
  //返回兄弟节点（不包括自己）
  siblings(node) {
    return Array.from(node.parentNode.children).filter((n) => n !== node)
  },
  //返回下一个节点
  next(node) {
    let x = node.nextSibling
    while (x && x.nodeType === 3) {
      x = x.nextSibling
    }
    return x
  },
  //返回下一个节点
  previous(node) {
    let x = node.previousSibling
    while (x && x.nodeType === 3) {
      x = x.previousSibling
    }
    return x
  },
  //遍历所有节点并操作
  each(nodeList, fn) {
    for (let i = 0; i < nodeList.length; i++) {
      fn(nodeList[i])
    }
  },
  //返回节点在孩子节点中的位置，从0开始
  index(node) {
    const list = dom.children(node.parentNode)
    let i
    for (i = 0; i < list.length; i++) {
      if (list[i] === node) {
        break
      }
    }
    return i
  },
}
