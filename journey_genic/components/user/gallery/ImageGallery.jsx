'use client';
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import galleryData from '@/public/data/gallery.json';
const ImageGallery = () => {
    console.log("gallery data", galleryData);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const handleImageLoad = () => {
        setIsLoading(false);
    };

    // Split images into 3 columns for masonry layout
    const columns = [[], [], []];
    galleryData.images.forEach((image, index) => {
        columns[index % 3].push(image);
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-white mb-8 text-center">
                    Image Gallery
                </h1>

                {/* Masonry Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {columns.map((column, columnIndex) => (
                        <div key={columnIndex} className="flex flex-col gap-6">
                            {column.map((image, imageIndex) => (
                                <Card
                                    key={imageIndex}
                                    className="group relative overflow-hidden rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                                    onClick={() => setSelectedImage(image)}
                                >
                                    <div className="aspect-w-1 aspect-h-1">
                                        <img
                                            src={image}
                                            alt={`Gallery image ${columnIndex * 3 + imageIndex + 1}`}
                                            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                                            onLoad={handleImageLoad}
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                                            <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                View
                                            </span>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    ))}
                </div>

                {/* Modal for larger image view */}
                <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
                    <DialogContent className="max-w-4xl bg-black/80 border-none">
                        {/* Add DialogTitle for accessibility */}
                        <DialogTitle className="sr-only">Selected Image</DialogTitle>
                        <img
                            src={selectedImage}
                            alt="Selected gallery image"
                            className="w-full h-full object-contain"
                        />
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default ImageGallery;