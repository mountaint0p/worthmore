// Reference: https://ui.shadcn.com/docs/components/data-table
import { FormEvent, useEffect, useState } from "react";

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/Table";

import { Label } from "@/components/ui/Label";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

import { supaClient } from "../../supaClient";
import { FaTrashAlt } from "react-icons/fa";
import { User } from "@supabase/supabase-js";
import { UserAuth } from "../../context/AuthContext2";

export default function AdminTable() {
	//TODO: ADD TYPE
	const [admins, setAdmins] = useState<User[]>([]);
	const [email, setEmail] = useState<string>("");
	const [loading, setLoading] = useState<Boolean>(true);
	const { user } = UserAuth();

	const removeAdmin = async (removedAdmin: User) => {
		//change user from admin to non-admin
		if (user?.id === removedAdmin.id) {
			alert("Error: Cannot delete yourself as admin!");
			return;
		}
		const { data, error } = await supaClient
			.from("users")
			.update({ is_admin: false })
			.eq("id", removedAdmin.id)
			.select();
		if (error) {
			console.log(error);
		}
		if (data) {
			//remove admin from table locally
			setAdmins(admins.filter((admin: any) => admin.id !== removedAdmin.id));
		}
	};

	const addAdmin = async (e: FormEvent) => {
		e.preventDefault();
		//update user as admin
		const { data, error } = await supaClient
			.from("users")
			.update({ is_admin: true })
			.eq("email", email)
			.select();
		if (error) {
			console.log(error);
		}
		if (data) {
			//refreshes if successful
			location.reload();
		}
	};

	useEffect(() => {
		setLoading(true);
		const fetchAdmins = async () => {
			const { data, error } = await supaClient
				.from("users")
				.select("*")
				.is("is_admin", true);
			if (error) {
				console.log(error);
			}
			if (data) {
				setAdmins(data);
			}
		};

		fetchAdmins();
		setLoading(false);
	}, []);
	return (
		<div>
			<h2 className="text-4xl font-bold">Admin Table</h2>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Name</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Remove Admin</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{admins.map((admin: any) => (
						<TableRow key={admin.email}>
							<TableCell>{admin.name}</TableCell>
							<TableCell>{admin.email}</TableCell>
							<TableCell>
								<FaTrashAlt onClick={() => removeAdmin(admin)} />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<form onSubmit={(e) => addAdmin(e)}>
				<Label htmlFor="email-input">Add Admin via Swarthmore Email</Label>
				<Input
					onChange={(e) => setEmail(e.target.value)}
					id="email-input"
					type="email"
					placeholder={"username@swarthmore.edu"}
				/>
				<Button type="submit" className="mt-3">
					Submit
				</Button>
			</form>
		</div>
	);
}
