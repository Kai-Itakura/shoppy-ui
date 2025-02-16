export enum FORM_STATUS {
  IDOL = 'idol',
  SUCCESS = 'success',
  ERROR = 'error',
}

export type FormStatus =
  | { status: FORM_STATUS.IDOL }
  | { status: FORM_STATUS.SUCCESS; message: string }
  | { status: FORM_STATUS.ERROR; message: string };
