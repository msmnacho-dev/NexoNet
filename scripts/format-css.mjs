import postcss from 'postcss';
import { readFile, writeFile } from 'node:fs/promises';
for (const file of ['base', 'scenes', 'responsive']) {
  const path = `src/styles/${file}.css`;
  const root = postcss.parse(await readFile(path, 'utf8'));
  function format(container, depth = 0) {
    for (const node of container.nodes || []) {
      node.raws.before = '\n' + '  '.repeat(depth);
      if (node.type === 'decl') node.raws.between = ': ';
      if (node.nodes) {
        node.raws.between = ' ';
        node.raws.after = '\n' + '  '.repeat(depth);
        node.raws.semicolon = true;
        format(node, depth + 1);
      }
    }
  }
  format(root);
  await writeFile(path, root.toString().trim() + '\n');
}
