import React from "react";
import {
	chakra,
	Box,
	Flex,
	useColorModeValue,
	Accordion,
	Text,
	Stack,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputLeftAddon,
	FormHelperText,
	Icon,
	Button,
	VisuallyHidden,
	Checkbox,
	AccordionPanel,
	VStack,
	CheckboxGroup,
	useToast,
	AccordionItem,
	AccordionButton,
	AccordionIcon,
} from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import { Form, Formik, Field } from "formik";
import { Storage } from "aws-amplify";

export default function Component() {
	const urlError = useToast({
		title: "Submission failed.",
		description: "Cannot leave Image URL blank",
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
	const submitSuccess = useToast({
		title: "Submission failed.",
		description: "At least one tag must be selected",
		status: "error",
		duration: 9000,
		isClosable: true,
	});
	return (
		<Box bg={useColorModeValue("gray.50", "inherit")} p={10} h="100vh">
			<Box mt={[5, null, 0]} colSpan={{ md: 2 }}>
				<Stack
					px={4}
					py={5}
					bg={useColorModeValue("white", "gray.700")}
					spacing={6}
					p={{ sm: 6 }}
				>
					<Formik
						initialValues={{
							imageURL: "",
							itemTitle: "",
							tags: [],
							file: "",
						}}
						onSubmit={async (values, actions) => {
							let isError = 0;
							if (values.file === "") {
								isError = 1;
								urlError();
							}
							if (values.itemTitle === "") {
								isError = 1;
								titleError();
							}
							if (values.tags.length === 0) {
								isError = 1;
								tagError();
							}
							const d = new Date();

							if (isError === 0) {
								//add time to image name to prevent dupes
								let imageName =
									values.file.name.substring(
										0,
										values.file.name.lastIndexOf(".")
									) +
									d.getMilliseconds() +
									values.file.name.substring(values.file.name.lastIndexOf("."));
								let result;
								try {
									result = await Storage.put(imageName, values.file, {
										contentType: "image/png",
										level: "public",
									});
									const url =
										"https://worthmore5ba9e5f5174f41528ad43aee2c52559a192500-dev.s3.amazonaws.com/public/" +
										imageName;
									const body = {
										imageURL: url,
										title: values.itemTitle,
										tags: values.tags,
									};
									const response = await fetch("http://localhost:5000/submit", {
										method: "POST",
										headers: { "Content-Type": "application/json" },
										body: JSON.stringify(body),
									});
								} catch (err) {
									console.log(err);
								}
								console.log(result);
							}
						}}
					>
						{({ values, setFieldValue, handleChange }) => (
							<Form>
								<Box>
									<FormControl>
										<FormLabel
											fontSize="sm"
											fontWeight="md"
											//color={useColorModeValue("gray.700", "gray.50")}
										>
											Image URL
										</FormLabel>

										<Input
											placeholder="www.example.com"
											focusBorderColor="brand.400"
											rounded="md"
											name="imageURL"
											value={values.imageURL || ""}
											onChange={handleChange}
										/>
									</FormControl>
								</Box>

								<div>
									<FormControl mt={1}>
										<FormLabel
											fontSize="sm"
											fontWeight="md"
											//color={useColorModeValue("gray.700", "gray.50")}
										>
											Item Title
										</FormLabel>
										<Input
											placeholder="Add title here"
											mt={1}
											rows={3}
											shadow="sm"
											focusBorderColor="brand.400"
											rounded="md"
											name="itemTitle"
											value={values.itemTitle || ""}
											onChange={handleChange}
										/>
										<FormHelperText>
											Give a descriptive title for the item.
										</FormHelperText>
									</FormControl>
								</div>
								<Accordion mt="10px" allowMultiple>
									<AccordionItem>
										<AccordionButton fontSize="15px">
											Select Tags
											<AccordionIcon ml="15px" />
										</AccordionButton>
										<AccordionPanel pb={4}>
											<CheckboxGroup defaultValue={[]} colorScheme="green">
												<VStack align="left">
													<Field name="tags" value="decoration" as={Checkbox}>
														Decoration
													</Field>
													<Field name="tags" value="lighting" as={Checkbox}>
														Lighting
													</Field>
													<Field name="tags" value="utility" as={Checkbox}>
														Utility
													</Field>
													<Field name="tags" value="mirrors" as={Checkbox}>
														Mirrors
													</Field>
													<Field name="tags" value="fans" as={Checkbox}>
														Fans
													</Field>
													<Field name="tags" value="supplies" as={Checkbox}>
														Supplies
													</Field>
												</VStack>
											</CheckboxGroup>
										</AccordionPanel>
									</AccordionItem>
								</Accordion>
								<FormControl>
									<FormLabel
										fontSize="sm"
										fontWeight="md"
										//color={useColorModeValue("gray.700", "gray.50")}
									>
										Cover photo
									</FormLabel>
									<Flex
										mt={1}
										justify="center"
										px={6}
										pt={5}
										pb={6}
										borderWidth={2}
										//bordercolor={useColorModeValue("gray.300", "gray.500")}
										borderStyle="dashed"
										rounded="md"
									>
										<Stack spacing={1} textAlign="center">
											<Icon
												mx="auto"
												boxSize={12}
												//color={useColorModeValue("gray.400", "gray.500")}
												stroke="currentColor"
												fill="none"
												viewBox="0 0 48 48"
												aria-hidden="true"
											>
												<path
													d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</Icon>
											<Flex
												fontSize="sm"
												//color={useColorModeValue("gray.600", "gray.400")}
												alignItems="baseline"
											>
												<chakra.label
													htmlFor="file-upload"
													cursor="pointer"
													rounded="md"
													fontSize="md"
													//color={useColorModeValue("brand.600", "brand.200")}
													pos="relative"
													_hover={
														{
															//color: useColorModeValue("brand.400", "brand.300"),
														}
													}
												>
													<Input
														id="file"
														name="file"
														type="file"
														onChange={(event) => {
															setFieldValue(
																"file",
																event.currentTarget.files[0]
															);
														}}
													/>
												</chakra.label>
											</Flex>
											<Text
												fontSize="xs"
												//color={useColorModeValue("gray.500", "gray.50")}
											>
												PNG or JPG
											</Text>
										</Stack>
									</Flex>
								</FormControl>
								<Button type="submit">Submit Item</Button>
							</Form>
						)}
					</Formik>
				</Stack>
			</Box>
		</Box>
	);
}
