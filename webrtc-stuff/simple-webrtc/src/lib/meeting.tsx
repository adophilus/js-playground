export const getStream = () =>
	window.navigator.mediaDevices.getUserMedia({ video: true, audio: true });
