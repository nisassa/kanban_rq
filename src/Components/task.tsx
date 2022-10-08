import {Box, IconButton, ScaleFade} from '@chakra-ui/react';
import { memo } from 'react';
import { useDragAndDrop } from '../hooks/useDragAndDrop';
import _ from 'lodash';
import {ColumnType, TaskType} from "../types/kanban.interface";
import React from "react";
import { Textarea } from '@chakra-ui/react';
import {useUpdateTask} from "../hooks/useTasks";

type TaskProps = {
    index: number;
    task: TaskType;
};

function Task({
  index,
  task,
}: TaskProps ) {

    const handleSwap = (i: number, j: number) => {
        console.log("swap positions")
    };

    const { mutateAsync: updateTask, isLoading } = useUpdateTask(task?.id);
    const { ref, isDragging } = useDragAndDrop<HTMLDivElement>({ task, index: index }, handleSwap);

    const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newTitle = e.target.value;
        updateTask({ ...task, title: newTitle })
    };

    return (
        <ScaleFade in={true} unmountOnExit>
            <Box
                ref={ref}
                as="div"
                role="group"
                position="relative"
                rounded="lg"
                w={200}
                pl={3}
                pr={7}
                pt={3}
                pb={1}
                boxShadow="xl"
                cursor="grab"
                fontWeight="bold"
                userSelect="none"
                bgGradient="linear(to-l, #fefcbf, #ec9211)"
                opacity={isDragging ? 0.5 : 1}
            >
                <Textarea
                    value={task.title}
                    fontWeight="semibold"
                    cursor="inherit"
                    border="none"
                    p={0}
                    resize="none"
                    minH={70}
                    maxH={200}
                    focusBorderColor="none"
                    color="gray.700"
                    onChange={handleTitleChange}
                />
            </Box>
        </ScaleFade>
    );
}

export default memo(Task, (prev, next) => {

    if (
        _.isEqual(prev.task, next.task) &&
        _.isEqual(prev.index, next.index)
    ) {
        return true;
    }

    return false;
});

