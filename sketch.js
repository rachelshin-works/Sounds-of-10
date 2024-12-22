let img; // 이미지를 저장할 변수
let oscillators = []; // 다중 오실레이터를 저장할 배열
let x = 0; // 슬릿 라인의 x 좌표
let maxOsc = 10; // 동시에 활성화될 오실레이터 수
let yStep = 1; // y 값을 처리하는 간격

function preload() {
  img = loadImage('blood.jpg'); // 이미지 로드 (이미지 파일 경로 삽입)
}

function setup() {
  createCanvas(200, 200);
  img.loadPixels(); // 픽셀 데이터 로드

  // 최대 오실레이터를 미리 생성
  for (let i = 0; i < maxOsc; i++) {
    let osc = new p5.Oscillator();
    osc.setType('sine');
    osc.amp(0); // 초기에는 소리 꺼짐
    osc.start();
    oscillators.push(osc);
  }
}

function draw() {
  background(255); // 흰색 배경
  image(img, 0, 0, width, height); // 이미지를 계속 그려줌

  // 빨간색 슬릿 라인 그리기
  strokeWeight(1);
  stroke(255, 0, 0);
  line(x, 0, x, height);

  // 모든 오실레이터의 볼륨 초기화
  for (let osc of oscillators) {
    osc.amp(0, 0.05); // 부드럽게 볼륨 0으로 감소
  }

  // x 좌표에서 간격별 y 값 확인
  for (let i = 0; i < maxOsc; i++) {
    let y = i * yStep; // 간격별 y 값 계산
    if (y >= height) break; // y 값이 높이를 초과하면 중단

    let index = 4 * (y * img.width + x); // 픽셀 배열에서 위치 계산
    let r = img.pixels[index]; // 빨강 값 (흑백 이미지는 RGB 값이 동일)

    // 밝기 값에 따라 주파수 설정 (범위: 200Hz ~ 800Hz)
    let freq1 = map(r, 0, 255, 300, 400);

    // 해당 y 값에 맞는 오실레이터로 주파수 설정
    let osc = oscillators[i];
    osc.freq(freq1); // 주파수 변경
    osc.amp(0.3, 0.05); // 볼륨 조정
  }

  // 슬릿 이동
  x++;
  if (x >= width) {
    x = 0; // x 좌표가 끝나면 처음으로 돌아감
  }
}