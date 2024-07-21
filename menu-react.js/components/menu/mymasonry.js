import { useEffect, useState } from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

const images = [
  '/test/DSC00574.jpg',
  '/test/DSC00576.jpg',
  '/test/DSC00596.jpg',
  '/test/DSC00644.jpg',
  '/test/DSC00593.jpg',
  '/test/DSC00691.jpg',
  '/test/DSC00610.jpg',
  '/test/DSC00701.jpg',
  '/test/DSC00567.jpg',
  '/test/DSC00585.jpg',

  // 更多圖片路徑
]

export default function Mymasonry() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null // 只在客戶端渲染時顯示
  }

  return (
    <div style={{ padding: '20px' }}>
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 5, 750: 5, 900: 5 }}>
        <Masonry gutter="10px">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              style={{
                width: '100%',
                height: 'auto',
              }}
              alt={`Gallery Image ${index + 1}`}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  )
}
