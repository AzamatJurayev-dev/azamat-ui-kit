import { Blockquote, Heading, Mark, Spoiler, SpoilerSummary, Text } from "@/components/display/typography"

export function TypographyShowcase() {
  return (
    <div className="space-y-4">
      <Heading level={1}>Typography Surface</Heading>
      <Text size="lg" muted>
        This page shows practical text primitives that scale from copy to section copy and long-form notes.
      </Text>
      <Heading level={2}>Status</Heading>
      <Text>
        You can emphasize words with <Mark>Mark</Mark> while keeping semantic text sizes.
      </Text>
      <Blockquote>Readable prose starts from stable hierarchy, not from random utility classes.</Blockquote>
      <Spoiler>
        <SpoilerSummary>Expand typography details</SpoilerSummary>
        <div className="mt-2 space-y-2 text-sm text-muted-foreground">
          <Text size="sm">Use level + muted controls for rhythm across pages.</Text>
          <Text>Use blockquotes for citations and customer notes.</Text>
        </div>
      </Spoiler>
    </div>
  )
}
