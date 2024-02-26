
export enum ThemeButtonEnum {
    PRIMARY = "PRIMARY",
    LIGHT = "LIGHT",
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