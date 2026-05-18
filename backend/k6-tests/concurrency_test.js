import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    scenarios: {
        concurrency_spike: {
            executor: 'constant-vus',
            vus: 100,         // 동시에 요청을 보낼 가상 사용자(Thread) 수
            duration: '10s',   // 10초 동안 부하 지속
        },
    },
    thresholds: {
        http_req_failed: ['rate<0.01'], // 실패율이 1% 미만이어야 테스트 통과
    },
};

// 프로젝트의 실제 테스트용 동물 ID와 API URL 경로로 수정
const ANIMAL_ID = 54097;
const BASE_URL = `http://localhost:8080/api/v1/animals/${ANIMAL_ID}/cheers/test`;

export default function () {
    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // 테스트용 응원 API 호출 (POST/PATCH 등 본인 스펙에 맞게 http.patch 등으로 변경 가능)
    const res = http.post(BASE_URL, {}, params);

    // 응답 코드가 200 정상인지 체크
    check(res, {
        'status is 200': (r) => r.status === 200,
    });

    // 0.1초마다 요청을 반복하여 10초간 촘촘하게 동시성 부하 유도
    // 예상 총 요청수 100명 * 10초 * 10번(초당 요청) = 10,000번
    sleep(0.1);
}