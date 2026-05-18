package com.team05.petmeeting.domain.donation.controller

import com.team05.petmeeting.domain.donation.dto.CompleteReq
import com.team05.petmeeting.domain.donation.dto.CompleteRes
import com.team05.petmeeting.domain.donation.dto.PrepareReq
import com.team05.petmeeting.domain.donation.dto.PrepareRes
import com.team05.petmeeting.domain.donation.service.DonationService
import com.team05.petmeeting.global.security.userdetails.CustomUserDetails
import io.swagger.v3.oas.annotations.Operation
import jakarta.validation.Valid
import org.springframework.http.ResponseEntity
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/v1/donations")
class DonationController(private val donationService: DonationService) {
    @Operation(summary = "결제 준비")
    @PostMapping("/prepare")
    fun prepareDonation(
        @AuthenticationPrincipal userDetails: CustomUserDetails,
        @Valid @RequestBody req: PrepareReq
    ): ResponseEntity<PrepareRes> {
        println("1. /prepare 엔드포인트 진입: amount=${req.amount}")
        val res = donationService.prepare(userDetails.userId, req)
        println("2. /prepare 엔드포인트 완료: res=$res")
        return ResponseEntity.ok(res)
    }

    @Operation(summary = "결제 완료")
    @PostMapping("/complete")
    suspend fun completeDonation(
        @AuthenticationPrincipal userDetails: CustomUserDetails,
        @Valid @RequestBody req: CompleteReq
    ): ResponseEntity<CompleteRes> {
        println("1. /complete 엔드포인트 진입: paymentId=${req.paymentId}")
        val res = donationService.donate(userDetails.userId, req)
        println("2. /complete 엔드포인트 완료: res=$res")
        return ResponseEntity.ok(res)
    }
}
