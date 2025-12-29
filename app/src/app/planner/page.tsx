import CalendarView from "@/components/calendar/calendar-view";

export default function PlannerPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Content Planner</h1>
        <p className="text-muted-foreground">
          Plan, schedule, and organize your social media content.
        </p>
      </div>

      <CalendarView />
    </div>
  );
}
