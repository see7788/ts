declare global {
    namespace NodeJS {
        interface Global {
            istate: IState;
            wacthIng: boolean;
            pcTips: (title: string, file?: string, silent?: boolean) => void;
            pcConsole: (title: string, file?: string, silent?: boolean) => any;
        }
    }
}