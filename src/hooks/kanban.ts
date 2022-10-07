import { useMutation, useQuery, useQueryClient } from "react-query";
import { endpoints } from "../config/apiConfig";
import { Kanban } from "../types/kanban.interface";
import axios from 'axios'

interface IData {
    data: Kanban[];
}

const useColumns = () => {
    return useQuery<any>('Columns', async () => {
            return axios.get(endpoints.columns.getAll())
        },
        { keepPreviousData: false, enabled: true }
    );


};

export {
    useColumns,
};
