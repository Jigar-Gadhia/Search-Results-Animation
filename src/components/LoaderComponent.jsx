import { Skeleton } from "@mui/material";
import React from "react";

const LoaderComponent = () => {
  return (
    <div className="flex flex-row gap-5 items-center">
      <Skeleton animation="wave" variant="rounded" height={38} width={38} />
      <div className="flex flex-col flex-1 gap-1">
        <Skeleton animation="wave" variant="rounded" height={10} width="70%" />
        <Skeleton animation="wave" variant="rounded" height={10} width="35%" />
      </div>
    </div>
  );
};

export default LoaderComponent;
