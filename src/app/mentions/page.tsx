import RecentMentions from "@/components/dashboard/recent-mentions";

export default function MentionsPage() {
    return (
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold font-headline">Mentions & Listening</h1>
          <p className="text-muted-foreground">
            Monitor what people are saying about your brand across all platforms.
          </p>
        </div>
        
        <RecentMentions />
      </div>
    );
  }
