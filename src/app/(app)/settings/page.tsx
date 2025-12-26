import AccountConnections from "@/components/settings/account-connections";
import NotificationSettings from "@/components/settings/notification-settings";
import ProfileSettings from "@/components/settings/profile-settings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, UserCircle, Bell } from "lucide-react";

export default function SettingsPage() {
    return (
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold font-headline">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account, connections, and notification preferences.
          </p>
        </div>

        <Tabs defaultValue="connections" className="flex flex-col md:flex-row gap-8">
            <TabsList className="flex flex-row md:flex-col h-auto md:h-full justify-start bg-transparent p-0 w-full md:w-48">
                <TabsTrigger value="connections" className="justify-start w-full">
                    <Users className="mr-2 h-4 w-4" />
                    Connections
                </TabsTrigger>
                <TabsTrigger value="profile" className="justify-start w-full">
                    <UserCircle className="mr-2 h-4 w-4" />
                    Profile
                </TabsTrigger>
                <TabsTrigger value="notifications" className="justify-start w-full">
                    <Bell className="mr-2 h-4 w-4" />
                    Notifications
                </TabsTrigger>
            </TabsList>

            <div className="flex-1">
                <TabsContent value="connections">
                    <AccountConnections />
                </TabsContent>
                <TabsContent value="profile">
                    <ProfileSettings />
                </TabsContent>
                <TabsContent value="notifications">
                    <NotificationSettings />
                </TabsContent>
            </div>
        </Tabs>
      </div>
    );
  }
