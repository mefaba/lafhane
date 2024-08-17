import React from "react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import animationData from "../../assets/LottieFiles/success2.lottie"

const LottieSuccess = () => (
	<div>
		<DotLottieReact
			src={animationData}
			autoplay
		/>
	</div>
);

export default LottieSuccess;