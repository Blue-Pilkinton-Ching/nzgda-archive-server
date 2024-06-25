export interface Game {
  id: number
  name: string
  description: string
  thumbnail: string
  banner?: string
  approved: boolean
  studio: Studio
  url?: string
  tags: string
  exclude: string
  width?: number
  height?: number
  createdAt: string
  updatedAt: string
  isApp: boolean
  educational: boolean
  playableOnHeihei?: boolean
  hidden: boolean
  sort: number
}

export interface DashboardData {
  games: Game[]
  admins: Admin[]
  requests: Admin[]
  studios: Studio[]
}

export interface Admin {
  email: string
  studio: string
  uid: string
}

export interface GameListItem {
  id: number
  name: string
  thumbnail: string
  hidden: boolean
  partner: string
  exclude: string
  app?: boolean
  featured: boolean
  educational?: boolean
  banner?: string
  approved?: boolean
  sort?: number
  playableOnHeihei?: boolean
  timestamp?: number
}

export interface Partner {
  hidden: boolean
  name: string
}

export interface GamesList {
  data: GameListItem[]
  partners: Partner[]
}

export interface s3Object {
  Key: string
  filepath: string
}

export type UserPrivilege =
  | 'missing'
  | 'invalid'
  | 'error'
  | 'noprivilege'
  | 'admin'

export interface Studio {
  id: number
  name: string
}
