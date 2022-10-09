import { useMutation, useQuery, useQueryClient } from "react-query";
import { endpoints } from "../config/apiConfig";
import {ColumnType, TaskType} from "../types/kanban.interface";
import CallApi from "../services/apiService";
import {AxiosResponse} from "axios";

interface IData {
    data: ColumnType[];
}

const TASKS_KEY = "Tasks"

const useColumns = () => {
    return useQuery<any>(
        [`Columns`],
        async () => {
            const response = await CallApi<IData[]>({
                url: endpoints.columns.getAll(),
                method: "GET",
                isProtected: true,
            });
            return response.data;
        },
        { keepPreviousData: false, enabled: true }
    );
};

const useCreateTask = () => {
    const queryClient = useQueryClient();
    return useMutation<AxiosResponse<unknown>, any, Omit<Partial<TaskType>, 'id'>>(
        async(body) =>
            CallApi({
                url: endpoints.columns.createTask(),
                method: "POST",
                data: body,
                isProtected: false,
            }),
            {
                onSuccess: () => {
                    return queryClient.invalidateQueries(TASKS_KEY);
                },
                onError: () => {
                    console.log("Unable to save profile data");
                },
            }
    );
}

export {
    useColumns,
    useCreateTask
};
