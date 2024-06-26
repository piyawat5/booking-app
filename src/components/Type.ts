
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
