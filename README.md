  
  
  # PetMeeting 작성중~

  ## 🐾 프로젝트 소개

**Pet Meeting**은 공공 유기동물 데이터를 기반으로 유기동물 조회, 사용자 참여, 입양 신청, 커뮤니티 기능을 제공하는 참여형 유기동물 입양 플랫폼입니다.

기존 유기동물 서비스가 단순 정보 조회에 머무르는 경우가 많았다면, Pet Meeting은 사용자가 관심 있는 유기동물에게 응원과 댓글을 남기고, 이름을 제안하거나 투표하며, 실제 입양 신청까지 이어질 수 있도록 설계되었습니다.

또한 보호소 관리자는 입양 신청을 검토하고, 이름 후보를 확정하며, 캠페인을 통해 보호소나 유기동물을 위한 후원에도 참여할 수 있어, 관심이 실제 도움으로 이어질 수 있습니다.

이를 통해 유기동물의 발견부터 관심 형성, 입양 연결, 캠페인 후원, 후기 공유까지 하나의 흐름으로 연결하는 서비스를 목표로 합니다.

  ## 팀원

  | 이름 | 담당 |
  | --- | --- |
  | 윤지웅 | 팀장 / 회원 / 인증 파트 담당 |
  | 강민경 | 프론트엔드 리드 / 노션 관리 / 댓글 / 보호소 캠페인 / 회원 프로필 / 결제 / 공통 업무 파트 담당 |
  | 최준 | 서기 / 유기동물 조회 / 응원 하트 시스템 파트 담당 |
  | 고주훈 | Git 관리자 / 소셜 피드 / 파트 Top N 동물 광고담당 |
  | 서동건 | WBS 관리자 / 입양 신청 / 입양 관리 파트 담당/ DB 구축 |

  ## 기술 스택

### Frontend

<img src="https://img.shields.io/badge/Next.js 16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/Tailwind CSS 4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
<img src="https://img.shields.io/badge/Radix UI-161618?style=for-the-badge&logo=radixui&logoColor=white">
<img src="https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white">
<img src="https://img.shields.io/badge/PortOne-00C4B4?style=for-the-badge&logoColor=white">

### Backend

<img src="https://img.shields.io/badge/Kotlin-7F52FF?style=for-the-badge&logo=kotlin&logoColor=white"> <img src="https://img.shields.io/badge/Java 21-007396?style=for-the-badge&logo=openjdk&logoColor=white">
<img src="https://img.shields.io/badge/Spring Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">
<img src="https://img.shields.io/badge/Spring Security-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white">
<img src="https://img.shields.io/badge/JPA-6DB33F?style=for-the-badge&logo=spring&logoColor=white">
<img src="https://img.shields.io/badge/QueryDSL-0769AD?style=for-the-badge&logoColor=white">
<img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white">

### Database & Infra

<img src="https://img.shields.io/badge/MySQL 8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white"> <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white">
<img src="https://img.shields.io/badge/AWS S3-569A31?style=for-the-badge&logo=amazons3&logoColor=white">
<img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white">

### API & Monitoring

<img src="https://img.shields.io/badge/Public Data API-0052CC?style=for-the-badge&logoColor=white"> <img src="https://img.shields.io/badge/Google OAuth2-4285F4?style=for-the-badge&logo=google&logoColor=white">
<img src="https://img.shields.io/badge/PortOne-00C4B4?style=for-the-badge&logoColor=white">
<img src="https://img.shields.io/badge/Instagram API-E4405F?style=for-the-badge&logo=instagram&logoColor=white">
<img src="https://img.shields.io/badge/Prometheus-E6522C?style=for-the-badge&logo=prometheus&logoColor=white">
<img src="https://img.shields.io/badge/Grafana-F46800?style=for-the-badge&logo=grafana&logoColor=white">

### Test

<img src="https://img.shields.io/badge/JUnit 5-25A162?style=for-the-badge&logo=junit5&logoColor=white"> <img src="https://img.shields.io/badge/Mockito-78A641?style=for-the-badge&logoColor=white"> <img src="https://img.shields.io/badge/k6-7D64FF?style=for-the-badge&logo=k6&logoColor=white">

 ## 주요 기능

  ### 인증 / 사용자
  - 이메일 회원가입 및 로그인
  - Google OAuth2 로그인
  - JWT 기반 인증 및 토큰 재발급
  - 마이페이지, 프로필 수정, 회원 탈퇴

  ### 유기동물 / 입양
  - 유기동물 목록 및 상세 조회
  - 지역, 축종, 상태 기반 필터링
  - 입양 신청, 조회, 취소
  - 관리자 입양 신청 승인 / 거절

  ### 커뮤니티
  - 피드 작성, 수정, 삭제, 조회
  - 입양 후기 작성
  - 피드 및 동물 댓글
  - 피드 좋아요

  ### 응원 / 후원
  - 동물 응원
  - 인기 동물 조회
  - 후원 결제 및 결제 완료 처리
  - 사용자 후원 내역 조회

  ### 캠페인 / 이름 짓기
  - 보호소 캠페인 생성 및 조회
  - 캠페인 상태 관리
  - 동물 이름 후보 제안 및 투표
  - 관리자 이름 확정

  ### 광고 자동화
  - 응원 수 기준 Top N 동물 선정
  - 카드뉴스 이미지 생성
  - S3 이미지 업로드
  - Instagram 업로드 자동화

  ## 프로젝트 구조

  ```text
  src/main/java/com/team05/petmeeting
  ├── domain
  │   ├── adoption
  │   ├── ads
  │   ├── animal
  │   ├── campaign
  │   ├── cheer
  │   ├── comment
  │   ├── donation
  │   ├── feed
  │   ├── naming
  │   ├── shelter
  │   └── user
  ├── global
  │   ├── config
  │   ├── entity
  │   ├── exception
  │   ├── initData
  │   ├── rsData
  │   └── security
  └── infra
      └── s3
  ```

  ## 시스템 구성도

