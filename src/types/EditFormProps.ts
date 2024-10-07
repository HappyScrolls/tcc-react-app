import { IMemberInfo } from "./IMemberInfo";

export interface EditFormProps {
  userInfo?: IMemberInfo;
  onSubmit: (updatedData: any) => void;
  onCancel: () => void;
}
