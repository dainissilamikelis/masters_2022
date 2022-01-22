import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import React from 'react'

const FormSkeleton = () => {
    return (
        <Box>
            <Skeleton sx={{ margin: "auto"}}  height={80} width="80%" />
            <Skeleton sx={{ margin: "auto"}} height={80} width={80} />

            <Skeleton sx={{ margin: "auto"}}  height={80} width="80%" />
            <Skeleton sx={{ margin: "auto"}}  height={80} width="80%" />
            <Skeleton sx={{ margin: "auto"}}  height={80} width="80%" />
            <Skeleton sx={{ margin: "auto"}}  height={80} width="80%" />
            <Skeleton sx={{ margin: "auto"}}  height={80} width="80%" />
        </Box>
    );
}
 
export default FormSkeleton;