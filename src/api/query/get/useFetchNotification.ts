import { useSuspenseQuery } from "@tanstack/react-query";
import {axiosInstance, notificationAxiosInstance} from "../../axios";
import {INotification} from "../../../types/INotification";
import {ISchedule} from "../../../types/ISchedule";


const useFetchNotification = () : INotification[] => {
    const getFetchNotification = async (): Promise<INotification[]> => {
        const response = await notificationAxiosInstance.get(`/notification-service`);

        return response.data;
    };

    const { data: notifications } = useSuspenseQuery({
        queryKey: ["fetchNotification"],
        queryFn: ()=>getFetchNotification(),
    });

    return notifications;
};


export default useFetchNotification;