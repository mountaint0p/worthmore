/**
 * Search value filter types for store
 */
import { tagList } from "../common/tagList";
import { Tag } from "./Tag";

/**
 * Search Value type for store sidebar
 *
 * NOTE: to change tags, need to change tagList file
 */
export type StoreSearchValues = {
	sorting: "latest" | "oldest" | "alphabetical";
	search: string;
	tags: Tag[];
};
