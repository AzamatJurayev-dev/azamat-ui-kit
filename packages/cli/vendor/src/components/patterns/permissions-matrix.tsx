"use client"

import * as React from "react"

import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

export type PermissionMatrixRole = {
  key: string
  label: React.ReactNode
}

export type PermissionMatrixPermission = {
  key: string
  label: React.ReactNode
  description?: React.ReactNode
}

export type PermissionMatrixValue = Record<string, string[]>

export type PermissionsMatrixProps = React.ComponentProps<"div"> & {
  roles: PermissionMatrixRole[]
  permissions: PermissionMatrixPermission[]
  value?: PermissionMatrixValue
  onValueChange?: (value: PermissionMatrixValue) => void
}

function PermissionsMatrix({ roles, permissions, value = {}, onValueChange, className, ...props }: PermissionsMatrixProps) {
  const toggle = (permissionKey: string, roleKey: string) => {
    const current = value[permissionKey] ?? []
    const next = current.includes(roleKey) ? current.filter((item) => item !== roleKey) : [...current, roleKey]
    onValueChange?.({ ...value, [permissionKey]: next })
  }

  return (
    <div data-slot="permissions-matrix" className={cn("overflow-hidden rounded-lg border", className)} {...props}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Permission</TableHead>
            {roles.map((role) => <TableHead key={role.key} className="text-center">{role.label}</TableHead>)}
          </TableRow>
        </TableHeader>
        <TableBody>
          {permissions.map((permission) => (
            <TableRow key={permission.key}>
              <TableCell>
                <span className="grid gap-0.5">
                  <span className="font-medium">{permission.label}</span>
                  {permission.description ? <span className="text-xs text-muted-foreground">{permission.description}</span> : null}
                </span>
              </TableCell>
              {roles.map((role) => (
                <TableCell key={role.key} className="text-center">
                  <Checkbox
                    aria-label={`${permission.label} for ${role.label}`}
                    checked={(value[permission.key] ?? []).includes(role.key)}
                    onCheckedChange={() => toggle(permission.key, role.key)}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export { PermissionsMatrix }
