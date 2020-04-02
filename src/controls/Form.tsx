import ReactForm from 'antd/es/form';
import * as React from 'react';
import { DetailedReactHTMLElement } from 'react';
import { Alert, Container, FormControl, IAlert, IContainer, Loading } from '.';
import * as styles from '../css/main.scss';
import _ = require('lodash');
import FileUploader from './FileUploader';

interface IProps extends IContainer, IAlert {
  loading?: boolean;
  horizontal?: boolean;
  comparing?: boolean;
  onSubmit?: () => void;
}

export class Form extends React.Component<IProps> {
  formControls: any[];
  private uploading: boolean;

  constructor(props: IProps) {
    super(props);
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
          onSubmitCapture={this._onSubmit.bind(this)}
        >
          {this.recursiveCloneChildren(this.props.children)}
        </ReactForm>
      </Container>
    );
  }

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
      if (
        formControl.isFormControl &&
        formControl.isFormControl() &&
        formControl.isExcludeFromFormData &&
        !formControl.isExcludeFromFormData()
      ) {
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
      this.props.onSubmit!();
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

  // call .start to start upload
  public uploader(): UploadHelper {
    const upload = new UploadHelper()
      ._onUploadInitiated(() => {
        if (this.uploading) {
          console.log('Still in previous uploading process, your upload request is ignored.');
          return;
        }

        this.uploading = true;

        const uploadingNames: string[] = [];
        this.formControls.forEach(async (formControl: any) => {
          if (formControl && formControl.onUpload && formControl.getControl().onUpload) {
            const isUploaded = formControl.getControl().isUploaded();
            if (!isUploaded) {
              uploadingNames.push(formControl.getName());
            }
          }
        });

        if (uploadingNames.length > 0) {
          upload._getOnUploadInitiatedHandler()(uploadingNames);
        } else {
          upload._getOnEmptyUploadHandler()();
          this.uploading = false;
        }
      })
      ._onUploadStart(() => {
        const uploadPromise = this.handleFormControlsUpload(upload);
        if (uploadPromise) {
          uploadPromise
            .then((uploadBucketUrls: { [key: string]: string }) => {
              upload._getOnUploadCompleteHandler()(uploadBucketUrls);
              this.uploading = false;
            })
            .catch((e) => {
              upload._getOnUploadErrorHandler()(e);
              this.uploading = false;
            });
        }
      })
      ._onCancel(() => {
        this.uploading = false;
      });

    return upload;
  }

  public handleFormControlsUpload(uploadHelper: UploadHelper) {
    const promises: any[] = [];
    const uploadFormControls: FormControl[] = [];
    const fileUploaders: FileUploader[] = [];

    this.formControls.forEach(async (formControl: any) => {
      if (formControl && formControl.onUpload && formControl.getControl().onUpload) {
        const promise = formControl.onUpload();
        const isUploaded = formControl.getControl().isUploaded();
        if (!isUploaded && promise) {
          promises.push(promise);
          uploadFormControls.push(formControl);
          fileUploaders.push(formControl.getControl());
        }
      }
    });

    if (promises.length > 0) {
      uploadHelper._getOnUploadStartHandler()();

      fileUploaders.forEach((fileUploader: FileUploader) => {
        fileUploader.onUploadProgressChanged((percent: number) => {
          uploadHelper._getOnUploadProgressHandler()(this.getOverallUploadProgress(fileUploaders));
        });
      });

      return new Promise<{ [key: string]: string }>((resolve, reject) => {
        Promise.all(promises)
          .then(() => {
            const result: any = {};
            uploadFormControls.forEach((formControl) => {
              result[formControl.getName()] = formControl.getValue();
            });

            resolve(result);
          })
          .catch((e: any) => {
            reject(e);
          });
      });
    } else {
      return null;
    }
  }

  private getOverallUploadProgress(fileUploaders: FileUploader[]) {
    const totalFileSize = fileUploaders.reduce((prev, fileUploader) => {
      return prev + fileUploader.getFileSize();
    }, 0);

    let resultPercent = 0.0;

    const uploadCompleted = !fileUploaders.some((fileUploader) => {
      return fileUploader.isUploaded() === false;
    });

    if (uploadCompleted) {
      resultPercent = 100;
    } else {
      fileUploaders.forEach((fileUploader) => {
        const maxPercent = parseFloat(fileUploader.getFileSize().toString()) / parseFloat(totalFileSize.toString());

        resultPercent += parseFloat(fileUploader.getUploadProgress().toString()) * maxPercent;
      });
    }

    return Math.floor(resultPercent);
  }
}

