export interface ListItemProps {
    id: number
    width: number
    height: number
    type: string
    duration: number
}

export interface ListProps {
    page: number;
    items: ListItemProps[];
}

export interface User {
    username: string;
}

export interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    login: (username: string, password: string) => Promise<{ success: boolean; error?: string } | undefined>;
    loading: boolean;
    logout: () => Promise<{ success: boolean; error?: string } | undefined>;
    // setIsAuthenticated: (value: boolean) => void;
    // setUser: (user: User | null) => void;
}