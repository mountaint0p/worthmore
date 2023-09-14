export default function UploadMessage() {
	const imageError = {
		title: "Submission failed.",
		description: "Must upload an image file",
		variant: "destructive",
	};
	const titleError = {
		title: "Submission failed.",
		description: "Cannot leave Image Title blank",
		variant: "destructive",
	};
	const tagError = {
		title: "Submission failed.",
		description: "At least one tag must be selected",
		variant: "destructive",
	};
	const uploadError = {
		title: "Upload to server failed.",
		description: "Issue with server, refresh the page or contact team",
		variant: "destructive",
	};
	const submitSuccess = {
		title: "Submission success.",
		description: "Yay!",
	};
	return { imageError, titleError, tagError, submitSuccess, uploadError };
}
