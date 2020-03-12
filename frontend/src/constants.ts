import { style } from 'typestyle';

export const H1 = style({
    fontSize: '1.7em',
});

export const SUBTLE_LINK = style({
    color: 'inherit',
    textDecoration: 'inherit',
    $nest: {
        '&:hover': {
            textDecoration: 'underline',
        },
    },
});

export const BOLD = style({
    fontWeight: 'bold',
});
