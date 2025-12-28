import CampaignsList from "@/components/campaigns/campaigns-list";

export default function CampaignsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Campaigns</h1>
        <p className="text-muted-foreground">
          Manage and track your marketing campaigns.
        </p>
      </div>
      <CampaignsList />
    </div>
  );
}
