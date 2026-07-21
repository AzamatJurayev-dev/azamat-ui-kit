"use client"

import * as React from "react"
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  type Connection,
  type Edge,
  type EdgeChange,
  type Node,
  type NodeChange,
  type ReactFlowProps,
} from "@xyflow/react"

import "@xyflow/react/dist/style.css"

import { cn } from "@/lib/utils"

export type FlowEditorProps<NodeType extends Node = Node, EdgeType extends Edge = Edge> = Omit<
  ReactFlowProps<NodeType, EdgeType>,
  "nodes" | "edges" | "defaultNodes" | "defaultEdges" | "onNodesChange" | "onEdgesChange" | "onConnect"
> & {
  nodes?: NodeType[]
  defaultNodes?: NodeType[]
  onNodesChange?: (nodes: NodeType[], changes: NodeChange<NodeType>[]) => void
  edges?: EdgeType[]
  defaultEdges?: EdgeType[]
  onEdgesChange?: (edges: EdgeType[], changes: EdgeChange<EdgeType>[]) => void
  onConnect?: (connection: Connection, edges: EdgeType[]) => void
  showControls?: boolean
  showMiniMap?: boolean
  showBackground?: boolean
  children?: React.ReactNode
  className?: string
}

function FlowEditor<NodeType extends Node = Node, EdgeType extends Edge = Edge>({
  nodes,
  defaultNodes = [],
  onNodesChange,
  edges,
  defaultEdges = [],
  onEdgesChange,
  onConnect,
  showControls = true,
  showMiniMap = true,
  showBackground = true,
  children,
  className,
  fitView = true,
  ...props
}: FlowEditorProps<NodeType, EdgeType>) {
  const [internalNodes, setInternalNodes] = React.useState<NodeType[]>(defaultNodes)
  const [internalEdges, setInternalEdges] = React.useState<EdgeType[]>(defaultEdges)
  const currentNodes = nodes ?? internalNodes
  const currentEdges = edges ?? internalEdges

  const handleNodesChange = React.useCallback(
    (changes: NodeChange<NodeType>[]) => {
      const nextNodes = applyNodeChanges(changes, currentNodes) as NodeType[]
      if (nodes === undefined) setInternalNodes(nextNodes)
      onNodesChange?.(nextNodes, changes)
    },
    [currentNodes, nodes, onNodesChange]
  )

  const handleEdgesChange = React.useCallback(
    (changes: EdgeChange<EdgeType>[]) => {
      const nextEdges = applyEdgeChanges(changes, currentEdges) as EdgeType[]
      if (edges === undefined) setInternalEdges(nextEdges)
      onEdgesChange?.(nextEdges, changes)
    },
    [currentEdges, edges, onEdgesChange]
  )

  const handleConnect = React.useCallback(
    (connection: Connection) => {
      const nextEdges = addEdge(connection, currentEdges) as EdgeType[]
      if (edges === undefined) setInternalEdges(nextEdges)
      onConnect?.(connection, nextEdges)
    },
    [currentEdges, edges, onConnect]
  )

  return (
    <div
      data-slot="flow-editor"
      className={cn("h-[520px] min-h-80 w-full overflow-hidden rounded-lg border bg-background", className)}
    >
      <ReactFlow<NodeType, EdgeType>
        {...props}
        nodes={currentNodes}
        edges={currentEdges}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onConnect={handleConnect}
        fitView={fitView}
      >
        {showBackground ? <Background /> : null}
        {showControls ? <Controls /> : null}
        {showMiniMap ? <MiniMap /> : null}
        {children}
      </ReactFlow>
    </div>
  )
}

export { FlowEditor }
