"use client";

import { useEffect, useRef } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import heroData from "./heroLottie.json";

// The Bodywise hero banner (body-wash) as a Lottie. Plays while `playing`
// (i.e. while the phone is hovered), pauses + resets to the first frame
// otherwise. `slice` makes it fill the hero strip like object-cover.
export default function HeroLottie({ playing }: { playing: boolean }) {
  const ref = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    const anim = ref.current;
    if (!anim) return;
    if (playing) {
      anim.goToAndPlay(0, true);
    } else {
      anim.goToAndStop(0, true);
    }
  }, [playing]);

  return (
    <Lottie
      lottieRef={ref}
      animationData={heroData}
      loop
      autoplay={false}
      rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
      className="h-full w-full"
    />
  );
}
