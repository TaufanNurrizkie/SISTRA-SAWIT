import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

interface Notification {
    id: string;
    message: string;
    icon: string;
    read: boolean;
    created_at: string;
    url: string;
}

export function useNotifications() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);

    const fetch = useCallback(async () => {
        try {
            const { data } = await axios.get('/notifications');
            setNotifications(data.notifications);
            setUnreadCount(data.unread_count);
        } catch (e) {
            console.error('Failed to fetch notifications', e);
        }
    }, []);

    const markRead = useCallback(async (id: string) => {
        await axios.post(`/notifications/${id}/read`);
        setNotifications(prev =>
            prev.map(n => n.id === id ? { ...n, read: true } : n)
        );
        setUnreadCount(prev => Math.max(0, prev - 1));
    }, []);

    const markAllRead = useCallback(async () => {
        await axios.post('/notifications/read-all');
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        setUnreadCount(0);
    }, []);

    useEffect(() => {
        fetch();
        const interval = setInterval(fetch, 30_000);
        return () => clearInterval(interval);
    }, [fetch]);

    return { notifications, unreadCount, markRead, markAllRead, refetch: fetch };
}