import { observer } from "mobx-react-lite";
import React from "react";
// import { Link, NavLink } from 'react-router-dom';
import { Button, Container, Dropdown, Image, Menu } from "semantic-ui-react";
// import { useStore } from '../stores/store';

interface Props {
    openForm: () => void;
}

export default function Navbar({openForm}: Props) {
	//   const { userStore: { user, logout } } = useStore();
	return (
		<Menu inverted fixed="top">
			<Container>
				<Menu.Item header>
					<img
						src="/assets/logo.png"
						alt="logo"
						style={{ marginRight: "10px" }}
					/>
					Reactivities
				</Menu.Item>
				<Menu.Item name="Activities" />
				<Menu.Item>
					<Button onClick={openForm} positive content="Create Activity" />
				</Menu.Item>
			</Container>
		</Menu>
	);
};
