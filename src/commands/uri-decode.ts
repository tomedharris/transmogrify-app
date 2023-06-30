import type {Command} from "./index";

export default <Command>{
    name: 'URI Decode',
    process: (str: string) => decodeURIComponent(str),
    tags: ['base64', 'encode']
};
