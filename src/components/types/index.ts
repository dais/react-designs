import { ChangeEvent } from "react";
import { ToggleItemProps } from '..'

export type CustomChangeEvent = {
  event?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  value: string | number
  checked?: boolean
  files?: FileList
  items?: ToggleItemProps[]
}

export type CustomChangeEventHandler = (event: CustomChangeEvent) => void
