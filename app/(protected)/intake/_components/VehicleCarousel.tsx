"use client"

import { useEffect, useState } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"

import { cn } from "@/lib/utils"

type VehicleCarouselProps = {
  images: string[]
  className?: string
}

export default function VehicleCarousel({
  images,
  className,
}: VehicleCarouselProps) {
  const [api, setApi] = useState<CarouselApi | null>(null)
  const [current, setCurrent] = useState(0)


  useEffect(() => {
    if (!api) return

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap())
    }

    api.on("select", onSelect)
    onSelect()

    return () => {
      api.off("select", onSelect)
    }
  }, [api])

  if (!images?.length) return null

  return (
    <div className={cn("w-full", className)}>
      <Carousel
        setApi={setApi}
        opts={{
          loop: true,
          align: "start",
        }}
      >
  
        <CarouselContent className="ml-0">
          {images.map((img, index) => (
            <CarouselItem key={index} className="pl-0">
              <div className="overflow-hidden rounded-2xl bg-(--bg2)">
                <img
                  src={img}
                  alt={`Vehicle image ${index + 1}`}
                  className="w-full h-65 object-cover"
                  loading="lazy"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>


        <CarouselPrevious className="left-3 bg-(--gold)/20 hover:bg-(--gold)/40 text-white border-none px-3 backdrop-blur-md" />
        <CarouselNext className="right-3 bg-(--gold)/20 hover:bg-(--gold)/40  text-white border-none px-3 backdrop-blur-md" />
      </Carousel>


      <div className="flex justify-center gap-2 mt-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              current === index
                ? "w-6 bg-(--gold)"
                : "w-2 bg-(--gold)/40 hover:bg-(--gold)/70"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}