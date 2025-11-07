import React from 'react'
import { useTest } from '../hooks/useTest'

/**
 * 테스트용 컴포넌트
 */
export const TestComponent: React.FC = () => {
  const { count, increment } = useTest()
  return (
    <div style={{ border: '1px solid #ccc', padding: 16, borderRadius: 8 }}>
      <h3>테스트 컴포넌트</h3>
      <p>카운트: {count}</p>
      <button onClick={increment}>+1</button>
    </div>
  )
}
