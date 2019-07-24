import * as React from 'react';
import { Container } from '.';
import * as styles from '../css/main.scss';
import { Confirm } from './Confirm';
import { Image } from './Image';
import { Link } from './Link';
import { Modal } from './Modal';
import { Spin as ReactSpin, Icon as ReactIcon } from 'antd';

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
  resetFormControl?: () => void;
}

interface IState {
  src: string;
  extension?: string;
  type?: FileType;
  fileData?: any;
  uploaded: boolean;
  showViewer: boolean;
  fileName?: string;
  dragOver?: boolean;
  loading?: boolean;
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
            type: 'pdf',
            fileName: ''
          });
        } else {
          this.setState({
            src: value,
            type: 'image',
            fileName: ''
          });
        }
      } else if (value === undefined) {
        this.setState({
          src: '',
          type: this.getExtensionType(),
          fileName: ''
        });
      }
    }
  }

  public render() {
    return (
      <>
        {this.state.loading && this.isLoading(this.getUploaderDesign())}
        {!this.state.loading && this.getUploaderDesign()}
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
    this.setState({ dragOver: true });
  };

  private onDragLeave = () => {
    this.setState({ dragOver: false });
  };

  private onDragOver = (e: any) => {
    e.preventDefault();
  };

  private onDrop = (e: any) => {
    e.preventDefault();
    this.onFileChange(e, e.dataTransfer.files[0]);
  };

  private isLoading = (children: any) => {
    const spinnerIcon = <ReactIcon type='sync' style={{ fontSize: 24 }} spin />;
    return (
      <ReactSpin style={{ color: '#000' }} indicator={spinnerIcon} tip='uploading'>
        {children}
      </ReactSpin>
    );
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

  private getUploaderDesign() {
    let state = this.state;
    let labelClass = `uploader ${state.src && 'loaded'}`;
    let classes: string[] = [
      labelClass,
      this.props.disabled ? styles.disabled : '',
      this.state.dragOver ? styles.dragOver : ''
    ];
    classes = classes.filter(function(el) {
      return el != '';
    });
    return (
      <>
        {this.props.viewer && (
          <Modal onExited={this.hideViewer.bind(this)} visible={this.state.showViewer}>
            {this.state.type !== 'pdf' && (
              <Container fluid>{this.props.children || <Image src={this.props.value} />}</Container>
            )}
          </Modal>
        )}
        <Container position={'relative'} widthPercent={100} heightPercent={100}>
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
          {this.props.viewer && this.state.type !== 'pdf' && (
            <ReactIcon
              onClick={this.openViewer.bind(this)}
              className={styles.uploaderViewer}
              style={{ fontSize: 24 }}
              type={'eye'}
            />
          )}
          {this.props.viewer && this.state.type === 'pdf' && (
            <Link target='_blank' href={this.props.value} useNormalAnchor={true}>
              <ReactIcon className={styles.uploaderViewer} style={{ fontSize: 24 }} type={'eye'} />
            </Link>
          )}
        </Container>
      </>
    );
  }

  private getContentDesign() {
    if (this.state.src) {
      if (this.state.type === 'image') {
        return (
          <Container>
            <Container
              position='relative'
              textAlign='center'
              className='image-container'
              padding={{
                topRem: this.props.uploaderLabel || this.props.viewer ? 2 : 1,
                bottomRem: 1,
                leftRightRem: 1
              }}
            >
              <img src={this.state.src} />
              {this.state.fileName && (
                <Container margin={{ topRem: 0.3 }} fluid verticalAlign={'center'}>
                  <Container classNames={[styles.normalText, styles.small, styles.colorDark]}>
                    {this.state.fileName}
                    {/* {!this.state.uploaded ? 'Pending upload' : 'Saved'} */}
                  </Container>
                </Container>
              )}
            </Container>
          </Container>
        );
      } else if (this.state.type === 'pdf') {
        return (
          <Container
            position='relative'
            textAlign='center'
            className='image-container'
            padding={{
              topRem: this.props.uploaderLabel || this.props.viewer ? 2 : 1,
              bottomRem: 1,
              leftRightRem: 1
            }}
          >
            <ReactIcon className={styles.fileIcon} type={'file-pdf'} />
            {this.state.fileName && (
              <Container margin={{ topRem: 0.3 }} fluid verticalAlign={'center'}>
                <Container classNames={[styles.normalText, styles.small, styles.colorDark]}>
                  {this.state.fileName}
                  {/* {!this.state.uploaded ? 'Pending upload' : 'Saved'} */}
                </Container>
              </Container>
            )}
          </Container>
        );
      }
    } else {
      return this.props.children;
    }
  }

  private handleFileChange = async (file: any) => {
    this.props.resetFormControl!;
    file.preview = await this.getBase64(file);
    if (file.type.split('/')[0] === 'image') {
      this.setState(
        {
          src: file.preview as string,
          type: 'image',
          extension: this.getExtension(file.name),
          uploaded: false,
          fileName: file.name
        },
        this.onValueChanged
      );
    } else if (file.type === 'application/pdf') {
      this.setState(
        {
          src: file.preview as string,
          type: 'pdf',
          extension: this.getExtension(file.name),
          uploaded: false,
          fileName: file.name
        },
        this.onValueChanged
      );
    }
  };

  private onFileChange = (e: any, inputFile?: File) => {
    let file = inputFile || (e.target as any).files[0],
      pattern = this.getAllowFileRules().join('|');
    if (file) {
      this.setState({ loading: true });
      if (!file.type.match(pattern)) {
        this.setState({ loading: false });
        Confirm.show({
          type: 'okonly',
          message: 'Only specified files ( JPG, GIF, PNG, PDF ) are allowed ',
          onResult: (result) => {}
        });
        e.target.value = '';
        return false;
      }
      if (file.size > 10485760) {
        this.setState({ loading: false });
        Confirm.show({
          type: 'okonly',
          message: 'The maximum file size for upload is 10MB',
          onResult: (result) => {}
        });
        e.target.value = '';
        return false;
      }
      this.handleFileChange(file);
    }
  };

  private getBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        resolve(reader.result!);
        this.setState({ loading: false });
      };
      reader.onerror = (error) => reject(error);
    });
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
