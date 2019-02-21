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
  private S3Client: any;

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

    const config = {
      bucketName: this.props.bucketName,
      region: this.props.region,
      accessKeyId: this.props.accessKeyId,
      secretAccessKey: this.props.secretAccessKey
    };

    this.S3Client = new S3(config);
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

          <input type='file' accept='image/*' onChange={this.onFileChange} />
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
      pattern = /image-*/,
      reader = new FileReader();

    if (!file.type.match(pattern)) {
      alert('Please select an image.');
      return;
    }

    this.setState({ loaded: false });

    // reader.onload = (e) => {
    //   this.setState({
    //     imageSrc: reader.result as string,
    //     loaded: true
    //   });
    // };

    reader.readAsDataURL(file);

    const extension = file.type.replace(/.*\//g, '');

    Object.defineProperty(file, 'name', {
      writable: true,
      value: `${Math.random().toString(36)}_${Date.now()}.${extension}`
    });

    this.setState({
      loading: true,
      loaded: false,
      imageSrc: ''
    });

    if (this.props.onChange) {
      this.props.onChange('');
    }

    this.S3Client.uploadFile(file)
      .then((data: any) => {
        console.log(data);
        this.setState({ loading: false, loaded: true, imageSrc: data.location });

        if (this.props.onChange) {
          this.props.onChange(data.location);
        }
      })
      .catch((err: any) => {
        console.error(err);
      });
  }
}
