import { useState, useMemo } from 'react'
import { Field, FieldLabel } from '@/components/ui/field'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Command, CommandInput, CommandItem, CommandEmpty, CommandGroup } from '@/components/ui/command'
import { Button } from '@/components/ui/button'
import { ChevronsUpDown } from 'lucide-react'
import { IconPointFilled } from '@tabler/icons-react'

const FormFieldSelect = ({
	form,
	name,
	label,
	placeholder = 'Please choose',
	items = [],
	loading = false,
	highlight = 'bg-blue-900/30!',
	showSearch = false,
	itemsMaxHeight = 'max-h-80'
}) => {

	return (
		<form.Field
			name={name}
			children={(field) => (
				<Field className='gap-2'>
					{label && (
						<FieldLabel className='flex justify-between field-label'>
							{label}
							{field.state.meta.errors.length > 0 && (
								<IconPointFilled size={14} className='text-red-800 translate-y-[2px]' />
							)}
						</FieldLabel>
					)}

					<SearchableSelect
						value={field.state.value ?? ''}
						onChange={field.handleChange}
						placeholder={placeholder}
						items={items}
						loading={loading}
						highlight={highlight}
						showSearch={showSearch}
						itemsMaxHeight={itemsMaxHeight}
					/>
				</Field>
			)}
		/>
	)
}

export default FormFieldSelect



// ============================================================================
// SEARCHABLE COMBOBOX SELECT (UI)
// - separate scroll area for items so popup scrolls when many items
// - trigger and items use truncate (ellipsis)
// ============================================================================
const SearchableSelect = ({
	value,
	onChange,
	placeholder,
	items,
	loading,
	highlight,
	showSearch,
	itemsMaxHeight = 'max-h-60' // default tailwind max height for items area
}) => {
	const [open, setOpen] = useState(false)

	// safe items array
	const safeItems = useMemo(() => {
		return Array.isArray(items) ? items : []
	}, [items])

	// find selected label safely
	const selectedLabel = useMemo(() => {
		const found = safeItems.find((i) => String(i.value) === String(value))
		return found?.label || ''
	}, [safeItems, value])

	return (
		<Popover open={open} onOpenChange={setOpen}>
			{/* TRIGGER */}
			<PopoverTrigger asChild>
				<Button
					variant='outline'
					role='combobox'
					className={`w-full justify-between text-left ${value ? highlight : ''}`}
				>
					<span className='flex-1 truncate whitespace-nowrap overflow-hidden'>
						{selectedLabel || placeholder}
					</span>

					<ChevronsUpDown className='ml-2 h-4 w-4 opacity-50 shrink-0' />
				</Button>
			</PopoverTrigger>

			{/* POPOVER CONTENT */}
			<PopoverContent
				className='p-0'
				align='start'
				style={{ minWidth: 'var(--radix-popover-trigger-width, auto)' }}
			>
				<Command>

					{/* optional search input (kept outside scroll area) */}
					{showSearch && <CommandInput placeholder='Search...' />}

					{/* loading indicator (also outside scroll area) */}
					{loading && (
						<div className='p-2 text-sm text-muted-foreground'>Loading…</div>
					)}

					{/* ITEMS AREA — this div provides the scroll area for long lists */}
					<div className={`${itemsMaxHeight} overflow-y-auto`} onWheel={(e) => e.stopPropagation()} >
						{/* show CommandEmpty only when search is enabled so keyboard + a11y still fine */}
						{(!loading && showSearch) && <CommandEmpty>No results.</CommandEmpty>}

						{!loading && safeItems.length > 0 ? (
							<CommandGroup>
								{safeItems.map((item) => (
									<CommandItem
										key={item.value}
										value={String(item.label)}
										className='truncate whitespace-nowrap overflow-hidden'
										onSelect={() => {
											onChange(item.value)
											setOpen(false)
										}}
									>
										{item.label}
									</CommandItem>
								))}
							</CommandGroup>
						) : (
							// when not loading and no items
							!loading && (
								<div className='p-2 text-sm text-muted-foreground'>
									No options available.
								</div>
							)
						)}
					</div>

				</Command>
			</PopoverContent>
		</Popover>
	)
}
