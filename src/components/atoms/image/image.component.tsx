import React, { ForwardRefRenderFunction, forwardRef, memo } from 'react'
import { ImageProps } from './image.types'
import { Image as ImageComp } from '@mantine/core'

const ImageComponent: ForwardRefRenderFunction<HTMLImageElement, ImageProps> = (
    { className, ...props },
    ref
): JSX.Element => {
    return (
        <ImageComp
            {...props}
            className={className}
            src={props.src || `/images/placeholder.png`}
            ref={ref}
        />
    )
}

export const Image = memo(forwardRef(ImageComponent))
