import axios from "axios"
import { USERS_PER_REQUEST } from "../../utils/config";

export const getRepositories = async (username: string) => {
    return (await axios.get(`https://api.github.com/users/${username}/repos`)).data
}

export const searchUsers = async (search: string) => {
    const params = new URLSearchParams();
    params.append('q', search)
    params.append('per_page', USERS_PER_REQUEST.toString())
    return (await axios.get(`https://api.github.com/search/users?${params.toString()}`)).data
}