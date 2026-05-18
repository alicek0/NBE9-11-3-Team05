import http from 'k6/http';
import { check, sleep } from 'k6';

// 무작위 쿼리 생성을 위한 데이터 풀(Pool) 정의
const regions = ['강원', '경기', '서울', '부산', '전남', '충남', '경북'];
const kinds = ['개', '고양이', '기타'];
const stateGroups = [0, 1];

export const options = {
    stages: [
        { duration: '15s', target: 30 },  // 15초 동안 VU 0 -> 30 점진적 증가
        { duration: '30s', target: 60 },  // 30초 동안 VU 60 피크 유지
        { duration: '15s', target: 0 },   // 15초 동안 VU 0 완만히 감소
    ],
    thresholds: {
        http_req_failed: ['rate<0.05'],   // 에러율 5% 미만 조건
    },
};

export default function () {
    const randomRegion = regions[Math.floor(Math.random() * regions.length)];
    const randomKind = kinds[Math.floor(Math.random() * kinds.length)];
    const randomStateGroup = stateGroups[Math.floor(Math.random() * stateGroups.length)];
    const randomPage = Math.floor(Math.random() * 5);

    // 🔏 톰캣 11 호환을 위해 한글 변수들을 encodeURIComponent로 감싸줍니다.
    const encodedRegion = encodeURIComponent(randomRegion);
    const encodedKind = encodeURIComponent(randomKind);

    // 🔗 인코딩된 변수를 URL에 매핑합니다.
    const url = `http://localhost:8080/api/v1/animals?page=${randomPage}&size=12&region=${encodedRegion}&kind=${encodedKind}&stateGroup=${randomStateGroup}`;

    const params = {
        headers: { 'Content-Type': 'application/json' },
    };

    const res = http.get(url, params);

    check(res, {
        'status is 200': (r) => r.status === 200,
    });

    sleep(Math.random() * 0.5 + 1.0);
}