import { useState } from 'react'

export const useDataTable = (data, callback = () => { }) => {
	const [rowSelection, setRowSelection] = useState({})
	const [rowSelectedData, setRowSelectedData] = useState({})

	const handleSelectionChange = (updater) => {
		setRowSelection((old) => {
			const newState = typeof updater === 'function' ? updater(old) : updater

			const selectedKey = Object.keys(newState)[0]
			if (selectedKey) {
				const rowData = data[selectedKey]
				setRowSelectedData(rowData)
				callback()
			}

			return newState
		})
	}

	return { rowSelection, rowSelectedData, handleSelectionChange }
}