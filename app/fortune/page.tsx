"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function FortunePage() {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    birthYear: "",
    birthMonth: "",
    birthDay: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.gender && formData.birthYear && formData.birthMonth && formData.birthDay) {
      const params = new URLSearchParams(formData)
      window.location.href = `/result?${params.toString()}`
    }
  }

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 80 }, (_, i) => currentYear - i)
  const months = Array.from({ length: 12 }, (_, i) => i + 1)
  const days = Array.from({ length: 31 }, (_, i) => i + 1)

  return (
    <div className="min-h-screen bg-black stars relative aspect-[9/16] max-w-md mx-auto">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-white hover:text-purple-300">
              <ArrowLeft className="w-4 h-4 mr-2" />
              돌아가기
            </Button>
          </Link>
        </div>

        <div className="max-w-sm mx-auto">
          {/* Character */}
          <div className="text-center mb-6 float">
            <img
              src="/cute-korean-moon-character-with-questioning-expres.png"
              alt="달님 푸앙이"
              className="w-24 h-24 mx-auto mb-3"
            />
            <h1 className="text-xl font-bold text-white mb-2">당신에 대해 알려주세요</h1>
            <p className="text-sm text-gray-300">정확한 운세를 위해 정보를 입력해주세요</p>
          </div>

          {/* Form */}
          <Card className="bg-gray-900/90 backdrop-blur-sm border-gray-700">
            <CardHeader className="pb-4">
              <CardTitle className="text-center text-white text-lg">운세 정보 입력</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white text-sm">
                    이름
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="이름을 입력해주세요"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-gray-800 text-white border-gray-600 placeholder:text-gray-400 focus:border-purple-400"
                    required
                  />
                </div>

                {/* Gender */}
                <div className="space-y-2">
                  <Label className="text-white text-sm">성별</Label>
                  <RadioGroup
                    value={formData.gender}
                    onValueChange={(value) => setFormData({ ...formData, gender: value })}
                    className="flex gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male" className="text-white text-sm">
                        남성
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female" className="text-white text-sm">
                        여성
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Birth Date */}
                <div className="space-y-2">
                  <Label className="text-white text-sm">생년월일</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <Label htmlFor="year" className="text-xs text-gray-300">
                        년도
                      </Label>
                      <select
                        id="year"
                        value={formData.birthYear}
                        onChange={(e) => setFormData({ ...formData, birthYear: e.target.value })}
                        className="w-full p-2 text-sm rounded-md bg-gray-800 text-white border border-gray-600 focus:border-purple-400"
                        required
                      >
                        <option value="">년도</option>
                        {years.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="month" className="text-xs text-gray-300">
                        월
                      </Label>
                      <select
                        id="month"
                        value={formData.birthMonth}
                        onChange={(e) => setFormData({ ...formData, birthMonth: e.target.value })}
                        className="w-full p-2 text-sm rounded-md bg-gray-800 text-white border border-gray-600 focus:border-purple-400"
                        required
                      >
                        <option value="">월</option>
                        {months.map((month) => (
                          <option key={month} value={month}>
                            {month}월
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="day" className="text-xs text-gray-300">
                        일
                      </Label>
                      <select
                        id="day"
                        value={formData.birthDay}
                        onChange={(e) => setFormData({ ...formData, birthDay: e.target.value })}
                        className="w-full p-2 text-sm rounded-md bg-gray-800 text-white border border-gray-600 focus:border-purple-400"
                        required
                      >
                        <option value="">일</option>
                        {days.map((day) => (
                          <option key={day} value={day}>
                            {day}일
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-base font-semibold rounded-full mt-6"
                >
                  운세 확인하기 🔮
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
