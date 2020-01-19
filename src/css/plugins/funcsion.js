var postcss = require('postcss');

module.exports = postcss.plugin('css-functions', function(opts = {}) {
  /* 例1, 単純なcustome decl(prop)の追加
  return function(root) {
    // result.warn('### start functions')
    root.walkDecls(function (decl) {
      if (decl.prop === 'hoge1') {
        console.log('### hoge1!!!');
        decl.cloneBefore(decl.clone({prop: 'color'}));
        decl.remove();
      }
    });
    return root;
  })
  */
  /* 例2, 単純なatRuleの追加
  return function(root) {
    root.walkAtRules('function', node => {
      const params = node.params.split(' ');
      node.after({ prop: '--' + params[0], value: params[1] });
      node.remove();
    });

    return root;
  }
  */
  return function(root) {
    root.walkAtRules('function', node => {
      const params = node.params.split(' ');
      node.after({ prop: '--' + params[0], value: params[1] });
      node.remove();
    });

    return root;
  }
})
