import * as React from 'react';
import * as styles from '../css/main.scss';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { Icon, Loading, Container } from '.';
import * as S3 from 'aws-s3';

interface IState {
  active: boolean;
  imageSrc: string;
  loading: boolean;
  loaded: boolean;
}

interface IFileUploader {
  value?: string;
  onChange?: (newImageSrc: string) => void;
  disabled?: boolean;
}

export default class FileUploader extends React.Component<IFileUploader, IState> {

  constructor(props: IFileUploader) {
    super(props);

    this.state = {
      active: false,
      imageSrc: this.props.value || '',
      loaded: this.props.value ? true : false,
      loading: false
    };

    this.onDragEnter = this.onDragEnter.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
  }

  public componentDidUpdate(prevProps: IFileUploader) {
    if (prevProps.value !== this.props.value) {
      this.setState({
        imageSrc: this.props.value || ''
      });
    }
  }

  public render() {
    let state = this.state;
    let labelClass = `uploader ${state.loaded && 'loaded'}`;

    return (
      <Container>
        <label
          className={labelClass}
          onDragEnter={this.onDragEnter}
          onDragLeave={this.onDragLeave}
          onDragOver={this.onDragOver}
          onDrop={this.onDrop}
        >
          <Loading loading={this.state.loading} />
          <img src={state.imageSrc} />
          {!state.loaded && <Icon icon={faUpload} classNames={[styles.icon]} />}
          {!state.active && (
            <span className={styles.normalText}>
              Drag and drop or <br />
              Click here to attached a file
            </span>
          )}
          <input
            type='file'
            accept='image/*, application/pdf'
            onChange={this.onFileChange}
            disabled={this.props.disabled}
          />
        </label>
      </Container>
    );
  }

  public getValue() {
    return this.state.imageSrc;
  }

  public reset() {
    this.setState({
      imageSrc: this.props.value || '',
      loaded: false,
      loading: false,
      active: false
    });
  }

  private onDragEnter() {
    this.setState({ active: true });
  }

  private onDragLeave() {
    this.setState({ active: false });
  }

  private onDragOver(e: any) {
    e.preventDefault();
  }

  private onDrop(e: any) {
    e.preventDefault();
    this.setState({ active: false });
    this.onFileChange(e, e.dataTransfer.files[0]);
  }

  private onFileChange(e: React.FormEvent<HTMLInputElement>, inputFile?: File) {
    var file = inputFile || (e.target as any).files[0],
      pattern = 'application/pdf|image-*',
      reader = new FileReader();

    if (!file.type.match(pattern)) {
      alert('Please select an image or pdf.');
      return;
    }

    this.setState({ loaded: false });

    reader.onload = (e) => {
       this.setState({
         imageSrc: reader.result as string,
         loaded: true
       });
     };

    reader.readAsDataURL(file);

    const extension = file.type.replace(/.*\//g, '');

    Object.defineProperty(file, 'name', {
      writable: true,
      value: `${Math.random().toString(36)}_${Date.now()}.${extension}`
    });

    if (this.props.onChange) {
      this.props.onChange('');
    }
  }
}
