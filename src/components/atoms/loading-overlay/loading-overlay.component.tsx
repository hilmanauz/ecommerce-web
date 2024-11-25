import { memo } from "react";
import { LoadingOverlay as MantineLoadingOverlay } from "@mantine/core";
import { LoadingOverlayProps } from "./loading-overlay.types";

const LoadingOverlayComponent: React.FC<LoadingOverlayProps> = ({
    ...props
}) => {
    return <MantineLoadingOverlay {...props} zIndex={props.zIndex || 10} />;
};

export const LoadingOverlay = memo(LoadingOverlayComponent);
