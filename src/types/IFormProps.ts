import { ScheduleData } from "./ISchedule";

interface FormProps {
  onSave: (formData: ScheduleData) => void;
  initialFormData?: ScheduleData;
  isCoupleSchedule?: boolean;
}

export default FormProps;
