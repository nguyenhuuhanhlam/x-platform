import DepartmentNode from "./department-node";
import { buildDepartmentTree } from "@/utils/build-department-tree";

const DepartmentTreeView = ({ data }) => {
  const tree = buildDepartmentTree(data);

  return (
    <div className="space-y-2 text-sm">
      {tree.map((root) => (
        <DepartmentNode key={root.ID} node={root} />
      ))}
    </div>
  );
};

export default DepartmentTreeView;
