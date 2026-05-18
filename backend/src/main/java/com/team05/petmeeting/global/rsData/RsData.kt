package com.team05.petmeeting.global.rsData

data class RsData<T>(
    val msg: String,
    val resultCode: String,
    val data: T? = null
)
