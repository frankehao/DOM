const t = dom.find('#sbl')[0]
dom.each(dom.children(t), (n) => dom.class.add(n, 'red'))
const f3 = dom.find('#f3')[0]
console.log(dom.index(f3))
