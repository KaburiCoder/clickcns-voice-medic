import { useState } from 'react'

/**
 * 테스트용 커스텀 훅
 * @returns { count, increment }
 */
export function useTest() {
  const [count, setCount] = useState(0)
  const increment = () => setCount((c) => c + 1)
  return { count, increment }
}
