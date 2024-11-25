import { MantineSize, TextProps as MantineTextProps } from '@mantine/core'
import React from 'react'

export interface TextProps extends Omit<MantineTextProps, 'size'> {
    fz?: MantineSize | 'base'
    children: React.ReactNode
}
