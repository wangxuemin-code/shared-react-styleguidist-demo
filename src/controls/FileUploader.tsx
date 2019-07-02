import { faFilePdf, faSearchPlus } from '@fortawesome/free-solid-svg-icons';
import * as React from 'react';
import { Container } from '.';
import * as styles from '../css/main.scss';
import { Confirm } from './Confirm';
import { Icon } from './Icon';
import { Link } from './Link';
import { Modal } from './Modal';

export type FilePattern = 'audio' | 'video' | 'image';
type FileType = 'image' | 'pdf' | 'others';

interface IProps {
  label?: any;
  uploaderLabel?: any;
  viewer?: boolean;
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
  showViewer: boolean;
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
      uploaded: true,
      showViewer: false
    };
  }

  public componentDidUpdate(prevProps: IProps) {
    if (prevProps.value !== this.props.value) {
      const value = this.props.value;
      if (value && this.validURL(value)) {
        const extension = value.split('.').pop();
        if (extension == 'pdf') {
          this.setState({
            src: value,
            type: 'pdf'
          });
        } else {
          this.setState({
            src: value,
            type: 'image'
          });
        }
      } else if (value === undefined) {
        this.setState({
          src: '',
          type: this.getExtensionType()
        });
      }
    }
  }

  public render() {
    let state = this.state;
    let labelClass = `uploader ${state.src && 'loaded'}`;
    let classes: string[] = [labelClass, this.props.disabled ? styles.disabled : ''];
    classes = classes.filter(function(el) {
      return el != '';
    });

    return (
      <>
        {this.props.viewer && this.props.children && (
          <Modal onModalHide={this.hideViewer.bind(this)} visible={this.state.showViewer}>
            {this.state.type !== 'pdf' && <Container fluid>{this.props.children}</Container>}
          </Modal>
        )}
        <Container position={'relative'}>
          <label
            onDragEnter={this.onDragEnter}
            onDragLeave={this.onDragLeave}
            onDragOver={this.onDragOver}
            onDrop={this.onDrop}
            className={classes.join(' ')}
          >
            {this.props.uploaderLabel && (
              <Container className={styles.uploaderLabel}>{this.props.uploaderLabel}</Container>
            )}
            {this.getContentDesign()}
            <input
              type='file'
              accept={this.getAllowFileRules().join(',')}
              onChange={this.onFileChange}
              disabled={this.props.disabled}
            />
          </label>
          {this.props.viewer && this.props.children && this.state.type !== 'pdf' && (
            <Icon
              onClick={this.openViewer.bind(this)}
              size={'large'}
              className={styles.uploaderViewer}
              icon={faSearchPlus}
            />
          )}
          {this.props.viewer && this.props.children && this.state.type === 'pdf' && (
            <Link target='_blank' href={this.props.value} useNormalAnchor={true}>
              <Icon size={'large'} className={styles.uploaderViewer} icon={faSearchPlus} />
            </Link>
          )}
        </Container>
      </>
    );
  }

  public openViewer() {
    this.setState({ showViewer: true });
  }

  public hideViewer() {
    this.setState({ showViewer: false });
  }

  public getValue() {
    if (this.state.src) {
      return JSON.stringify({
        file: {
          data: this.state.src,
          uploaded: this.state.uploaded
        }
      });
    } else {
      return '';
    }
  }

  public onSaved() {
    this.setState(
      {
        uploaded: true
      },
      this.onValueChanged
    );
  }

  public reset() {
    this.setState(
      {
        src: this.props.value || '',
        type: this.getExtensionType(),
        uploaded: true
      },
      this.onValueChanged
    );
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

    if (file) {
      if (!file.type.match(pattern)) {
        Confirm.show({
          type: 'okonly',
          message: 'Only specified files ( JPG, GIF, PNG, PDF ) are allowed ',
          onResult: (result) => {
            // console.log(result);
          }
        });
        return;
      }

      if (file.size > 10485760) {
        Confirm.show({
          type: 'okonly',
          message: 'The maximum file size for upload is 10MB',
          onResult: (result) => {
            // console.log(result);
          }
        });
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
    }
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
      if (['jpg', 'jpeg', 'gif', 'png'].indexOf(extension) >= 0) {
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
        return (
          <>
            <img src={this.state.src} />
          </>
        );
      } else if (this.state.type === 'pdf') {
        return (
          <Container position='relative' textAlign='center'>
            <Icon icon={faFilePdf} />
            <Container className='normal-text' margin={{ topPx: 5 }}>
              {!this.state.uploaded ? 'Pending upload' : 'Saved'}
            </Container>
          </Container>
        );
      }
    } else {
      return this.props.children;
    }
  }

  private validURL(str: any) {
    var pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i'
    ); // fragment locator
    return !!pattern.test(str);
  }
}
