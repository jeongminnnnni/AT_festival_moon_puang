import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden aspect-[9/16] max-w-md mx-auto bg-[url('/bg.png')] bg-cover bg-center">
      <div className="container mx-auto px-6 py-8 relative z-10">
        <div className="flex flex-col items-center justify-center min-h-screen text-center space-y-8">
          {/* Main Character */}
          <div className="float mb-6">
            <div className="relative">
              <div className="w-40 h-40 mx-auto mb-4 relative">
                <img
                  src="/달푸앙누끼.png"
                  alt="달님 푸앙이"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Title Section */}
          <div className="space-y-4 max-w-sm">
            <h1 className="text-4xl font-bold text-foreground mb-4">푸앙운세(福安運勢)</h1>
            <p className="text-sm text-accent font-bold mb-1">달님 푸앙이가 오늘의 운세를 알려드려요</p>
          </div>

          {/* CTA Button */}
          <div className="pt-55">
            <Link href="/fortune">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-35 py-5 text-sm font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                운세 보러가기 ✨
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}
