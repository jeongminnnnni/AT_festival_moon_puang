import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden aspect-[9/16] max-w-lg mx-auto bg-[url('/bg.png')] bg-cover bg-center">
      <div className="container mx-auto px-6 py-8 relative z-10">
        <div className="flex flex-col items-center justify-center min-h-screen text-center space-y-8">
          {/* Main Character */}
          <div className="float mb-15">
            <div className="relative">
              <div className="w-50 h-50 mx-auto mb-4 relative">
                <img
                  src="/달푸앙누끼.png"
                  alt="달님 푸앙이"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Title Section */}
          <div className="space-y-4 max-w-md float">
            <img src="/푸앙운세 글씨.png" alt="푸앙운세" className="max-w-sm mx-auto" />
          </div>

          {/* CTA Button */}
          <div className="pt-55 mt-10">
            <Link href="/fortune">
              <Button
                size="lg"
                className="bg-purple/50 backdrop-blur-md border border-purple/20 text-white hover:bg-purple/20 px-18 py-6 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                ✨ 운세 보러가기 ✨
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}
