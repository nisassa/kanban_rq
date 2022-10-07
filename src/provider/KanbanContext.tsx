import { useColumns } from "../hooks/kanban";
import React, { FC, useContext, useEffect, useState } from "react";

const KanbanContext = React.createContext({});

const KanbanProvider: FC<any> = ({ children }) => {
    const { data, isFetching, isLoading, refetch } = useColumns();

    return (
        <KanbanContext.Provider
            value={{
                columns: data,
                refetch: refetch,
            }}
        >
            {children}
        </KanbanContext.Provider>
    );
};

export const useKanban = () => useContext(KanbanContext);

export default KanbanProvider;
