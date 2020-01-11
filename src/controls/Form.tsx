import * as React from 'react';
import { DetailedReactHTMLElement } from 'react';
import * as styles from '../css/main.scss';
import ReactForm from 'antd/es/form';
import {
  Button,
  Grid,
  Divider,
  ProgressBar,
  Modal,
  Loading,
  FormControl,
  Container,
  IContainer,
  Alert,
  IAlert
} from '.';
import { UuidGenerator } from '../helpers';
import _ = require('lodash');

interface IProps extends IContainer, IAlert {
  loading?: boolean;
  horizontal?: boolean;
  comparing?: boolean;
  antiVirusChecks?: any;
  onSubmit?: () => void;
  onUploadError?: (e: any) => void;
  onUploadComplete?: (uploads: any[]) => void;
  onAntiVirusChecksComplete?: () => void;
  uploadBackButtonText?: string;
  uploadRedirectMessage?: string;
}

interface IState {
  showUploaderModal: boolean;
  uploadFormControlsProgress?: any[];
  antiVirusChecks?: any;
  uploadResult?: string;
  uploadRedirectMessage?: any;
  uploadComplete?: boolean;
  uploadBackButtonText?: string;
  uploadFormControls?: any;
}

export class Form extends React.Component<IProps, IState> {
  formControls: any[];

  constructor(props: IProps) {
    super(props);

    this.state = {
      showUploaderModal: false,
      antiVirusChecks: [],
      uploadComplete: false,
      uploadBackButtonText: this.props.uploadBackButtonText,
      uploadRedirectMessage: ''
    };
  }

  public componentDidUpdate(prevProps: IProps) {
    if (prevProps.antiVirusChecks !== this.props.antiVirusChecks) {
      this.updateUploaderProgress(this.props.antiVirusChecks);
    }
  }

  public render() {
    this.formControls = [];
    let children: DetailedReactHTMLElement<any, any>[] = [];
    if (this.props.children instanceof Array) {
      children = children.concat(this.props.children);
    } else {
      children.push(this.props.children);
    }

    return (
      <Container {...this.props}>
        <Loading loading={this.props.loading} />
        <Alert success={this.props.success} info={this.props.info} error={this.props.error} />
        <ReactForm
          layout={this.props.horizontal ? 'horizontal' : 'vertical'}
          className={styles.istoxForm}
          onSubmit={this._onSubmit.bind(this)}
        >
          {this.recursiveCloneChildren(this.props.children)}
        </ReactForm>
        <Modal width={650} visible={this.state.showUploaderModal} disableClose>
          {this.state.uploadResult && (
            <>
              <h3 className={styles.colorDark}>{this.state.uploadResult}</h3>
              <Divider visibility={'hidden'} />
            </>
          )}
          {this.getUploaderFormControls()}
          <Divider visibility={'hidden'} />
          {!this.state.uploadRedirectMessage &&
            this.state.uploadFormControlsProgress &&
            this.state.uploadBackButtonText && (
              <Button
                variant='disabled'
                outline
                onClick={() => {
                  this.setState({
                    showUploaderModal: false
                  });
                }}
              >
                {this.state.uploadFormControlsProgress && this.state.uploadBackButtonText}
              </Button>
            )}
          {this.state.uploadRedirectMessage && (
            <Container padding={{ bottomRem: 0.9 }} className='color-primary-grey-darker large' textAlign={'center'}>
              {this.state.uploadRedirectMessage}
            </Container>
          )}
        </Modal>
      </Container>
    );
  }

