import * as React from 'react';
interface IState {
    active: boolean;
    imageSrc: string;
    loading: boolean;
    loaded: boolean;
}
export interface IAwsSettings {
    bucketName: string;
    region: string;
    accessKeyId: string;
    secretAccessKey: string;
}
interface IFileUploader extends IAwsSettings {
    value?: string;
    onChange?: (newImageSrc: string) => void;
}
export default class FileUploader extends React.Component<IFileUploader, IState> {
    private S3Client;
    constructor(props: IFileUploader);
    componentDidUpdate(prevProps: IFileUploader): void;
    render(): JSX.Element;
    getValue(): string;
    reset(): void;
    private onDragEnter;
    private onDragLeave;
    private onDragOver;
    private onDrop;
    private onFileChange;
}
export {};
