import React, { useEffect, useState } from 'react';
import { classes, stylesheet } from 'typestyle';
import { Link } from 'react-router-dom';
import { SUBTLE_LINK } from './constants';
import jpg2000Image from './assets/bruno-van-der-kraan-v2HgNzRDfII-unsplash-cropped.jp2';
import webPImage from './assets/bruno-van-der-kraan-v2HgNzRDfII-unsplash-cropped.webp';

const styles = stylesheet({
    artwork: {
        backgroundSize: 'cover',
        backgroundPosition: 'bottom',
        borderBottom: '1px solid rgba(206, 175, 142, 0.41)',
    },
    safariImage: {
        backgroundImage: `url(${jpg2000Image})`,
    },
    defaultImage: {
        backgroundImage: `url(${webPImage})`,
    },
    description: {
        margin: '70px 0 0 90px',
        color: 'white',
        maxWidth: '310px',
        filter: 'drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.28))',
        fontWeight: 'bold',
    },
    descriptionDate: {
        marginTop: '1em',
    },
});

export const ArtworkDesktop: React.FC<{ className: string }> = ({ className }) => {
    const [webP, setwebP] = useState(true);
    useEffect(() => {
        (async () => {
            if (!(await isWebPUsable())) {
                setwebP(false);
            }
        })();
    }, []);

    return (
        <div
            className={classes(
                className,
                styles.artwork,
                webP && styles.defaultImage,
                !webP && styles.safariImage
            )}
        >
            <div className={styles.description}>
                <h1>
                    <Link to={'/'} className={SUBTLE_LINK}>
                        Zurück in die Zukunft: Ostern ERlebt
                    </Link>
                </h1>
                <div>
                    Jerusalem vor 2000 Jahren - tauchen Sie ein mit uns in das Leben und den Alltag
                    zur Zeit um Jesu Tod und Auferstehung.
                </div>
                <div className={styles.descriptionDate}>
                    7.04. – 11.04.2020 |{' '}
                    <a
                        href={'https://goo.gl/maps/UYABGJvm6A2YCKXH9'}
                        target={'_blank'}
                        title={'06110 Halle Saale - Google Maps'}
                        className={SUBTLE_LINK}
                        rel={'noopener' /* prevent new tab from accessing this tab's process */}
                    >
                        Glauchaer Str. 77
                    </a>
                </div>
                <div className={styles.descriptionDate}>
                    € 5 p.P. | Dauer: ca. 90 min | ab 12 Jahren
                </div>
            </div>
        </div>
    );
};

export const ArtworkMobile: React.FC<{ className: string }> = ({ className }) => {
    const [webP, setwebP] = useState(true);
    useEffect(() => {
        (async () => {
            if (!(await isWebPUsable())) {
                setwebP(false);
            }
        })();
    }, []);

    /*
     * <Image />
     * <Text />
     * */

    return (
        <div
            className={classes(
                className,
                styles.artwork,
                webP && styles.defaultImage,
                !webP && styles.safariImage
            )}
        >
            <div className={styles.description}>
                <h1>
                    <Link to={'/'} className={SUBTLE_LINK}>
                        Zurück in die Zukunft: Ostern ERlebt
                    </Link>
                </h1>
                <div>
                    Jerusalem vor 2000 Jahren - tauchen Sie ein mit uns in das Leben und den Alltag
                    zur Zeit um Jesu Tod und Auferstehung.
                </div>
                <div className={styles.descriptionDate}>
                    7.04. – 11.04.2020 |{' '}
                    <a
                        href={'https://goo.gl/maps/UYABGJvm6A2YCKXH9'}
                        target={'_blank'}
                        title={'06110 Halle Saale - Google Maps'}
                        className={SUBTLE_LINK}
                        rel={'noopener' /* prevent new tab from accessing this tab's process */}
                    >
                        Glauchaer Str. 77
                    </a>
                </div>
                <div className={styles.descriptionDate}>
                    € 5 p.P. | Dauer: ca. 90 min | ab 12 Jahren
                </div>
            </div>
        </div>
    );
};

function isWebPUsable() {
    return Promise.all([
        check_webp_feature('alpha'),
        check_webp_feature('animation'),
        check_webp_feature('lossless'),
        check_webp_feature('lossy'),
    ]).then(anyWebPFeature => {
        return anyWebPFeature.some(featureEnabled => featureEnabled === true);
    });
}

//   'callback(feature, result)' will be passed back the detection result (in an asynchronous way!)
function check_webp_feature(feature: 'lossy' | 'lossless' | 'alpha' | 'animation') {
    return new Promise(resolve => {
        const kTestImages = {
            lossy: 'UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA',
            lossless: 'UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==',
            alpha:
                'UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==',
            animation:
                'UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA',
        };
        const img = new Image();
        img.onload = function() {
            resolve(img.width > 0 && img.height > 0);
        };
        img.onerror = function() {
            resolve(false);
        };
        img.src = 'data:image/webp;base64,' + kTestImages[feature];
    });
}
