import { ModifyScheduleRequest, ScheduleData } from "./ISchedule";

interface FormProps {
  onSave: (formData: ScheduleData) => void;
  initialFormData?: ScheduleData;
  isCoupleSchedule?: boolean;
}

export interface ModifyFormProps {
  onSave: (formData: ModifyScheduleRequest) => void;
  initialFormData?: ScheduleData;
  isCoupleSchedule?: boolean;
}

export default FormProps;
