package com.team05.petmeeting.domain.ads.dto

import com.team05.petmeeting.domain.ads.entity.AdsPostStatus

data class AdsPostReviewReq @JvmOverloads constructor(
    val status: AdsPostStatus? = null,
    val rejectionReason: String? = null,
)
