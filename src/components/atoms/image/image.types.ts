import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import {
    ImageLoader,
    OnLoadingComplete,
    PlaceholderValue,
} from "next/dist/shared/lib/get-img-props";

export type ImageProps = DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
> & {
    src: string;
    alt: string;
    width?: number | `${number}` | undefined;
    height?: number | `${number}` | undefined;
    fill?: boolean | undefined;
    sizes?: string | undefined;
    loader?: ImageLoader | undefined;
    quality?: number | `${number}` | undefined;
    priority?: boolean | undefined;
    loading?: "eager" | "lazy" | undefined;
    placeholder?: PlaceholderValue | undefined;
    withPlaceholder?: boolean;
    blurDataURL?: string | undefined;
    unoptimized?: boolean | undefined;
    onLoadingComplete?: OnLoadingComplete | undefined;
    layout?: string | undefined;
    objectFit?: string | undefined;
    objectPosition?: string | undefined;
    lazyBoundary?: string | undefined;
    lazyRoot?: string | undefined;
};
