package com.team05.petmeeting.domain.ads.controller

import com.team05.petmeeting.domain.ads.service.AdsService
import com.team05.petmeeting.domain.ads.dto.CardNewsResult
import com.team05.petmeeting.domain.animal.entity.Animal
import com.team05.petmeeting.global.rsdata.RsData
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/v1/ads")
class AdsController(
    private val adsService: AdsService
) {
    // Top N 동물 조회
    @GetMapping("/top-animals")
    fun getTopAnimals(
        @RequestParam(defaultValue = "3") n: Int
    ): RsData<List<Animal>> {
        val topAnimals = adsService.getTopAnimals(n)
        return RsData("Top N 동물 조회 성공", "200", topAnimals)
    }

    // 인스타그램 업로드 없이 카드뉴스 이미지만 생성
    @PostMapping("/card-news/preview")
    fun previewCardNews(
        @RequestParam(defaultValue = "3") n: Int
    ): RsData<List<CardNewsResult>> {
        val cardNewsResults = adsService.generateCardNewsPreview(n)
        return RsData("카드뉴스 미리보기 생성 성공", "200", cardNewsResults)
    }

    // 수동으로 광고 파이프라인 실행
    @PostMapping("/run")
    @Throws(InterruptedException::class)
    fun runAds(
        @RequestParam(defaultValue = "3") n: Int
    ): RsData<String> {
        adsService.runWeeklyAds(n)
        return RsData("광고 실행 성공", "200", "${n}개 동물 인스타그램 업로드 완료")
    }
}
