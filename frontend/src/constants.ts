import { NestedCSSProperties } from 'typestyle/lib/types';
import { style } from 'typestyle';

export const H1: NestedCSSProperties = {
    fontSize: '1.7em',
};

export const SUBTLE_LINK = style({
    color: 'inherit',
    textDecoration: 'inherit',
    $nest: {
        '&:hover': {
            textDecoration: 'underline',
        },
    },
});
