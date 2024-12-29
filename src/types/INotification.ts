export interface INotification {
    notificationNo: number,
    type:NotificationType,
    message: string,
    path?: string,
    parameter?: string,
    isRead: boolean,
    messagedAt: string,
}

export enum NotificationType {
    SCHEDULE_CREATE = "SCHEDULE_CREATE",
    SCHEDULE_MODIFY_REQUEST = "SCHEDULE_MODIFY_REQUEST",
    SCHEDULE_MODIFY_REQUEST_ACCEPTED = "SCHEDULE_MODIFY_REQUEST_ACCEPTED",
    SCHEDULE_MODIFY_REQUEST_REJECTED = "SCHEDULE_MODIFY_REQUEST_REJECTED",
}
export const NotificationTypeMessages: Record<NotificationType, string> = {
    [NotificationType.SCHEDULE_CREATE]: "일정 생성",
    [NotificationType.SCHEDULE_MODIFY_REQUEST]: "일정 수정 요청",
    [NotificationType.SCHEDULE_MODIFY_REQUEST_ACCEPTED]: "일정 수정 요청 수락",
    [NotificationType.SCHEDULE_MODIFY_REQUEST_REJECTED]: "일정 수정 요청 거절",
};