import { useMutation, useQuery, useQueryClient } from "react-query";
import { endpoints } from "../config/apiConfig";
import { TaskType, ColumnType } from "../types/kanban.interface";
import CallApi from "../services/apiService";
import { AxiosResponse } from "axios";

interface IData {
    data: TaskType[];
}

const useTasks = () => {
    return useQuery<any>(
        [`Tasks`],
        async () => {
            const response = await CallApi<IData[]>({
                url: endpoints.tasks.getAll(),
                method: "GET",
                isProtected: true,
            });
            return response.data;
        },
        { keepPreviousData: false, enabled: true }
    );
};

const useUpdateTask = (id: number) => {
    return useMutation<AxiosResponse<unknown>, any, TaskType>(
        (body) =>
            CallApi({
                url: endpoints.tasks.updateByID(id),
                method: "PUT",
                data: body,
                isProtected: false,
            }),
    );
};

const useDeleteTask = (id: number) => {
    const queryClient = useQueryClient();
    return useMutation<AxiosResponse<unknown>, any, void>(
        () =>
            CallApi({
                url: endpoints.tasks.updateByID(id),
                method: "DELETE",
                isProtected: false,
            }),
            {
                onSuccess: () => {
                    return queryClient.invalidateQueries('Tasks');
                },
                onError: (e) => {
                    console.log(e)
                },
            }
    );
};

export {
    useTasks,
    useUpdateTask,
    useDeleteTask
};
