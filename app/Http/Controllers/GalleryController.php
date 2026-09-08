<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;

class GalleryController extends Controller
{
    private $imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif', 'svg', 'bmp', 'ico', 'tiff', 'tif'];
    
    public function index()
    {
        return Inertia::render('Gallery');
    }
    
    public function getImages()
    {
        $directory = public_path('pic');
        $images = [];
        
        if (!File::exists($directory)) {
            return response()->json(['error' => 'Directory not found'], 404);
        }
        
        $files = File::files($directory);
        
        foreach ($files as $file) {
            $extension = strtolower($file->getExtension());
            
            // Check if file has a valid image extension
            if (in_array($extension, $this->imageExtensions)) {
                $images[] = [
                    'name' => $file->getFilename(),
                    'url' => asset('pic/' . $file->getFilename()),
                    'extension' => $extension,
                    'size' => $file->getSize(),
                    'modified' => $file->getMTime()
                ];
            }
        }
        
        // Sort by name
        usort($images, function($a, $b) {
            return strnatcasecmp($a['name'], $b['name']);
        });
        
        return response()->json($images);
    }
}