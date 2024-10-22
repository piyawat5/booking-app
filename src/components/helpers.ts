import { CustomAvatar } from "./Type";

export const dateFormatter = (date: Date) => {
    if (!date) return null;
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export const setAvatar = (value: any): CustomAvatar => {
    let avatar: CustomAvatar = {
        hair: '', shirt: '', back: '', head: '', face: ''
    }

    if (value) {
        avatar = {
            hair: value[`avatar_hair`]
                ? "hair" + value[`avatar_hair`]
                : "",
            shirt: value[`avatar_shirt`]
                ? "shirt" + value[`avatar_shirt`]
                : "",
            back: value[`avatar_back`]
                ? "back" + value[`avatar_back`]
                : "",
            head: value[`avatar_head`]
                ? "head" + value[`avatar_head`]
                : "",
            face: value[`avatar_face`]
                ? "face" + value[`avatar_face`]
                : "",
        };
    }

    return avatar
}