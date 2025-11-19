import type { User } from './User'
import type { Menu, Page } from './Menu'
import type { ConfigMenu } from './ConfigMenu'
import type { PermissionComponent } from './PermissionsComponent'

export interface Permission {
  id: number
  backUrl: string
  methods: Array<{
    name: string
    [key: string]: any
  }>
  subpermissions?: Array<{
    backUrl: string
    methods: Array<{
      name: string
      [key: string]: any
    }>
  }>
  [key: string]: any
}

export interface Login {
  jwt: string
  user: User
  permissions: Permission[]
  groupId: number
  menus?: Menu[]
  configs?: ConfigMenu[]
  components?: PermissionComponent[]
  [key: string]: any
}

