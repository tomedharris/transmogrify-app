import type {Command} from "./index";

export default <Command>{
    name: 'Base64 Decode',
    process: (str: string) => atob(str),
    tags: ['base64', 'decode']
};
