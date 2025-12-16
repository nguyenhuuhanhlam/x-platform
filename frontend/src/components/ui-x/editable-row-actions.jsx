// components/tables/EditableRowActions.jsx
import React from "react";
import { Check, X, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

export const EditableRowActions = ({ row, table }) => {
	// 1. Truy cập vào meta từ table options
	const meta = table.options.meta;

	// 2. Kiểm tra xem dòng hiện tại có đang được edit không
	const isEditing = meta?.editingRowId === row.original.id;

	// 3. Định nghĩa các hàm xử lý
	const onEdit = () => meta?.onStartEdit(row.original);
	const onSave = () => meta?.onSaveRow(row.original);
	const onCancel = () => meta?.onCancelEdit();

	return (
		<div className="flex items-center gap-2">
			{isEditing ? (
				<>
					<Button
						onClick={onSave}
						variant="ghost"
						size="icon"
						className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-100"
						title="Save"
					>
						<Check className="h-4 w-4" />
					</Button>

					<Button
						onClick={onCancel}
						variant="ghost"
						size="icon"
						className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-100"
						title="Cancel"
					>
						<X className="h-4 w-4" />
					</Button>
				</>
			) : (
				<Button
					onClick={onEdit}
					variant="ghost"
					size="icon"
					className="h-8 w-8 hover:bg-slate-200"
					title="Edit"
				>
					<Pencil className="h-3.5 w-3.5" />
				</Button>
			)}
		</div>
	);
};