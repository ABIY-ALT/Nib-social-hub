'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Search,
  Upload,
  Image as ImageIcon,
  Video,
  Folder,
  MoreVertical,
  X,
  Tag,
  Clock,
  Info,
} from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Asset = {
  id: string;
  type: 'image' | 'video';
  name: string;
  url: string;
  thumbnail: string;
  tags: string[];
  uploadedAt: string;
  uploadedBy: string;
  usedIn: { post: string; platform: string; date: string }[];
};

const mockAssets: Asset[] = [
  {
    id: 'asset1',
    type: 'image',
    name: 'branch-opening.jpg',
    url: PlaceHolderImages.find((p) => p.id === 'media1')?.imageUrl || '',
    thumbnail: PlaceHolderImages.find((p) => p.id === 'media1')?.imageUrl || '',
    tags: ['event', 'new branch', 'grand opening'],
    uploadedAt: '2024-07-10',
    uploadedBy: 'Jane Doe',
    usedIn: [
      { post: 'Announcing our new branch!', platform: 'Facebook', date: '2024-07-11' },
      { post: 'Grand opening event photos', platform: 'Instagram', date: '2024-07-12' },
    ],
  },
  {
    id: 'asset2',
    type: 'image',
    name: 'mobile-app-promo.png',
    url: PlaceHolderImages.find((p) => p.id === 'media2')?.imageUrl || '',
    thumbnail: PlaceHolderImages.find((p) => p.id === 'media2')?.imageUrl || '',
    tags: ['promotion', 'mobile app', 'digital'],
    uploadedAt: '2024-07-08',
    uploadedBy: 'Alex Smith',
    usedIn: [{ post: 'Download our new app today!', platform: 'X', date: '2024-07-09' }],
  },
  {
    id: 'asset3',
    type: 'video',
    name: 'customer-testimonial.mp4',
    url: '#',
    thumbnail: PlaceHolderImages.find((p) => p.id === 'media3')?.imageUrl || '',
    tags: ['testimonial', 'customer story', 'video'],
    uploadedAt: '2024-07-05',
    uploadedBy: 'Maria Garcia',
    usedIn: [{ post: 'Hear from our happy customers', platform: 'YouTube', date: '2024-07-06' }],
  },
  {
    id: 'asset4',
    type: 'image',
    name: 'financial-planning-webinar.jpg',
    url: PlaceHolderImages.find((p) => p.id === 'media4')?.imageUrl || '',
    thumbnail: PlaceHolderImages.find((p) => p.id === 'media4')?.imageUrl || '',
    tags: ['webinar', 'finance', 'education'],
    uploadedAt: '2024-07-02',
    uploadedBy: 'Jane Doe',
    usedIn: [{ post: 'Join our free webinar!', platform: 'LinkedIn', date: '2024-07-03' }],
  },
  {
    id: 'asset5',
    type: 'image',
    name: 'office-culture.jpg',
    url: PlaceHolderImages.find((p) => p.id === 'postImage1')?.imageUrl || '',
    thumbnail: PlaceHolderImages.find((p) => p.id === 'postImage1')?.imageUrl || '',
    tags: ['team', 'culture', 'behind the scenes'],
    uploadedAt: '2024-06-28',
    uploadedBy: 'Alex Smith',
    usedIn: [],
  },
];

