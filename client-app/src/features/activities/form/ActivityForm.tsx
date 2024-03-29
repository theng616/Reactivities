import { observer } from "mobx-react-lite";
import React, {useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Header, Label, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { Activity, ActivityFormValues } from "../../../app/models/activity";

export default observer(function ActivityForm() {
	const history = useHistory();
	const { activityStore } = useStore();
	const {
		createActivity,
		updateActivity,
		loading,
		loadActivity,
		loadingInitial,
	} = activityStore;
	const { id } = useParams<{ id: string }>();

  const [activity, setActivity] = useState<ActivityFormValues>(new ActivityFormValues());

  const validationSchema = Yup.object({
    title: Yup.string().required('The activity title is required'),
    description: Yup.string().required('The activity description is required'),
    category: Yup.string().required(),
    date: Yup.string().required('Date is required').nullable(),
    venue: Yup.string().required(),
    city: Yup.string().required(),
  })

	useEffect(() => {
    if (id) loadActivity(id).then(activity => setActivity(new ActivityFormValues(activity)))
	}, [id, loadActivity]);

	function handleFormSubmit(activity: ActivityFormValues) {
    if (!activity.id) {
        let newActivity = {
            ...activity,
            id: uuid()
        };
        createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`))
    } else {
        updateActivity(activity).then(() => history.push(`/activities/${activity.id}`))
    }
}

	// function handleInputChange(
	// 	event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	// ) {
	// 	const { name, value } = event.target;
	// 	setActivity({ ...activity, [name]: value });
	// }

	if (loadingInitial)
		return <LoadingComponent content="Loading activity..." />;

	return (
		<Segment clearing>
      <Header content='Activity Detail' sub color='teal'/>
			<Formik
        validationSchema={validationSchema}
				initialValues={activity}
        enableReinitialize
				onSubmit={(values) => handleFormSubmit(values)}
			>
				{({ handleSubmit, isValid, isSubmitting, dirty }) => (
					<Form className='ui form' onSubmit={handleSubmit} autoComplete="off">
            <MyTextInput 
              name='title' 
              placeholder="title"/>
						<MyTextArea
							placeholder="Description"
							name="description"
              rows={3}
						/>
						<MySelectInput
							placeholder="Category"
							name="category"
              options={categoryOptions}
						/>
						<MyDateInput
							placeholderText="Date"
							name="date"
              showTimeSelect
              timeCaption="time"
              dateFormat={'MMMM d, yyyy h:mm aa'}
						/>
            <Header content='Location Details' sub color='teal'/>
						<MyTextInput
							placeholder="City"
							name="city"
						/>
						<MyTextInput
							placeholder="Venue"
							name="venue"
						/>
						<Button
							loading={isSubmitting}
							floated="right"
							positive
							type="submit"
							content="Submit"
              disabled={isSubmitting || !dirty || !isValid}
						/>
						<Button
							as={Link}
							to="/activities"
							floated="right"
							type="button"
							content="Cancel"
						/>
					</Form>
				)}
			</Formik>
		</Segment>
	);
});
