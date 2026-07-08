import * as React from "react"

import {
  Collapse,
  CollapseContent,
  CollapseGroup,
  CollapseTrigger,
  type CollapseGroupProps,
  type CollapseItem,
  type CollapseProps,
  type CollapseTriggerProps,
} from "../collapse"

export type AccordionItem = CollapseItem
export type AccordionProps = CollapseGroupProps
export type AccordionRootProps = CollapseProps
export type AccordionTriggerProps = CollapseTriggerProps
export type AccordionContentProps = React.ComponentProps<"div">

function Accordion(props: AccordionProps) {
  return <CollapseGroup data-slot="accordion" {...props} />
}

function AccordionRoot(props: AccordionRootProps) {
  return <Collapse data-slot="accordion-root" {...props} />
}

function AccordionTrigger(props: AccordionTriggerProps) {
  return <CollapseTrigger data-slot="accordion-trigger" {...props} />
}

function AccordionContent(props: AccordionContentProps) {
  return <CollapseContent data-slot="accordion-content" {...props} />
}

export {
  Accordion,
  AccordionContent,
  AccordionRoot,
  AccordionTrigger,
}
