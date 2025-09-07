'use client'
import Image from 'next/image'
import dynamic from "next/dynamic";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

export default function MainSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000, // خلي بالك S كبيرة
  };

  return (
    <div className='mt-10 flex w-[90%] mx-auto h-[400px]'>
      {/* السلايدر الكبير */}
      <div className="relative w-3/4 h-[400px]">
        <Slider {...settings}>
          <div className="relative w-full h-[400px]">
            <Image src="/images/slider-image-3.jpeg" alt="slide1" fill className="object-cover rounded" />
          </div>
          <div className="relative w-full h-[400px]">
            <Image src="/images/slider-image-2.jpeg" alt="slide2" fill className="object-cover rounded" />
          </div>
          <div className="relative w-full h-[400px]">
            <Image src="/images/slider-image-1.jpeg" alt="slide3" fill className="object-cover rounded" />
          </div>
        </Slider>
      </div>

      {/* الصور الثابتة على اليمين */}
      <div className="w-1/4 h-[400px] flex flex-col">
        <div className="relative w-full h-[200px]">
          <Image src="/images/slider-image-2.jpeg" alt="sideImg1" fill className="object-cover" />
        </div>
        <div className="relative w-full h-[200px]">
          <Image src="/images/slider-image-1.jpeg" alt="sideImg2" fill className="object-cover" />
        </div>
      </div>
    </div>
  );
}
