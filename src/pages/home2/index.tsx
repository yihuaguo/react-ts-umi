import React, { useEffect } from 'react';
import Image from '@/components/base_components/LazyImage';

const Home2: React.FC = (props: any) => {
  const list: any[] = [
    'https://bafybeidsavqmjegxjffcidrngjcd6nadkzkyidrqz3osarr3mlvuff3i4y.ipfs.nftstorage.link/1.png',
    'https://bafybeidsavqmjegxjffcidrngjcd6nadkzkyidrqz3osarr3mlvuff3i4y.ipfs.nftstorage.link/2.png',
    'https://bafybeidsavqmjegxjffcidrngjcd6nadkzkyidrqz3osarr3mlvuff3i4y.ipfs.nftstorage.link/3.png',
  ];

  return (
    <div>
      {list?.map((v) => {
        return (
          <div key={v} className="note-book_img">
            <Image
              src={v}
              alt={''}
              style={{ height: 200, width: 400, marginLeft: 20 }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Home2;
