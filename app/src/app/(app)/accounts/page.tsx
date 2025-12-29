import AccountConnections from "@/components/settings/account-connections";

export default function AccountsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Social Accounts</h1>
        <p className="text-muted-foreground">
          Connect, manage, and view permissions for all your social media accounts.
        </p>
      </div>

      <AccountConnections />
    </div>
  );
}
