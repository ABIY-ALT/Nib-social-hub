import InboxLayout from "@/components/inbox/inbox-layout";

export default function InboxPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Unified Inbox</h1>
        <p className="text-muted-foreground">
          Manage all your messages, comments, and mentions in one place.
        </p>
      </div>

      <InboxLayout />
    </div>
  );
}
