export interface INotification {
    notificationNo: number,
    message: string,
    path?: string,
    parameter?: string,
    isRead: boolean,
    messagedAt: string,
}
