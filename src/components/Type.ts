
export enum ThemeButtonEnum {
    PRIMARY = "PRIMARY",
    OUTLINE = "OUTLINE",
}

export enum TitleActionEnum {
    ANNOUNCE = "ANNOUNCE",
    BOOKING = "BOOKING",
    MEETINGROOM = "MEETINGROOM",
    SERVICE = "SERVICE",
    PROFILE = "PROFILE",
}

export enum RoomTypeEnum {
    MEETINGROOM = "ห้องประชุม",
    AUDITORIUM = "หอประชุมใหญ่"
}

export enum RoomStatusEnum {
    FREE = "ว่าง",
    MODERATE = "ปานกลาง",
    FULL = "หนาแน่น"
}

export enum ValueEnum {
    AVATAR = 'AVATAR',
    LOGOUT = 'LOGOUT'
}

export enum ConfirmEnum {
    YES = 'YES',
    NO = 'NO'
}

export enum SizeEnum {
    SM = 'SMALL',
    LG = 'LARGE'
}

export enum CustomTypeEnum {
    HAIR = 'hair',
    FACE = 'face',
    HEAD = 'head',
    BACK = 'back',
    SHIRT = 'shirt',
    SKIN = 'skin',
}

export interface Menu {
    name: string
    path: string
}

export interface CustomAvatar {
    hair?: string
    shirt?: string
    head?: string
    back?: string
    face?: string
    skin?: string
}

export interface User {
    firstName: string
    lastName: string
    customAvatar: CustomAvatar
    role: string
}

export interface Member {
    id: string
    name: string
    head: string
    back: string
    face: string
    skin: string
    hair: string
    shirt: string
}

export interface ReserveList {
    order: number
    member: Member[]
    title: string
    roomName: string
    date: Date
    startTime: Date
    endTime: Date
    status: string
}

export interface FilterSection {
    title?: string
    room?: number
    roomMember?: number
    ref?: number
    startDate?: Date
    endDate?: Date
    startTime?: string
    endTime?: string
    status?: number
    category?: number


}

export interface ConfigContainer {
    name: string
    color: string
    configItem: ConfigItem[]
}

export interface ConfigItem {
    field: string
    name: string
    selected?: boolean
    value?: string
}

export interface ConfigRoom {
    reserve_id: boolean
    ac: boolean
    temp: string
    monitor: boolean
    micro: boolean
    add_lightblub: boolean
    towel: boolean
    paper: boolean
    white_board: boolean
    add_table: boolean
    water: boolean
    coffee: boolean
    juice: boolean
    apitize: boolean
    perfume: boolean
    clean_before: boolean
    clean_after: boolean
    security: boolean
}

export interface Account {
    email: string
    password: string
}

export interface CustomItem {
    id: string
    name: string
    description: string
}

export interface AllCustoms {
    type: CustomTypeEnum
    customItem: CustomItem[]
}

export interface CustomMenu {
    type: CustomTypeEnum
    name: string
}
