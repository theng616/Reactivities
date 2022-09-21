import { format } from "date-fns";
import React, { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import {
	Button,
	Icon,
	Item,
	ItemExtra,
	Label,
	Segment,
} from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";
import ActivityListItemAttendee from "./ActivityListItemAttendee";

interface Props {
	activity: Activity;
}

export default function ActivityListItem({ activity }: Props) {
	const { activityStore } = useStore();
	const { deleteActivity, loading } = activityStore;
	const [target, setTarget] = useState("");

	function handleActivityDelete(
		e: SyntheticEvent<HTMLButtonElement>,
		id: string
	) {
		setTarget(e.currentTarget.name);
		deleteActivity(id);
	}

	return (
		<Segment.Group>
			<Segment>
				<Item.Group>
					<Item>
						<Item.Image
              style={{marginBottom: "3px"}}
							size="tiny"
							circular
							src="/assets/user.png"
						/>
						<Item.Content>
							<Item.Header
								as={Link}
								to={`/activities/${activity.id}`}
							>
								{activity.title}
							</Item.Header>
							<Item.Description>
								Hosted by {activity.host?.displayName}
							</Item.Description>
							{activity.isHost && (
								<Item.Description>
									<Label basic color="orange">
										You are hosting this activity
									</Label>
								</Item.Description>
							)}
							{activity.isGoing && !activity.isHost && (
								<Item.Description>
									<Label basic color="green">
										You are going to this activity
									</Label>
								</Item.Description>
							)}
						</Item.Content>
					</Item>
				</Item.Group>
			</Segment>
			<Segment>
				<span>
					<Icon name="clock" />{" "}
					{format(activity.date!, "dd MMM yyyy h:mm aa")}
					<Icon name="marker" /> {activity.venue}
				</span>
			</Segment>
			<Segment secondary>
				<ActivityListItemAttendee attendees={activity.attendees!} />
			</Segment>
			<Segment clearing>
				<span>{activity.description}</span>
				<Button
					as={Link}
					to={`/activities/${activity.id}`}
					color="teal"
					floated="right"
					content="view"
				></Button>
			</Segment>
		</Segment.Group>
	);
}
