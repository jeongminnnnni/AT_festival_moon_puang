"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft, Share2 } from "lucide-react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"

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
      "영리하고 기민한 당신의 재치가 평소보다 더욱 빛을 발하는 날입니다. 주변 사람들이 당신의 번뜩이는 아이디어에 감탄하고, 어려운 문제도 쉽게 해결의 실마리를 찾게 될 것입니다.",
      "성실하고 꾸준한 노력이 드디어 결실을 맺을 때입니다. 오랫동안 공들여온 일이 있다면 오늘 좋은 성과를 기대할 수 있으며, 당신의 노력을 인정받게 될 것입니다.",
      "용기와 열정으로 새로운 도전에 나서보세요. 오늘은 당신의 잠재력이 폭발하는 날이니, 망설였던 일이 있다면 과감하게 시도해볼 최적의 시기입니다. 성공이 당신을 기다립니다.",
      "온화하고 섬세한 마음이 주변에 따뜻함을 전할 거예요. 당신의 다정한 말 한마디가 동료나 친구에게 큰 위로가 되고, 이는 더 깊은 신뢰 관계로 발전하는 계기가 될 것입니다.",
      "당당한 리더십으로 모든 일이 순조롭게 풀릴 것 같아요. 당신의 결정에 힘이 실리고 많은 사람들이 따르니, 그룹 프로젝트나 팀 활동에서 주도적인 역할을 맡아보세요.",
      "지혜롭고 신중한 판단력이 좋은 결과를 가져다줄 거예요. 복잡하게 얽힌 상황 속에서도 핵심을 꿰뚫어 보는 당신의 통찰력 덕분에 현명한 선택을 내릴 수 있습니다.",
    ],
    caution: [
      "섣부른 판단보다는 신중함이 필요한 시기입니다. 모든 정보가 당신에게 주어진 것이 아닐 수 있으니, 중요한 결정을 내리기 전에 한 번 더 확인하고 주변의 조언을 구하세요.",
      "자신의 생각만 고집하기보다는 유연한 사고가 도움이 될 것 같아요. 다른 사람의 의견에도 귀를 기울일 때, 당신이 미처 생각하지 못했던 더 나은 해결책을 발견할 수 있습니다.",
      "성급하게 서두르기보다는 차근차근 계획을 세워보세요. 마음이 급할수록 실수가 잦아질 수 있습니다. 잠시 숨을 고르고 전체적인 과정을 검토하는 시간이 필요합니다.",
      "오늘은 평소보다 소심해질 수 있지만, 이럴 때일수록 자신감을 가져보세요. 위축되지 않고 당당하게 의견을 표현할 때 주변 사람들도 당신을 신뢰하게 될 것입니다.",
      "때로는 자존심을 내려놓는 것이 더 큰 힘이 될 수 있습니다. 사소한 일로 논쟁하기보다는 한발 물러서서 상황을 넓게 보세요. 그것이 관계를 지키는 지혜입니다.",
      "근거 없는 의심은 좋은 기회를 멀어지게 할 수 있습니다. 상대방의 의도를 긍정적으로 바라보고 믿음을 보여주세요. 신뢰가 바탕이 될 때 더 큰 가능성이 열립니다.",
    ],
  },
  constellation: {
    positive: [
      "창의적인 아이디어가 샘솟고, 예술적인 감각이 빛을 발할 때입니다. 당신의 독창적인 생각이 주변에 신선한 영감을 주고, 새로운 프로젝트의 시작으로 이어질 수 있습니다.",
      "감성이 풍부한 당신의 매력이 돋보이는 하루가 될 거예요. 사람들과의 교류 속에서 당신의 따뜻한 마음이 전달되어, 예상치 못한 좋은 인연을 만나게 될 수 있습니다.",
      "활동적인 에너지가 넘쳐 새로운 시작을 하기에 완벽한 날입니다. 미뤄왔던 운동이나 학습 계획이 있다면 오늘부터 시작해보세요. 활기찬 에너지가 당신을 목표로 이끌어줄 것입니다.",
      "안정적인 기반 위에서 한 단계 더 성장할 수 있는 기회가 찾아옵니다. 재정적으로나 관계적으로나 안정감을 느끼게 되며, 이를 바탕으로 더 큰 꿈을 계획할 수 있습니다.",
      "뛰어난 소통 능력을 발휘하여 주변 사람들과의 관계를 더욱 돈독히 할 수 있습니다. 당신의 말에 설득력이 더해지니, 중요한 협상이나 발표에서 좋은 결과를 얻을 수 있습니다.",
      "따뜻한 마음으로 주변 사람들을 챙기고 배려하는 모습이 당신을 더욱 빛나게 합니다. 당신의 친절함이 결국 당신에게 더 큰 행운으로 돌아오는 선순환을 만들게 될 것입니다.",
    ],
    caution: [
      "예상치 못한 변화의 바람이 불어올 수 있지만, 두려워하지 말고 적응해보세요. 변화의 흐름에 유연하게 대처한다면, 이는 오히려 새로운 성장의 기회가 될 수 있습니다.",
      "감정적인 결정보다는 이성적이고 논리적인 판단이 필요한 하루입니다. 중요한 사안일수록 개인적인 감정을 배제하고 객관적인 데이터를 바탕으로 신중하게 결정하세요.",
      "의욕이 앞서 무모한 도전을 하기보다는, 신중한 계획을 세우는 것이 중요합니다. 당신의 열정은 소중하지만, 현실적인 계획이 뒷받침될 때 비로소 빛을 발할 수 있습니다.",
      "자신만의 방식을 고집하기보다는, 주변의 조언에 귀 기울이고 열린 마음을 가져보세요. 당신이 보지 못하는 부분을 다른 사람이 발견해주고, 더 나은 길로 이끌어줄 수 있습니다.",
      "여러 가지 일에 관심이 흩어져 집중력을 잃기 쉬운 날입니다. 가장 중요한 일의 우선순위를 정하고, 한 번에 하나씩 차분하게 처리해 나가는 지혜가 필요합니다.",
      "아직 일어나지 않은 일에 대한 과도한 걱정은 내려놓으세요. 긍정적인 마음가짐으로 현재에 집중할 때, 문제 해결의 실마리를 더 쉽게 찾을 수 있을 것입니다.",
    ],
  },
}

