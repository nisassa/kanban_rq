import { QueryClient } from "react-query";
import settings from "./settings";

export const endpoints = {
    columns: {
        getAll: () =>
            `${settings.apiUrl}/columns`,
    },
};

const reactQueryConfig = {
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            refetchOnMount: false,
            retry: false,
            cacheTime: 0,
        },
    },
};

export const ReactQueryClient = new QueryClient(reactQueryConfig);
