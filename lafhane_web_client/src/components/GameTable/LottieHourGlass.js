import React from "react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import animationData from "../../assets/LottieFiles/hourglass.lottie"

const LottieHourGlass = () => (
	<div>
		<DotLottieReact
			src={animationData}
			autoplay
		/>
	</div>
);

export default LottieHourGlass;