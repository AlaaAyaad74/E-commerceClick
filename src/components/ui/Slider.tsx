import { Carousel } from "react-bootstrap";

export default function Slider() {
  return (
    <div className="relative h-[120px] sm:h-[220px]">
      <Carousel variant="dark" className="h-[100%]">
        <Carousel.Item className="h-[100%]">
          <img
            src="./assets/slide2.avif"
            alt=""
            className="object-cover postion-center h-[120px] sm:h-[220px] w-full"
          />
        </Carousel.Item>
        <Carousel.Item className="h-[100%]">
          <img
            src="./assets/slide3.avif"
            alt=""
            className="object-cover h-[120px] sm:h-[220px] w-full"
          />
        </Carousel.Item>
        <Carousel.Item className="h-[100%]">
          <img
            src="./assets/slide5.avif"
            alt=""
            className="object-cover h-[120px] sm:h-[220px] w-full"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
