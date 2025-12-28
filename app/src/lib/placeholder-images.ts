import data from './placeholder-images.json';

type PlaceholderImage = {
    id: string;
    description: string;
    imageUrl: string;
    imageHint: string;
}

// This is a workaround for a bug in the type system.
// We are exporting the type as a value and then re-exporting it as a type.
const placeholderImages: PlaceholderImage[] = data.placeholderImages;
export { placeholderImages as PlaceHolderImages };

export type ImagePlaceholder = PlaceholderImage;
