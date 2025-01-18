export interface user {
    id: string;
    name: string;
    avatar: string;
    skills: {
        frontend: number;
        backend: number;
        uiux: number;
        security: number;
        devops: number;
    };
}