### 임시
<img width="1774" height="887" alt="B77E3459-CD1F-47D1-9CC6-99BD657460EC" src="https://github.com/user-attachments/assets/c235fa6a-be5b-4f01-92b6-4bcffc2a97da" />


  ## 주요 API

  ### 인증

  | Method | URL | 설명 |
  | --- | --- | --- |
  | POST | /api/v1/auth/email/start | 이메일 가입 흐름 시작 |
  | POST | /api/v1/auth/email/send-otp | 인증 코드 발송 |
  | POST | /api/v1/auth/email/verify | 인증 코드 검증 |
  | POST | /api/v1/auth/email/signup | 이메일 회원가입 |
  | POST | /api/v1/auth/email/login | 이메일 로그인 |
  | POST | /api/v1/auth/logout | 로그아웃 |
  | POST | /api/v1/auth/refresh | Access Token 재발급 |
  | DELETE | /api/v1/auth/withdraw | 회원 탈퇴 |

  ### 유기동물

  | Method | URL | 설명 |
  | --- | --- | --- |
  | GET | /api/v1/animals | 유기동물 목록 조회 |
  | GET | /api/v1/animals/{animalId} | 유기동물 상세 조회 |
  | POST | /api/v1/animals/sync | 유기동물 데이터 동기화 |
  | POST | /api/v1/animals/sync/initial | 초기 데이터 동기화 |
  | POST | /api/v1/animals/sync/update | 갱신 데이터 동기화 |

  ### 피드

  | Method | URL | 설명 |
  | --- | --- | --- |
  | GET | /api/v1/feeds | 피드 목록 조회 |
  | GET | /api/v1/feeds/{feedId} | 피드 상세 조회 |
  | POST | /api/v1/feeds | 피드 작성 |
  | PUT | /api/v1/feeds/{feedId} | 피드 수정 |
  | DELETE | /api/v1/feeds/{feedId} | 피드 삭제 |
  | POST | /api/v1/feeds/images | 피드 이미지 업로드 |
  | POST | /api/v1/feeds/{feedId}/likes | 피드 좋아요 토글 |
  | GET | /api/v1/feeds/adoptable-animals | 입양 후기 작성용 동물 목록 조회 |

  ### 입양

  | Method | URL | 설명 |
  | --- | --- | --- |
  | GET | /api/v1/adoptions/me | 내 입양 신청 목록 조회 |
  | GET | /api/v1/adoptions/{applicationId} | 입양 신청 상세 조회 |
  | POST | /api/v1/adoptions/{animalId} | 입양 신청 |
  | DELETE | /api/v1/adoptions/{applicationId} | 입양 신청 취소 |
  | GET | /api/v1/adoptions/admin/shelters/{careRegNo}/applications | 관리자 입양 신청 목록 조회 |
  | GET | /api/v1/adoptions/admin/shelters/{careRegNo}/applications/{applicationId} | 관리자 입양 신청 상세 조회 |
  | PATCH | /api/v1/adoptions/admin/shelters/{careRegNo}/applications/{applicationId}/review | 입양 신청 검토 |

  ### 후원

  | Method | URL | 설명 |
  | --- | --- | --- |
  | POST | /api/v1/donations/prepare | 결제 준비 |
  | POST | /api/v1/donations/complete | 결제 완료 |
  | POST | /api/v1/donations/webhook | 결제 웹훅 처리 |
  | GET | /api/v1/me/donations | 내 후원 목록 조회 |

  ### 광고

  | Method | URL | 설명 |
  | --- | --- | --- |
  | GET | /api/v1/ads/top-animals | 응원 수 기준 Top N 동물 조회 |
  | POST | /api/v1/ads/run | 광고 파이프라인 수동 실행 |



  ## ERD
  ### 임시

  <img width="1155" height="865" alt="5조_ERD" src="https://github.com/user-attachments/assets/b8896c48-c1d8-48b3-a304-8b1c56f27c2a" />


