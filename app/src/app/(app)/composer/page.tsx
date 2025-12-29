import ComposerCard from "@/components/composer/composer-card";

export default function ComposerPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Content Composer</h1>
        <p className="text-muted-foreground">
          Create, review, and schedule your next social media masterpiece.
        </p>
      </div>

      <ComposerCard />
    </div>
  );
}
