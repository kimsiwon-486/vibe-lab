// =====================================================================
//  별하람중학교 바이브코딩 실습실 — 설정 파일
//  연수 때마다 이 파일만 고치면 됩니다.
// =====================================================================
const CONFIG = {
  // Firebase 실시간 데이터베이스 주소 (README.md 1단계 참고)
  // 비워 두면 "체험 모드"로 동작해요. 이 컴퓨터 브라우저 안에만 저장됩니다.
  firebaseDatabaseURL: 'https://byeolharam-vibe-default-rtdb.asia-southeast1.firebasedatabase.app',

  // 연수마다 바꾸면 새 실습실이 됩니다. (영문·숫자·하이픈만)
  roomKey: 'byeolharam-2026-1',

  // 진행자 화면(admin.html) 비밀번호
  adminPin: '0000',

  school: '별하람중학교',
  title: '바이브코딩 실습실',
  subtitle: '교직원 연수',

  groupSize: 5,
};

// 모둠 (개수와 이름, 색을 바꿀 수 있어요)
const GROUPS = [
  { id: 'red',    name: '빨강', c: '#d23f45', bg: '#fdeced' },
  { id: 'orange', name: '주황', c: '#d9620f', bg: '#fff0e3' },
  { id: 'yellow', name: '노랑', c: '#a87d00', bg: '#fff6d4' },
  { id: 'green',  name: '초록', c: '#1f8656', bg: '#e4f4eb' },
  { id: 'blue',   name: '파랑', c: '#1460bd', bg: '#e5eefa' },
  { id: 'purple', name: '보라', c: '#7643b8', bg: '#f0e9fa' },
];

// 활동 (순서대로 보여요)
//  type: 'group'  → 모둠 선착순 입장
//  type: 'submit' → 제출 + 작품 둘러보기 + 좋아요
//  fields 의 type: 'url'(링크) / 'area'(여러 줄) / 생략(한 줄), req: true 는 필수
const ACTS = [
  { id: 'group', no: 0, type: 'group', title: '모둠 들어가기',
    desc: '진행자가 열면 선착순입니다. 같은 테이블 선생님들과 무슨 색을 고를지 먼저 상의하세요. 한 모둠은 정원이 차면 마감돼요!' },

  { id: 'sim', no: 1, type: 'submit', title: '실습① 내 수업용 시뮬레이션',
    desc: '4요소(무엇을·누구를·어떻게 조작·무엇을 보여줄지)를 넣어 만들고, 두 번 이상 대화로 고친 뒤 공유 링크를 올려 주세요.',
    fields: [
      { k: 'title',  label: '앱 제목', ph: '예: 일식과 월식 시뮬레이션', req: true },
      { k: 'unit',   label: '학년 · 단원', ph: '예: 중1 태양계' },
      { k: 'link',   label: '공유 링크', type: 'url', ph: 'https://...' },
      { k: 'prompt', label: '처음 쓴 프롬프트', type: 'area', ph: '복사해서 붙여넣기' },
      { k: 'memo',   label: '대화로 고친 점 · 한 줄 소감', type: 'area', ph: '예: 속도를 조절할 수 있게 해 달라고 했더니...' },
    ] },

  { id: 'work', no: 2, type: 'submit', title: '실습② 업무 도우미 앱',
    desc: '학급 운영이나 업무에서 반복되는 일을 덜어 줄 작은 앱을 만들어 보세요. (예: 자리 바꾸기, 모둠 편성, 타이머, 체크리스트)',
    fields: [
      { k: 'title',  label: '앱 제목', ph: '예: 우리 반 자리 뽑기', req: true },
      { k: 'link',   label: '공유 링크', type: 'url', ph: 'https://...' },
      { k: 'prompt', label: '사용한 프롬프트', type: 'area' },
      { k: 'memo',   label: '막혔던 점 · 해결한 방법', type: 'area' },
    ] },

  { id: 'api', no: 3, type: 'submit', title: '실습③ API로 진짜 데이터 가져오기',
    desc: '[API 이름] · [보여줄 내용] · [화면 모양] 빈칸 3개를 채워 만들어 보세요. 실제로 작동하는 Open-Meteo, PubChem부터 추천합니다.',
    fields: [
      { k: 'title',   label: '앱 제목', ph: '예: 우리 학교 오늘 날씨', req: true },
      { k: 'apiName', label: '사용한 API', ph: '예: Open-Meteo' },
      { k: 'link',    label: '공유 링크', type: 'url', ph: 'https://...' },
      { k: 'prompt',  label: '사용한 프롬프트', type: 'area' },
      { k: 'memo',    label: '막혔던 점 · 해결한 방법', type: 'area' },
    ] },
];