const hookingMessages = [
  "달님 푸앙이가 항상 당신을 응원하고 있어요!",
  "오늘도 반짝이는 별처럼 빛나는 하루 되세요!",
  "당신은 어떤 어려움도 이겨낼 수 있을 거예요!",
  "당신의 꿈이 밤하늘의 별처럼 이루어지길 바라요!",
  "달빛의 가호가 당신과 함께하기를!",
  "달빛처럼 환한 미소로 오늘 하루를 가득 채워보세요!",
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

      const zodiacIndex = (birthYearNum - 4) % 12
      const zodiac = zodiacAnimals[zodiacIndex]

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
  }, [name, gender, birthYear, birthMonth, birthDay])

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

  const imageUrl = fortune.gender === "male" ? "/달푸앙남자누끼.png" : "/달푸앙여자누끼.png"

  return (
    <div className="min-h-screen relative aspect-[9/16] max-w-md mx-auto bg-[url('/bg.png')] bg-cover bg-center">
      <div className="container mx-auto px-4 py-8 relative z-10">
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
              <Image
                src={imageUrl}
                alt="달님 푸앙이"
                width={120}
                height={120}
                className="mx-auto mb-4 relative z-10"
              />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">{fortune.name}님의 운세</h1>
          </div>

          <Card className="bg-black/50 backdrop-blur-md border border-white/20">
            <CardContent className="text-center space-y-4">
              <p className="text-base text-white/90 leading-relaxed">
                <span className="font-bold text-white">{fortune.name}님,</span>
                <br />
                {fortune.zodiacMessage}
              </p>
              <p className="text-base text-white/90 leading-relaxed">{fortune.constellationMessage}</p>
              <div className="border-t border-white/20 pt-4">
                <p className="text-sm text-white/70">{fortune.hookingMessage}</p>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4 justify-center mt-6">
            <Link href="/fortune">
              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 transform hover:scale-105 px-16 font-sm"
              >
                다시 보기
              </Button>
            </Link>
            <Link href="/">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 transform hover:scale-105 px-16 font-sm">
                처음으로
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}