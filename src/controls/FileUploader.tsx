import { EyeOutlined, FilePdfOutlined, SyncOutlined } from '@ant-design/icons';
import ReactSpin from 'antd/es/spin';
import * as React from 'react';
import Iframe from 'react-iframe';
import { Confirm, Container, Image, Message, Modal } from '.';
import * as styles from '../css/main.scss';
import { UuidGenerator } from '../helpers';
import { AwsHelper } from '../helpers/AwsHelper';
var S3 = require('aws-sdk/clients/s3');
declare const Buffer: { from: new (arg0: any, arg1: string) => any };

export type FilePattern = 'audio' | 'video' | 'image';
type FileType = 'image' | 'pdf' | 'others';

interface IProps {
  path?: string;
  uploaderLabel?: any;
  uploaderFooter?: any;
  uploaderViewer?: boolean;
  value: string;
  onChange?: (newImageSrc: string) => void;
  disabled?: boolean;
  filePatterns?: FilePattern[];
  customAllowFileExtensions?: string[];
  showFileName?: boolean;
  resetFormControl?: () => void;
  bucketName?: string;
  fixedFileName?: string;
}

interface IState {
  src: string;
  extension?: string;
  type?: FileType;
  fileData?: any;
  fileSize: number;
  uploaded: boolean;
  showViewer: boolean;
  fileName?: string;
  dragOver?: boolean;
  loading?: boolean;
  url: string;
  uploadProgress: number;
  uploadStatus: -1 | 0 | 1 | 2; // 2 is attached
}

export default class FileUploader extends React.Component<IProps, IState> {
  private onUploadProgressChange: (percent: number) => void;
  private fileUploader: any;
  public static defaultProps: IProps = {
    value: '',
    filePatterns: ['image'],
    customAllowFileExtensions: []
  };

  constructor(props: IProps) {
    super(props);

    this.state = {
      src: this.props.value || '',
      type: this.getExtensionType(),
      uploaded: true,
      showViewer: false,
      url: '',
      fileSize: 0,
      uploadProgress: 0,
      uploadStatus: 0
    };

    this.handleFileUploaderClick = this.handleFileUploaderClick.bind(this);
    this.onUploadProgressChange = () => {};
  }

  public componentDidMount() {
    this.processValue(this.props.value);
  }

