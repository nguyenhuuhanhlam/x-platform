import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'

export const useDataTable = ({
	data = [],
	queryKey = null,
	onSave = () => { },
}) => {
	const queryClient = useQueryClient()

	// --- Editing State ---
	const [editingRowId, setEditingRowId] = useState(null)

	// [MỚI] State lưu trữ dữ liệu gốc để backup
	const [originalSnapshot, setOriginalSnapshot] = useState(null)

	// --- Logic Update Cache ---
	const handleUpdateData = (rowIndex, columnId, value) => {
		// ...giữ nguyên code cũ...
		if (!queryKey) return
		queryClient.setQueryData(queryKey, (oldData) => {
			if (!oldData) return oldData
			const actualList = Array.isArray(oldData) ? oldData : oldData?.data
			if (!Array.isArray(actualList)) return oldData

			const updatedList = actualList.map((row, index) => {
				if (index === rowIndex) return { ...row, [columnId]: value }
				return row
			})

			if (Array.isArray(oldData)) return updatedList
			return { ...oldData, data: updatedList }
		})
	}

	// --- [MỚI] Hàm Bắt đầu Edit (Gọi khi bấm nút Bút chì) ---
	const handleStartEdit = (rowOriginal) => {
		setOriginalSnapshot(rowOriginal) // 1. Chụp lại ảnh dữ liệu gốc
		setEditingRowId(rowOriginal.id)  // 2. Bật chế độ edit
	}

	// --- [MỚI] Hàm Cancel (Gọi khi bấm nút X) ---
	const handleCancel = () => {
		if (!queryKey || !originalSnapshot) {
			setEditingRowId(null)
			return
		}

		// 1. Khôi phục dữ liệu từ snapshot vào Cache
		queryClient.setQueryData(queryKey, (oldData) => {
			if (!oldData) return oldData
			const actualList = Array.isArray(oldData) ? oldData : oldData?.data
			if (!Array.isArray(actualList)) return oldData

			const updatedList = actualList.map((row) => {
				// Tìm dòng đang sửa và thay thế bằng dữ liệu gốc
				if (row.id === editingRowId) {
					return originalSnapshot
				}
				return row
			})

			if (Array.isArray(oldData)) return updatedList
			return { ...oldData, data: updatedList }
		})

		// 2. Reset trạng thái
		setEditingRowId(null)
		setOriginalSnapshot(null)
	}

	// --- Logic Save ---
	const handleSaveRow = (rowOriginal) => {
		onSave(rowOriginal)
		// Lưu ý: Đừng setEditingRowId(null) ở đây nếu muốn đợi API trả về thành công mới tắt
		// Nhưng nhớ clear snapshot khi save thành công
		// setOriginalSnapshot(null)
	}

	return {
		data,
		editingRowId,
		setEditingRowId,
		updateData: handleUpdateData,
		onSaveRow: handleSaveRow,
		onStartEdit: handleStartEdit,
		onCancelEdit: handleCancel,

		// tableProps: {
		//   data,
		//   rowSelection,
		//   onRowSelectionChange: handleSelectionChange,

		//   editingRowId,
		//   updateData: handleUpdateData,
		//   onSaveRow: handleSaveRow,

		//   
		//   
		// }
	}
}