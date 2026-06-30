import { EntityCard, FileCard, InfoCard, StatisticCard } from "@/components/display"
import { StatCard } from "@/components/layout"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const CardFamily = {
  Root: Card,
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Action: CardAction,
  Content: CardContent,
  Footer: CardFooter,
  Info: InfoCard,
  Stat: StatCard,
  Statistic: StatisticCard,
  Entity: EntityCard,
  File: FileCard,
} as const

export { CardFamily }