  private getUploaderFormControls = () => {
    let uploaderCount = 0;
    let prevFieldName = '';
    if (!this.state.uploadFormControls) return null;
    return this.state.uploadFormControls.map((formControl: any) => {
      if (formControl) {
        if (formControl.props.type && formControl.props.type === 'uploader') {
          uploaderCount++;
          const uploadFormControlsProgress = this.state.uploadFormControlsProgress;
          let showTitle = false;
          if (
            formControl.props.uploaderConfigs.fieldName &&
            prevFieldName !== formControl.props.uploaderConfigs.fieldName
          ) {
            showTitle = true;
          }
          prevFieldName = formControl.props.uploaderConfigs.fieldName;
          return (
            <React.Fragment key={UuidGenerator.generate()}>
              {uploadFormControlsProgress && uploadFormControlsProgress[formControl.props.name] && (
                <>
                  {showTitle && (
                    <>
                      {uploaderCount !== 1 && formControl.props.uploaderConfigs.fieldName && (
                        <>
                          <Divider visibility='visible' />
                        </>
                      )}
                      <Container classNames={[styles.colorPrimaryGreyDarker, styles.uppercase]}>
                        {formControl.props.uploaderConfigs.fieldName}
                      </Container>
                    </>
                  )}
                  <Grid>
                    <Grid.Row fitted>
                      <Grid.Col col={8}>
                        <Container className='semi-bold large color-dark'>
                          {uploadFormControlsProgress[formControl.props.name].fileName || ''}
                        </Container>
                        <ProgressBar
                          padding={{ bottomRem: 0.5 }}
                          className={styles.uploaderProgressBar}
                          animated
                          variant={uploadFormControlsProgress[formControl.props.name].variant}
                          value={uploadFormControlsProgress[formControl.props.name].percentProgress || 0}
                        />
                      </Grid.Col>
                      <Grid.Col col={4} verticalAlign='center'>
                        <Container
                          padding={{ leftRem: 2 }}
                          margin={{ topRem: -2.4 }}
                          className={`capitalize color-${
                            uploadFormControlsProgress[formControl.props.name].variant !== 'info'
                              ? uploadFormControlsProgress[formControl.props.name].variant
                              : 'primary-grey-darker'
                          }`}
                        >
                          {uploadFormControlsProgress[formControl.props.name].statusMessage}
                        </Container>
                      </Grid.Col>
                    </Grid.Row>
                  </Grid>
                </>
              )}
            </React.Fragment>
          );
        }
      }
    });
  };

  private recursiveCloneChildren(children: any) {
    return React.Children.map(children, (child) => {
      var childProps: any = {
        ref: (ele: any) => {
          if (ele) this.formControls.push(ele);
        }
      };
      if (!React.isValidElement(child)) return child;
      childProps.children = this.recursiveCloneChildren((child.props as any).children);
      if (this.props.comparing) {
        childProps.static = this.props.comparing;
      }
      childProps.getuploaderprogress = this.getuploaderprogress;
      childProps.injectControlFn = this.formControlInject;
      childProps.uninjectControlFn = this.formControlUninject;
      return React.cloneElement(child, childProps);
    });
  }

  private formControlInject = (formControl: any) => {
    const index = this.formControls.indexOf(formControl);

    if (index < 0) {
      this.formControls.push(formControl);
    }

    this.formControls = this.formControls.filter(() => {
      return formControl.isUnmounted && !formControl.isUnmounted();
    });
  };

  private formControlUninject = (formControl: any) => {
    const index = this.formControls.indexOf(formControl);

    if (index >= 0) this.formControls.splice(index, 1);

    this.formControls = this.formControls.filter(() => {
      return formControl.isUnmounted && !formControl.isUnmounted();
    });
  };

  public onSaved() {
    this.formControls.forEach((formControl: any) => {
      if (formControl.onSaved) {
        formControl.onSaved();
      }
    });
  }

  public getInputValue(name: string): string {
    let value = '';

    const formObject = this.getFormObject();
    Object.keys(formObject).forEach((key) => {
      if (key === name) {
        value = formObject[key];
      }
    });

    if (typeof value === 'string') {
      return value.trim();
    } else {
      return value;
    }
  }

  public getFormControl(name: string): FormControl {
    let result: any = null;
    this.formControls.forEach((formControl: any) => {
      if (formControl.getName && formControl.getValue) {
        if (formControl.getName() === name) {
          result = formControl;
        }
      }
    });
    return result;
  }

