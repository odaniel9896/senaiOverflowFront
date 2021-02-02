import { api } from "./api";
const USER_KEY  = "@USER"
export const signIn = (user) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user))

    api.defaults.headers.common["Authorization"] = `Bearer ${user.token}`
}