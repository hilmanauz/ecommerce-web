import React, { ForwardRefRenderFunction, forwardRef, memo } from 'react'
import { ImageProps } from './image.types'
import ImageComp from 'next/image'

const ImageComponent: ForwardRefRenderFunction<HTMLImageElement, ImageProps> = (
    { className, placeholder, withPlaceholder, ...props },
    ref
): JSX.Element => {
    return (
        <ImageComp
            {...props}
            className={className}
            src={props.src || `/images/placeholder.png`}
            objectFit=""
            ref={ref}
        />
    )
}

export const Image = memo(forwardRef(ImageComponent))
