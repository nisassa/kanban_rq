import { useMutation, useQuery, useQueryClient } from "react-query";
import { endpoints } from "../config/apiConfig";
import { ColumnType } from "../types/kanban.interface";
import CallApi from "../services/apiService";

interface IData {
    data: ColumnType[];
}

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

export {
    useColumns,
};
