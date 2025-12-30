import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { IconChevronDown, IconChevronRight } from "@tabler/icons-react";

const DEP_COLORS = {
  G: { bg: "bg-gray-500", fg: "text-gray-200" },
  O: { bg: "bg-green-500", fg: "text-green-200" },
  F: { bg: "bg-blue-500", fg: "text-blue-200" },
  B: { bg: "bg-red-500", fg: "text-red-200" },
  C: { bg: "bg-yellow-500", fg: "text-yellow-200" },
  E: { bg: "bg-purple-500", fg: "text-purple-200" },
};

const DepName = ({ name }) => {
  const n = name.split("|");
  return (
    <div className="flex font-medium gap-2">
      <span
        className={`flex justify-center px-1 w-6 ${DEP_COLORS[n[0].trim()]?.bg}`}
      >
        {n[0]}
      </span>
      <span>{n[1]}</span>
    </div>
  );
};

const DepartmentNode = ({ node, level = 0 }) => {
  const hasChildren = node.children?.length > 0;
  const [open, setOpen] = useState(true);

  return (
    <div className="space-y-1">
      <div
        className="flex items-center gap-2 select-none"
        style={{ paddingLeft: level * 16 }}
      >
        {hasChildren ? (
          <Collapsible open={open} onOpenChange={setOpen}>
            <CollapsibleTrigger asChild>
              <button className="flex items-center gap-1 hover:text-primary">
                {open ? (
                  <IconChevronDown size={14} />
                ) : (
                  <IconChevronRight size={14} />
                )}
                <span className="font-medium">
                  <DepName name={node.NAME} />
                </span>
              </button>
            </CollapsibleTrigger>

            {/* {node.UF_HEAD && node.UF_HEAD !== "0" && (
              <span className="ml-2 text-xs text-muted-foreground">
                Head: #{node.UF_HEAD}
              </span>
            )} */}

            <CollapsibleContent className="mt-1 space-y-1">
              {node.children.map((child) => (
                <DepartmentNode key={child.ID} node={child} level={level + 1} />
              ))}
            </CollapsibleContent>
          </Collapsible>
        ) : (
          <>
            <span className="w-3.5]" />
            <span className="font-medium">{node.NAME}</span>

            {/* {node.UF_HEAD && node.UF_HEAD !== "0" && (
              <span className="ml-2 text-xs text-muted-foreground">
                Head: #{node.UF_HEAD}
              </span>
            )} */}
          </>
        )}
      </div>
    </div>
  );
};

export default DepartmentNode;
