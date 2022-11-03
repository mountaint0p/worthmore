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
	FormHelperText,
	Icon,
	Button,
	Checkbox,
	AccordionPanel,
	VStack,
	CheckboxGroup,
	AccordionItem,
	AccordionButton,
	AccordionIcon,
} from "@chakra-ui/react";
import { Form, Formik, Field } from "formik";
import { database, storage } from "../../firebaseConfig";
import {
	collection,
	addDoc,
	Timestamp,
	serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import MessageError from "./UploadMessage";
import { tagList } from "../../common/tagList";

const uploadItem = async (itemTitle, tags, file, errorMessages) => {
	if (itemTitle === "") {
		errorMessages.titleError();
		return;
	}
	if (tags.length === 0) {
		errorMessages.tagError();
		return;
	}
	if (file === "") {
		errorMessages.imageError();
		return;
	}
	//Create file name for image
	const timeStamp = Date.now();
	const fileType = file.name.split(".").pop();
	const newFileName = itemTitle.replace(/\s/g, "");
	const fileName = newFileName + timeStamp + "." + fileType;
	try {
		//Upload image to cloud storage
		const imageRef = ref(storage, `/images/${fileName}`);
		const snapshot = await uploadBytes(imageRef, file);
		const url = await getDownloadURL(imageRef);
		const date = serverTimestamp();

		//NOTE: item properties here
		//Upload item to firestore
		await addDoc(collection(database, "items"), {
			title: itemTitle,
			imageUrl: url,
			tags: tags,
			dateAdded: date,
			onHold: false,
			holderName: "",
			holderEmail: "",
			holderID: "",
			//NOTE: dateOnHold is a default value
			dateOnHold: date,
		});
		errorMessages.submitSuccess();
	} catch (error) {
		errorMessages.uploadError();
	}
};

const TagSelector = () => {
	return (
		<Accordion mt="10px" allowMultiple>
			<AccordionItem>
				<AccordionButton fontSize="15px">
					Select Tags
					<AccordionIcon ml="15px" />
				</AccordionButton>
				<AccordionPanel pb={4}>
					<CheckboxGroup defaultValue={[]} colorScheme="green">
						<VStack align="left">
							{tagList.map((tag) => {
								return (
									<Field name="tags" value={tag} as={Checkbox} key={tag}>
										{tag}
									</Field>
								);
							})}
						</VStack>
					</CheckboxGroup>
				</AccordionPanel>
			</AccordionItem>
		</Accordion>
	);
};

const TitleSelector = ({ values, handleChange }) => {
	return (
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
				<FormHelperText>Give a descriptive title for the item.</FormHelperText>
			</FormControl>
		</div>
	);
};

const ImageSelector = ({ setFieldValue }) => {
	return (
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
									setFieldValue("file", event.currentTarget.files[0]);
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
	);
};

export default function ItemUpload() {
	//NOTE: This is bad practice: taking object from hook to pass to a function later.
	const errorMessages = MessageError();
	return (
		<Box bg={useColorModeValue("gray.50", "inherit")} p={10} h="100vh">
			<Stack
				px={4}
				py={5}
				bg={useColorModeValue("white", "gray.700")}
				spacing={6}
				p={{ sm: 6 }}
			>
				<Formik
					initialValues={{
						itemTitle: "",
						tags: [],
						file: "",
					}}
					onSubmit={async (values, actions) => {
						await uploadItem(
							values.itemTitle,
							values.tags,
							values.file,
							errorMessages
						);
					}}
				>
					{({ values, setFieldValue, handleChange }) => (
						<Form>
							<TitleSelector values={values} handleChange={handleChange} />
							<TagSelector />
							<ImageSelector setFieldValue={setFieldValue} />
							<Button mt="20px" type="submit">
								Submit Item
							</Button>
						</Form>
					)}
				</Formik>
			</Stack>
		</Box>
	);
}
