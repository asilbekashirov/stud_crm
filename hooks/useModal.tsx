import { useToggle } from "./useToggle";

export function useModal() {

    const modal = useToggle(false)

    const trueFn = (): Promise<boolean> => {
        modal.off()
        return new Promise(resolve => resolve(true))
    };
    const falseFn = (): Promise<boolean> => {
        modal.off()
        return new Promise(resolve => resolve(false))
    };



    return {
        trueFn, falseFn, modal
    }

}