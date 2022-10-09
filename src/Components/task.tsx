import {Box, IconButton, ScaleFade} from '@chakra-ui/react';
import { memo } from 'react';
import { useDragAndDrop } from '../hooks/useDragAndDrop';
import _ from 'lodash';
import { TaskType} from "../types/kanban.interface";
import React from "react";
import { Textarea } from '@chakra-ui/react';
import {useDeleteTask, useUpdateTask} from "../hooks/useTasks";
import { useEffect } from "react";
import { useKanban } from "../contextProviders/kanbanContext";
import { DeleteIcon } from '@chakra-ui/icons';

type TaskProps = {
    index: number;
    task: TaskType;
};

function Task({
  index,
  task,
}: TaskProps ) {

    const kanban = useKanban()
    const { tasks: allTasks } = kanban;

    const { mutateAsync: updateTask, isLoading: isUpdating } = useUpdateTask(task?.id);
    const { mutateAsync: deleteTask, isLoading: isDeleting } = useDeleteTask(task?.id);

    const handleSwap = (i: number, j: number) => {
        console.log("swap positions")
    };

    // synchronize server state with the client sate for task
    useEffect(() => {
        if (allTasks) {
            const original = allTasks.find((item) => task.id === item.id);
            if (original && original.column_id !== task.column_id && !isUpdating) {
                updateTask(task);
            }
        }
    }, [task, allTasks]);


    const { ref, isDragging } = useDragAndDrop<HTMLDivElement>({ task, index: index }, handleSwap);

    const handleTitleUpdate = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newTitle = e.target.value;
        updateTask({ ...task, title: newTitle })
    };

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (! isDeleting) {
            deleteTask()
            kanban.updateRequireTaskRefetch(true);
        }
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
                <IconButton
                    position="absolute"
                    top={0}
                    right={0}
                    zIndex={100}
                    aria-label="delete-task"
                    size="md"
                    colorScheme="solid"
                    color={'gray.700'}
                    icon={<DeleteIcon />}
                    opacity={0}
                    _groupHover={{
                        opacity: 1,
                    }}
                    onClick={handleDelete}
                />
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
                    onChange={handleTitleUpdate}
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

