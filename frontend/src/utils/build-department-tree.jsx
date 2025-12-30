export function buildDepartmentTree(items) {
  const map = {};
  const roots = [];

  if (!Array.isArray(items)) return roots;

  // Clone items & init children
  items.forEach((item) => {
    map[item.ID] = {
      ...item,
      children: [],
    };
  });

  // Build tree
  items.forEach((item) => {
    const parentId = item.PARENT;

    if (parentId && map[parentId]) {
      map[parentId].children.push(map[item.ID]);
    } else {
      roots.push(map[item.ID]);
    }
  });

  return roots;
}
