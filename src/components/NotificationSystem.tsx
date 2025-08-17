import { useState } from "react";
import { Bell, X, Check, Calendar, Pill, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const notifications = [
  {
    id: 1,
    type: "medication",
    title: "Medication Reminder",
    message: "Time to take your Lisinopril 10mg",
    time: "5 minutes ago",
    read: false,
    icon: Pill
  },
  {
    id: 2,
    type: "appointment",
    title: "Upcoming Appointment",
    message: "Dr. Wilson - Tomorrow at 2:00 PM",
    time: "2 hours ago",
    read: false,
    icon: Calendar
  },
  {
    id: 3,
    type: "message",
    title: "New Message",
    message: "Dr. Chen sent you test results",
    time: "1 day ago",
    read: true,
    icon: MessageCircle
  }
];

interface NotificationSystemProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export default function NotificationSystem({ isOpen, onClose, className = "" }: NotificationSystemProps) {
  const [notificationList, setNotificationList] = useState(notifications);
  
  const unreadCount = notificationList.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotificationList(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotificationList(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const removeNotification = (id: number) => {
    setNotificationList(prev => prev.filter(n => n.id !== id));
  };

  if (!isOpen) return null;

  return (
    <div className={`absolute right-0 top-full mt-2 w-80 z-50 ${className}`}>
      <Card className="shadow-medical-lg border-border bg-card">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Notifications</h3>
            <div className="flex items-center space-x-2">
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-xs"
                >
                  Mark all read
                </Button>
              )}
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <ScrollArea className="max-h-96">
          <div className="p-2">
            {notificationList.length === 0 ? (
              <div className="text-center py-8">
                <Bell className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">No notifications</p>
              </div>
            ) : (
              <div className="space-y-2">
                {notificationList.map((notification) => {
                  const IconComponent = notification.icon;
                  return (
                    <div
                      key={notification.id}
                      className={`p-3 rounded-lg transition-all cursor-pointer ${
                        notification.read 
                          ? "bg-muted/30 hover:bg-muted/50" 
                          : "bg-primary/10 hover:bg-primary/15 border border-primary/20"
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-full ${
                          notification.read ? "bg-muted" : "bg-primary/20"
                        }`}>
                          <IconComponent className="h-4 w-4 text-primary" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-sm truncate">
                              {notification.title}
                            </h4>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 opacity-0 group-hover:opacity-100"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeNotification(notification.id);
                              }}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {notification.time}
                          </p>
                        </div>
                        
                        {!notification.read && (
                          <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
}

export { NotificationSystem };