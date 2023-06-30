import type {Command} from "./index";

export default <Command>{
    name: 'Base64 Encode',
    process: (str: string) => btoa(str),
    tags: ['base64', 'encode']
};
