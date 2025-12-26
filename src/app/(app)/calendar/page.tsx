import CalendarView from "@/components/calendar/calendar-view";

export default function CalendarPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Content Calendar</h1>
        <p className="text-muted-foreground">
          View, manage, and organize your scheduled posts.
        </p>
      </div>

      <CalendarView />
    </div>
  );
}
