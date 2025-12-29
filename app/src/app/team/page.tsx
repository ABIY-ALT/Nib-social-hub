import ApprovalWorkflowCard from "@/components/team/approval-workflow-card";
import PendingApprovalsQueue from "@/components/team/pending-approvals-queue";
import TeamMembersCard from "@/components/team/team-members-card";

export default function TeamPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Team & Approvals</h1>
        <p className="text-muted-foreground">
          Manage team members, roles, and approval workflows.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <PendingApprovalsQueue />
        </div>
        <div className="lg:col-span-1 space-y-8">
            <TeamMembersCard />
            <ApprovalWorkflowCard />
        </div>
      </div>
    </div>
  );
}
