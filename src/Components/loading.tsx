import {
    Box,
    Spinner,
    Stack,
} from '@chakra-ui/react';
import React from "react";

function Loading() {

    return (
        <Box>
            <Stack direction='row' spacing={4}>
                <Spinner size='md' />
            </Stack>
        </Box>
    );
}

export default Loading;
