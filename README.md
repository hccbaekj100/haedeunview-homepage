# 여수 해든뷰 펜션 홈페이지

## Home 예약 랜딩페이지 개선
기존 20개 페이지를 유지하면서 Home에 장점 4개, 201호 우선 추천, 전체 객실 비교, 하루의 흐름, 준비 중 후기 3칸, 실제 관광지 사진 4개, 블로그 3개, 위치·주차, 최종 예약 영역을 적용했습니다. 공통 헤더는 고정형이며 예약 선택창과 모바일 하단 전화·객실 보기·예약하기가 모든 페이지에서 제공됩니다.

- `scripts/home.mjs`: Home 전용 템플릿. `scripts/build.mjs`: 기존 공통 헤더·푸터·20개 경로 유지.
- `src/landing.css`: 반응형 확장. `src/site.js`: 메뉴·층별 필터 유지, 예약 대화상자 및 절제된 등장 효과 추가.
- `data/landing.mjs`: 실제 대표 사진, 주차, 실제 후기, 관광지 사진·출처·거리·이동 정보, 공유 이미지 설정.
- `landing.heroPhoto`와 `dayMoments[].actualPhoto`에 실제 해든뷰 사진을 입력하세요. 현재는 기존 출처가 확인된 분위기용 사진임을 표시합니다.
- 추천 객실은 201호를 우선 표시하고 `data/site.mjs`에서 실제 사진이 등록된 나머지 객실을 자동 추가합니다. 인원·시설·요금은 기존 객실 데이터를 공유합니다.
- 후기와 거리·시간 수치는 확인 전 임의로 넣지 않았습니다. 외부 숙소 예약 주소는 기존 `site.booking`에서 관리합니다.
- 공유 이미지에는 기존 노을 대표 사진을 연결했습니다. 실제 숙소 사진 제공 후 `landing.shareImage`를 교체할 수 있습니다.

### 관광지 사진 출처
원본은 `assets-source/`, 최적화 파일은 `dist/assets/`에 보관합니다. 아래 라이선스가 해당 사진의 축소·회전본에도 적용됩니다. 사진 크기는 축소했고 화면 비율에 따라 크롭됩니다. 케이블카 사진은 방향을 바로잡았습니다. 촬영 당시 모습으로 현재 운영 상황을 보장하지 않습니다.

| 사진 | 저작자·촬영연도 | 출처 | 라이선스 |
|---|---|---|---|
| 오동도 | Mikhail Kim · 2009 | https://commons.wikimedia.org/wiki/File:Odongdo_2.jpg | https://creativecommons.org/licenses/by-sa/2.0/ |
| 여수 엑스포 빅오쇼 | Jeongyeol Park · 2012 | https://commons.wikimedia.org/wiki/File:The_Big-O_Show_(Yeosu_EXPO)_-_panoramio.jpg | https://creativecommons.org/licenses/by/3.0/ |
| 케이블카 전망 | Toobigtokale · 2022 | https://commons.wikimedia.org/wiki/File:Yeosu_Maritime_Cable_Car_View.jpg | https://creativecommons.org/licenses/by-sa/4.0/ |
| 여수 밤바다 | thomas park · 2010 | https://commons.wikimedia.org/wiki/File:Yeosu_by_night_2.jpg | https://creativecommons.org/licenses/by/2.0/ |

현재 폴더 최초 확인 시 .git 이외의 기존 홈페이지·목업·사진 파일이 없었습니다. 기존 파일 삭제 없이 정적 다페이지 홈페이지 20개를 제작했습니다.

## 수정 위치
- `data/site.mjs`: 상호·전화·주소·외부 예약 주소, 객실 9개, 블로그 글 3개, 관광지 자료.
- `scripts/build.mjs`: 공통 헤더·푸터 및 페이지 생성 템플릿.
- `src/style.css`: 반응형 디자인.
- `src/site.js`: 모바일 메뉴·층별 객실 보기.
- `dist/`: 공개 홈페이지 파일, 사진 및 아이콘. 이 폴더의 사진 원본은 유지해주세요.
- `site-origin.json`: 공개 사이트 원점 URL. 변경 시 다시 빌드합니다.
- `routes.json`: 전체 20개 페이지 경로.

## 명령
`npm run build`로 데이터 변경을 페이지에 반영합니다. `npm start`로 로컬 미리보기를 실행합니다. `npm run check`는 전체 경로, 링크, 메타태그, 이미지 alt, 전화번호와 인코딩을 확인합니다. 추가 패키지 설치는 필요하지 않습니다.

## 정보 확인 후 업데이트할 항목
모든 객실의 실제 사진, 갤러리, 기준·최대 인원, 구조, 시설·비품, 평일·주말·성수기 요금, 입퇴실 시간, 추가 인원 요금, 이용 주의사항. 공통 주차·취사·반려동물·흡연·취소환불 규정, 실제 고객 후기.

`site.booking.yanolja`, `site.booking.yeogi`에 확인된 숙소 예약 URL을 입력하면 모든 카드·상세 페이지의 해당 버튼이 새 창 링크로 활성화됩니다. 미확인 상태는 null을 유지합니다. 전화 링크는 tel:01038051937입니다. 네이버지도는 제공된 전체 도로명 주소 검색으로 연결됩니다.

## 이미지
실제 숙소 사진이 제공되지 않아 객실은 번호가 적힌 준비 중 이미지로 표시합니다. 노을·해변 사진은 Unsplash 분위기용 대표 사진으로 숙소 전망 또는 여수 실사로 표기하지 않았습니다.
- https://images.unsplash.com/photo-1475924156734-496f6cac6ec1
- https://images.unsplash.com/photo-1507525428034-b723cf961d3e

관광지 및 여행 동선 참고: 여수시 공식 관광안내지도 https://www.yeosu.go.kr/tour/images/tour/download/tour_map_251111.pdf

## 페이지
홈 `/`, 펜션 소개 `/about/`, 객실 목록 `/rooms/`, 이용 안내 `/guide/`, 관광지 `/travel/`, 후기 `/reviews/`, 블로그 `/blog/`, 오시는 길 `/location/`.
객실 상세 `/rooms/201/`, `/rooms/301/`, `/rooms/302/`, `/rooms/303/`, `/rooms/304/`, `/rooms/401/`, `/rooms/402/`, `/rooms/403/`, `/rooms/404/`.
블로그 상세 `/blog/yeosu-two-days/`, `/blog/sea-and-sunset/`, `/blog/comfortable-room/`.

## Home CTA 정리 (후속 개선)
- Home의 첫 화면은 추천 객실 이동과 전화 문의로 단순화했습니다.
- 추천 객실은 확인된 사진·정보 우선 3개이며, 자료 미확인 상태에서는 201·301·401호에 준비 중 표시를 유지합니다.
- 긴 객실 비교표는 `scripts/room-comparison.mjs`로 분리해 객실 안내 페이지에 유지합니다. Home에는 9개 객실 링크와 객실 찾기 CTA만 표시합니다.
- 소개·하루·후기·관광지·블로그 CTA 문구를 요청에 맞게 정리했습니다.
- 전화 예약 아이콘과 대표 CTA를 통일하고, 모바일 하단 바는 푸터가 보이면 숨깁니다.
- 실제 객실 사진, 시설·인원·요금, 외부 예약 주소와 고객 후기는 아직 제공되지 않았습니다. 실제 자료를 가장하지 않도록 준비 중 안내를 유지합니다.
