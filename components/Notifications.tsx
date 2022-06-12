import { HMSNotification, HMSNotificationTypes, useHMSNotifications } from '@100mslive/react-sdk';
import { useEffect, useState } from 'react';

type INotificationType = 'normal' | 'error' | 'warning' | 'success' | 'info';
type INotification = {
    type: INotificationType,
    message: string,
}
export default function Notifications() {
    const notification = useHMSNotifications();
    const [newNotification, setNewNotification] = useState<INotification | null>(null);
    const [showNotification, setShowNotification] = useState<boolean>(false);

    useEffect(() => {
        if (!notification) {
            return;
        }
        console.log(notification)
        // you can use the following to show appropriate toast notifications for eg.
        switch (notification.type) {
            case HMSNotificationTypes.PEER_JOINED:
                setNewNotification({
                    type: 'info',
                    message: `${notification.data.name} joined`,
                })
                break;
            case HMSNotificationTypes.PEER_LEFT:
                setNewNotification({
                    type: 'normal',
                    message: `${notification.data.name} left`,
                })
                break;
            case HMSNotificationTypes.NEW_MESSAGE:
                // setNewNotification({
                //     type: 'normal',
                //     message: `${notification.data.message} received from ${notification.data.senderName}`,
                // })
                break;
            case HMSNotificationTypes.ERROR:
                console.log('[Error]', notification.data);
                console.log('[Error Code]', notification.data.code);
                setNewNotification({
                    type: 'error',
                    message: `Unknown error occured: ${notification.data.code}`,
                })
                break;
            case HMSNotificationTypes.RECONNECTING:
                console.log('[Reconnecting]', notification.data);
                setNewNotification({
                    type: 'warning',
                    message: `Reconnecting...`,
                })
                break;
            case HMSNotificationTypes.RECONNECTED:
                console.log('[Reconnected]');
                setNewNotification({
                    type: 'success',
                    message: `Reconnected!`,
                })
                break;
            case HMSNotificationTypes.NAME_UPDATED:
            case HMSNotificationTypes.METADATA_UPDATED:
            case HMSNotificationTypes.ROLE_UPDATED:
                break;
            case HMSNotificationTypes.TRACK_DEGRADED:
                setNewNotification({
                    type: 'warning',
                    message: `quality degraded due to poor network`,
                })
                break;
            case HMSNotificationTypes.TRACK_RESTORED:
                setNewNotification({
                    type: 'success',
                    message: `quality recovered`,
                })
                break;
            case HMSNotificationTypes.ROOM_ENDED:
                setNewNotification({
                    type: 'error',
                    message: `Room has Ended!`,
                })
                break;
            case HMSNotificationTypes.REMOVED_FROM_ROOM:
                setNewNotification({
                    type: 'error',
                    message: `you have been removed from the room`,
                })
                break;
            case HMSNotificationTypes.DEVICE_CHANGE_UPDATE:
                console.log(`device changed - ${notification.data}`);
                break;
            default:
                break;
        }
    }, [notification]);

    const closeNotification = () => {
        setShowNotification(false)
    }

    useEffect(() => {
        setShowNotification(true)
        const timer = setTimeout(() => {
            setShowNotification(false)
        }, 3000);
        return () => clearTimeout(timer);
    }, [newNotification]);

    return (
        <div 
            className={
                `absolute top-2 left-1/2 px-4 py-2
                z-50
                notificationBar ${showNotification && newNotification?.message ? "active" : "inactive"}
                border border-gray-300
                dark:bg-gray-600 dark:text-white rounded-md shadow-md
                flex items-center justify-center max-w-3xl overflow-hidden     
                ${newNotification?.type === 'error' ? 'bg-red-500 dark:bg-red-500 text-white' : ''}
                ${newNotification?.type === 'warning' ? 'bg-yellow-500 dark:bg-yellow-500 text-white' : ''}
                ${newNotification?.type === 'success' ? 'bg-green-500 dark:bg-green-500 text-white' : ''}
                ${newNotification?.type === 'info' ? 'bg-blue-500 dark:bg-blue-500 text-white' : ''}
            `}>
            <div className='max-w-xl text-ellipsis overflow-hidden'>{newNotification?.message}</div>
            <button className='ml-1 cursor-pointer' onClick={closeNotification}>
                <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 20 20'>
                    <path d='M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z' />
                </svg>
            </button>
        </div>
    );
}
