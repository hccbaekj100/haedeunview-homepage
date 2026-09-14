# 여수 해든뷰 펜션 홈페이지

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
