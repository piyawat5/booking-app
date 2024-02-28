
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

export interface Menu {
    name: string
    path: string
}

export interface CustomAvatar {
    hair: string
    body: string
    hat: string
    back: string
    eye: string
    skin: string
}

export interface User {
    firstName: string
    lastName: string
    customAvatar: CustomAvatar
    role: string
}