  public getFormControls(): FormControl[] {
    let result: FormControl[] = [];
    this.formControls.forEach((formControl: any) => {
      if (formControl.getName && formControl.getValue) {
        result.push(formControl);
      }
    });
    return result;
  }

  public getFormData(): FormData {
    const formData = new FormData();

    const formObject = this.getFormObject();
    for (var key of formObject.keys()) {
      formData.append(key, formObject[key]);
    }

    return formData;
  }

  public getFormJson(): string {
    return JSON.stringify(this.getFormObject());
  }

  public getFormObject(): any {
    const result: any = {};
    this.formControls.forEach((formControl: any) => {
      if (formControl.isFormControl && formControl.isFormControl() && formControl.isIncludeInFormData) {
        const parentCloneNames = formControl.getParentCloneNames();

        if (parentCloneNames.length > 0) {
          _.set(result, parentCloneNames.join('.') + '.' + formControl.getName(), formControl.getValue(false));
        } else {
          result[formControl.getName()] = formControl.getValue(false);
        }
      }
    });

    return result;
  }

  public reset() {
    this.formControls.forEach((formControl: any) => {
      if (formControl.reset) {
        formControl.reset();
      }
    });
  }

  private _onSubmit(e: React.FormEvent<Form>) {
    e.preventDefault();
    if (this.validate(true) && this.props.onSubmit) {
      this.setState(
        {
          uploadFormControlsProgress: undefined,
          uploadFormControls: undefined
        },
        () => {
          this.handleFormControlsUpload()
            .then(() => {
              this.props.onSubmit!();
            })
            .catch((e) => {
              if (this.props.onUploadError) {
                this.props.onUploadError(e);
              }
            });
        }
      );
    }
  }

  public validate(setErrorState: boolean = true): boolean {
    let validated = true;
    this.formControls.forEach((formControl: any) => {
      if (formControl.validate) {
        const isValid = formControl.validate(setErrorState);
        if (validated) {
          validated = isValid;
        }
      }
    });
    return validated;
  }

  public handleFormControlsUpload() {
    return new Promise((resolve, reject) => {
      const promises: any[] = [];
      let showUploadModal = false;
      let uploads: any[] = [];
      let uploadFormControls: any[] = [];
      this.formControls.forEach(async (formControl: any) => {
        if (formControl.onUpload) {
          const promise = formControl.onUpload();
          const isUploaded = formControl.getUploadState();
          if (!isUploaded && promise) {
            showUploadModal = true;
            uploads.push(formControl.getName());
            promises.push(promise);
            uploadFormControls.push(formControl);
          }
        }
      });
      this.setState({
        uploadFormControls,
        uploadResult: `Uploading ${uploads.length} file${uploads.length !== 1 ? 's...' : ''}`
      });
      if (promises.length > 0) {
        Promise.all(promises)
          .then(() => {
            if (showUploadModal && uploads.length) {
              this.setState({
                uploadResult: this.props.onUploadComplete
                  ? `Uploading ${uploads.length} file${uploads.length !== 1 ? 's...' : ''}`
                  : `${uploads.length} File${uploads.length !== 1 ? 's uploaded' : ' uploaded'}`
              });
            }
            if (this.props.onUploadComplete) {
              this.props.onUploadComplete(uploads);
            } else {
              this.setState({
                uploadRedirectMessage: this.props.uploadRedirectMessage || 'Page redirecting. Please wait...'
              });
              setTimeout(() => {
                this.setState({
                  showUploaderModal: false
                });
              }, 2000);
            }
            resolve();
          })
          .catch((e: any) => {
            reject(e);
          });
      } else {
        if (this.props.onUploadComplete) {
          this.props.onUploadComplete(uploads);
        }
        resolve();
      }
    });
  }

