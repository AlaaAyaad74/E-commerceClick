
import { Carousel } from 'react-bootstrap'

function SliderSkeleton() {
  return (
    <Carousel variant="dark" className="h-[100%]">
          {Array.from({ length: 3 }).map((_, index) => (
            <Carousel.Item key={index} className="h-[100%]">
              <div className="relative h-[120px] sm:h-[220px] bg-gray-200 animate-pulse w-full"></div>
            </Carousel.Item>
          ))}
        </Carousel>
  )
}

export default SliderSkeleton