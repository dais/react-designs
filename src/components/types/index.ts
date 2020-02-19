import { ChangeEvent } from "react";

export type EventType = {
  event: ChangeEvent<HTMLInputElement>
  value: JSX.IntrinsicElements['input']['value']
  checked?: JSX.IntrinsicElements['input']['checked']
}
