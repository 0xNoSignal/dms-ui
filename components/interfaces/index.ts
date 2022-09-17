
export interface IModalStandard {
    onClose: () => void;
    isOpen: boolean;
}

export interface IModalWrapper extends IModalStandard {
    children: any;
    header: string;
}

export interface IBackAndForth {
    setStatus: () => void;
    onClickBack: () => void;
}