  public componentDidUpdate(prevProps: IProps) {
    if (prevProps.value !== this.props.value) {
      this.processValue(this.props.value);
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

  public openViewer(e: any) {
    this.setState({ showViewer: true });
    this.preventPropation(e);
  }

  public hideViewer() {
    this.setState({ showViewer: false });
  }

  public tryParseJsonValue(value: any) {
    try {
      const object = JSON.parse(value);
      const data = object.file.data;
      return {
        src: data
      };
    } catch (e) {
      return false;
    }
  }

  public getValue() {
    if (this.state.src) {
      return this.state.src;
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

  private processValue(value: string) {
    if (value.indexOf('ISTOXBUCKET|') >= 0) {
      const extension = value.split('.').pop();
      AwsHelper.processSrcFromAWS(this.props.value).then((processedSrc: any) => {
        if (extension == 'pdf') {
          this.setState({
            src: processedSrc,
            type: 'pdf',
            url: processedSrc,
            uploadStatus: 1
            // fileName: ''
          });
        } else {
          this.setState({
            src: processedSrc,
            type: 'image',
            uploadStatus: 1
            // fileName: ''
          });
        }
      });
    } else if (value && this.validURL(value)) {
      const extension = value.split('.').pop();
      if (extension == 'pdf') {
        this.setState({
          src: value,
          type: 'pdf',
          url: value,
          fileName: value
        });
      } else {
        this.setState({
          src: value,
          type: 'image',
          fileName: value
        });
      }
    } else if (value && this.tryParseJsonValue(value)) {
      const obj: any = this.tryParseJsonValue(value);
      if (obj.src.split(',')[0].toLowerCase().indexOf('pdf') > 0) {
        this.setState({
          src: obj.src,
          type: 'pdf',
          url: obj.src,
          fileName: value
        });
      } else {
        this.setState({
          src: obj.src,
          type: 'image',
          fileName: value
        });
      }
    } else if (!!value) {
      this.setState({
        src: value,
        uploaded: false,
        uploadStatus: 0,
        uploadProgress: 0,
        type: this.getBase64ExtensionType(value),
        extension: this.getBase64Extension(value),
        fileName: '',
        fileSize: this.getBase64FileSize(value)
      });
    } else if (value === undefined || value == '') {
      this.setState({
        src: '',
        type: this.getExtensionType(),
        fileName: '',
        uploadStatus: 0,
        uploadProgress: 0
      });
    }
  }

  private getBase64ExtensionType(base64: string) {
    const arr = base64.split(';');
    if (arr.length > 0) {
      console.log(arr[0]);
      if (arr[0].indexOf('pdf') >= 0) {
        return 'pdf';
      } else if (arr[0].indexOf('png') >= 0) {
        return 'image';
      } else if (arr[0].indexOf('jpg') >= 0) {
        return 'image';
      } else if (arr[0].indexOf('jpeg') >= 0) {
        return 'image';
      } else if (arr[0].indexOf('gif') >= 0) {
        return 'image';
      }
    }

    return 'others';
  }

  private getBase64Extension(base64: string) {
    const arr = base64.split(';');
    if (arr.length > 0) {
      if (arr[0].indexOf('pdf') >= 0) {
        return 'pdf';
      } else if (arr[0].indexOf('png') >= 0) {
        return 'png';
      } else if (arr[0].indexOf('jpg') >= 0) {
        return 'jpg';
      } else if (arr[0].indexOf('jpeg') >= 0) {
        return 'jpeg';
      } else if (arr[0].indexOf('gif') >= 0) {
        return 'gif';
      }
    }

    return '';
  }

  private getBase64FileSize(base64: string) {
    return base64.length * (3 / 4) - 2;
  }

  private onDragEnter = () => {
    this.setState({ dragOver: true });
  };

  private onDragLeave = () => {
    this.setState({ dragOver: false });
  };

  private onDragOver = (e: any) => {
    this.setState({ dragOver: true });
    e.preventDefault();
  };

  private onDrop = (e: any) => {
    e.preventDefault();
    this.setState({ dragOver: false });
    this.onFileChange(e, e.dataTransfer.files[0]);
  };

  private isLoading = (children: any) => {
    const spinnerIcon = <SyncOutlined style={{ fontSize: 24 }} spin />;
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
          results.push('');
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
    return fileName.split(/\#|\?/)[0].split('.').pop()!.trim().toLowerCase();
  }

  private getUploaderDesign() {
    let state = this.state;
    let labelClass = `uploader ${state.src && 'loaded'}`;
    let classes: string[] = [
      labelClass,
      this.props.disabled ? styles.disabled : '',
      this.state.dragOver ? styles.dragOver : ''
    ];
    classes = classes.filter(function (el) {
      return el != '';
    });
    return (
      <>
        <Modal width={800} onExited={this.hideViewer.bind(this)} visible={this.state.showViewer}>
          {this.state.type !== 'pdf' && (
            <Container fluid>
              <Image src={this.state.src} />
            </Container>
          )}
          {this.state.type === 'pdf' && (
            <Container fluid>
              <Iframe width={'100%'} height={'500px'} url={this.state.url} />
            </Container>
          )}
        </Modal>
        <Container position={'relative'} widthPercent={100} heightPercent={100}>
          {this.props.showFileName && this.state.src !== '' && (
            <Container onClick={this.props.resetFormControl!} classNames={[styles.uploaderDeleteButton, styles.small]}>
              Delete
            </Container>
          )}
          {this.props.showFileName && this.state.src !== '' && (
            <Container onClick={this.handleFileUploaderClick} classNames={[styles.uploaderChangeButton, styles.small]}>
              Change
            </Container>
          )}
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
            {this.state.uploadStatus > 0 && (
              <Container className={styles.uploaderStatus}>
                <Message
                  flat
                  message={this.state.uploadStatus === 2 ? 'Attached' : this.state.uploadStatus === 1 ? 'Saved' : ''}
                  size={'small'}
                  variant={
                    this.state.uploadStatus === 2 ? 'disabled' : this.state.uploadStatus === 1 ? 'info' : undefined
                  }
                />
              </Container>
            )}
            {this.getContentDesign()}
            <input
              ref={(ref) => (this.fileUploader = ref)}
              type='file'
              accept={this.getAllowFileRules().join(',')}
              onChange={this.onFileChange}
              disabled={this.props.disabled}
            />
          </label>
          {this.props.uploaderViewer && (
            <EyeOutlined
              onClick={this.openViewer.bind(this)}
              className={styles.uploaderViewer}
              style={{ fontSize: 24 }}
            />
          )}
        </Container>
      </>
    );
  }

  private handleFileUploaderClick = (e: any) => {
    this.fileUploader.click();
  };

  private getContentDesign() {
    if (this.state.src) {
      return (
        <Container
          position='relative'
          textAlign='center'
          className='image-container'
          padding={{
            topRem: this.props.uploaderLabel || this.props.uploaderViewer ? 2 : 1,
            bottomRem: 1,
            leftRightRem: 1
          }}
        >
          {this.state.type !== 'pdf' && <Image onClick={this.openViewer.bind(this)} src={this.state.src} />}
          {this.state.type == 'pdf' && this.state.src !== '' && (
            <FilePdfOutlined onClick={this.openViewer.bind(this)} className={styles.fileIcon} />
          )}
          {this.props.showFileName && (
            <Container className={styles.uploaderFileName} fluid verticalAlign={'center'}>
              <Container classNames={[styles.normalText, styles.small, styles.colorDark]}>
                {this.state.fileName}
              </Container>
            </Container>
          )}
          {this.props.uploaderFooter && (
            <Container className={styles.uploaderFooter}>{this.props.uploaderFooter}</Container>
          )}
        </Container>
      );
    } else {
      return (
        <>
          {this.props.children}
          {this.props.uploaderFooter && (
            <Container className={styles.uploaderFooter}>{this.props.uploaderFooter}</Container>
          )}
        </>
      );
    }
  }

  private preventPropation = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };

  private handleFileChange = async (file: any) => {
    this.props.resetFormControl!;
    file.preview = await this.getBase64(file);
    if (file.type.split('/')[0] === 'image') {
      // setTimeout(() => {
      this.setState(
        {
          src: file.preview as string,
          type: 'image',
          extension: this.getExtension(file.name),
          uploaded: false,
          fileName: file.name,
          uploadStatus: 2,
          fileSize: file.size
        },
        this.onValueChanged
      );
      // }, 100);
    } else if (file.type === 'application/pdf') {
      this.setState(
        {
          src: file.preview as string,
          url: file.preview as string,
          type: 'pdf',
          extension: this.getExtension(file.name),
          uploaded: false,
          fileName: file.name,
          uploadStatus: 2,
          fileSize: file.size
        },
        this.onValueChanged
      );
    }
  };

  private onFileChange = (e: any, inputFile?: File) => {
    let file = inputFile || (e.target as any).files[0];
    const filesAllowed: any[] = [];
    const msgFilesAllowed: any[] = [];
    this.props.customAllowFileExtensions!.map((extension) => {
      let ex = extension;
      if (extension === '.jpg') {
        ex = extension.replace('.jpg', 'jpeg');
      } else {
        ex = extension.replace(/\./g, '');
      }
      let cap = ex.toUpperCase();
      filesAllowed.push(ex);
      filesAllowed.push(cap);
      msgFilesAllowed.push(cap);
    });
    const pattern = '^.*.(' + filesAllowed.join('|') + ')$';
    if (file) {
      this.setState({ loading: true });
      if (!file.type.match(pattern)) {
        const filesAllowedString = msgFilesAllowed.join(' , ').toUpperCase();
        this.setState({ loading: false });
        Confirm.show({
          type: 'okonly',
          message: `The file type you uploaded is not supported on iSTOX. Only ${filesAllowedString} is supported.`,
          onResult: (result) => {}
        });
        e.target.value = '';
        return false;
      }
      if (file.size > 10485760) {
        this.setState({ loading: false });
        Confirm.show({
          type: 'okonly',
          message: 'The file size of your file exceeds our limit of 10MB.',
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

  public isUploaded = () => {
    return this.state.uploaded;
  };

  public getUploadProgress = () => {
    return this.state.uploadProgress;
  };

  public getFileSize = () => {
    return this.state.fileSize;
  };

  public onUploadProgressChanged(onChanged: (percent: number) => void) {
    this.onUploadProgressChange = onChanged;
  }

  public onUpload = async () => {
    if (!this.state.uploaded) {
      return new Promise(async (resolve, reject) => {
        try {
          this.onProgressChanged(0);

          const credentials = await AwsHelper.getSTS();

          var options = {
            accessKeyId: credentials.accessKey,
            secretAccessKey: credentials.secretKey,
            sessionToken: credentials.sessionToken,
            region: 'ap-southeast-1'
          };

          const s3 = new S3(options);

          const base64result = this.state.src.split(',')[1];

          const base64Data = new Buffer.from(base64result, 'base64');

          // Getting the file type, ie: jpeg, png or gif
          const contentType = this.state.src.split(';')[0].split(':')[1];

          const bucket = this.props.bucketName;
          const key = `${this.props.path}/${this.props.fixedFileName || UuidGenerator.generate()}.${
            this.state.extension
          }`;

          const params = {
            Bucket: this.props.bucketName!,
            Key: key,
            Body: base64Data,
            ContentEncoding: 'base64', // required
            ContentType: `${contentType}` // required. Notice the back ticks
          };
          s3.putObject(params)
            .on('httpUploadProgress', (progress: any) => {
              // if (this.state.uploadStatus === 0) {
              var percentComplete = (progress.loaded / progress.total) * 100 - 1;
              if (percentComplete > 0) {
                this.onProgressChanged(Math.round(percentComplete));
              }
              // }
            })
            .send((err: any, data: any) => {
              if (err) {
                this.setState({ uploadStatus: -1 });
                reject(err);
              } else {
                const result = `ISTOXBUCKET|${bucket}|${key}`;

                this.onProgressChanged(100, () => {
                  this.setState({ src: result, uploaded: true, uploadStatus: 1 }, () => {
                    this.onValueChanged();

                    resolve();
                  });
                });
              }
            });
          // make sure state is set before return
        } catch (e) {
          this.setState({ uploadStatus: -1 });
          reject(e);
        }
      });
    } else {
      return null;
    }
  };

  private onProgressChanged = (percentComplete: number, callback?: () => void) => {
    this.setState(
      {
        uploadProgress: percentComplete
      },
      () => {
        this.onUploadProgressChange(percentComplete);
        if (callback) {
          callback();
        }
      }
    );
  };
}
