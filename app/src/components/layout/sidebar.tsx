'use client';

import {
  LayoutDashboard,
  Users,
  CalendarDays,
  PenSquare,
  Inbox,
  AtSign,
  BarChart3,
  Target,
  UserCheck,
  FolderKanban,
  Settings,
  Bot,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarFooter,
  SidebarMenuBadge,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const links = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/accounts', label: 'Social Accounts', icon: Users },
  { href: '/planner', label: 'Content Planner', icon: CalendarDays },
  { href: '/composer', label: 'Post Composer', icon: PenSquare },
  { href: '/inbox', label: 'Inbox', icon: Inbox, badge: '12' },
  { href: '/mentions', label: 'Mentions & Listening', icon: AtSign },
  { href: '/ai-creator', label: 'AI Content Creator', icon: Sparkles },
  { href: '/ai-risk-check', label: 'AI Content Risk Check', icon: ShieldCheck },
  { href: '/analytics', label: 'Analytics & Reports', icon: BarChart3 },
  { href: '/campaigns', label: 'Campaigns', icon: Target },
  { href: '/team', label: 'Team & Approvals', icon: UserCheck },
  { href: '/library', label: 'Media Library', icon: FolderKanban },
];

const settingsLink = { href: '/settings', label: 'Settings', icon: Settings };
const userAvatar = PlaceHolderImages.find(img => img.id === 'user1');

// Mock user role
const userRole = 'Admin'; 

export default function AppSidebar() {
  const pathname = usePathname();

  const isVisible = (item: any) => {
    if (!item.roles) return true;
    return item.roles.includes(userRole);
  }

  const checkActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/' || pathname === '/dashboard';
    return pathname.startsWith(href);
  }

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Bot className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-semibold text-primary">BankSocialAI</h1>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {links.filter(isVisible).map((link) => (
            <SidebarMenuItem key={link.href}>
              <SidebarMenuButton
                asChild
                isActive={checkActive(link.href)}
                tooltip={link.label}
              >
                <Link href={link.href}>
                  <link.icon />
                  <span>{link.label}</span>
                  {link.badge && <SidebarMenuBadge>{link.badge}</SidebarMenuBadge>}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname.startsWith(settingsLink.href)}
              tooltip={settingsLink.label}
            >
              <Link href={settingsLink.href}>
                <settingsLink.icon />
                <span>{settingsLink.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg" tooltip="Profile">
              <Link href="/settings">
                <Avatar className="size-8">
                  {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt="User Avatar" data-ai-hint={userAvatar.imageHint} />}
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-medium">Jane Doe</span>
                  <span className="text-xs text-muted-foreground">jane.doe@example.com</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
