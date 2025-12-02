export interface DiarizationRequest {
  /**
   * 화자 분리를 수행할 텍스트
   * @example '안녕하세요. 오늘 회의는 어떻게 진행할까요? 네, 먼저 안건부터 정리해보겠습니다.'
   */
  content: string;

  /**
   * 이전 화자 분리 결과 (선택사항)
   * @example 'A: 안녕하세요. B: 반갑습니다.'
   */
  previousContext?: string;
}

export interface DiarizationMessage {
  /**
   * 화자 이름
   * @example 'Speaker A'
   */
  speaker: string;

  /**
   * 화자의 발화 내용
   * @example '안녕하세요.'
   */
  content: string;
}

export interface DiarizationResponse {
  /**
   * 화자별 메시지 목록
   */
  messages: DiarizationMessage[];
}
