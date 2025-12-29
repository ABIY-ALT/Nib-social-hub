import data from './placeholder-images.json';

type PlaceholderImage = {
    id: string;
    description: string;
    imageUrl: string;
    imageHint: string;
}

const placeholderImages: PlaceholderImage[] = data.placeholderImages;
export { placeholderImages as PlaceHolderImages };

export type ImagePlaceholder = PlaceholderImage;
