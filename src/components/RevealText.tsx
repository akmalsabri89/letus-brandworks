'use client'

import { motion } from 'framer-motion'
import { ElementType } from 'react'

interface RevealTextProps {
  text: string
  className?: string
  delay?: number
  as?: ElementType
}

export function RevealText({ text, className = '', delay = 0, as: Tag = 'h1' }: RevealTextProps) {
  const words = text.split(' ')
  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]"
          style={{ marginRight: '0.22em' }}
        >
          <motion.span
            className="inline-block"
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.85, delay: delay + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
