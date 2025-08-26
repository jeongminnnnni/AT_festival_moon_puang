"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft, Share2 } from "lucide-react"
import { useSearchParams } from "next/navigation"

// Fortune calculation logic
const zodiacAnimals = ["쥐", "소", "호랑이", "토끼", "용", "뱀", "말", "양", "원숭이", "닭", "개", "돼지"]

const constellations = [
  { name: "물병자리", start: [1, 20], end: [2, 18] },
  { name: "물고기자리", start: [2, 19], end: [3, 20] },
  { name: "양자리", start: [3, 21], end: [4, 19] },
  { name: "황소자리", start: [4, 20], end: [5, 20] },
  { name: "쌍둥이자리", start: [5, 21], end: [6, 21] },
  { name: "게자리", start: [6, 22], end: [7, 22] },
  { name: "사자자리", start: [7, 23], end: [8, 22] },
  { name: "처녀자리", start: [8, 23], end: [9, 22] },
  { name: "천칭자리", start: [9, 23], end: [10, 22] },
  { name: "전갈자리", start: [10, 23], end: [11, 21] },
  { name: "사수자리", start: [11, 22], end: [12, 21] },
  { name: "염소자리", start: [12, 22], end: [1, 19] },
]

const fortuneMessages = {
  zodiac: {
    positive: [
      "영리하고 기민한 당신의 재치가 빛을 발하는 날이에요!",
      "성실하고 꾸준한 노력이 결실을 맺을 때입니다!",
      "용기와 열정으로 새로운 도전에 나서보세요!",
      "온화하고 섬세한 마음이 주변에 따뜻함을 전할 거예요!",
      "당당한 리더십으로 모든 일이 순조롭게 풀릴 것 같아요!",
      "지혜롭고 신중한 판단력이 좋은 결과를 가져다줄 거예요!",
    ],
    caution: [
      "섣부른 판단보다는 신중함이 필요한 시기입니다.",
      "고집보다는 유연한 사고가 도움이 될 것 같아요.",
      "성급함보다는 차근차근 계획을 세워보세요.",
      "소심함을 버리고 자신감을 가져보세요.",
      "자존심보다는 겸손함이 더 큰 힘이 될 것 같아요.",
      "의심보다는 믿음이 좋은 기회를 가져다줄 거예요.",
    ],
  },
  constellation: {
    positive: [
      "창의적인 아이디어가 빛을 발할 때입니다!",
      "감성이 풍부한 당신의 매력이 돋보일 거예요!",
      "활동적인 에너지로 새로운 시작을 해보세요!",
      "안정적인 기반 위에서 성장할 수 있을 것 같아요!",
      "소통 능력이 뛰어난 당신에게 좋은 인연이 찾아올 거예요!",
      "따뜻한 마음으로 주변 사람들과 좋은 관계를 만들어가세요!",
    ],
    caution: [
      "변화를 두려워하지 말고 적응해보세요.",
      "감정적인 결정보다는 이성적인 판단이 필요해요.",
      "무모함보다는 신중한 계획이 중요합니다.",
      "완고함을 버리고 열린 마음을 가져보세요.",
      "산만함을 줄이고 집중력을 높여보세요.",
      "과도한 걱정보다는 긍정적인 마음가짐이 도움이 될 거예요.",
    ],
  },
}

const hookingMessages = [
  "달님 푸앙이가 항상 응원하고 있어요!",
  "오늘도 반짝이는 하루 되세요!",
  "푸앙이와 함께라면 모든 게 잘 될 거예요!",
  "당신의 꿈이 이루어지길 바라요!",
  "행운이 가득한 하루가 되길!",
  "달빛처럼 환한 미소로 하루를 시작해보세요!",
]

