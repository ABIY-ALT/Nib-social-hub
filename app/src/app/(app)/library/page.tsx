import MediaLibrary from "../../../components/library/media-library";

export default function LibraryPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Media Library</h1>
        <p className="text-muted-foreground">
          Store, organize, and manage all your media assets in one place.
        </p>
      </div>
      <MediaLibrary />
    </div>
  );
}
