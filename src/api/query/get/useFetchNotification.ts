import { useSuspenseQuery } from "@tanstack/react-query";
import { notificationAxiosInstance } from "../../axios";
import { INotification } from "../../../types/INotification";

export const useFetchNotification = (): INotification[] => {
  const getFetchNotification = async (): Promise<INotification[]> => {
    const response = await notificationAxiosInstance.get(
      `/notification?page=0&size=100`
    );
    return response.data.content;
  };

  const { data: notifications } = useSuspenseQuery({
    queryKey: ["fetchNotification"],
    queryFn: () => getFetchNotification(),
  });

  return notifications;
};
export const readNotification = async (notificationNo: number)  => {
  try {
    await notificationAxiosInstance.delete(
        `/notification/${notificationNo}`
    );
    return;
  } catch (error) {
    console.error("메뉴를 읽는데 실패하였습니다.", error);
  }
};