export default function ResultPage() {
  const searchParams = useSearchParams()
  const [fortune, setFortune] = useState<any>(null)

  const name = searchParams.get("name")
  const gender = searchParams.get("gender")
  const birthYear = searchParams.get("birthYear")
  const birthMonth = searchParams.get("birthMonth")
  const birthDay = searchParams.get("birthDay")

  useEffect(() => {
    if (name && gender && birthYear && birthMonth && birthDay) {
      const birthYearNum = Number.parseInt(birthYear)
      const birthMonthNum = Number.parseInt(birthMonth)
      const birthDayNum = Number.parseInt(birthDay)

      // Calculate zodiac
      const zodiacIndex = (birthYearNum - 4) % 12
      const zodiac = zodiacAnimals[zodiacIndex]

      // Calculate constellation
      let constellation = "물병자리"
      for (const c of constellations) {
        const [startMonth, startDay] = c.start
        const [endMonth, endDay] = c.end

        if (startMonth === endMonth) {
          if (birthMonthNum === startMonth && birthDayNum >= startDay && birthDayNum <= endDay) {
            constellation = c.name
            break
          }
        } else {
          if (
            (birthMonthNum === startMonth && birthDayNum >= startDay) ||
            (birthMonthNum === endMonth && birthDayNum <= endDay)
          ) {
            constellation = c.name
            break
          }
        }
      }

      // Random fortune version
      const isPositive = Math.random() > 0.5
      const zodiacMessage = fortuneMessages.zodiac[isPositive ? "positive" : "caution"][Math.floor(Math.random() * 6)]
      const constellationMessage =
        fortuneMessages.constellation[isPositive ? "positive" : "caution"][Math.floor(Math.random() * 6)]
      const hookingMessage = hookingMessages[Math.floor(Math.random() * hookingMessages.length)]

      setFortune({
        name,
        gender,
        zodiac,
        constellation,
        zodiacMessage,
        constellationMessage,
        hookingMessage,
        isPositive,
      })
    }
  }, [name, gender, birthYear, birthMonth, birthDay]) // Use individual values as dependencies

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "달님 푸앙이 운세",
        text: `${fortune.name}님의 오늘 운세를 확인해보세요!`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("링크가 복사되었습니다!")
    }
  }

  if (!fortune) {
    return (
      <div className="min-h-screen bg-background stars flex items-center justify-center aspect-[9/16] max-w-md mx-auto">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-foreground">운세를 계산하고 있어요...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background stars relative aspect-[9/16] max-w-md mx-auto">
      {/* Enhanced floating stars decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-16 left-8 w-3 h-3 bg-accent rounded-full twinkle"></div>
        <div
          className="absolute top-32 right-12 w-2 h-2 bg-muted rounded-full twinkle"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-48 left-1/4 w-2.5 h-2.5 bg-accent rounded-full twinkle"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-32 right-1/3 w-2 h-2 bg-muted rounded-full twinkle"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute top-24 right-1/4 w-1.5 h-1.5 bg-accent rounded-full sparkle"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute bottom-48 left-1/3 w-1.5 h-1.5 bg-muted rounded-full sparkle"
          style={{ animationDelay: "2.5s" }}
        ></div>

        {/* Mystical glow effects */}
        <div className="absolute top-1/4 left-1/2 w-32 h-32 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/2 w-24 h-24 bg-primary/20 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/">
            <Button
              variant="ghost"
              size="sm"
              className="text-foreground hover:text-accent hover:bg-card/30 transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              처음으로
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleShare}
            className="text-foreground hover:text-accent hover:bg-card/30 transition-all duration-300"
          >
            <Share2 className="w-4 h-4 mr-2" />
            공유하기
          </Button>
        </div>

        <div className="max-w-sm mx-auto">
          <div className="text-center mb-8 float">
            <div className="relative">
              <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl w-32 h-32 mx-auto"></div>
              <img
                src={`/cute-korean-moon-character-.png?height=120&width=120&query=cute Korean moon character ${fortune.gender === "female" ? "female" : "male"} with ${fortune.isPositive ? "happy" : "thoughtful"} expression`}
                alt="달님 푸앙이"
                className="w-30 h-30 mx-auto mb-4 relative z-10 pulse-glow"
              />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2 shimmer">{fortune.name}님의 운세</h1>
            <div className="flex justify-center space-x-2 mb-4">
              <div className="w-2 h-2 bg-accent rounded-full sparkle"></div>
              <div className="w-2 h-2 bg-muted rounded-full sparkle" style={{ animationDelay: "0.5s" }}></div>
              <div className="w-2 h-2 bg-accent rounded-full sparkle" style={{ animationDelay: "1s" }}></div>
            </div>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/30 via-primary/30 to-accent/30 rounded-lg blur-sm"></div>
            <Card className="relative bg-card/95 backdrop-blur-sm border-2 border-accent/30 shadow-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-center text-card-foreground text-xl flex items-center justify-center gap-2">
                  <span className="text-accent">✨</span>
                  오늘의 운세
                  <span className="text-accent">✨</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center space-y-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent rounded-lg"></div>
                    <p className="text-base text-card-foreground leading-relaxed p-4 relative">
                      <span className="font-semibold text-accent text-lg">{fortune.name}님, </span>
                      <br />
                      <span className="text-muted text-sm">🌙</span> {fortune.zodiacMessage}
                      <br />
                      <span className="text-accent text-sm">⭐</span> {fortune.constellationMessage}
                    </p>
                  </div>

                  <div className="border-t border-accent/30 pt-6">
                    <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg p-4 border border-accent/20">
                      <p className="text-accent font-medium text-lg flex items-center justify-center gap-2">
                        <span className="text-xl">🌟</span>
                        {fortune.hookingMessage}
                        <span className="text-xl">🌟</span>
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-4 justify-center">
            <Link href="/fortune">
              <Button
                variant="outline"
                className="bg-transparent border-2 border-accent/50 text-foreground hover:bg-accent/10 hover:border-accent hover:shadow-lg hover:shadow-accent/25 transition-all duration-300"
              >
                다시 보기
              </Button>
            </Link>
            <Link href="/">
              <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 transform hover:scale-105">
                처음으로
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
