import React, { useEffect, useState } from 'react'
import { COUPONS_HISTORY } from '@/configs/api-path'
import { FaExclamationTriangle } from 'react-icons/fa'
import { IoTicketOutline } from 'react-icons/io5'

export default function CouponTest() {
  //要來接之後後端來的折價卷資料的
  const [coupons, setCoupons] = useState({
    m_id: 0,
    member_name: '',
    coupons_sentDate: '',
    coupons_maxAge: '',
    coupons_sample_price: 0,
    coupons_explain: '',
    car_id: '',
  })
  const [message, setMessage] = useState('') //有折價卷就是空，沒折價卷後端會丟訊息過來

  // ******先暫時寫一個手送送出會員，之後要用session*****
  const [memberId, setMemberId] = useState(0)

  const [error, setError] = useState('')

  // useEffect(() => {
  //   if (memberId) {
  //     fetch(`${COUPONS_HISTORY}/${memberId}`)
  //       .then((r) => r.json())
  //       .then((data) => {
  //         setCoupons(data)
  //         setMessage(data.message || '')
  //         setError('')
  //       })
  //       .catch((err) => {
  //         setError(err.message || 'Failed to fetch session')
  //       })
  //   }
  // }, [])
  useEffect(() => {
    if (memberId) {
      fetch(`${COUPONS_HISTORY}/${memberId}`)
        .then((r) => r.json())
        .then((data) => {
          // 假設後端返回的 data.result 是一個陣列
          if (Array.isArray(data.result)) {
            setCoupons(data.result)
            console.log(data.result)
          } else {
            // 如果 data.result 不是陣列，包裝成陣列
            setCoupons([data.result])
          }
          setMessage(data.message || '')
          setError('')
        })
        .catch((err) => {
          setError(err.message || 'Failed to fetch session')
          setCoupons({
            m_id: 0,
            member_name: '',
            coupons_sentDate: '',
            coupons_maxAge: '',
            coupons_sample_price: 0,
            coupons_explain: '',
            car_id: '',
          })
          setMessage('')
        })
    }
  }, [memberId])

  //之後有session 就不需要它了!!!因為現在要手動!!*****
  const handleSubmit = (e) => {
    e.preventDefault()
    // 設置 memberId 為表單輸入的值，這將觸發 useEffect
    setMemberId(e.target.elements.memberId.value)
  }

  return (
    <>
      {/* 暫時的!! */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="memberId"
          value={memberId}
          onChange={(e) => setMemberId(e.target.value)}
        />
        <button onClick={() => {}}>查詢折價卷</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p>{message}</p>}
      {/* 暫時的 */}
      <div className="container">
        <div className="row m-2">
          {coupons.length > 0 ? (
            coupons.map((v, i) => {
              return (
                <div key={i} className="col-lg-6 col-sm-12 mt-2">
                  <div className="couponsBg">
                    <div className="coupons">
                      <img alt="" className="logo" src="/logo-gold.png" />
                      <div className="couponsCard">
                        <div>電子折價卷</div>
                        <div>
                          折價
                          <span className="money">
                            {v.coupons_sample_price}元
                          </span>
                        </div>
                        {new Date(v.coupons_maxAge) < new Date() ? (
                          <div className="coupon_world">
                            <FaExclamationTriangle />
                            折價卷已過期，無法使用
                          </div>
                        ) : (
                          ''
                        )}
                        {v.car_id !== null ? (
                          <div className="coupon_world">
                            {' '}
                            <IoTicketOutline />
                            折價卷已使用
                          </div>
                        ) : (
                          ''
                        )}
                        {/* <div className="coupon_world">折價卷已使用</div> */}
                      </div>
                      <div className="limit">
                        使用期限: {v.coupons_sentDate} ~ {v.coupons_maxAge} 止
                      </div>
                      <div className="limit">
                        使用限制:
                        消費金額需滿額1000元以上即可使用，限線上購物使用。
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div>{message}</div>
          )}
        </div>
      </div>
      <style jsx>
        {`
          .couponsBg {
            width: 300px;
            background: #4a9c7a56;
            border-radius: 5px;
          }
          .coupons {
            text-align: center;
          }
          .logo {
            margin-bottom: 20px;
            height: 3rem;
          }
          .couponsCard {
            margin-right: 20px;
            margin-left: 20px;
            background: #ffffff;
            font-size: 24px;
            font-weight: bolder;
          }

          .money {
            color: red;
          }
          .coupon_world {
            font-size: 12px;
            color: red;
          }
          .limit {
            text-align: left;
            margin-top: 5px;
            font-size: 10px;
          }
          .hidden {
            display: none;
          }
          .open {
            display: block;
          }
          @media screen and (max-width: 768px) {
            .couponsBg {
              width: 200px;
              background: #4a9c7a56;
              border-radius: 5px;
            }
            .coupons {
              text-align: center;
            }
            .iconBg {
              cursor: pointer;
              display: flex;
              justify-content: right;
            }
            .logo {
              margin-bottom: 20px;
              height: 2rem;
            }
            .couponsCard {
              margin-right: 20px;
              margin-left: 20px;
              background: #ffffff;
              font-size: 16px;
              font-weight: bolder;
            }

            .money {
              color: red;
            }
            .limit {
              text-align: left;
              margin-top: 5px;
              font-size: 10px;
            }
          }
        `}
      </style>
    </>
  )
}
