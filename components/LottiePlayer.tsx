'use client'
import dynamic from 'next/dynamic'
import type { LottieComponentProps } from 'lottie-react'
import type { LottieRefCurrentProps } from 'lottie-react'

// Dynamic import keeps lottie-react out of the SSR bundle
const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

interface LottiePlayerProps extends Omit<LottieComponentProps, 'animationData' | 'src'> {
  src: object
  lottieRef?: React.RefObject<LottieRefCurrentProps | null>
}

export default function LottiePlayer({ src, lottieRef, ...props }: LottiePlayerProps) {
  return (
    <Lottie
      animationData={src}
      lottieRef={lottieRef}
      renderer="svg"
      {...props}
    />
  )
}
