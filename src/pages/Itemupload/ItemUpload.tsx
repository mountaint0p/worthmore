import {
	FormControl,
	FormLabel,
	Input,
	FormHelperText,
} from "@chakra-ui/react";
import { Formik, Field } from "formik";
import MessageError from "./UploadMessage";
import { tagList } from "../../common/tagList";
import { Tag } from "../../types/Tag";
import { ChangeEventHandler, useState, useEffect } from "react";
import { supaClient } from "../../supaClient";
import { Button } from "@/components/ui/Button";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/Accordion";
import { Checkbox } from "@/components/ui/Checkbox";
import { useToast } from "../../components/ui/use-toast";

type ItemUploadValues = {
	file: File | "";
	itemTitle: string;
	tags: Tag[];
};

/**
 * Uploads item to supabase on form submit
 */
const uploadItem = async (
	itemTitle: string,
	tags: string[],
	file: File | "",
	errorMessages: ReturnType<typeof MessageError>,
	setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
	const toast = useToast();
	if (itemTitle === "") {
		toast(errorMessages.titleError);
		return;
	}
	if (tags.length === 0) {
		toast(errorMessages.tagError);
		return;
	}
	if (file === "") {
		toast(errorMessages.imageError);
		return;
	}
	setLoading(true);
	//Create file name for image
	const timeStamp = Date.now();
	const fileType = file.name.split(".").pop();
	const newFileName = itemTitle.replace(/\s/g, "");
	const fileName = newFileName + timeStamp + "." + fileType;

	const { data, error } = await supaClient.storage
		.from("images")
		.upload(fileName, file);
	if (error) {
		toast(errorMessages.uploadError);
		console.log(error);
		return;
	}
	console.log(data);
	const url = await supaClient.storage.from("images").getPublicUrl(fileName)
		.data.publicUrl;
	const res = await supaClient
		.from("items")
		.insert({ title: itemTitle, tags: tags, imageURL: url })
		.select();
	setLoading(false);
	if (res.error) {
		toast(errorMessages.uploadError);
		return;
	}
	if (res.data) {
		toast(errorMessages.submitSuccess);
	}
};

/**
 * Tag component of item upload form
 */
const TagSelector = () => {
	return (
		// <Accordion mt="20px" allowMultiple>
		// 	<AccordionItem>
		// 		<AccordionButton fontSize="15px">
		// 			Select Tags
		// 			<AccordionIcon ml="15px" />
		// 		</AccordionButton>
		// 		<AccordionPanel pb={4}>
		// 			<CheckboxGroup defaultValue={[]} colorScheme="green">
		// 				<VStack align="left">
		// 					{tagList.map((tag) => {
		// 						return (
		// 							<Field name="tags" value={tag} as={Checkbox} key={tag}>
		// 								{tag}
		// 							</Field>
		// 						);
		// 					})}
		// 				</VStack>
		// 			</CheckboxGroup>
		// 		</AccordionPanel>
		// 	</AccordionItem>
		// </Accordion>
		<Accordion type="single" collapsible className="w-full">
			<AccordionItem value="item-1">
				<AccordionTrigger>Item Tags</AccordionTrigger>
				<AccordionContent>
					<div className="flex flex-col gap-2">
						{tagList.map((tag) => {
							return (
								<div className="align-items flex gap-2" key={tag}>
									<Field as={Checkbox} name="tags" value={tag} key={tag} />
									<label
										htmlFor="terms"
										className="text-base font-medium leading-none"
									>
										{tag}
									</label>
								</div>
							);
						})}
					</div>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
};

type TitleSelectorProps = {
	values: ItemUploadValues;
	handleChange: ChangeEventHandler;
};
const TitleSelector = ({ values, handleChange }: TitleSelectorProps) => {
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

const ImageSelector = ({
	setFieldValue,
}: {
	setFieldValue: (
		field: string,
		value: any,
		shouldValidate?: boolean | undefined
	) => void;
}) => {
	return (
		<div className=" flex w-full items-center justify-center">
			{/* <label
				htmlFor="dropzone-file"
				className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
			>
				<div className="flex flex-col items-center justify-center pb-6 pt-5">
					<svg
						aria-hidden="true"
						className="mb-3 h-10 w-10 text-gray-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
						></path>
					</svg>
					<p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
						<span className="font-semibold">Click to upload</span> or drag and
						drop
					</p>
					<p className="text-xs text-gray-500 dark:text-gray-400">
						SVG, PNG, JPG
					</p>
				</div>
				<Field as="input" id="dropzone-file" type="file" className="hidden" />
			</label> */}
		</div>
	);
};

export default function ItemUpload() {
	//NOTE: This is bad practice: taking object from hook to pass to a function later.
	const errorMessages = MessageError();
	const [loading, setLoading] = useState(false);
	const initialValues: ItemUploadValues = {
		itemTitle: "",
		tags: [],
		file: "",
	};
	return (
		<div className=" flex h-screen w-full flex-col items-center gap-5">
			<h2 className="pt-10 text-4xl font-bold">Item Upload</h2>
			<Formik
				initialValues={initialValues}
				onSubmit={async (values) => {
					await uploadItem(
						values.itemTitle,
						values.tags,
						values.file,
						errorMessages,
						setLoading
					);
				}}
			>
				{({ values, setFieldValue, handleChange }) => (
					<form className="flex w-1/2 flex-col gap-5">
						<TitleSelector values={values} handleChange={handleChange} />
						<TagSelector />
						<ImageSelector setFieldValue={setFieldValue} />
						<Button type="submit" disabled={loading}>
							Submit Item
						</Button>
					</form>
				)}
			</Formik>
		</div>
	);
}
