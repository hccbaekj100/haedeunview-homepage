export type Review = {
  id: string;
  rating: number;
  travelType: string;
  stayPeriod: string;
  content: string;
  isExample: boolean;
};
// 실제 자료 확인 후 추가하세요. 예시 문장을 넣을 때는 isExample: true를 지정합니다.
export const reviews: Review[] = [];
