import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { bitrix_api } from "@/services/api";
import DepartmentTreeView from "./components/department-tree-view";

const B24DepartmentPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["b24-departments"],
    queryFn: () => bitrix_api().get_departments(),
    enabled: true,
    select: (res) => res.data.result,
  });

  useEffect(() => {
    if (data) console.log(data);
  }, [data]);

  return (
    <div className="p-4">
      <DepartmentTreeView data={data} />
    </div>
  );
};

export default B24DepartmentPage;
