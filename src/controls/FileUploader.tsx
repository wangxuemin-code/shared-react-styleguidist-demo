import * as React from 'react';
import Iframe from 'react-iframe';
import { Container } from '.';
import * as styles from '../css/main.scss';
import { Confirm } from './Confirm';
import { Image } from './Image';
import { Modal } from './Modal';
import { Spin as ReactSpin, Icon as ReactIcon } from 'antd';
import * as AWS from 'aws-sdk';
import { AwsHelper } from '../helpers/AwsHelper';
import { Cookie, UuidGenerator } from '../helpers';
declare const Buffer: { from: new (arg0: any, arg1: string) => any };

export type FilePattern = 'audio' | 'video' | 'image';
type FileType = 'image' | 'pdf' | 'others';

interface IProps {
  uploaderFieldName?: string;
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
  getUploaderProgress?: (
    fileName: string,
    uploaderProgress: number,
    uploaderComplete: boolean
  ) => void;
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
  url: string;
  fieldName: any;
  uploadProgress: number;
}

export default class FileUploader extends React.Component<IProps, IState> {
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
      fieldName: this.props.uploaderFieldName,
      uploadProgress: 0
    };
  }

  public componentDidMount() {
    this.processValue(this.props.value);
  }

  public componentDidUpdate(prevProps: IProps) {
    if (prevProps.value !== this.props.value) {
      const value = this.props.value;
      this.processValue(value);
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
            url: processedSrc
            // fileName: ''
          });
        } else {
          this.setState({
            src: processedSrc,
            type: 'image'
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
      if (
        obj.src
          .split(',')[0]
          .toLowerCase()
          .indexOf('pdf') > 0
      ) {
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
    } else if (value === undefined || value == '') {
      this.setState({
        src: '',
        type: this.getExtensionType(),
        fileName: ''
      });
    }
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

  private getUploaderProgress = (uploaderProgress: number, uploaderComplete: boolean) => {
    if (this.props.getUploaderProgress && this.state.fileName) {
      this.props.getUploaderProgress(this.state.fileName, uploaderProgress, uploaderComplete);
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
          {this.props.uploaderViewer && (
            <ReactIcon
              onClick={this.openViewer.bind(this)}
              className={styles.uploaderViewer}
              style={{ fontSize: 24 }}
              type={'eye'}
            />
          )}
        </Container>
      </>
    );
  }

  private getContentDesign() {
    if (this.state.src) {
      return (
        <Container>
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
            {this.state.type !== 'pdf' && (
              <Image onClick={this.openViewer.bind(this)} src={this.state.src} />
            )}
            {this.state.type == 'pdf' && (
              <ReactIcon
                onClick={this.openViewer.bind(this)}
                className={styles.fileIcon}
                type={'file-pdf'}
              />
            )}
            {this.props.showFileName && (
              <Container margin={{ topRem: 0.3 }} fluid verticalAlign={'center'}>
                <Container classNames={[styles.normalText, styles.small, styles.colorDark]}>
                  {this.state.fileName}
                </Container>
              </Container>
            )}
            {this.props.uploaderFooter && (
              <Container className={styles.uploaderFooter}>{this.props.uploaderFooter}</Container>
            )}
          </Container>
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
      setTimeout(() => {
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
      }, 100);
    } else if (file.type === 'application/pdf') {
      this.setState(
        {
          src: file.preview as string,
          url: file.preview as string,
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

  public onUpload = async () => {
    if (!this.state.uploaded) {
      return new Promise(async (resolve, reject) => {
        try {
          const credentials = await AwsHelper.getSTS();

          var options = {
            accessKeyId: credentials.accessKey,
            secretAccessKey: credentials.secretKey,
            sessionToken: credentials.sessionToken,
            region: 'ap-southeast-1'
          };

          const s3 = new AWS.S3(options);

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

          // The upload() is used instead of putObject() as we'd need the location url and assign that to our user profile/database
          // see: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#upload-property

          s3.putObject(params)
            .on('httpUploadProgress', (progress) => {
              var percentComplete = (progress.loaded / progress.total) * 100;
              this.getUploaderProgress(percentComplete, false);
            })
            .send((err, data) => {
              if (err) {
                reject(err);
              } else {
                const result = `ISTOXBUCKET|${bucket}|${key}`;
                this.setState({ src: result, uploaded: true }, () => {
                  this.onValueChanged();
                  this.getUploaderProgress(100, true);
                  resolve();
                });
              }
            });

          // Save the Location (url) to your database and Key if needs be.
          // As good developers, we should return the url and let other function do the saving to database etc

          // make sure state is set before return
        } catch (e) {
          reject(e);
        }
      });
    } else {
      return null;
    }
  };
}
