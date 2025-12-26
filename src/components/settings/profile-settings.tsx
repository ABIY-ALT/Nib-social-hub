import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function ProfileSettings() {
    const userAvatar = PlaceHolderImages.find(img => img.id === 'user1');

    return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Profile</CardTitle>
        <CardDescription>Manage your personal information and profile picture.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-6">
            <Avatar className="h-20 w-20">
                {userAvatar && <AvatarImage src={userAvatar.imageUrl} data-ai-hint={userAvatar.imageHint}/>}
                <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-2">
                <Button>Change Picture</Button>
                <p className="text-xs text-muted-foreground">JPG, GIF or PNG. 1MB max.</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue="Jane Doe" />
            </div>
             <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="jane.doe@bank.com" />
            </div>
             <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input id="role" defaultValue="Social Media Manager" disabled />
            </div>
             <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <Input id="password" type="password" placeholder="••••••••" />
            </div>
        </div>
        <div className="flex justify-end">
            <Button>Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  );
}
