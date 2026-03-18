export interface WordCreationProps{
    onClickFunction: ()=> void;
    isDisabled: boolean;
    wordRef: React.RefObject<HTMLInputElement>;
}