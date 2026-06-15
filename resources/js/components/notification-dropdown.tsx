import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BellIcon, TruckIcon, FileCheckIcon, BellRingIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNotifications } from '@/hooks/use-notifications';
import { router } from '@inertiajs/react';

const iconMap: Record<string, React.ReactNode> = {
    truck: <TruckIcon className="size-4" />,
    'file-check': <FileCheckIcon className="size-4" />,
    bell: <BellIcon className="size-4" />,
};

export function NotificationDropdown() {
    const { notifications, unreadCount, markRead, markAllRead } = useNotifications();

    const handleClick = (id: string, url: string, read: boolean) => {
        if (!read) markRead(id);
        router.visit(url);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button   // ← ganti jadi ini, bukan komponen Button dari shadcn
                    className="relative inline-flex items-center justify-center size-9 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                >
                    <BellIcon className="size-5" />
                    {unreadCount > 0 && (
                        <span className="absolute top-1.5 right-1.5 size-2.5 rounded-full bg-red-500 border-2 border-background" />
                    )}
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-80 p-0">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b">
                    <div className="flex items-center gap-2">
                        <BellRingIcon className="size-4 text-muted-foreground" />
                        <span className="font-semibold text-sm">Notifikasi</span>
                        {unreadCount > 0 && (
                            <span className="rounded-full bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 leading-none">
                                {unreadCount}
                            </span>
                        )}
                    </div>
                    {unreadCount > 0 && (
                        <button
                            onClick={markAllRead}
                            className="text-xs text-primary hover:underline"
                        >
                            Tandai semua dibaca
                        </button>
                    )}
                </div>

                {/* List */}
                <ScrollArea className="max-h-[360px]">
                    {notifications.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-10 text-muted-foreground gap-2">
                            <BellIcon className="size-8 opacity-30" />
                            <p className="text-sm">Belum ada notifikasi</p>
                        </div>
                    ) : (
                        notifications.map(notif => (
                            <button
                                key={notif.id}
                                onClick={() => handleClick(notif.id, notif.url, notif.read)}
                                className={cn(
                                    'w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-muted/50 transition-colors border-b last:border-0',
                                    !notif.read && 'bg-primary/5'
                                )}
                            >
                                <span className={cn(
                                    'mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full',
                                    notif.read ? 'bg-muted text-muted-foreground' : 'bg-primary/10 text-primary'
                                )}>
                                    {iconMap[notif.icon] ?? iconMap.bell}
                                </span>
                                <div className="flex-1 min-w-0">
                                    <p className={cn(
                                        'text-sm leading-snug',
                                        !notif.read && 'font-medium'
                                    )}>
                                        {notif.message}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-0.5">
                                        {notif.created_at}
                                    </p>
                                </div>
                                {!notif.read && (
                                    <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" />
                                )}
                            </button>
                        ))
                    )}
                </ScrollArea>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}