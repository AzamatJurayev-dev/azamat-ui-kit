import { actionDemoCodeSnippets } from "./actions"
import { formDemoCodeSnippets } from "./forms"
import { layoutDemoCodeSnippets } from "./layout"
import { uploadDemoCodeSnippets } from "./upload"

export const demoCodeSnippets: Record<string, string> = {
  ...actionDemoCodeSnippets,
  ...formDemoCodeSnippets,
  ...layoutDemoCodeSnippets,
  ...uploadDemoCodeSnippets,
  chat: `import { ChatComposer, ChatHeader, ChatMessage, ChatMessageList, ChatShell, ConversationList } from "tembro"

const conversations = [
  { id: "atlas", title: "Atlas Retail", description: "Invoice and renewal notes", status: "online" },
  { id: "nova", title: "Nova Bank", description: "Security review", unreadCount: 3 },
]

export function SupportChatDemo() {
  return (
    <ChatShell
      sidebar={<ConversationList conversations={conversations} selectedId="atlas" onSelect={() => undefined} />}
      header={<ChatHeader title="Atlas Retail" description="Support workspace" status="online" />}
      composer={<ChatComposer placeholder="Type message..." onSend={() => undefined} />}
    >
      <ChatMessageList>
        <ChatMessage id="m1" author="Atlas Retail" content="Can you send the latest invoice?" />
        <ChatMessage id="m2" author="Support" content="Invoice link and renewal summary are ready." own />
      </ChatMessageList>
    </ChatShell>
  )
}`,
}
