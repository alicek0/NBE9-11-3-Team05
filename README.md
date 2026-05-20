  
  
  # PetMeeting

  [🐾 펫미팅](https://petmeeting.vercel.app/about)

  ## 🐾 프로젝트 소개

**Pet Meeting**은 공공 유기동물 데이터를 기반으로 유기동물 조회, 사용자 참여, 입양 신청, 커뮤니티 기능을 제공하는 참여형 유기동물 입양 플랫폼입니다.

기존 유기동물 서비스가 단순 정보 조회에 머무르는 경우가 많았다면, Pet Meeting은 사용자가 관심 있는 유기동물에게 응원과 댓글을 남기고, 이름을 제안하거나 투표하며, 실제 입양 신청까지 이어질 수 있도록 설계되었습니다.

또한 보호소 관리자는 입양 신청을 검토하고, 이름 후보를 확정하며, 캠페인을 통해 보호소나 유기동물을 위한 후원에도 참여할 수 있어, 관심이 실제 도움으로 이어질 수 있습니다.

이를 통해 유기동물의 발견부터 관심 형성, 입양 연결, 캠페인 후원, 후기 공유까지 하나의 흐름으로 연결하는 서비스를 목표로 합니다.

## 공식 채널

  - Instagram: [@Petmeeting](https://www.instagram.com/petmeeting_feed_05/)

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
  - 사용자 설문 기반 맞춤 유기동물 추천   
  - 입양 신청, 조회, 취소
  - 관리자 입양 신청 승인 / 거절

  ### 서비스 소개 / 추천                                              
  - 사이트 소개 페이지 제공                                           
  - 사용자 생활 환경, 선호 조건 기반 설문 기능                        
  - 설문 결과에 따른 유기동물 맞춤 추천      
     
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
  - 보호소 관리자 승인 후 Instagram 게시

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

<img width="1618" height="972" alt="image" src="https://github.com/user-attachments/assets/4c03e775-e73b-41d2-8157-7a325d91ad43" />



 ## 주요 API

  ### 인증

  | Method | URL | 설명 |
  | --- | --- | --- |
  | POST | `/api/v1/auth/email/start` | 이메일 가입 흐름 시작 |
  | POST | `/api/v1/auth/email/send-otp` | 인증 코드 발송 |
  | POST | `/api/v1/auth/email/verify` | 인증 코드 검증 |
  | POST | `/api/v1/auth/email/signup` | 이메일 회원가입 |
  | POST | `/api/v1/auth/email/login` | 이메일 로그인 |
  | POST | `/api/v1/auth/logout` | 로그아웃 |
  | POST | `/api/v1/auth/refresh` | Access Token 재발급 |
  | DELETE | `/api/v1/auth/withdraw` | 회원 탈퇴 |

  ### 사용자

  | Method | URL | 설명 |
  | --- | --- | --- |
  | GET | `/api/v1/me` | 내 정보 조회 |
  | GET | `/api/v1/me/profile` | 내 프로필 조회 |
  | GET | `/api/v1/me/summary` | 마이페이지 요약 조회 |
  | PATCH | `/api/v1/me/nickname` | 닉네임 수정 |
  | PATCH | `/api/v1/me/profileImg` | 프로필 이미지 수정 |
  | PATCH | `/api/v1/me/password` | 비밀번호 수정 |
  | GET | `/api/v1/me/feeds` | 내가 작성한 피드 조회 |
  | GET | `/api/v1/me/comments/feeds` | 내가 작성한 피드 댓글 조회 |
  | GET | `/api/v1/me/comments/animals` | 내가 작성한 동물 댓글 조회 |
  | GET | `/api/v1/me/cheer-animals` | 내가 응원한 동물 조회 |
  | GET | `/api/v1/me/donations` | 내 후원 목록 조회 |

  ### 유기동물

  | Method | URL | 설명 |
  | --- | --- | --- |
  | GET | `/api/v1/animals` | 유기동물 필터 조회 |
  | GET | `/api/v1/animals/{animalId}` | 유기동물 상세 조회 |
  | GET | `/api/v1/animals/recommendations` | 설문 기반 맞춤 유기동물 추천 조회 | 
  | POST | `/api/v1/animals/sync` | 유기동물 데이터 동기화 |
  | POST | `/api/v1/animals/sync/initial` | 초기 데이터 동기화 |
  | POST | `/api/v1/animals/sync/update` | 갱신 데이터 동기화 |

  ### 피드 / 댓글

  | Method | URL | 설명 |
  | --- | --- | --- |
  | GET | `/api/v1/feeds` | 피드 목록 조회 |
  | GET | `/api/v1/feeds/{feedId}` | 피드 상세 조회 |
  | POST | `/api/v1/feeds` | 피드 작성 |
  | PUT | `/api/v1/feeds/{feedId}` | 피드 수정 |
  | DELETE | `/api/v1/feeds/{feedId}` | 피드 삭제 |
  | POST | `/api/v1/feeds/images` | 피드 이미지 업로드 |
  | POST | `/api/v1/feeds/{feedId}/likes` | 피드 좋아요 토글 |
  | GET | `/api/v1/feeds/adoptable-animals` | 입양 후기 작성용 동물 목록 조회 |
  | GET | `/api/v1/feeds/{feedId}/comments` | 피드 댓글 목록 조회 |
  | POST | `/api/v1/feeds/{feedId}/comments` | 피드 댓글 작성 |
  | PATCH | `/api/v1/feeds/{feedId}/comments/{commentId}` | 피드 댓글 수정 |
  | DELETE | `/api/v1/feeds/{feedId}/comments/{commentId}` | 피드 댓글 삭제 |
  | GET | `/api/v1/animals/{animalId}/comments` | 동물 댓글 조회 |
  | POST | `/api/v1/animals/{animalId}/comments` | 동물 댓글 작성 |
  | PATCH | `/api/v1/animals/{animalId}/comments/{commentId}` | 동물 댓글 수정 |
  | DELETE | `/api/v1/animals/{animalId}/comments/{commentId}` | 동물 댓글 삭제 |

  ### 입양

  | Method | URL | 설명 |
  | --- | --- | --- |
  | GET | `/api/v1/adoptions/me` | 내 입양 신청 목록 조회 |
  | GET | `/api/v1/adoptions/{applicationId}` | 입양 신청 상세 조회 |
  | POST | `/api/v1/adoptions/{animalId}` | 입양 신청 |
  | DELETE | `/api/v1/adoptions/{applicationId}` | 입양 신청 취소 |
  | GET | `/api/v1/adoptions/admin/shelters/{careRegNo}/applications` | 관리자 입양 신청 목록 조회 |
  | GET | `/api/v1/adoptions/admin/shelters/{careRegNo}/applications/{applicationId}` | 관리자 입양 신청 상세 조회 |
  | PATCH | `/api/v1/adoptions/admin/shelters/{careRegNo}/applications/{applicationId}/review` | 입양 신청 검토 |

  ### 응원 / 후원

  | Method | URL | 설명 |
  | --- | --- | --- |
  | GET | `/api/v1/cheers/today` | 잔여 응원 횟수 조회 |
  | POST | `/api/v1/animals/{animalId}/cheers` | 응원 부여 |
  | POST | `/api/v1/donations/prepare` | 결제 준비 |
  | POST | `/api/v1/donations/complete` | 결제 완료 |
  | POST | `/api/v1/donations/webhook` | 웹훅 처리 |

  ### 캠페인 / 보호소

  | Method | URL | 설명 |
  | --- | --- | --- |
  | GET | `/api/v1/campaigns` | 현재 진행 캠페인 전체 조회 |
  | POST | `/api/v1/shelters/{shelterId}/campaign` | 보호소 캠페인 생성 |
  | GET | `/api/v1/shelters/{shelterId}/campaign` | 보호소 현재 진행 캠페인 조회 |
  | PATCH | `/api/v1/campaigns/{campaignId}/status` | 캠페인 상태 변경 |
  | GET | `/api/v1/shelters/{shelterId}` | 보호소 조회 |
  | GET | `/api/v1/shelters/` | 전체 보호소 조회 |

  ### 이름 짓기

  | Method | URL | 설명 |
  | --- | --- | --- |
  | GET | `/api/v1/naming/animals/{animalId}/candidates` | 이름 후보 조회 |
  | POST | `/api/v1/naming/animals/{animalId}/propose` | 이름 작명 제안 |
  | POST | `/api/v1/naming/candidates/{candidateId}/vote` | 기존 이름 투표 |
  | PATCH | `/api/v1/naming/candidates/{candidateId}/confirm` | 관리자 이름 확정 |
  | GET | `/api/v1/naming/admin/qualified-candidates` | 관리자용 확정 대기 목록 |
  | GET | `/api/v1/naming/admin/badwords` | 금칙어 조회 |
  | POST | `/api/v1/naming/admin/badwords` | 금칙어 추가 |
  | DELETE | `/api/v1/naming/admin/badwords/{badwordId}` | 금칙어 삭제 |

  ### 광고

  | Method | URL | 설명 |
  | --- | --- | --- |
  | GET | `/api/v1/ads/top-animals` | 응원 수 기준 Top N 동물 조회 |
  | POST | `/api/v1/ads/run` | 광고 파이프라인 수동 실행 |



  ## ERD

<img width="6941" height="5330" alt="erd 5조 일러" src="https://github.com/user-attachments/assets/2bce80fe-3554-446a-b6b8-90e0bbe64651" />


## GitHub Flow 전략

본 프로젝트는 `main` 브랜치를 기준으로 기능 단위 브랜치를 생성하고, Pull Request를 통해 코드 리뷰 후 병합하는 **GitHub Flow** 방식으로 관리했습니다.

### 브랜치 규칙

| 브랜치 | 설명 |
| --- | --- |
| `main` | 실제 배포 가능한 안정 버전 브랜치 |
| `feat/*` | 신규 기능 개발 |
| `fix/*` | 버그 수정 |
| `refactor/*` | 코드 리팩토링 |
| `docs/*` | 문서 수정 |
| `chore/*` | 설정, 빌드, 패키지 등 기타 작업 |

### 작업 프로세스

1. `main` 브랜치 최신화
2. 이슈 단위 작업 브랜치 생성
3. 기능 개발 및 테스트
4. 작업 중인 `Pull Request`는 `Draft PR`로 생성
5. Gemini Code Assist 자동 리뷰를 통해 1차 코드 품질 검토
6. 리뷰 피드백 반영 후 `Ready for review`로 전환
7. 팀원 리뷰 및 승인 후 `main` 브랜치에 병합
8. 병합 후 작업 브랜치 삭제
