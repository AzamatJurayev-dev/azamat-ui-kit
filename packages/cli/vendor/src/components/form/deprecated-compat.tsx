import type { ReactElement } from "react"

import { FormInput, type FormInputKind } from "@/components/form/form-input"
import { FormSelect } from "@/components/form/form-select"
import { warnDeprecatedComponent } from "@/lib/deprecated-warning"

type DeprecatedFormInputAliasArgs<TProps> = {
  componentName: string
  replacement: string
  kind: FormInputKind
  props: TProps
  extraProps?: Record<string, unknown>
}

function renderDeprecatedFormInputAlias<TProps>({
  componentName,
  replacement,
  kind,
  props,
  extraProps,
}: DeprecatedFormInputAliasArgs<TProps>) {
  warnDeprecatedComponent(componentName, replacement)
  const Component = FormInput as unknown as (props: Record<string, unknown>) => ReactElement
  return <Component {...(props as Record<string, unknown>)} {...extraProps} kind={kind} />
}

type DeprecatedFormSelectAliasArgs<TProps> = {
  componentName: string
  replacement: string
  kind: "async"
  props: TProps
}

function renderDeprecatedFormSelectAlias<TProps>({
  componentName,
  replacement,
  kind,
  props,
}: DeprecatedFormSelectAliasArgs<TProps>) {
  warnDeprecatedComponent(componentName, replacement)
  const Component = FormSelect as unknown as (props: Record<string, unknown>) => ReactElement
  return <Component {...(props as Record<string, unknown>)} kind={kind} />
}

export { renderDeprecatedFormInputAlias, renderDeprecatedFormSelectAlias }
