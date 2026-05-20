"use client"

import Link from "next/link"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, MessageSquare, Award, ArrowRight, Sparkles, Smile, MessageCircle } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 md:px-8 bg-gradient-to-br from-primary/5 via-background to-secondary/5 border-b border-border">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            기획 의도
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-foreground">
            데려올 수 없어서,{" "}
            <span className="bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
              대신 만들었습니다.
            </span>
          </h1>

          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            보호소 공고를 보다 보면 마음이 무거워집니다. <br />
            지금 당장 입양이 어려운 사람도 많고, 저희도 그중 하나입니다. <br />
            그래서 보여주는 것에서 한 걸음 더 나아가고 싶었습니다 — <br />
            이름 짓기, 응원, 입양 후기. 작은 것들로 시작했습니다.
          </p>

          <div className="pt-4 flex justify-center gap-4">
            <Link href="/">
              <Button size="lg" className="rounded-2xl gap-2 font-bold px-6 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-none transition-all">
                동물 보러 가기 <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/community">
              <Button size="lg" variant="outline" className="rounded-2xl font-bold px-6">
                입양 이야기 보기
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Philosophy Section */}
      <main className="max-w-5xl mx-auto px-4 md:px-8 py-16 space-y-24">
        {/* Core Pillars Intro */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">
            펫미팅에서만 할 수 있는 것들
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            각각 왜 만들었는지 설명합니다.
          </p>
        </div>

        {/* Pillar 1 */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 text-primary">
                <Smile className="w-6 h-6" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-foreground">1. 이름 짓기 투표</h3>
            </div>

            <h4 className="text-lg font-semibold text-primary leading-snug">
              이름이 있어야 기억에 남습니다.
            </h4>

            <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
              <p>
                공공 보호소 공고는 대부분 <span className="font-semibold text-foreground">`[개] 믹스견`</span> 이런 식입니다. <br />
                행정적으로는 맞는 표기인데, 보다 보면 그냥 스크롤하게 됩니다. <br />
                어떤 아이인지 파악하기 어렵습니다.
              </p>
              <p>
                이름이 하나 생기면 달라집니다. <br />
                "믹스견"이 "춘식이"가 되는 순간, 왠지 한 번 더 사진을 보게 되더군요.
              </p>
            </div>
          </div>
          <div className="lg:col-span-5">
            <Card className="border-0 shadow-xl bg-gradient-to-br from-primary/5 to-orange-500/5 rounded-3xl overflow-hidden hover:scale-105 transition-transform duration-300">
              <CardContent className="p-6 md:p-8 space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-muted-foreground">보호소 공고 원본</span>
                  <div className="p-3 bg-secondary/50 rounded-xl text-xs font-mono text-muted-foreground">
                    공고번호: 경남-진주-2024-00124 <br />
                    품종: [개] 믹스견
                  </div>
                </div>
                <div className="flex justify-center py-2">
                  <ArrowRight className="w-8 h-8 text-primary rotate-90 lg:rotate-0" />
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-primary">이름이 생긴 후</span>
                  <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 space-y-1">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-bold">가족을 찾아요</span>
                    <h5 className="text-lg font-bold text-foreground">✨ 우리 "춘식이"에게 따뜻한 관심을</h5>
                    <p className="text-xs text-muted-foreground">진주 보호소의 애교쟁이 믹스견 친구</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Pillar 2 */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center lg:flex-row-reverse">
          <div className="lg:col-span-7 space-y-6 lg:order-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-500">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-foreground">2. 응원 시스템</h3>
            </div>

            <h4 className="text-lg font-semibold text-orange-500 leading-snug">
              관심 많이 받는 애들 따로 있다는 거, 다들 압니다.
            </h4>

            <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
              <p>
                매주 하트 많이 받은 TOP 3은 사이트 상단에 따로 띄우고, <br />
                인스타그램 카드뉴스로도 만듭니다.
              </p>
              <p>
                순위를 보여주는 게 맞는 건지 한참 고민했습니다. <br />
                인기 없는 애들이 더 묻히는 거 아닐까 싶어서요.
              </p>
              <p>
                근데 현실을 숨기는 것보다 그냥 보이게 하는 게 낫다고 판단했습니다. <br />
                며칠째 응원을 못 받은 아이가 보이면, 한 번쯤 눌러보게 되니까요. <br />
                예쁘거나 어리지 않아도 눈에 띄게 하고 싶었습니다.
              </p>
            </div>
          </div>
          <div className="lg:col-span-5 lg:order-1">
            <Card className="border-0 shadow-xl bg-gradient-to-br from-orange-500/5 to-pink-500/5 rounded-3xl overflow-hidden hover:scale-105 transition-transform duration-300">
              <CardContent className="p-6 md:p-8 text-center space-y-4">
                <div className="inline-flex p-3 rounded-full bg-orange-500/10 text-orange-500">
                  <Heart className="w-8 h-8 fill-current" />
                </div>
                <h4 className="font-bold text-foreground">하트가 실제로 하는 일</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  응원 수가 많은 아이는 SNS 홍보로 이어집니다.<br />
                  더 많은 사람 눈에 띄면 입양 가능성도 올라가고요.<br />
                  숫자가 행동으로 이어지도록 설계했습니다.
                </p>
                <div className="flex justify-center gap-1.5 pt-2">
                  <span className="px-2.5 py-1 rounded-xl bg-background border border-border text-[11px] font-semibold text-muted-foreground">인스타 홍보</span>
                  <span className="px-2.5 py-1 rounded-xl bg-background border border-border text-[11px] font-semibold text-muted-foreground">지표 공개</span>
                  <span className="px-2.5 py-1 rounded-xl bg-background border border-border text-[11px] font-semibold text-muted-foreground">소외 방지</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Pillar 3 */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-success/10 text-success">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-foreground">3. 입양 후기 피드</h3>
            </div>

            <h4 className="text-lg font-semibold text-success leading-snug">
              "잘 지내고 있어요" 한 마디가 생각보다 힘이 됩니다.
            </h4>

            <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
              <p>
                입양 후 일상을 올릴 수 있는 공간입니다. <br />
                어떻게 적응했는지, 성격이 어떤지, 처음엔 어땠는지 같은 것들이요.
              </p>
              <p>
                유기동물 입양을 망설이는 이유 중에 "적응이 걱정되어서"가 꽤 많습니다. <br />
                실제 입양한 사람들 얘기를 들으면 생각이 달라지는 경우가 많더군요. <br />
                그 얘기들이 여기 쌓이면, 망설이는 사람한테 참고가 될 것 같았습니다.
              </p>
            </div>
          </div>
          <div className="lg:col-span-5">
            <Card className="border-0 shadow-xl bg-gradient-to-br from-success/5 to-emerald-500/5 rounded-3xl overflow-hidden hover:scale-105 transition-transform duration-300">
              <CardContent className="p-6 md:p-8 space-y-4 text-center">
                <div className="inline-flex p-3 rounded-full bg-success/10 text-success">
                  <MessageCircle className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-foreground">후기가 만드는 것</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  입양 후기는 과거 기록이기도 하지만, <br />
                  다음 입양을 끌어내는 힘이기도 합니다. <br />
                  "우리 집 애도 보호소 출신이에요"라는 한 마디가 <br />
                  누군가의 마음을 바꿀 수 있습니다.
                </p>
                <div className="pt-2">
                  <div className="inline-block px-3 py-1 bg-success/20 text-success rounded-full text-xs font-bold">
                    실제 경험담 기반
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* Conclusion */}
      <section className="bg-muted py-16 px-4 md:px-8 border-t border-border">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <Heart className="w-12 h-12 text-primary fill-current mx-auto animate-pulse" />
          <h3 className="text-xl md:text-2xl font-bold text-foreground">
            작은 것들이 모여서 달라집니다.
          </h3>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            이름 하나, 하트 하나, 후기 하나.<br />
            어떤 아이가 한 번이라도 더 눈에 띄었으면 해서 만든 기능들입니다.<br />
            같이 써주시면 감사하겠습니다.
          </p>
          <div className="pt-4">
            <Link href="/login">
              <Button size="lg" className="rounded-2xl font-bold px-8 shadow-md">
                펫미팅 시작하기
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              2026 유기동물 응원 피드. 모든 생명은 소중합니다.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">이용약관</a>
              <a href="#" className="hover:text-foreground transition-colors">개인정보처리방침</a>
              <a href="#" className="hover:text-foreground transition-colors">문의하기</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}