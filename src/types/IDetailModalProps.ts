import { ScheduleData } from "./ISchedule";

export interface IDetailModalProps {
  schedule: ScheduleData;
  onClose: () => void;
  buttons: {
    label: string;
    onClick: () => void;
  }[];
}
