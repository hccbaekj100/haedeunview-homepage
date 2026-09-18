// 확인 출처: http://haedeunview.com/include/room.php?biz_code=P202203007&menutree_idx=4575459
// 요금은 공식 사이트에서도 고정 금액 대신 실시간 예약 조회로 안내합니다.
const sharedFacilities='TV, 에어컨, 냉장고, 식탁, 전자레인지, 인덕션, 전기밥솥, 전기포트, 주방기구와 식기류, 욕실용품(샴푸·린스·바디워시·비누·수건·치약), 드라이기, Wi-Fi';
const details={
  201:{standard:4,maximum:5,type:'온돌룸 + 분리형 거실 · 화장실 1개',area:'약 99㎡',bedding:'침구류'},
  301:{standard:2,maximum:3,type:'온돌룸 + 분리형 거실 · 화장실 1개',area:'약 99㎡',bedding:'침구류'},
  302:{standard:2,maximum:2,type:'킹 침대 1개 · 화장실 1개',area:'약 50㎡',bedding:'킹 침대 1개'},
  303:{standard:2,maximum:2,type:'킹 침대 1개 · 화장실 1개',area:'약 50㎡',bedding:'킹 침대 1개'},
  304:{standard:4,maximum:5,type:'퀸 침대방 + 분리형 거실 · 화장실 1개',area:'약 63㎡',bedding:'퀸 침대 1개'},
  401:{standard:2,maximum:2,type:'킹 침대 1개 · 화장실 1개',area:'약 50㎡',bedding:'킹 침대 1개'},
  402:{standard:2,maximum:2,type:'킹 침대 1개 · 화장실 1개',area:'약 50㎡',bedding:'킹 침대 1개'},
  403:{standard:2,maximum:4,type:'복층 온돌룸 + 킹 침대 + 분리형 거실 · 화장실 1개',area:'약 79㎡',bedding:'킹 침대 1개'},
  404:{standard:4,maximum:5,type:'복층 온돌룸 + 킹 침대방 + 분리형 거실 · 화장실 1개',area:'약 79㎡',bedding:'킹 침대 1개'}
};
export const roomDetails=Object.fromEntries(Object.entries(details).map(([id,room])=>[id,{
  standard:`${room.standard}명`,maximum:`${room.maximum}명`,type:room.type,area:room.area,
  facilities:`${room.bedding} · TV · Wi-Fi · 취사 시설 · 욕실용품`,
  amenities:`${room.bedding}, ${sharedFacilities}`,
  weekday:'실시간 예약에서 확인',weekend:'실시간 예약에서 확인',peak:'실시간 예약에서 확인',
  checkin:'15:00~22:00',checkout:'11:00',
  extra:'기준 인원 초과 시 성인(12세 이상) 20,000원, 아동(24개월~12세 미만)·유아(24개월 미만) 10,000원',
  notes:'야외 바비큐 이용 가능. 객실 요금은 날짜와 예약 조건에 따라 실시간 예약에서 확인해주세요.'
}]));