  private updateUploaderProgress = (antiVirusChecks: any) => {
    if (antiVirusChecks.length) {
      let uploadFormControlsProgress = this.state.uploadFormControlsProgress || [];
      let newUploadFormControlsProgress: any[] = [];
      let virusCount: number = 0;
      let virusDetected: any[] = [];
      antiVirusChecks.map((upload: any) => {
        const key = upload.key;
        let percentProgress = uploadFormControlsProgress[key].percentProgress;
        let statusMessage = uploadFormControlsProgress[key].statusMessage;
        let fileName = uploadFormControlsProgress[key].fileName;
        let variant = uploadFormControlsProgress[key].variant;
        percentProgress = 100;
        if (upload.success) {
          statusMessage = 'File uploaded';
          variant = 'success';
        } else {
          statusMessage = 'Malicious file detected';
          variant = 'danger';
          virusCount++;
          virusDetected.push(key);
        }
        const obj = {
          percentProgress: percentProgress,
          fileName: fileName,
          variant: variant,
          statusMessage: statusMessage
        };
        newUploadFormControlsProgress[key] = obj;
      });
      this.setState({
        uploadFormControlsProgress: newUploadFormControlsProgress,
        uploadResult:
          virusCount > 0
            ? `${virusCount} Malicious file${virusCount !== 1 ? 's' : ''} detected!`
            : `${antiVirusChecks.length} file${antiVirusChecks.length !== 1 ? 's' : ''} uploaded!`
      });
      if (virusCount === 0) {
        this.setState({ uploadRedirectMessage: 'Page redirecting. Please wait...' });
        setTimeout(() => {
          this.setState({ showUploaderModal: false });
          if (this.props.onAntiVirusChecksComplete) {
            this.props.onAntiVirusChecksComplete();
          }
        }, 2000);
      } else {
        this.setState({
          uploadBackButtonText: this.props.uploadBackButtonText,
          uploadRedirectMessage: ''
        });
      }
      if (virusDetected.length) {
        this.formControls.forEach(async (formControl: any) => {
          if (formControl && formControl.props && formControl.props.name) {
            if (virusDetected.includes(formControl.props.name)) {
              setTimeout(() => {
                formControl.reset();
              }, 300);
            }
          }
        });
      }
    }
  };

  public getuploaderprogress = (
    name: string,
    fileName: string,
    uploaderProgress: number,
    uploaderComplete: -1 | 0 | 1
  ) => {
    const uploadFormControlsProgress = this.state.uploadFormControlsProgress || [];
    const key: any = name;
    let variant = 'info';
    let statusMessage = uploaderProgress + '% uploading';
    let uploaderPercentProgress: number = uploaderProgress;
    if (this.props.antiVirusChecks) {
      uploaderPercentProgress = uploaderProgress - 1;
    }
    if (this.state.showUploaderModal === false && uploaderPercentProgress > 0) {
      this.setState({
        showUploaderModal: true,
        uploadBackButtonText: undefined,
        // uploadBackButtonText: 'Cancel upload',
        uploadRedirectMessage: <>&nbsp;</>
      });
    }
    if (uploaderComplete === -1 && uploaderProgress === 100) {
      variant = 'danger';
      statusMessage = 'Upload failed';
      this.setState({
        uploadRedirectMessage: '',
        uploadBackButtonText: 'Cancel upload'
      });
    } else {
      statusMessage = uploaderPercentProgress + '% uploading';
      variant = 'info';
      if (uploaderPercentProgress === 100) {
        variant = 'success';
        statusMessage = 'File uploaded';
      }
    }
    const obj = {
      percentProgress: uploaderPercentProgress,
      fileName: fileName,
      variant: variant,
      statusMessage: statusMessage
    };
    uploadFormControlsProgress[key] = obj;
    if (!this.props.antiVirusChecks) {
      let filesFailed = 0;
      for (var i in uploadFormControlsProgress) {
        const upload = uploadFormControlsProgress[i];
        if (upload.statusMessage === 'Upload failed') {
          filesFailed++;
        }
      }
      if (filesFailed > 0) {
        this.setState({
          uploadResult: `${filesFailed} File${filesFailed !== 1 ? ' uploads failed' : 'upload failed'}`
        });
      }
    }
    this.setState({ uploadFormControlsProgress });
  };
}
