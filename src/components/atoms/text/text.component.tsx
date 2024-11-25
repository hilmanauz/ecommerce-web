import React, { ForwardRefRenderFunction, forwardRef, memo } from 'react'
import { TextProps } from './text.types'
import { Text as MantineText } from '@mantine/core'

const TextComponent: ForwardRefRenderFunction<HTMLDivElement, TextProps> = (
    { fz, ...props },
    ref
): JSX.Element => {
    return <MantineText fz={fz || 'sm'} ref={ref} {...props} />
}

export const Text = memo(forwardRef(TextComponent))
