/**
 * contenteditable 요소를 찾아서 포커스하는 유틸 함수
 * @param containerId - 컨테이너 ID (옵션)
 * @param delay - 포커스 전 대기 시간 (기본값: 100ms)
 */
export const focusEditor = (containerId?: string, delay: number = 100) => {
  setTimeout(() => {
    let editorElement: HTMLElement | null = null;

    if (containerId) {
      // 특정 컨테이너 내의 contenteditable 요소 찾기
      const container = document.getElementById(containerId);
      editorElement = container?.querySelector(
        "[contenteditable]"
      ) as HTMLElement;

      // 스크롤
      container?.scrollIntoView({
        behavior: "auto",
        block: "center",
      });
    } else {
      // 페이지의 모든 contenteditable 요소 중 마지막 것에 포커스
      const allEditors = document.querySelectorAll("[contenteditable]");
      editorElement = allEditors[allEditors.length - 1] as HTMLElement;
    }

    editorElement?.focus();
  }, delay);
};