export default function MediaLibrary() {
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(mockAssets[0]);

  return (
    <div className="flex gap-6 items-start h-[calc(100vh-14rem)]">
      {/* Main content */}
      <div className="flex-grow h-full flex flex-col">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Search media..." className="pl-10" />
          </div>
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Upload Media
          </Button>
        </div>

        <Tabs defaultValue="all" className="flex flex-col flex-grow">
          <TabsList className="mb-4 self-start">
            <TabsTrigger value="all">All Media</TabsTrigger>
            <TabsTrigger value="images">
              <ImageIcon className="mr-2 h-4 w-4" /> Images
            </TabsTrigger>
            <TabsTrigger value="videos">
              <Video className="mr-2 h-4 w-4" /> Videos
            </TabsTrigger>
            <TabsTrigger value="folders">
              <Folder className="mr-2 h-4 w-4" /> Folders
            </TabsTrigger>
          </TabsList>
          
          <ScrollArea className="flex-grow -mx-4 px-4">
            <TabsContent value="all">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {mockAssets.map((asset) => (
                  <Card
                    key={asset.id}
                    onClick={() => setSelectedAsset(asset)}
                    className={cn(
                      'cursor-pointer overflow-hidden transition-all',
                      selectedAsset?.id === asset.id ? 'ring-2 ring-primary ring-offset-2' : 'hover:shadow-md'
                    )}
                  >
                    <CardContent className="p-0 aspect-square relative">
                      <Image
                        src={asset.thumbnail}
                        alt={asset.name}
                        fill
                        className="object-cover"
                        data-ai-hint="stock photo"
                      />
                      {asset.type === 'video' && (
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <Video className="h-8 w-8 text-white" />
                        </div>
                      )}
                      <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="absolute top-1 right-1 h-7 w-7 bg-black/20 hover:bg-black/50 text-white hover:text-white">
                                  <MoreVertical className="h-4 w-4" />
                              </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                              <DropdownMenuItem>Add to Campaign</DropdownMenuItem>
                              <DropdownMenuItem>Download</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">Delete Asset</DropdownMenuItem>
                          </DropdownMenuContent>
                      </DropdownMenu>
                    </CardContent>
                    <CardFooter className="p-2 bg-muted/50">
                      <p className="text-xs font-medium truncate" title={asset.name}>
                        {asset.name}
                      </p>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            {/* Other TabsContent would go here */}
          </ScrollArea>
        </Tabs>
      </div>

      {/* Details Sidebar */}
      {selectedAsset && (
        <Card className="w-full max-w-sm shrink-0 h-full flex flex-col">
          <div className="p-4 border-b flex items-center justify-between">
            <h3 className="font-headline font-semibold">Asset Details</h3>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setSelectedAsset(null)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <ScrollArea className="flex-grow">
            <CardContent className="p-0">
                <div className="aspect-video relative bg-muted">
                    <Image src={selectedAsset.url} alt={selectedAsset.name} fill className="object-contain" data-ai-hint="stock photo" />
                </div>
                <div className='p-4 space-y-4'>
                    <p className='font-semibold'>{selectedAsset.name}</p>
                    
                    <Separator />
                    
                    <div>
                        <h4 className='text-sm font-medium mb-2 flex items-center gap-2'><Info className="h-4 w-4" />Information</h4>
                        <div className='text-xs text-muted-foreground space-y-1'>
                            <p><strong>Uploaded:</strong> {selectedAsset.uploadedAt} by {selectedAsset.uploadedBy}</p>
                            <p><strong>Type:</strong> {selectedAsset.type}</p>
                        </div>
                    </div>

                    <div>
                        <h4 className='text-sm font-medium mb-2 flex items-center gap-2'><Tag className="h-4 w-4" />Tags</h4>
                        <div className="flex flex-wrap gap-2">
                            {selectedAsset.tags.map(tag => (
                                <Badge key={tag} variant="secondary">{tag}</Badge>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className='text-sm font-medium mb-2 flex items-center gap-2'><Clock className="h-4 w-4" />Usage History</h4>
                        {selectedAsset.usedIn.length > 0 ? (
                             <ul className='space-y-2 text-xs text-muted-foreground'>
                                {selectedAsset.usedIn.map((use, i) => (
                                    <li key={i} className='p-2 rounded bg-muted/50'>
                                        <p className='font-medium text-foreground truncate'>Used in "{use.post}"</p>
                                        <p>on {use.platform} - {use.date}</p>
                                    </li>
                                ))}
                             </ul>
                        ) : (
                            <p className='text-xs text-muted-foreground'>This asset has not been used in any posts yet.</p>
                        )}
                    </div>
                </div>
            </CardContent>
          </ScrollArea>
          <CardFooter className="p-4 border-t flex gap-2">
            <Button className='w-full'>Use in Post</Button>
            <Button variant="outline" className='w-full'>Edit Asset</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
