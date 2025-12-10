"use client"

import * as React from "react"
import { Check, ChevronsUpDown, ReceiptRussianRuble } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { SuratMasuk } from "@/types/surat-masuk"
import { SuratKeluarProps } from "@/types/surat-keluar"

interface DropdownProps<T> {
    data: T[]
    valueKey: Extract<keyof T, string>
    labelKey: Extract<keyof T, string>
    value: string | number
    onChange: (value: string | number) => void
    placeholder?: string
}

export function DropdownPick<T>({
    data,
    valueKey,
    labelKey,
    value,
    onChange,
    placeholder = "Pilih Item..."
}: DropdownProps<T>) {

    const [open, setOpen] = React.useState(false)
    const selectedItem = data.find((item) => item[valueKey] === value)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {selectedItem ? String(selectedItem[labelKey]) : placeholder}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandList>
                        <CommandEmpty>Data Tidak Ditemukan</CommandEmpty>
                        <CommandGroup>
                            {data.map((item, index) => {
                                const itemValue = item[valueKey] as unknown as string | number
                                const itemLabel = item[labelKey] as unknown as string

                                return (
                                    <CommandItem
                                        key={index}
                                        value={String(itemValue)}
                                        onSelect={() => {
                                            onChange(itemValue)
                                            setOpen(false)
                                        }}
                                    >
                                        {String(itemLabel)}

                                        <Check
                                            className={cn(
                                                "ml-auto",
                                                value === itemValue ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                )
                            })}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
