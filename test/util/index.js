export const EMPTY_CHILDREN = []

export const CHILDREN_MATCHER = sinon.match(v => v === null || (Array.isArray(v) && !v.length), '[empty children]')

export function getAttributes (node) {
  const attrs = {}
  if (node.attributes) {
    for (let i = node.attributes.length; i--;) {
      attrs[node.attributes[i].name] = node.attributes[i].value
    }
  }
  return attrs
}

export function sortAttributes (html) {
  return html.replace(/<([a-z0-9-]+)((?:\s[a-z0-9:_.-]+=".*?")+)((?:\s*\/)?>)/gi, (s, pre, attrs, after) => {
    const list = attrs.match(/\s[a-z0-9:_.-]+=".*?"/gi).sort((a, b) => a > b ? 1 : -1)
    if (~after.indexOf('/')) after = `></${pre}>`
    return '<' + pre + list.join('') + after
  })
}