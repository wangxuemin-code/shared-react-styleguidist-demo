import * as React from 'react';
import { DetailedReactHTMLElement } from 'react';
import { Form as ReactForm } from 'antd';
import * as styles from '../css/main.scss';
import { Alert, IAlert } from './Alert';
import { Container, IContainer } from './Container';
import { FormControl } from './FormControl';
import { Loading } from './Loading';
import { Modal } from './Modal';
import { ProgressBar } from './ProgressBar';
import { Divider } from './Divider';
import { Grid } from './Grid';
import { Button } from './Button';

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
}

interface IState {
  showUploaderModal: boolean;
  uploadFormControlsProgress?: any[];
  antiVirusChecks?: any;
  uploadResult?: string;
  uploadRedirectMessage?: string;
  uploadComplete?: boolean;
  uploadBackButtonText?: string;
}

export class Form extends React.Component<IProps, IState> {
  formControls: any[];

  constructor(props: IProps) {
    super(props);

    this.state = {
      showUploaderModal: false,
      antiVirusChecks: {},
      uploadComplete: false,
      uploadBackButtonText: this.props.uploadBackButtonText
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
              <h4>{this.state.uploadResult}</h4>
              <Divider visibility={'hidden'} />
            </>
          )}
          {this.getUploaderFormControls(this.props.children)}
          {!this.state.uploadRedirectMessage && (
            <>
              <Divider visibility={'hidden'} />
              <Button
                variant='disabled'
                outline
                onClick={() => {
                  this.setState({ showUploaderModal: false });
                }}
              >
                {this.state.uploadFormControlsProgress && this.state.uploadBackButtonText}
              </Button>
            </>
          )}
          {this.state.uploadRedirectMessage && (
            <Container className='color-primary-grey-darker large' textAlign={'center'}>
              {this.state.uploadRedirectMessage}
            </Container>
          )}
        </Modal>
      </Container>
    );
  }

  private getUploaderFormControls = (children: any) => {
    let uploaderCount = 0;
    let prevFieldName = '';
    return React.Children.map(children, (child) => {
      uploaderCount++;
      const uploadFormControlsProgress = this.state.uploadFormControlsProgress;
      if (child.props.type && child.props.type === 'uploader') {
        let showTitle = false;
        if (
          child.props.uploaderConfigs.fieldName &&
          prevFieldName !== child.props.uploaderConfigs.fieldName
        ) {
          showTitle = true;
        }
        prevFieldName = child.props.uploaderConfigs.fieldName;
        return (
          <>
            {uploadFormControlsProgress && uploadFormControlsProgress[child.props.name] && (
              <>
                {showTitle && (
                  <>
                    {uploaderCount !== 1 && child.props.uploaderConfigs.fieldName && (
                      <>
                        <Divider visibility='visible' />
                      </>
                    )}
                    <p className='color-primary-grey-darker'>
                      {child.props.uploaderConfigs.fieldName}
                    </p>
                  </>
                )}
                <Grid>
                  <Grid.Row fitted>
                    <Grid.Col col={8}>
                      <Container className='semi-bold large color-dark'>
                        {uploadFormControlsProgress[child.props.name].fileName || ''}
                      </Container>
                      <ProgressBar
                        padding={{ bottomRem: 0.5 }}
                        className={styles.uploaderProgressBar}
                        animated
                        variant={uploadFormControlsProgress[child.props.name].variant}
                        value={uploadFormControlsProgress[child.props.name].percentProgress || ''}
                      />
                    </Grid.Col>
                    <Grid.Col col={4} verticalAlign='center'>
                      <Container
                        padding={{ leftRem: 2 }}
                        className={`capitalize color-${uploadFormControlsProgress[child.props.name].variant}`}
                      >
                        {uploadFormControlsProgress[child.props.name].statusMessage}
                      </Container>
                    </Grid.Col>
                  </Grid.Row>
                </Grid>
              </>
            )}
          </>
        );
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
      if (
        this.props.onUploadComplete &&
        child.props &&
        child.props.type &&
        child.props.type === 'uploader'
      ) {
        childProps.getUploaderProgress = this.getUploaderProgress;
        return React.cloneElement(child, childProps);
      }
      if (!React.isValidElement(child)) return child;
      childProps.children = this.recursiveCloneChildren((child.props as any).children);
      if (this.props.comparing) {
        childProps.static = this.props.comparing;
      }
      return React.cloneElement(child, childProps);
    });
  }

  public onSaved() {
    this.formControls.forEach((formControl: any) => {
      if (formControl.onSaved) {
        formControl.onSaved();
      }
    });
  }

  public getInputValue(name: string): string {
    let value = '';
    this.formControls.forEach((formControl: any) => {
      if (formControl.getName && formControl.getValue) {
        if (formControl.getName() === name) {
          value = formControl.getValue(true);
        }
      }
    });
    return value.trim();
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
    this.formControls.forEach((formControl: any) => {
      if (formControl.getName && formControl.getValue && formControl.isIncludeInFormData) {
        formData.append(formControl.getName(), formControl.getValue(false));
      }
    });
    return formData;
  }

  public getFormJson(): string {
    var object: any = {};
    this.formControls.forEach((formControl: any) => {
      if (formControl.getName && formControl.getValue && formControl.isIncludeInFormData) {
        object[formControl.getName()] = formControl.getValue(false);
      }
    });

    return JSON.stringify(object);
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
      this.formControls.forEach(async (formControl: any) => {
        if (formControl.onUpload) {
          const promise = formControl.onUpload();
          if (formControl.control.state.uploaded == false) {
            showUploadModal = true;
            uploads.push(formControl.getName());
          }
          if (promise) {
            promises.push(promise);
          }
        }
      });

      if (promises.length > 0) {
        if (showUploadModal) {
          this.setState({ showUploaderModal: true, uploadBackButtonText: 'Cancel upload' });
        }
        Promise.all(promises)
          .then(() => {
            if (this.props.onUploadComplete && showUploadModal) {
              this.setState({ uploadBackButtonText: this.props.uploadBackButtonText });
              this.props.onUploadComplete(uploads);
            }
            resolve();
          })
          .catch((e: any) => {
            reject(e);
          });
      } else {
        resolve();
      }
    });
  }

  private updateUploaderProgress = (antiVirusChecks: any) => {
    if (Object.keys(antiVirusChecks).length) {
      let uploadFormControlsProgress = this.state.uploadFormControlsProgress || [];
      let newUploadFormControlsProgress: any[] = [];
      let virusCount: number = 0;
      Object.keys(antiVirusChecks).forEach(function(key: any) {
        let percentProgress = uploadFormControlsProgress[key].percentProgress;
        let statusMessage = uploadFormControlsProgress[key].statusMessage;
        let fileName = uploadFormControlsProgress[key].fileName;
        let variant = uploadFormControlsProgress[key].variant;
        percentProgress = 100;
        if (antiVirusChecks[key]) {
          statusMessage = 'File uploaded';
          variant = 'success';
        } else {
          statusMessage = 'Malicious file detected';
          variant = 'danger';
          virusCount++;
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
        uploadResult: virusCount > 0 ? `${virusCount} Malicious file detected!` : undefined
      });
      if (virusCount === 0) {
        this.setState({ uploadRedirectMessage: 'Page redirecting. Please wait...' });
        setTimeout(() => {
          this.setState({ showUploaderModal: false });
          if (this.props.onAntiVirusChecksComplete) {
            this.props.onAntiVirusChecksComplete();
          }
        }, 2000);
      }
    }
  };

  public getUploaderProgress = (
    name: string,
    fileName: string,
    uploaderProgress: number,
    uploaderComplete: boolean
  ) => {
    const uploadFormControlsProgress = this.state.uploadFormControlsProgress || [];
    const key: any = name;
    let variant = 'danger';
    let statusMessage = uploaderProgress.toFixed(2) + '% uploaded';
    if (uploaderComplete) {
      statusMessage = 'File failed';
    }
    let uploaderPercentProgress: number = uploaderProgress;
    if (this.props.antiVirusChecks) {
      let uploaderPercentProgress: number = uploaderProgress / 2;
      if (uploaderPercentProgress > 49) {
        variant = 'info';
      }
    } else {
      if (uploaderPercentProgress > 49) {
        variant = 'info';
      }
      if (uploaderPercentProgress === 100) {
        variant = 'success';
        statusMessage = 'File uploaded';
        this.setState({ uploadRedirectMessage: 'Page redirecting. Please wait...' });
        setTimeout(() => {
          this.setState({ showUploaderModal: false });
        }, 2000);
      }
    }
    const obj = {
      percentProgress: uploaderPercentProgress,
      fileName: fileName,
      variant: variant,
      statusMessage: statusMessage
    };
    uploadFormControlsProgress[key] = obj;
    this.setState({ uploadFormControlsProgress });
  };
}
