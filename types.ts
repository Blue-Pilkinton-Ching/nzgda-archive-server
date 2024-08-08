export interface Game {
  id: number
  name: string
  description: string
  thumbnail: string
  banner: string | null
  approved: boolean
  studio_id: number
  url: string | null
  tags: string
  width: number | null
  height: number | null
  created_at: string
  updated_at: string
  isApp: boolean
  educational: boolean
  sort: number
  hidden: boolean
  featured: boolean
  yearOfRelease: number
  iosLink?: string
  androidLink?: string
  steamLink?: string
  websiteLink?: string
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
