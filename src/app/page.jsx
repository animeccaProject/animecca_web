import React from 'react'
import Image from 'next/image'
import localImage from '../../public/1026428.jpg'

const Toppage = () => {
  return (
    <div>
      <h1 className='text-center '>日本地図から探す</h1>
        <div className='flex'>
          <ul>
            <li>九州・沖縄</li>
          </ul>
        </div>
        <div>
          <ul>
            <li>中国・四国</li>
          </ul>
        </div>
        <div>
          <ul>
            <li>北信越</li>
          </ul>
        </div>
        <div>
          <ul>
            <li>関西</li>
          </ul>
        </div>
        <div>
          <ul>
            <li>関東</li>
          </ul>
        </div>
        <div>
          <ul>
            <li>東北</li>
          </ul>
        </div>
        <div>
          <ul>
            <li>東海</li>
          </ul>
        </div>
        <div>
          <ul>
            <li>北海道</li>
          </ul>
        </div>
        <div class="flex justify-center">
          <Image
          src={localImage}
          width={400}
          height={400}
        />
      </div>
    </div>
    
  )
}

export default Toppage