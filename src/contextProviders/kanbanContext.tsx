import { useColumns } from "../hooks/useKanban";
import { useTasks } from "../hooks/useTasks";
import React, {FC, useContext, createContext, Context, useState} from "react";
import { ColumnType, TaskType } from "../types/kanban.interface";

interface IKanbanContext {
    columns: ColumnType[] | null;
    columnsLoaded: boolean;
    tasks: TaskType[] | null;
    tasksLoaded: boolean;
    requireTaskRefetch: boolean;
    refetchTasks?: any;
    updateRequireTaskRefetch?: any;
}

export const KanbanContext = createContext<IKanbanContext>(
    {
        columns: null,
        columnsLoaded: false,
        tasks: null,
        tasksLoaded: false,
        requireTaskRefetch: false,
    }
) as Context<IKanbanContext>;

export const useKanban = () => useContext(KanbanContext);

const KanbanProvider: FC<any> = ({ children }) => {

    const [requireTaskRefetch, setRequireTaskRefetch] = useState(false);

    const updateRequireTaskRefetch = (value: boolean) => {
        setRequireTaskRefetch(value)
    }

    const {
        data: columns,
        isFetching: isFetchingColumns,
        isLoading: isLoadingColumns,
        refetch: refetchColumns
    } = useColumns();

    const {
        data: tasks,
        isFetching: isFetchingTasks,
        isLoading : isLoadingTasks,
        refetch: refetchTasks
    } = useTasks();

    return (
        <KanbanContext.Provider
            value={{
                columns: columns,
                columnsLoaded: !isFetchingColumns && !isLoadingColumns,
                tasks: tasks,
                tasksLoaded: !isFetchingTasks && !isLoadingTasks,
                refetchTasks,
                requireTaskRefetch,
                updateRequireTaskRefetch
            }}
        >
            {children}
        </KanbanContext.Provider>
    );
};

export default KanbanProvider;
