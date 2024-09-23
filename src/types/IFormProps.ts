interface FormProps {
  onSave: (formData: any) => void;
  initialFormData?: {
    busyLevel: string;
    title: string;
    location: string;
    person: string;
    gender: string;
    startTime: string;
    endTime: string;
    repeat: string;
    selectedDays: string[];
    repeatEnd: string;
    endDate: string;
  };
  isCoupleSchedule?: boolean;
}

export default FormProps;
