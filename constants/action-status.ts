export const FORM_STATUS = {
  IDLE: 'idle',
  SUCCESS: 'success',
  ERROR: 'error',
} as const;

export type FormStatusType = (typeof FORM_STATUS)[keyof typeof FORM_STATUS];

export type FormState =
  | { status: typeof FORM_STATUS.IDLE }
  | { status: typeof FORM_STATUS.SUCCESS; message: string }
  | { status: typeof FORM_STATUS.ERROR; message: string };
