import React from 'react';
import Image from 'next/image';
import Background from '@/public/images/img4.jpg';

export default function OurStoryPage() {
  return (
    <main className="bg-[#ececec] min-h-screen">
      <div className="relative w-full" style={{ height: '25vh' }}>
        <Image
          src={Background}
          layout="fill"
          alt="image"
          style={{ objectFit: 'cover' }}
        />
      </div>
    </main>
  );
}