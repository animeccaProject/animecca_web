import Image from 'next/image'
import pic1 from '../../public/01.png'
import pic2 from '../../public/02.png'
import pic3 from '../../public/03.png'
import pic4 from '../../public/04.png'
import pic5 from '../../public/05.png'
import pic6 from '../../public/06.png'
import pic7 from '../../public/07.png'
import pic8 from '../../public/08.png'
import pic9 from '../../public/09.png'
import pic10 from '../../public/10.png'
import pic11 from '../../public/11.png'
import pic12 from '../../public/12.png'
import pic13 from '../../public/13.png'
import pic14 from '../../public/14.png'
import pic15 from '../../public/15.png'
import serch from '../../public/serch.png'

import Link from 'next/link'
import localImage from '../../public/1026428.jpg'
import styles from '../app/styles/Home.module.css'

const Home = () => {
  return (
    <div className={styles.animeccaMap}>
      <div>
        <h1 className={styles.title}>日本地図から探す</h1>
        <div>
          <Image class={styles.japanMap} src={localImage} />
        </div>
        {/*北海道*/}
        <div className={styles.japanMapAreaHokkaido}>
          <a>北海道</a>
          <ul className={styles.animeccaMapListHokkaido}>
            <li className={styles.animeccaMapItem}>
              <a className={styles.animeccaMapItemPrefecture} href="#">
                道央
              </a>
            </li>
            <li className={styles.animeccaMapItem}>
              <a className={styles.animeccaMapItemPrefecture} href="#">
                道南
              </a>
            </li>
            <li className={styles.animeccaMapItem}>
              <a className={styles.animeccaMapItemPrefecture} href="#">
                道北
              </a>
            </li>
            <li className={styles.animeccaMapItem}>
              <a className={styles.animeccaMapItemPrefecture} href="#">
                道東
              </a>
            </li>
          </ul>
        </div>
        {/* 東北*/}
        <div className={styles.japanMapAreaTohoku}>
          <a>東北</a>
          <ul className={styles.animeccaMapListTohoku}>
            <li className={styles.animeccaMapItem}>
              <a href="#">福島県</a>
            </li>
            <li className={styles.animeccaMapItem}>
              <a href="#">山形県</a>
            </li>
            <li className={styles.animeccaMapItem}>
              <a href="#">秋田県</a>
            </li>
            <li className={styles.animeccaMapItem}>
              <a href="#">宮城県</a>
            </li>
            <li className={styles.animeccaMapItem}>
              <a href="#">岩手県</a>
            </li>
            <li className={styles.animeccaMapItem}>
              <a href="#">青森県</a>
            </li>
          </ul>
        </div>
        {/*関東*/}
        <div className={styles.japanMapAreaKanto}>
          <a>関東</a>
          <ul className={styles.animeccaMapListKanto}>
            <li className={styles.animeccaMapItem}>
              <a href="/prefecture/東京都">東京都</a>
            </li>
            <li className={styles.animeccaMapItem}>
              <a href="#">神奈川県</a>
            </li>
            <li className={styles.animeccaMapItem}>
              <a href="#">千葉県</a>
            </li>
            <li className={styles.animeccaMapItem}>
              <a href="#">埼玉県</a>
            </li>
            <li className={styles.animeccaMapItem}>
              <a href="#">茨城県</a>
            </li>
            <li className={styles.animeccaMapItem}>
              <a href="#">栃木県</a>
            </li>
            <li className={styles.animeccaMapItem}>
              <a href="#">群馬県</a>
            </li>
          </ul>
        </div>
        {/*東海*/}
        <div className={styles.japanMapAreaTokai}>
          <a>東海</a>
          <ul className={styles.animeccaMapListTokai}>
            <li className={styles.animeccaMapItem}>
              <a href="#">三重県</a>
            </li>
            <li className={styles.animeccaMapItem}>
              <a href="#">愛知県</a>
            </li>
            <li className={styles.animeccaMapItem}>
              <a href="#">静岡県</a>
            </li>
            <li className={styles.animeccaMapItem}>
              <a href="#">岐阜県</a>
            </li>
          </ul>
        </div>
        {/*北信越*/}
        <div className={styles.japanMapAreaHokushinetsu}>
          <a>北信越</a>
          <ul className={styles.animeccaMapListHokushinetsu}>
            <li className={styles.animeccaMapItem}>
              <a href="#">長野県</a>
            </li>
            <li className={styles.animeccaMapItem}>
              <a href="#">山梨県</a>
            </li>
            <li className={styles.animeccaMapItem}>
              <a href="#">新潟県</a>
            </li>
            <li className={styles.animeccaMapItem}>
              <a href="#">福井県</a>
            </li>
            <li className={styles.animeccaMapItem}>
              <a href="#">石川県</a>
            </li>
            <li className={styles.animeccaMapItem}>
              <a href="#">富山県</a>
            </li>
          </ul>
        </div>
        {/*関西*/}
        <div className={styles.japanMapAreaKansai}>
          <a>関西</a>
          <ul className={styles.animeccaMapListKansai}>
            <li className={styles.animeccaMapItem}>
              <a href="#">奈良県</a>
            </li>
            <li className={styles.animeccaMapItem}>
              <a href="#">京都府</a>
            </li>
            <li className={styles.animeccaMapItem}>
              <a href="#">大阪府</a>
            </li>
            <li className={styles.animeccaMapItem}>
              <a href="#">和歌山県</a>
            </li>
            <li className={styles.animeccaMapItem}>
              <a href="#">滋賀県</a>
            </li>
            <li className={styles.animeccaMapItem}>
              <a href="#">兵庫県</a>
            </li>
          </ul>
        </div>
        {/*中国・四国 */}
        <div className={styles.japanMapAreaSikokuChugoku}>
          <a>中国・四国</a>
          <ul className={styles.animeccaMapListSikokuChugoku}>
            <li className={styles.animeccaMapItem}>
              <a href="#">高知県</a>
            </li>
            <li className={styles.animeccaMapItem}>
              <a href="#">愛媛県</a>
            </li>
            <li className={styles.animeccaMapItem}>
              <a href="#">香川県</a>
            </li>
            <li className={styles.animeccaMapItem}>
              <a href="#">徳島県</a>
            </li>
            <li className={styles.animeccaMapItem}>
              <a href="#">山口県</a>
            </li>
            <li className={styles.animeccaMapItem}>
              <a href="#">広島県</a>
            </li>
            <li className={styles.animeccaMapItem}>
              <a href="#">岡山県</a>
            </li>
            <li className={styles.animeccaMapItem}>
              <a href="#">島根県</a>
            </li>
            <li className={styles.animeccaMapItem}>
              <a href="#">鳥取県</a>
            </li>
          </ul>
        </div>
        {/*九州・沖縄 */}
        <div className={styles.japanMapAreaKyuusyuOkinawa}>
          <a>九州・沖縄</a>
          <ul className={styles.animeccaMapListKyuusyuOkinawa}>
            <li className={styles.animeccaMapItem}>
              <a href="#">福岡県</a>
            </li>
            <li className={styles.animeccaMapItem}>
              <a href="#">佐賀県</a>
            </li>
            <li className={styles.animeccaMapItem}>
              <a href="#">長崎県</a>
            </li>
            <li className={styles.animeccaMapItem}>
              <a href="#">熊本県</a>
            </li>
            <li className={styles.animeccaMapItem}>
              <a href="#">大分県</a>
            </li>
            <li className={styles.animeccaMapItem}>
              <a href="#">宮崎県</a>
            </li>
            <li className={styles.animeccaMapItem}>
              <a href="#">鹿児島県</a>
            </li>
            <li className={styles.animeccaMapItem}>
              <a href="#">沖縄県</a>
            </li>
          </ul>
        </div>
        <h1 className={styles.title2}>作品から探す</h1>
        <div className={styles.search}>
          <form>
            <input type="text" name="search" placeholder={'サイト内検索'} />
            <button>
              <img src={serch.src} height={16} width={16} alt={'search'} />
            </button>
          </form>
        </div>
        <div className={styles.wrapper}>
          <div>
            <Link href="/">
              <img src={pic1.src} alt="pic" className="h-11 w-30" />
            </Link>
          </div>
          <div>
            <Link href="#">
              <img src={pic2.src} alt="pic" className="h-11 w-30" />
            </Link>
          </div>
          <div>
            <Link href="#">
              <img src={pic3.src} alt="pic" className="h-11 w-30" />
            </Link>
          </div>
          <div>
            <Link href="#">
              <img src={pic4.src} alt="pic" className="h-11 w-30" />
            </Link>
          </div>
          <div>
            <Link href="#">
              <img src={pic5.src} alt="pic" className="h-11 w-30" />
            </Link>
          </div>
          <div>
            <Link href="#">
              <img src={pic6.src} alt="pic" className="h-11 w-30" />
            </Link>
          </div>
          <div>
            <Link href="#">
              <img src={pic7.src} alt="pic" className="h-11 w-30" />
            </Link>
          </div>
          <div>
            <Link href="#">
              <img src={pic8.src} alt="pic" className="h-11 w-30" />
            </Link>
          </div>
          <div>
            <Link href="#">
              <img src={pic9.src} alt="pic" className="h-11 w-30" />
            </Link>
          </div>
          <div>
            <Link href="#">
              <img src={pic10.src} alt="pic" className="h-11 w-30" />
            </Link>
          </div>
          <div>
            <Link href="#">
              <img src={pic11.src} alt="pic" className="h-11 w-30" />
            </Link>
          </div>
          <div>
            <Link href="#">
              <img src={pic12.src} alt="pic" className="h-11 w-30" />
            </Link>
          </div>
          <div>
            <Link href="#">
              <img src={pic13.src} alt="pic" className="h-11 w-30" />
            </Link>
          </div>
          <div>
            <Link href="#">
              <img src={pic14.src} alt="pic" className="h-11 w-30" />
            </Link>
          </div>
          <div>
            <Link href="#">
              <img src={pic15.src} alt="pic" className="h-11 w-30" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
