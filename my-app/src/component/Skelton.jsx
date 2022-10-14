import React from "react";
import {Skeleton} from "antd";
import './style.css'

export function skeletonGenerator(columnsIds = [], numOfRows = 0) {
    debugger
    const oneCopyOfSkeleton = {};
    columnsIds.forEach((id) => {
        oneCopyOfSkeleton[id] = <Skeleton.Input active={true} size={"small"}/>;
    });
    return Array.from(Array(numOfRows).keys()).map(() => oneCopyOfSkeleton);
}

