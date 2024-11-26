import { Card as MantineCard } from '@mantine/core'
import { CardProps } from './card.types'
import { DOMAttributes } from 'react'

const Card = ({
    shadow,
    padding,
    withBorder,
    radius,
    ...props
}: CardProps & DOMAttributes<HTMLDivElement>): JSX.Element => {
    return (
        <MantineCard
            {...props}
            shadow={shadow ?? 'sm'}
            padding={padding ?? 'md'}
            radius={radius ?? 'md'}
            withBorder={withBorder ?? true}
        />
    )
}

Card.Section = MantineCard.Section

export { Card }