class UploadHelper {
  private onEmptyUploadHandler?: () => void;
  private onUploadInitiatedHandler?: (uploadingNames: string[]) => void;
  private onUploadStartHandler?: () => void;
  private onUploadProgressHandler?: (percentProgress: number) => void;
  private onUploadCompleteHandler?: (uploadBucketUrls: { [key: string]: string }) => void;
  private onUploadErrorHandler?: (e: any) => void;

  private onInitiatedHandler?: () => void;
  private onStartHandler?: () => void;
  private onCancelHandler?: () => void;

  public onNothingToUpload(_onEmptyUploadHandler?: () => void) {
    this.onEmptyUploadHandler = _onEmptyUploadHandler;

    return this;
  }

  public onUploadInitiated(_onUploadInitiatedHandler?: (uploadingNames: string[]) => void) {
    this.onUploadInitiatedHandler = _onUploadInitiatedHandler;

    return this;
  }

  public onUploadStart(_onUploadStartHandler?: () => void) {
    this.onUploadStartHandler = _onUploadStartHandler;

    return this;
  }

  public onUploadError(_onUploadErrorHandler?: (e: any) => void) {
    this.onUploadErrorHandler = _onUploadErrorHandler;

    return this;
  }

  public onUploadComplete(_onUploadCompleteHandler?: (uploadBucketNameUrlMap: { [key: string]: string }) => void) {
    this.onUploadCompleteHandler = _onUploadCompleteHandler;

    return this;
  }

  public onUploadProgress(_onUploadProgressHandler?: (percent: number) => void) {
    this.onUploadProgressHandler = _onUploadProgressHandler;

    return this;
  }

  public init() {
    this.onInitiatedHandler!();

    return this;
  }

  public start() {
    this.onStartHandler!();

    return this;
  }

  public cancel() {
    this.onEmptyUploadHandler = this.dummyHandler;
    this.onUploadInitiatedHandler = this.dummyHandler;
    this.onUploadStartHandler = this.dummyHandler;
    this.onUploadCompleteHandler = this.dummyHandler;
    this.onUploadErrorHandler = this.dummyHandler;
    this.onUploadProgressHandler = this.dummyHandler;

    this.onCancelHandler!();
    return this;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // BELOW ARE PROTECTED METHODS SHOULD ONLY BE ACCESSED WITHIN ISTOX-SHARED
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  public _onUploadInitiated(_onUploadInitiated?: () => void) {
    this.onInitiatedHandler = _onUploadInitiated;
    return this;
  }

  public _onUploadStart(_onUploadStart?: () => void) {
    this.onStartHandler = _onUploadStart;
    return this;
  }

  public _onCancel(_onCancel?: () => void) {
    this.onCancelHandler = _onCancel;
    return this;
  }

  public _getOnEmptyUploadHandler() {
    return this.onEmptyUploadHandler || this.dummyHandler;
  }

  public _getOnUploadInitiatedHandler() {
    return this.onUploadInitiatedHandler || this.dummyHandler;
  }

  public _getOnUploadStartHandler() {
    return this.onUploadStartHandler || this.dummyHandler;
  }

  public _getOnUploadCompleteHandler() {
    return this.onUploadCompleteHandler || this.dummyHandler;
  }

  public _getOnUploadErrorHandler() {
    return this.onUploadErrorHandler || this.dummyHandler;
  }

  public _getOnUploadProgressHandler() {
    return this.onUploadProgressHandler || this.dummyHandler;
  }

  private dummyHandler(obj?: any) {}
}
