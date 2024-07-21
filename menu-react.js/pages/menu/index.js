import { useState, useEffect } from 'react'
import MenuNav from '@/components/menu/menu-nav'
import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/menu.module.scss'
import DefaultLayout from '@/components/layout/default-layout'
import Cooker from '@/components/menu/cooker'
import animate from 'animate.css'
import Mymasonry from '@/components/menu/mymasonry'
import Loader from '@/components/loader'

export default function IndexTest() {
  const [isLoader, setIsLoader] = useState(true)
  const [data, setData] = useState(null)

  useEffect(() => {
    // 模擬從本地讀取資料
    const localData = [
      {
        href: '/menu/one',
        image: '/menuCard/menuCard-one.webp',
        alt: '單點',
        text: '單 點',
      },
      {
        href: '/menu/combo',
        image: '/menuCard/menuCard-combo.webp',
        alt: '經典合菜',
        text: '經 典 合 菜',
      },
      {
        href: '/menu/bento',
        image: '/menuCard/menuCard-bento.webp',
        alt: '精緻便當',
        text: '精 緻 便 當',
      },
      {
        href: '/menu/dessert',
        image: '/menuCard/menuCard-cake.webp',
        alt: '手工甜點',
        text: '手 工 甜 點',
      },
      {
        href: '/menu/drink',
        image: '/menuCard/menuCard-drinks.webp',
        alt: '飲品',
        text: '飲 品',
      },
      {
        href: '/menu/liquor',
        image: '/menuCard/menuCard-drinks.webp',
        alt: '酒精飲品',
        text: '酒 精 飲 品',
      },
    ]
    setTimeout(() => {
      setData(localData)
      setIsLoader(false)
    }, 8000) // 模擬延遲
  }, [])

  return (
    <>
      {' '}
      {isLoader ? (
        <Loader />
      ) : (
        <>
          <DefaultLayout>
            <Mymasonry />
            <div className="container mt-5 mb-5">
              <MenuNav />
              <div className="row align-items-center text-center g-2">
                {/* 顯示資料 */}
                {data &&
                  data.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className="col-lg-3 col-md-6 col-sm-12"
                      style={{ textDecorationLine: 'none' }}
                    >
                      <div
                        className={`card card-width ${styles.cardHover}`}
                        style={{ margin: 'auto', marginBottom: '0.5rem' }}
                      >
                        <Image
                          src={item.image}
                          className="card-img-top"
                          width={268}
                          height={190}
                          alt={item.alt}
                        />
                        <div className="card-body">
                          <div
                            className="card"
                            style={{
                              textDecorationLine: 'none',
                              backgroundColor: 'rgb(226, 186, 133)',
                              fontWeight: 'bolder',
                              fontSize: '16px',
                            }}
                          >
                            {item.text}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
            <Cooker />
            {/* css-jsx */}
            <style jsx>
              {`
                .card-width {
                  width: 18rem;
                  @media screen and (max-width: 1280px) {
                    width: 15rem;
                  }
                }
                .my-element {
                  --animate-duration: 2s;
                }
              `}
            </style>
          </DefaultLayout>
        </>
      )}
    </>
  )
}
