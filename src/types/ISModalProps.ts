export interface ISModalProps {
  title: string;
  description?: string;
  imageSrc?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}
