import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background stars relative overflow-hidden aspect-[9/16] max-w-md mx-auto">
      {/* Floating stars decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-accent rounded-full twinkle"></div>
        <div
          className="absolute top-40 right-20 w-1 h-1 bg-muted rounded-full twinkle"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-60 left-1/4 w-1.5 h-1.5 bg-accent rounded-full twinkle"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-40 right-1/3 w-1 h-1 bg-muted rounded-full twinkle"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      <div className="container mx-auto px-6 py-8 relative z-10">
        <div className="flex flex-col items-center justify-center min-h-screen text-center space-y-8">
          {/* Main Character */}
          <div className="float mb-6">
            <div className="relative">
              <div className="w-40 h-40 mx-auto mb-4 relative">
                <img
                  src="/cute-korean-moon-character-sitting-on-crescent-moo.png"
                  alt="달님 푸앙이"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Title Section */}
          <div className="space-y-4 max-w-sm">
            <h1 className="text-4xl font-bold text-foreground mb-4">달님 푸앙이</h1>
            <p className="text-xl text-accent font-medium mb-2">신비로운 운세의 세계로</p>
            <p className="text-base text-muted-foreground leading-relaxed">
              당신만을 위한 특별한 운세를 확인해보세요. 달님 푸앙이가 오늘의 운세를 알려드릴게요.
            </p>
          </div>

          {/* CTA Button */}
          <div className="pt-6">
            <Link href="/fortune">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                운세 보러가기 ✨
              </Button>
            </Link>
          </div>

          {/* Footer */}
          <div className="pt-8 text-center">
            <p className="text-muted-foreground text-sm">달님 푸앙이와 함께하는 신비로운 여행을 시작해보세요</p>
          </div>
        </div>
      </div>
    </div>
  )
}
