import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

const notificationTypes = [
    { id: "mentions", label: "New Mentions", description: "Get notified when your brand is mentioned.", defaultChecked: true },
    { id: "comments", label: "New Comments", description: "Receive notifications for comments on your posts.", defaultChecked: true },
    { id: "trends", label: "New Trends Identified", description: "Alerts when the AI detects a new trending topic.", defaultChecked: false },
    { id: "insights", label: "Weekly AI Insights", description: "A weekly summary of performance and recommendations.", defaultChecked: true },
    { id: "approvals", label: "Post Approval Requests", description: "Notifications for posts awaiting your approval.", defaultChecked: true },
];

export default function NotificationSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Notifications</CardTitle>
        <CardDescription>Choose what you want to be notified about.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {notificationTypes.map(notification => (
            <div key={notification.id} className="flex items-center justify-between p-3 rounded-lg border">
                <div>
                    <p className="font-medium">{notification.label}</p>
                    <p className="text-sm text-muted-foreground">{notification.description}</p>
                </div>
                <Switch id={notification.id} defaultChecked={notification.defaultChecked} />
            </div>
        ))}
      </CardContent>
    </Card>
  );
}
