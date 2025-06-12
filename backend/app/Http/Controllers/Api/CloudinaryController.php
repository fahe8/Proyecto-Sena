<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Cloudinary\Configuration\Configuration;
use Cloudinary\Api\Upload\UploadApi;
use Cloudinary\Api\Admin\AdminApi;
use Illuminate\Support\Facades\Validator;

class CloudinaryController extends ApiController
{
    protected $cloudinary;
    protected $adminApi;

    public function __construct()
    {
        // Configura Cloudinary con tus credenciales
        Configuration::instance([
            'cloud' => [
                'cloud_name' => env('CLOUDINARY_CLOUD_NAME'),
                'api_key' => env('CLOUDINARY_API_KEY'),
                'api_secret' => env('CLOUDINARY_API_SECRET')
            ],
            'url' => [
                'secure' => true
            ]
        ]);

        $this->cloudinary = new UploadApi();
        $this->adminApi = new AdminApi();
    }

    public function uploadImage(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'image' => 'required|image|max:2048',
                'folder' => 'nullable|string'
            ]);
    
            if ($validator->fails()) {
                return $this->sendError('Error de validación', $validator->errors(), 422);
            }
    
            // Definir la carpeta base
            $baseFolder = 'micanchaya';
    
            // Si se envía una subcarpeta, concatenarla
            $folder = $request->filled('folder')
                ? $baseFolder . '/' . trim($request->input('folder'))
                : $baseFolder;
    
            // Subida a Cloudinary
            $result = $this->cloudinary->upload($request->file('image')->getRealPath(), [
                'folder' => $folder
            ]);
    
            return $this->sendResponse([
                'url' => $result['secure_url'],
                'public_id' => $result['public_id']
            ], 'Imagen subida exitosamente', 201);
        } catch (\Exception $e) {
            return $this->sendError('Error al subir la imagen', [$e->getMessage()], 500);
        }
    }
    

    public function uploadMultipleImages(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'images' => 'required|array',
                'images.*' => 'image|max:2048',
                'folder' => 'nullable|string'
            ]);
    
            if ($validator->fails()) {
                return $this->sendError('Error de validación', $validator->errors(), 422);
            }
    
            // Definir la carpeta base
            $baseFolder = 'micanchaya';
    
            // Si se envía una subcarpeta, concatenarla
            $folder = $request->filled('folder')
                ? $baseFolder . '/' . trim($request->input('folder'))
                : $baseFolder;
    
            $uploadedImages = [];
    
            foreach ($request->file('images') as $image) {
                $result = $this->cloudinary->upload($image->getRealPath(), [
                    'folder' => $folder
                ]);
    
                $uploadedImages[] = [
                    'url' => $result['secure_url'],
                    'public_id' => $result['public_id']
                ];
            }
    
            return $this->sendResponse($uploadedImages, 'Imágenes subidas exitosamente', 201);
        } catch (\Exception $e) {
            return $this->sendError('Error al subir las imágenes', [$e->getMessage()], 500);
        }
    }
    

    public function deleteImages(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'public_ids' => 'required|array',
                'public_ids.*' => 'string'
            ]);

            if ($validator->fails()) {
                return $this->sendError('Error de validación', $validator->errors(), 422);
            }

            $result = $this->adminApi->deleteAssets($request->public_ids);

            return $this->sendResponse(
                $result->getArrayCopy(),
                'Imágenes eliminadas exitosamente',
                200
            );
        } catch (\Exception $e) {
            return $this->sendError('Error al eliminar las imágenes', [$e->getMessage()], 500);
        }
    }
}
