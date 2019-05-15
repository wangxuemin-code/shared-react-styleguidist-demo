import { faUpload, faFilePdf, faCheck } from '@fortawesome/free-solid-svg-icons';
import * as React from 'react';
import { Container, Icon, Loading } from '.';
import * as styles from '../css/main.scss';
import { Controls } from '../index-prod';

export type FilePattern = 'audio' | 'video' | 'image';
type FileType = 'image' | 'pdf' | 'others';

interface IProps {
  value?: string;
  onChange?: (newImageSrc: string) => void;
  disabled?: boolean;
  filePatterns?: FilePattern[];
  customAllowFileExtensions?: string[];
}

interface IState {
  src: string;
  extension?: string;
  type?: FileType;
  fileData?: any;
  uploaded: boolean;
}

export default class FileUploader extends React.Component<IProps, IState> {
  public static defaultProps: IProps = {
    filePatterns: ['image'],
    customAllowFileExtensions: []
  };

  constructor(props: IProps) {
    super(props);

    this.state = {
      src: this.props.value || '',
      type: this.getExtensionType(),
      uploaded: true
    };
  }

  // public componentDidUpdate(prevProps: IProps) {
  //   if (prevProps.value !== this.props.value) {
  //     this.setState({
  //       src: this.props.value || '',
  //       type: this.getExtensionType()
  //     });
  //   }
  // }

  public render() {
    let state = this.state;
    let labelClass = `uploader ${state.src && 'loaded'}`;

    return (
      <Container>
        <label
          className={labelClass}
          onDragEnter={this.onDragEnter}
          onDragLeave={this.onDragLeave}
          onDragOver={this.onDragOver}
          onDrop={this.onDrop}
        >
          {this.getContentDesign()}
          <input
            type='file'
            accept={this.getAllowFileRules().join(',')}
            onChange={this.onFileChange}
            disabled={this.props.disabled}
          />
        </label>
      </Container>
    );
  }

  public getValue() {
    return JSON.stringify({
      data: this.state.src,
      extension: this.state.extension,
      uploaded: this.state.uploaded
    });
  }

  public reset() {
    this.setState({
      src: this.props.value || ''
    });
  }

  private onDragEnter = () => {
    // this.setState({ active: true });
  };

  private onDragLeave = () => {
    // this.setState({ active: false });
  };

  private onDragOver = (e: any) => {
    e.preventDefault();
  };

  private onDrop = (e: any) => {
    e.preventDefault();
    this.onFileChange(e, e.dataTransfer.files[0]);
  };

  private onFileChange = (e: React.FormEvent<HTMLInputElement>, inputFile?: File) => {
    let file = inputFile || (e.target as any).files[0],
      pattern = this.getAllowFileRules().join('|'),
      reader = new FileReader();

    if (!file.type.match(pattern)) {
      return;
    }

    reader.onload = (e) => {
      if (file.type.split('/')[0] === 'image') {
        this.setState(
          {
            src: reader.result as string,
            type: 'image',
            extension: this.getExtension(file.name),
            uploaded: false
          },
          this.onValueChanged
        );
      } else if (file.type === 'application/pdf') {
        this.setState(
          {
            src: reader.result as string,
            type: 'pdf',
            extension: this.getExtension(file.name),
            uploaded: false
          },
          this.onValueChanged
        );
      }
    };

    reader.readAsDataURL(file);
  };

  private onValueChanged = () => {
    if (this.props.onChange) {
      this.props.onChange(this.getValue());
    }
  };

  private getAllowFileRules(): string[] {
    const results: string[] = [];

    this.props.filePatterns!.map((pattern) => {
      switch (pattern) {
        case 'audio':
          results.push('audio/*');
          break;
        case 'video':
          results.push('video/*');
          break;
        case 'image':
          results.push('image/*');
          break;
      }
    });

    this.props.customAllowFileExtensions!.map((extension) => {
      results.push(extension);
    });

    return results;
  }

  private getExtensionType(): FileType | undefined {
    if (!this.props.value) {
      return undefined;
    } else {
      const extension = this.getExtension(this.props.value!);
      if (['jpg', 'jpeg', 'gif'].indexOf(extension) >= 0) {
        return 'image';
      } else if (extension === 'pdf') {
        return 'pdf';
      }
    }
  }

  private getExtension(fileName: string): string {
    return fileName
      .split(/\#|\?/)[0]
      .split('.')
      .pop()!
      .trim()
      .toLowerCase();
  }

  private getContentDesign() {
    if (this.state.src) {
      if (this.state.type === 'image') {
        return <img src={this.state.src} />;
      } else if (this.state.type === 'pdf') {
        return (
          <Controls.Container position='relative' textAlign='center'>
            <Controls.Icon icon={faFilePdf} />
            <Controls.Container margin={{ topPx: 5 }}>
              {!this.state.uploaded ? 'Pending upload' : 'Saved'}
            </Controls.Container>
          </Controls.Container>
        );
      }
    } else {
      return this.props.children;
    }
  }
}
