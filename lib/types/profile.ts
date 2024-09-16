export interface Profile {
    id: string;
    name: string;
    avatar_url: string;
    created_at: string;
    provider: string | undefined;
    email: string | undefined;
}