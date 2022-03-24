import { Button, Flex, Icon, useColorModeValue } from "@chakra-ui/react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { React, useState } from "react";

function Pagination({ itemPerPage, totalItems, paginate, currentPage }) {
	const pageNumbers = [];
	const totalPages = Math.ceil(totalItems / itemPerPage);
	for (let i = 1; i <= totalPages; i++) {
		pageNumbers.push(i);
	}
	const clickEvent = (type) => {
		console.log(type);
		if (type === "backPage") {
			if (currentPage > 1) paginate(currentPage - 1);
		} else if (type === "nextPage") {
			if (currentPage < totalPages) paginate(currentPage + 1);
		} else {
			paginate(type);
		}
	};
	const PagButton = (props) => {
		const activeStyle = {
			bg: useColorModeValue("green.500", "green.300"),
			color: useColorModeValue("white", "gray.200"),
		};
		const normalStyle = {
			bg: useColorModeValue("white", "gray.800"),
			color: useColorModeValue("gray.700", "gray.200"),
		};
		return (
			<Button
				mx={1}
				px={4}
				py={2}
				rounded="md"
				bg={props.id === currentPage ? activeStyle.bg : normalStyle.bg}
				color={props.id === currentPage ? activeStyle.color : normalStyle.color}
				_hover={activeStyle}
				onClick={() => clickEvent(props.id)}
			>
				{props.children}
			</Button>
		);
	};
	return (
		<Flex
			bg={useColorModeValue("gray.100", "gray.900")}
			p={50}
			w="full"
			alignItems="center"
			justifyContent="center"
		>
			<Flex>
				<PagButton id="backPage">
					<Icon
						as={AiOutlineArrowLeft}
						color={useColorModeValue("gray.700", "gray.200")}
						boxSize={4}
					/>
				</PagButton>
				{pageNumbers.map((number) => {
					return (
						<PagButton click={paginate} id={number} key={number}>
							{number}
						</PagButton>
					);
				})}
				<PagButton id="nextPage">
					<Icon
						as={AiOutlineArrowRight}
						color={useColorModeValue("gray.700", "gray.200")}
						boxSize={4}
					/>
				</PagButton>
			</Flex>
		</Flex>
	);
}

export default Pagination;
