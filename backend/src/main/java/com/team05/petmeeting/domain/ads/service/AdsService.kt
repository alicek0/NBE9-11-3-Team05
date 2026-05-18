package com.team05.petmeeting.domain.ads.service

import com.fasterxml.jackson.databind.ObjectMapper
import com.team05.petmeeting.domain.ads.client.InstagramClient
import com.team05.petmeeting.domain.animal.entity.Animal
import com.team05.petmeeting.domain.animal.repository.AnimalRepository
import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Service

@Service
class AdsService(
    private val animalRepository: AnimalRepository,
    private val cardNewsService: CardNewsService,
    private val instagramClient: InstagramClient,
    private val objectMapper: ObjectMapper
) {
    // Top N 동물 조회 (보호중인 동물만)
    fun getTopAnimals(n: Int): List<Animal> {
        return animalRepository.findAllByStateGroupOrderByTotalCheerCountDesc(
            0,  // 0 = 보호중
            PageRequest.of(0, n)
        )
    }

    // 전체 파이프라인 실행
    @Throws(InterruptedException::class)
    fun runWeeklyAds(n: Int) {
        val topAnimals = getTopAnimals(n)

        for (animal in topAnimals) {
            // 1. 카드뉴스 생성
            val cardNews = cardNewsService.generateCardNews(animal)

            // 2. 컨테이너 생성
            val containerResponse = instagramClient.createMediaContainer(
                cardNews.imageUrl,
                cardNews.caption
            ) ?: throw IllegalStateException("인스타그램 미디어 컨테이너 응답이 비어있습니다.")
            val containerId = extractId(containerResponse)

            // 3. 인스타그램 이미지 처리 완료 대기
            waitUntilContainerReady(containerId)

            // 4. 게시
            instagramClient.publishMedia(containerId)
        }
    }

    private fun extractId(response: String): String {
        return try {
            objectMapper.readTree(response)
                .path("id")
                .asText(null)
                ?: throw IllegalStateException("인스타그램 응답에서 id를 찾을 수 없습니다.")
        } catch (e: Exception) {
            throw IllegalStateException("인스타그램 미디어 컨테이너 ID 추출 실패", e)
        }
    }

    private fun waitUntilContainerReady(containerId: String) {
        repeat(MAX_STATUS_CHECK_COUNT) {
            val statusResponse = instagramClient.getContainerStatus(containerId)
            val statusCode = extractStatusCode(statusResponse)

            if (statusCode == "FINISHED") {
                return
            }

            if (statusCode == "ERROR") {
                throw IllegalStateException("인스타그램 미디어 컨테이너 처리 실패")
            }

            Thread.sleep(STATUS_CHECK_INTERVAL_MILLIS)
        }

        throw IllegalStateException("인스타그램 미디어 컨테이너 처리 시간 초과")
    }

    private fun extractStatusCode(response: String): String {
        return try {
            objectMapper.readTree(response)
                .path("status_code")
                .asText(null)
                ?: throw IllegalStateException("인스타그램 응답에서 status_code를 찾을 수 없습니다.")
        } catch (e: Exception) {
            throw IllegalStateException("인스타그램 미디어 컨테이너 상태 추출 실패", e)
        }
    }

    // @Scheduled(cron = "0 0 9 * * MON") // 매주 월요일 오전 9시 스프링이 직접 자동 실행하는 어노테이션, 일단 주석처리
    @Throws(InterruptedException::class)
    fun scheduledWeeklyAds() {
        runWeeklyAds(DEFAULT_WEEKLY_ADS_COUNT)
    }

    companion object {
        private const val DEFAULT_WEEKLY_ADS_COUNT = 3
        private const val MAX_STATUS_CHECK_COUNT = 5
        private const val STATUS_CHECK_INTERVAL_MILLIS = 3000L
    }
}
