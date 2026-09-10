'use client';
/* eslint-disable next/no-html-link-for-pages -- Native navigation avoids Vinext development Link context errors and keeps every route server-rendered. */

import { useState } from 'react';
import { nav, rooms } from '@/lib/site-config';
export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [roomOpen, setRoomOpen] = useState(false);
  return (
    <header className="header">
      <a href="/" className="brand" aria-label="해든뷰 홈">
        <span>HAEDEUNVIEW</span>
        <small>여수 해든뷰 펜션</small>
      </a>
      <button
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="main-menu"
        onClick={() => setOpen(!open)}
      >
        {open ? '메뉴 닫기 ×' : '메뉴 열기 ☰'}
      </button>
      <nav
        id="main-menu"
        className={open ? 'navigation opened' : 'navigation'}
        aria-label="주 메뉴"
      >
        {nav.map(([en, ko, url]) => (
          <div
            className="nav-item"
            key={url}
            onMouseEnter={() =>
              url === '/rooms' &&
              window.matchMedia('(min-width:1001px) and (hover:hover)')
                .matches &&
              setRoomOpen(true)
            }
            onMouseLeave={() => url === '/rooms' && setRoomOpen(false)}
          >
            <div className="nav-label">
              <a
                href={url}
                onClick={(e) => {
                  if (
                    url === '/rooms' &&
                    window.matchMedia('(max-width:1000px)').matches
                  ) {
                    e.preventDefault();
                    setRoomOpen(!roomOpen);
                  } else {
                    setOpen(false);
                    setRoomOpen(false);
                  }
                }}
              >
                <small>{en}</small>
                <span>{ko}</span>
              </a>
              {url === '/rooms' && (
                <button
                  className="room-toggle"
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') setRoomOpen(false);
                  }}
                  aria-label="객실 하위 메뉴"
                  aria-expanded={roomOpen}
                  aria-controls="room-menu"
                  onClick={() => setRoomOpen(!roomOpen)}
                >
                  ⌄
                </button>
              )}
            </div>
            {url === '/rooms' && roomOpen && (
              <div className="room-menu" id="room-menu">
                <a
                  href="/rooms"
                  onClick={() => {
                    setOpen(false);
                    setRoomOpen(false);
                  }}
                >
                  전체 객실 비교
                </a>
                {rooms.map((r) => (
                  <a
                    href={'/rooms/' + r.id}
                    key={r.id}
                    onClick={() => {
                      setOpen(false);
                      setRoomOpen(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') setRoomOpen(false);
                    }}
                  >
                    {r.id}호
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </header>
  );
}
