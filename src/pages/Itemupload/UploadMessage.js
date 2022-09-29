import { useToast } from "@chakra-ui/react";

export default function UploadMessage() {
	const imageError = useToast({
		title: "Submission failed.",
		description: "Must upload an image file",
		status: "error",
		duration: 9000,
		isClosable: true,
	});
	const titleError = useToast({
		title: "Submission failed.",
		description: "Cannot leave Image Title blank",
		status: "error",
		duration: 9000,
		isClosable: true,
	});
	const tagError = useToast({
		title: "Submission failed.",
		description: "At least one tag must be selected",
		status: "error",
		duration: 9000,
		isClosable: true,
	});
	const uploadError = useToast({
		title: "Upload to server failed.",
		description: "Issue with server, refresh the page or contact team",
		status: "error",
		duration: 9000,
		isClosable: true,
	});
	const submitSuccess = useToast({
		title: "Submission success.",
		description: "Yay",
		status: "success",
		duration: 9000,
		isClosable: true,
	});
	return { imageError, titleError, tagError, submitSuccess };
}
