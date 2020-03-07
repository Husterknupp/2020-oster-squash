import { NestedCSSProperties } from 'typestyle/lib/types';
import { classes, stylesheet } from 'typestyle';
import React, { FormEvent, ReactElement, useState } from 'react';
import { DateTime } from 'luxon';
import { Registration } from './DTOs';
import axios from 'axios';
import { Spinner } from './Spinner';
import { HOST } from './App';

const buttonStyles: NestedCSSProperties = {
    /* mostly copied from https://css-tricks.com/overriding-default-button-styles/ */
    width: '100%',
    display: 'inline-block',
    border: 'none',
    textDecoration: 'none',
    fontSize: '1em',
    cursor: 'pointer',
    textAlign: 'center',
    '-webkit-appearance': 'none',
    '-moz-appearance': 'none',
};

const inputStyles: NestedCSSProperties = {
    /* shamelessly copied from stackoverflow search bar input */
    backgroundColor: '#fff',
    boxShadow: 'none',
    color: '#3c4146',
    '-webkit-appearance': 'none',
    padding: '.6em .7em',
    height: '3em',
    border: '1px solid #bbc0c4',
    borderRadius: '3px',
    fontSize: '13px',
    boxSizing: 'border-box',
    transition: 'box-shadow 150ms ease-in-out',
    $nest: {
        '&:focus': {
            outline: 'none', // normalize Chrome behaviour (https://stackoverflow.com/questions/3397113/how-to-remove-focus-border-outline-around-text-input-boxes-chrome)
            boxShadow: '0px 0px 1px inset #139df4',
        },
    },
};

const popupStyles = stylesheet({
    popup: {
        position: 'absolute',
        top: '-348px',
        width: '22vw',
        minWidth: '250px', // until we have proper mobile support
        backgroundColor: '#f9fafb',
        left: '-31px',
        zIndex: 1,
        boxShadow: '0px 0px 200px rgba(0, 0, 0, 0.23)',
        borderRadius: '4px',
        $nest: {
            '& > *': {
                margin: '.5em',
            },
        },
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    availableSlots: {
        padding: '.5em',
        border: '1px solid transparent',
        borderRadius: '4px',
    },
    numberInput: {
        ...inputStyles,
        width: '3em',
    },
    redBorder: {
        border: '1px solid red',
    },
    peopleCount: {
        display: 'flex',
        alignItems: 'center', // vertical
        $nest: {
            '& > input': {
                marginRight: '.8em',
            },
            '& > small': {
                width: '100%',
            },
        },
    },
    emailInput: {
        paddingTop: '1em',
        $nest: {
            '& > input': {
                ...inputStyles,
                width: '100%',
            },
            '& > input:invalid:not(:placeholder-shown)': {
                /* thanks Zell https://zellwk.com/blog/check-empty-input-css/ */
                border: '1px solid red',
            },
        },
    },
    close: {
        $nest: {
            '& > button': {
                ...buttonStyles,
                transition: 'transform 150ms ease',
                background: 'transparent',
            },
            '& > button:active': {
                transform: 'scale(0.90)',
            },
        },
    },
    submit: {
        paddingTop: '1em',
        $nest: {
            '& > button': {
                ...buttonStyles,
                transition: 'filter 250ms ease-in-out, transform 150ms ease',
                background: 'rgb(19 157 244)',
                color: 'white',
                padding: '.8em 2em',
                margin: '0',
            },
            '& > button:hover,button:focus': {
                filter: 'brightness(0.9)',
            },
            '& > button:focus': {
                outline: '1px solid #fff',
                outlineOffset: '-4px',
            },
            '& > button:active': {
                transform: 'scale(0.99)',
            },
        },
    },
});

type RegistrationPopupProps = {
    date: string;
    hour: number;
    eventTimestamp: string;
    availableSlots: number;
    onClose: (registrationSuccessful: boolean) => void;
};
function RegistrationPopup({
    availableSlots,
    date,
    eventTimestamp,
    hour,
    onClose,
}: RegistrationPopupProps): ReactElement {
    const [quantity, setQuantity] = useState<number | null>(null);
    const [emailAddress, setEmailAddress] = useState<string>('');
    const asDate = DateTime.fromISO(date).setLocale('de');
    const [submitState, setSubmitState] = useState<
        'READY_TO_SUBMIT' | 'WAITING_FOR_RESPONSE' | 'SUCCESS_RESPONSE'
    >('READY_TO_SUBMIT');

    const quantityInvalid = !!quantity && quantity > availableSlots;

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();
        const payload: Registration = {
            timeFrameBegin: eventTimestamp,
            quantity: quantity || 0,
            emailAddress,
        } as Registration;
        setSubmitState('WAITING_FOR_RESPONSE');
        axios
            .post(`${HOST}/api/registrations/`, payload)
            .catch(console.error)
            .finally(() => {
                setTimeout(() => setSubmitState('SUCCESS_RESPONSE'), 1000);
                setTimeout(() => onClose(true), 2200);
            });
    };

    let submitButton: ReactElement;
    switch (submitState) {
        case 'READY_TO_SUBMIT': {
            submitButton = (
                <button type={'submit'} disabled={quantityInvalid}>
                    ANMELDEN
                </button>
            );
            break;
        }
        case 'WAITING_FOR_RESPONSE': {
            submitButton = (
                <button type={'button'}>
                    <Spinner />
                </button>
            );
            break;
        }
        case 'SUCCESS_RESPONSE': {
            submitButton = <button type={'button'}> Erfolgreich Angemeldet </button>;
        }
    }

    return (
        <form className={popupStyles.popup} onSubmit={onSubmit}>
            <div className={popupStyles.header}>
                <div>
                    <div>
                        Anmelden für{' '}
                        {asDate.toLocaleString(
                            Object.assign(DateTime.DATE_HUGE, { month: 'numeric' })
                        )}
                    </div>
                    <div>
                        {hour}
                        {' - '}
                        {hour + 1} Uhr
                    </div>
                </div>
                <div className={popupStyles.close}>
                    <button type={'button'} onClick={() => onClose(false)}>
                        X
                    </button>
                </div>
            </div>
            <div
                className={classes(
                    popupStyles.availableSlots,
                    quantityInvalid ? popupStyles.redBorder : ''
                )}
            >
                {availableSlots}
                {availableSlots === 1 ? ' Platz ist' : ' Plätze sind'} noch frei
            </div>
            <div className={popupStyles.peopleCount}>
                <input
                    onChange={event => {
                        const number = parseInt(event.target.value);
                        setQuantity(isNaN(number) ? 0 : number);
                    }}
                    value={quantity !== null ? quantity : ''}
                    autoFocus={true}
                    className={classes(
                        popupStyles.numberInput,
                        quantityInvalid ? popupStyles.redBorder : ''
                    )}
                />
                <small>Personen (12+ Jahre alt)</small>
            </div>
            <div className={popupStyles.emailInput}>
                <input
                    type={'email'}
                    required
                    value={emailAddress}
                    onChange={event => setEmailAddress(event.target.value)}
                    placeholder={'Email Adresse'}
                />
            </div>
            <div className={popupStyles.submit}>{submitButton}</div>
        </form>
    );
}

export default RegistrationPopup;
