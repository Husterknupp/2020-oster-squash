/// <reference types="react-scripts" />

// typescript doesn't know what type the jpg2000 image modules will be
declare module '*.jp2' {
    const src: string;
    export default src;
}
