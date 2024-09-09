
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

export interface Menu {
    name: string
    path: string
}

export interface CustomAvatar {
    hair?: string
    body?: string
    hat?: string
    back?: string
    eye?: string
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