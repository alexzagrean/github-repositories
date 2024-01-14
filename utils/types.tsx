export interface GitUser {
    username: string
}

export interface Repository {
    name: string
    stars: number
    forks: number
    url: string
}

export interface UserDetails {
    photo: string;
    url: string;
    name: string;
    repo_count: number;
}