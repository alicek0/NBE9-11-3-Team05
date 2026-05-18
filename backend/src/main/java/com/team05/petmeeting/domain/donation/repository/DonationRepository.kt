package com.team05.petmeeting.domain.donation.repository

import com.team05.petmeeting.domain.donation.entity.Donation
import org.springframework.data.jpa.repository.EntityGraph
import org.springframework.data.jpa.repository.JpaRepository

interface DonationRepository : JpaRepository<Donation, Long> {
    fun findByUser_Id(userId: Long): MutableList<Donation>

    @EntityGraph(attributePaths = ["campaign"])
    fun findByPaymentId(s: String): Donation // todo: Donation?으로 바꾸고 검증 로직 서비스에 만들기
}
