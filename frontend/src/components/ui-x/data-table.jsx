'use client'
import { useState } from 'react'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { Button } from '@/components/ui/button'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'

// - - - - -
export function DataTable({
  columns,
  data,
  globalFilter,
  setGlobalFilter,
  rowSelection = {},
  onRowSelectionChange,
  usePaging = true
}) {

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      rowSelection
    },
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    ...(usePaging && { getPaginationRowModel: getPaginationRowModel() }),
  })

  const rows = usePaging
    ? table.getRowModel().rows
    : table.getCoreRowModel().rows

  return (
    <>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="bg-neutral-800">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {rows?.length ? (
              rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => {
                    table.resetRowSelection()
                    row.toggleSelected()
                  }}
                  className="cursor-default"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="mt-4">
        {usePaging && (
          <div className="flex items-center justify-between">
            <Button
              className="text-sm text-muted-foreground"
              variant="outline"
            >
              Total <span className="text-white">{table.getFilteredRowModel().rows.length}</span> rows
            </Button>

            <div className="flex items-center gap-4">
              <Button
                className="px-2"
                variant="outline"
              >
                Page {table.getState().pagination?.pageIndex + 1} /{" "}
                {table.getPageCount()}
              </Button>

              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <IconChevronLeft />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <IconChevronRight />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
