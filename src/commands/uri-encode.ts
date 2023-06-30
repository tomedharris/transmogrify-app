import type {Command} from "./index";

export default <Command>{
    name: 'URI Encode',
    process: (str: string) => encodeURIComponent(str),
    tags: ['base64', 'encode']
};
