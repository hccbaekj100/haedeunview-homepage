/* eslint-disable next/no-html-link-for-pages -- Native navigation avoids Vinext development Link context errors and keeps every route server-rendered. */
/* eslint-disable next/no-img-element -- Serve supplied local photographs directly to avoid image-component hydration errors in this runtime. */
import { siteConfig as c, rooms, nav } from '@/lib/site-config';
import { reviews } from '@/lib/reviews';
import { blogPosts } from '@/lib/blog-posts';
export const validPaths = [
  '/',
  ...nav.map((n) => n[2]),
  ...rooms.map((r) => '/rooms/' + r.id),
  ...blogPosts.map((p) => '/blog/' + p.slug),
];
export function pageInfo(path: string) {
  const room = rooms.find((r) => path === '/rooms/' + r.id);
  const post = blogPosts.find((p) => path === '/blog/' + p.slug);
  return {
    title: room
      ? room.id + '호 · ' + room.structure
      : post
        ? post.title
        : nav.find((n) => n[2] === path)?.[1] || '노을이 머무는 곳',
    description: room
      ? `여수 해든뷰 펜션 ${room.id}호, ${room.size}평 ${room.structure}. 기준 ${room.base}인, 최대 ${room.max}인. 여수 오션뷰 숙소 예약 문의.`
      : post
        ? post.summary
        : '여수 해든뷰 펜션 ' +
          (nav.find((n) => n[2] === path)?.[1] || '소개') +
          '. 바다와 오동도 전망을 만나는 여수 펜션, 여수 밤바다 숙소에서 편안한 휴식을 준비하세요.',
  };
}
function Photo({
  src,
  alt,
  className = '',
}: {
  src?: string;
  alt: string;
  className?: string;
}) {
  return src ? (
    <img
      width={1920}
      height={1280}
      className={'photo ' + className}
      src={src}
      alt={alt}
    />
  ) : (
    <div
      className={'photo photo-empty ' + className}

      aria-label={alt + ' 미등록'}
    >
      <span>HAEDEUNVIEW</span>
      <small>{alt} 준비 중</small>
    </div>
  );
}
function Intro({
  en,
  title,
  description,
}: {
  en: string;
  title: string;
  description: string;
}) {
  return (
    <div className="page-intro">
      <span className="eyebrow">{en}</span>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
function RoomCard({ room }: { room: (typeof rooms)[number] }) {
  return (
    <a className="room-card" href={'/rooms/' + room.id}>
      {room.photos[0] ? (
        <Photo src={room.photos[0].src} alt={room.photos[0].alt} />
      ) : (
        <div className="room-number-panel">
          <span>HAEDEUNVIEW · ROOM</span>
          <strong>{room.id}</strong>
          <small>
            {room.size}평 · {room.structure}
          </small>
        </div>
      )}
      <div className="card-body">
        <span className="eyebrow">ROOM {room.id}</span>
        <h3>
          {room.id}호 <span>↗</span>
        </h3>
        <p>{room.structure}</p>
        <div className="room-meta">
          {room.size}평{' '}
          <span>
            기준 {room.base}인 · 최대 {room.max}인
          </span>
        </div>
      </div>
    </a>
  );
}
function Posts() {
  return (
    <div className="posts">
      {blogPosts.map((p) => (
        <a href={'/blog/' + p.slug} className="post-card" key={p.slug}>
          <Photo src={p.image} alt={p.alt} />
          <div>
            <span className="eyebrow">{p.category}</span>
            <h3>{p.title}</h3>
            <p>{p.summary}</p>
            <time dateTime={p.date}>
              {p.date.replaceAll('-', '.')} · 해든뷰 편집
            </time>
          </div>
        </a>
      ))}
    </div>
  );
}
function BookingLinks() {
  return (
    <div className="actions">
      <a className="button" href={c.phoneHref}>
        예약 문의 {c.phone} ↗
      </a>
      {c.KAKAO_URL && (
        <a className="button secondary" href={c.KAKAO_URL}>
          카카오톡 문의
        </a>
      )}
      {c.NAVER_BOOKING_URL && (
        <a className="button secondary" href={c.NAVER_BOOKING_URL}>
          네이버 예약
        </a>
      )}
      {c.REALTIME_BOOKING_URL && (
        <a className="button secondary" href={c.REALTIME_BOOKING_URL}>
          실시간 예약
        </a>
      )}
    </div>
  );
}
function StayFacts() {
  return (
    <div className="facts">
      {[
        ['CHECK IN', '15:00'],
        ['CHECK OUT', '11:00'],
        ['COMFORT', '무료 Wi-Fi'],
        ['PARKING', '주차 가능'],
      ].map(([en, text]) => (
        <div key={en}>
          <small>{en}</small>
          <strong>{text}</strong>
        </div>
      ))}
    </div>
  );
}
function ReviewEmpty() {
  if (reviews.length)
    return (
      <div className="info-grid">
        {reviews.map((r) => (
          <article className="info" key={r.id}>
            {r.isExample && <strong>예시 후기</strong>}
            <p aria-label={'5점 만점에 ' + r.rating + '점'}>
              {'★'.repeat(Math.max(0, Math.min(5, Math.round(r.rating))))}{' '}
              {r.rating} / 5
            </p>
            <p>
              {r.travelType} · 숙박 기간 {r.stayPeriod}
            </p>
            <p>{r.content}</p>
          </article>
        ))}
      </div>
    );
  return (
    <div className="notice">
      <span className="eyebrow">GUEST STORIES</span>
      <h3>해든뷰에서의 이야기를 기다립니다.</h3>
      <p>실제 후기 등록 준비 중입니다. 확인된 숙박 후기만 소개하겠습니다.</p>
      <p className="muted">
        별점 · 여행 유형 · 숙박 기간 · 후기 내용은 실제 자료 확인 후 표시됩니다.
      </p>
    </div>
  );
}
export function SitePage({ path }: { path: string }) {
  const room = rooms.find((r) => path === '/rooms/' + r.id);
  const post = blogPosts.find((p) => path === '/blog/' + p.slug);
  return (
    <main id="main">
      {path === '/' ? (
        <>
          <section className="hero">
            {c.images.sunset && (
              <img
                width={1920}
                height={1280}
                src={c.images.sunset}
                alt="주황빛 노을과 수면에 비친 햇빛"
                className="hero-image"
              />
            )}
            <div className="hero-content">
              <span className="eyebrow">YOUR MOMENT BY THE SEA</span>
              <h1>
                노을이 머무는 곳,
                <br />
                여수 해든뷰
              </h1>
              <p>
                바다를 바라보며
                <br className="mobile-only" /> 여행의 속도를 잠시 늦춰보세요.
              </p>
              <div className="actions">
                <a href="/rooms" className="button light">
                  객실 둘러보기 <span>↗</span>
                </a>
                <a href={c.phoneHref} className="button outline">
                  예약 문의 {c.phone}
                </a>
              </div>
            </div>
            <div className="hero-bottom">
              <span>YEOSU · OCEAN VIEW · REST</span>
              {!c.images.sunset && <span>노을 바다 사진 준비 중</span>}
              <span>SCROLL ↓</span>
            </div>
          </section>
          <StayFacts />
          <section className="section about-preview">
            <div>
              <span className="eyebrow">A SLOWER KIND OF STAY</span>
              <h2>
                바다 가까이,
                <br />
                일상에서 조금 멀리.
              </h2>
              <a href="/about" className="text-link">
                해든뷰 이야기 ↗
              </a>
            </div>
            <div>
              <p className="lead">
                창밖의 여수 바다와 오동도 전망.
                <br />
                함께 온 사람과 나누는 느긋한 시간.
              </p>
              <p>
                여수 해든뷰 펜션에서 여행 사이의 편안한 쉼을 만나세요. 깨끗한
                객실과 여유로운 공간으로 여러분을 맞이합니다.
              </p>
              <div className="benefits">
                <span>01 바다와 오동도 전망</span>
                <span>02 깨끗한 객실</span>
                <span>03 편안한 휴식</span>
              </div>
            </div>
          </section>
          <section className="section pale">
            <div className="section-title">
              <div>
                <span className="eyebrow">FIND YOUR ROOM</span>
                <h2>우리에게 맞는 쉼</h2>
              </div>
              <a className="text-link" href="/rooms">
                전체 객실 보기 ↗
              </a>
            </div>
            <div className="room-grid">
              {[rooms[2], rooms[0], rooms[8]].map((r) => (
                <RoomCard key={r.id} room={r} />
              ))}
            </div>
          </section>
          <section className="section">
            <div className="section-title">
              <div>
                <span className="eyebrow">GUEST REVIEW</span>
                <h2>머무른 순간의 기록</h2>
              </div>
              <a className="text-link" href="/reviews">
                후기 보기 ↗
              </a>
            </div>
            <ReviewEmpty />
          </section>
          <section className="section pale">
            <div className="section-title">
              <div>
                <span className="eyebrow">JOURNAL</span>
                <h2>여수 여행, 한 페이지</h2>
              </div>
              <a href="/blog" className="text-link">
                블로그 보기 ↗
              </a>
            </div>
            <Posts />
          </section>
        </>
      ) : room ? (
        <>
          <Intro
            en={'ROOM ' + room.id}
            title={room.id + '호'}
            description={room.structure}
          />
          <section className="section room-detail">
            <figure className="room-visual">
              <Photo
                src={room.photos[0]?.src || c.images.sunset}
                alt={room.photos[0]?.alt || '바다 위로 길게 비치는 노을빛'}
                className="room-main"
              />
              {!room.photos.length && (
                <figcaption>
                  여수 여행 풍경 · 객실 내부 사진이 아닙니다.
                </figcaption>
              )}
            </figure>
            <div className="room-summary">
              <span className="eyebrow">YOUR PRIVATE REST</span>
              <h2>
                함께 머무는 시간,
                <br />
                편안한 공간.
              </h2>
              <dl>
                <div>
                  <dt>객실 면적</dt>
                  <dd>{room.size}평</dd>
                </div>
                <div>
                  <dt>숙박 인원</dt>
                  <dd>
                    기준 {room.base}인 / 최대 {room.max}인
                  </dd>
                </div>
                <div>
                  <dt>객실 구조</dt>
                  <dd>{room.structure}</dd>
                </div>
                <div>
                  <dt>이용요금</dt>
                  <dd>예약 시 확인</dd>
                </div>
              </dl>
              <BookingLinks />
            </div>
          </section>
          <section className="section pale">
            <h2>객실 갤러리</h2>
            {room.photos.length ? (
              <div className="room-grid">
                {room.photos.map((p) => (
                  <a href={p.src} key={p.src}>
                    <Photo src={p.src} alt={p.alt} />
                  </a>
                ))}
              </div>
            ) : (
              <p>
                객실 내부 사진과 세부 비품은 전화로 문의해 주세요. 제공된 여행
                풍경과 홍보 이미지를 객실 내부 사진으로 표시하지 않습니다.
              </p>
            )}
          </section>
          <section className="section">
            <h2>편의시설과 이용 안내</h2>
            <StayFacts />
            <p>전 객실 금연 · 엘리베이터 이용 가능</p>
            <p>
              추가 인원 요금, 객실별 비품, 취소·환불 규정은 예약 시 확인해
              주세요.
            </p>
            <a href="/guide" className="text-link">
              이용 안내 자세히 보기 ↗
            </a>
            <br />
            <a href="/rooms" className="text-link">
              다른 객실 비교하기 ↗
            </a>
          </section>
        </>
      ) : post ? (
        <>
          <Intro
            en={post.category}
            title={post.title}
            description={post.summary}
          />
          <article className="section article">
            <time dateTime={post.date}>{post.date} · 해든뷰 편집</time>
            <Photo src={post.image} alt={post.alt} />
            {post.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <a href="/blog" className="text-link">
              ← 전체 블로그 글
            </a>
          </article>
        </>
      ) : (
        <>
          <Intro
            en={nav.find((n) => n[2] === path)?.[0] || ''}
            title={pageInfo(path).title}
            description={
              (
                {
                  '/about': '바다를 바라보며 여행의 속도를 잠시 늦춰보세요.',
                  '/rooms':
                    '함께하는 사람과 여행의 모습에 맞는 객실을 찾아보세요.',
                  '/guide':
                    '도착부터 떠나는 순간까지, 편안한 숙박을 위한 안내입니다.',
                  '/travel': '낮의 바다부터 밤의 불빛까지, 여수를 만나보세요.',
                  '/reviews': '해든뷰에 머문 여행자의 이야기를 모읍니다.',
                  '/blog': '여수 여행과 해든뷰에서의 쉼을 위한 작은 기록.',
                  '/location': c.address,
                  '/reservation':
                    '머무르고 싶은 날짜를 알려주세요. 편안한 여행을 함께 준비하겠습니다.',
                } as Record<string, string>
              )[path] || ''
            }
          />
          {path === '/about' && (
            <>
              <section className="section about-preview">
                <Photo src={c.images.sunset} alt="노을빛이 물든 잔잔한 바다" />
                <div>
                  <span className="eyebrow">STAY WITH THE SEA</span>
                  <h2>
                    노을이 머무는 곳,
                    <br />
                    여수 해든뷰
                  </h2>
                  <p>
                    여수 바다와 오동도 전망이 함께하는 공간. 여수 해든뷰 펜션은
                    여행 중 잠시 속도를 늦추고, 함께 온 사람에게 집중할 수 있는
                    편안한 휴식을 지향합니다.
                  </p>
                  <p>
                    커플 여행부터 가족, 친구와의 여행까지. 객실별 구조와 인원을
                    비교하고 나에게 맞는 여수 오션뷰 숙소를 찾아보세요.
                  </p>
                  <a className="button" href="/rooms">
                    객실 둘러보기 ↗
                  </a>
                </div>
              </section>
              <StayFacts />
            </>
          )}
          {path === '/about' && (
            <section className="section pale">
              <div className="section-title">
                <div>
                  <span className="eyebrow">MOMENTS OF REST</span>
                  <h2>함께 꿈꾸는, 바다 곁의 하루</h2>
                </div>
              </div>
              <div className="editorial-grid">
                <figure>
                  <Photo
                    src={c.images.coupleEditorial}
                    alt="바다를 배경으로 나란히 앉은 커플의 홍보 이미지"
                  />
                  <figcaption>
                    커플 여행 홍보용 이미지 · 실제 객실 사진이 아닙니다.
                  </figcaption>
                </figure>
                <figure>
                  <Photo
                    src={c.images.sunsetEditorial}
                    alt="노을을 바라보며 차를 즐기는 홍보 이미지"
                  />
                  <figcaption>
                    휴식 분위기를 표현한 홍보용 이미지 · 실제 객실 사진이
                    아닙니다.
                  </figcaption>
                </figure>
              </div>
            </section>
          )}
          {path === '/rooms' && (
            <section className="section">
              <div className="room-grid">
                {rooms.map((r) => (
                  <RoomCard key={r.id} room={r} />
                ))}
              </div>
              <div className="notice">
                <h2>한눈에 객실 비교</h2>
                <div className="table-scroll">
                  <table>
                    <caption>객실별 구조·면적·인원 비교</caption>
                    <thead>
                      <tr>
                        <th>객실</th>
                        <th>구조</th>
                        <th>면적</th>
                        <th>기준 / 최대</th>
                        <th>요금</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rooms.map((r) => (
                        <tr key={r.id}>
                          <th scope="row">
                            <a href={'/rooms/' + r.id}>{r.id}호 ↗</a>
                          </th>
                          <td>{r.structure}</td>
                          <td>{r.size}평</td>
                          <td>
                            {r.base}인 / {r.max}인
                          </td>
                          <td>예약 시 확인</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}
          {path === '/guide' && (
            <section className="section">
              <StayFacts />
              <div className="info-grid">
                {[
                  [
                    '편안한 숙박',
                    '전 객실 금연이며 무료 Wi-Fi를 제공합니다. 주차와 엘리베이터 이용이 가능합니다.',
                  ],
                  [
                    '입실과 퇴실',
                    '체크인 15:00 / 체크아웃 11:00. 입실 일정에 문의가 있으면 사전에 전화해 주세요.',
                  ],
                  [
                    '인원과 요금',
                    '객실별 기준·최대 인원을 확인해 주세요. 추가 인원 요금 및 날짜별 이용요금은 예약 시 확인합니다.',
                  ],
                  [
                    '취소와 환불',
                    '취소·환불 규정은 예약 시 확인해 주세요. 확인되지 않은 환불 조건을 홈페이지에 임의로 안내하지 않습니다.',
                  ],
                ].map(([t, p]) => (
                  <div className="info" key={t}>
                    <h2>{t}</h2>
                    <p>{p}</p>
                  </div>
                ))}
              </div>
              <BookingLinks />
            </section>
          )}
          {path === '/travel' && (
            <section className="section">
              <div className="travel-grid">
                <div>
                  <Photo src={c.images.expo} alt="낮의 여수엑스포 풍경" />
                  <h2>낮의 여수 여행</h2>
                  <p>
                    여수엑스포 일대에서 시작하는 여수의 낮. 바다를 가까이 두고
                    여유롭게 여행을 계획해 보세요.
                  </p>
                </div>
                <div>
                  <Photo src={c.images.night} alt="여수 밤바다 야경" />
                  <h2>밤의 여수 여행</h2>
                  <p>
                    낮과 다른 분위기를 만나는 여수 밤바다. 저녁 풍경을 즐기고
                    숙소에서 편안하게 하루를 마무리하세요.
                  </p>
                </div>
              </div>
              <div className="info-grid">
                {[
                  [
                    '오동도',
                    '바다와 섬의 풍경을 만나는 여행지. 여수의 자연을 가까이 느끼는 시간을 계획해 보세요.',
                  ],
                  [
                    '낭만포차',
                    '여수의 저녁 분위기를 즐기는 여행 코스. 방문 전 영업 정보를 확인해 주세요.',
                  ],
                  [
                    '해상케이블카',
                    '높은 곳에서 여수의 바다 풍경을 만나는 코스. 운행 여부와 이용요금은 운영처에서 확인해 주세요.',
                  ],
                  [
                    '만성리 검은모래해변',
                    '검은 모래와 바다를 만나는 해변. 느긋한 바닷가 시간을 계획해 보세요.',
                  ],
                ].map(([t, p]) => (
                  <div className="info" key={t}>
                    <h3>{t}</h3>
                    <p>{p}</p>
                    <small>숙소에서의 이동 시간: 관리자 확인 필요</small>
                  </div>
                ))}
              </div>
            </section>
          )}
          {path === '/travel' && (
            <section className="section pale">
              <div className="travel-grid">
                <figure>
                  <Photo
                    src={c.images.cablecar}
                    alt="푸른 바다 위 해상케이블카와 다리, 유람선"
                  />
                  <figcaption>여수의 낮, 바다 위로 이어지는 풍경</figcaption>
                </figure>
                <figure>
                  <Photo
                    src={c.images.expoNight}
                    alt="푸른 조명과 분수가 빛나는 여수엑스포 야경"
                  />
                  <figcaption>
                    여수엑스포 야경 · 공연 운영 여부는 방문 전 확인해 주세요.
                  </figcaption>
                </figure>
              </div>
            </section>
          )}
          {path === '/reviews' && (
            <section className="section">
              <ReviewEmpty />
            </section>
          )}
          {path === '/blog' && (
            <section className="section">
              <Posts />
            </section>
          )}
          {path === '/location' && (
            <section className="section location-grid">
              <div className="address-panel">
                <span className="eyebrow">FIND HAEDEUNVIEW</span>
                <h2>
                  바다 곁,
                  <br />
                  해든뷰로 오세요.
                </h2>
                <p>{c.address}</p>
                <a
                  className="button"
                  href={
                    'https://map.naver.com/p/search/' +
                    encodeURIComponent(c.address)
                  }
                >
                  네이버 지도에서 위치 보기 ↗
                </a>
              </div>
              <div>
                <h2>방문 안내</h2>
                <dl>
                  <div>
                    <dt>주소</dt>
                    <dd>{c.address}</dd>
                  </div>
                  <div>
                    <dt>주차</dt>
                    <dd>주차 가능</dd>
                  </div>
                  <div>
                    <dt>건물 이용</dt>
                    <dd>엘리베이터 이용 가능</dd>
                  </div>
                  <div>
                    <dt>연락처</dt>
                    <dd>
                      <a href={c.phoneHref}>{c.phone}</a>
                    </dd>
                  </div>
                </dl>
                <p>
                  역·터미널에서의 이동 시간과 대중교통 경로는 관리자 확인이
                  필요합니다. 출발 전 지도에서 최신 경로를 확인해 주세요.
                </p>
              </div>
            </section>
          )}
          {path === '/reservation' && (
            <section className="section reservation">
              <div className="reservation-call">
                <span className="eyebrow">BOOK YOUR STAY</span>
                <h2>
                  여수에서의 다음 쉼,
                  <br />
                  해든뷰에서 만나요.
                </h2>
                <BookingLinks />
                <p>
                  날짜 · 객실 · 인원을 알려주시면 예약 가능 여부와 요금을 안내해
                  드립니다.
                </p>
                <div className="channel-status">
                  {!c.KAKAO_URL && <span>카카오톡 · 연결 준비 중</span>}
                  {!c.NAVER_BOOKING_URL && (
                    <span>네이버 예약 · 연결 준비 중</span>
                  )}
                </div>
              </div>
              <StayFacts />
              <div className="info-grid">
                <div className="info">
                  <h3>01. 객실을 골라주세요</h3>
                  <p>객실 구조와 기준·최대 인원을 비교해 주세요.</p>
                  <a href="/rooms" className="text-link">
                    전체 객실 보기 ↗
                  </a>
                </div>
                <div className="info">
                  <h3>02. 전화로 문의해 주세요</h3>
                  <p>
                    희망 날짜와 인원을 말씀해 주세요. 요금은 예약 시 확인합니다.
                  </p>
                </div>
                <div className="info">
                  <h3>03. 예약 조건을 확인해 주세요</h3>
                  <p>
                    결제 방법, 예약 확정 절차, 취소·환불 기준은 안내받은 내용을
                    확인해 주세요.
                  </p>
                </div>
              </div>
            </section>
          )}
        </>
      )}
      {path !== '/reservation' && (
        <section className="closing">
          <span className="eyebrow">MAKE YOURSELF AT HOME</span>
          <h2>다음 여행은, 여수 해든뷰.</h2>
          <a href="/reservation" className="button light">
            예약 안내 보기 ↗
          </a>
        </section>
      )}
    </main>
  );
}
