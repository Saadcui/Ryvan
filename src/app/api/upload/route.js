import { NextResponse } from 'next/server';
import { adminOnly } from '@/middleware/admin';
import { uploadImageBuffer } from '@/lib/cloudinary';

const MAX_FILE_SIZE = 2 * 1024 * 1024;

export async function POST(request) {
  try {
    const admin = adminOnly(request);
    if (admin && typeof admin.status === 'number') return admin;

    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      return NextResponse.json(
        { success: false, error: 'Cloudinary environment variables are missing.' },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || typeof file === 'string') {
      return NextResponse.json({ success: false, error: 'No file provided.' }, { status: 400 });
    }

    if (!file.type?.startsWith('image/')) {
      return NextResponse.json({ success: false, error: 'Only image files are allowed.' }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ success: false, error: 'Image must be 2MB or smaller.' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const uploadResult = await uploadImageBuffer(Buffer.from(arrayBuffer), {
      public_id: `${Date.now()}-${file.name?.replace(/\.[^/.]+$/, '') || 'product'}`,
    });

    return NextResponse.json({
      success: true,
      data: {
        url: uploadResult.secure_url,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Image upload failed.' },
      { status: 500 }
    );
  }
}