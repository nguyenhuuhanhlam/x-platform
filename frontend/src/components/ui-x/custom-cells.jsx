import * as React from "react"
import dayjs from "dayjs"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// --- Helper kiểm tra xem dòng này có đang edit không ---
const isRowEditing = (row, table) => {
  return table.options.meta?.editingRowId === row.id
}

// ==========================================
// 1. Text/Number Cell
// ==========================================
export const EditableCell = ({ getValue, row, column, table }) => {
  const initialValue = getValue()
  const [value, setValue] = React.useState(initialValue)

  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value)
  }

  // NẾU KHÔNG PHẢI DÒNG ĐANG EDIT -> CHỈ HIỆN TEXT
  if (!isRowEditing(row, table)) {
    return <div className="px-2 py-1">{initialValue}</div>
  }

  // CÒN LẠI GIỮ NGUYÊN CODE CŨ
  const type = column.columnDef.meta?.type || "text"
  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
      type={type}
      className="h-8 w-full" // Bỏ border-none để người dùng biết đang nhập
    />
  )
}

// ==========================================
// 2. Date Cell
// ==========================================
export const DateCell = ({ getValue, row, column, table }) => {
  const date = getValue()
  const [isOpen, setIsOpen] = React.useState(false)

  const onSelect = (newDate) => {
    if (newDate) {
      table.options.meta?.updateData(row.index, column.id, newDate)
      setIsOpen(false)
    }
  }

  // NẾU KHÔNG EDIT -> HIỆN TEXT NGÀY THÁNG
  if (!isRowEditing(row, table)) {
    return <div className="px-2 py-1">{date ? dayjs(date).format("DD/MM/YYYY") : ""}</div>
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"} // Đổi sang outline để rõ ràng hơn khi edit
          className={cn(
            "h-8 w-full justify-start text-left font-normal px-2",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? dayjs(date).format("DD/MM/YYYY") : <span>Chọn ngày</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

// ==========================================
// 3. Option Cell
// ==========================================
export const OptionCell = ({ getValue, row, column, table }) => {
  const initialValue = getValue()
  const { options } = column.columnDef.meta || {}
  
  // Tìm option hiện tại để hiển thị Label
  const currentOption = options?.find(opt => opt.value === initialValue)

  const onValueChange = (newValue) => {
    table.options.meta?.updateData(row.index, column.id, newValue)
  }

  // NẾU KHÔNG EDIT -> HIỆN LABEL
  if (!isRowEditing(row, table)) {
     return <div className="px-2 py-1">{currentOption ? currentOption.label : initialValue}</div>
  }

  return (
    <Select defaultValue={initialValue} onValueChange={onValueChange}>
      <SelectTrigger className="h-8 w-full px-2">
        <SelectValue placeholder="Chọn giá trị">
          {currentOption ? currentOption.label : initialValue}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {options?.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}