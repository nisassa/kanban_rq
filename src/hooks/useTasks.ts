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
            });
            return response.data;
        },
        { keepPreviousData: false, enabled: true }
    );
};

const useUpdateTask = (id: number) => {
    const queryClient = useQueryClient();
    return useMutation<AxiosResponse<unknown>, any, TaskType>(
        (body) =>
            CallApi({
                url: endpoints.tasks.updateByID(id),
                method: "PUT",
                data: body,
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

const useDeleteTask = (id: number) => {
    const queryClient = useQueryClient();
    return useMutation<AxiosResponse<unknown>, any, void>(
        () =>
            CallApi({
                url: endpoints.tasks.updateByID(id),
                method: "DELETE",
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

const useSingleTask = (id: number) => {
    return useQuery<any>(`getSingleTask`, async () => {
        return await CallApi<any>({
            url: endpoints.tasks.updateByID(id),
            method: "GET",
        })
            .then(({ data }) => data)
            .catch((err) => err);
    });
};

export {
    useTasks,
    useUpdateTask,
    useDeleteTask,
    useSingleTask
};
