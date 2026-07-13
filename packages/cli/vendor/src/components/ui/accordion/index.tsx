"use client"

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
} from "@/components/ui/collapse"

export type AccordionProps = CollapseGroupProps
export type AccordionItem = CollapseItem
export type AccordionRootProps = CollapseProps
export type AccordionTriggerProps = CollapseTriggerProps
export type AccordionContentProps = React.ComponentProps<typeof CollapseContent>

const Accordion = CollapseGroup
const AccordionRoot = Collapse
const AccordionTrigger = CollapseTrigger
const AccordionContent = CollapseContent

export { Accordion, AccordionContent, AccordionRoot, AccordionTrigger }
