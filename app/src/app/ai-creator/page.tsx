import AiCreatorForm from "@/components/ai-creator/ai-creator-form";

export default function AiCreatorPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">AI Content Creator</h1>
        <p className="text-muted-foreground">
          Generate engaging social media posts tailored to your goals and brand voice.
        </p>
      </div>

      <AiCreatorForm />
    </div>
  );
}
