<template>
	<form
		id="location-form"
		@submit="handleSubmit"
		class="w-full flex flex-col gap-6 p-6 pt-4 bg-background-white rounded-lg"
	>
		<header class="flex items-center justify-between text-primary-darkBlue">
			<h3 class="font-bold">{{ formTitle }}</h3>
			<button type="button" @click="handleAbort" title="close form">
				<CloseIcon />
			</button>
		</header>

		<section class="formSection">
			<Input
				label="Title"
				name="title"
				type="text"
				v-model="formData.title"
				:error="errors.title"
				@validate="validateField('title')"
			/>
			<Input
				label="Enter the address"
				name="address"
				type="text"
				v-model="formData.address"
				:error="errors.address"
				@validate="validateField('address')"
			/>
		</section>

		<div class="flex flex-col gap-4">
			<span class="text-accent-blue uppercase text-xs"
				>contact information</span
			>
			<hr />
		</div>

		<section class="formSection">
			<Input
				label="Full name"
				name="contactName"
				type="text"
				v-model="formData.contactName"
				:error="errors.contactName"
				@validate="validateField('contactName')"
			/>
			<Input
				label="Job position"
				name="contactPosition"
				type="text"
				v-model="formData.contactPosition"
				:error="errors.contactPosition"
				@validate="validateField('contactPosition')"
			/>
			<Input
				label="Email address"
				name="contactEmail"
				type="text"
				v-model="formData.contactEmail"
				:error="errors.contactEmail"
				@validate="validateField('contactEmail')"
				placeholder="name@example.com"
			/>
			<Input
				label="Phone"
				name="contactPhone"
				type="text"
				v-model="formData.contactPhone"
				:error="errors.contactPhone"
				@validate="validateField('contactPhone')"
			/>
		</section>

		<button
			:disabled="hasPendingValidations || hasErrors"
			type="submit"
			class="bg-accent-blue disabled:bg-primary-gray text-background-white leading-6 py-2 px-6 rounded-lg w-fit"
		>
			Save
		</button>
	</form>
</template>

<script>
import { Input } from "~/components";
import CloseIcon from "~/assets/svg/icons/close.svg";
import * as yup from "yup";

const formTitles = {
	edit: "Edit location",
	create: "New location",
};

const emptyMessage = "This field cannot be empty";

const validationSchema = yup.object().shape({
	title: yup.string().required(emptyMessage),
	address: yup.string().required(emptyMessage),
	contactName: yup.string().required(emptyMessage),
	contactPosition: yup.string().required(emptyMessage),
	contactEmail: yup.string().required(emptyMessage).email("Invalid email"),
	contactPhone: yup
		.string()
		.required(emptyMessage)
		.matches(/^\d{10}$/, "Invalid phone"),
});

export default {
	name: "OfficeForm",
	components: { Input, CloseIcon },
	props: {
		initialData: {
			title: String,
			address: String,
			contactName: String,
			contactPosition: String,
			contactEmail: String,
			contactPhone: String,
		},
	},

	data() {
		return {
			formData: {
				title: "",
				address: "",
				contactName: "",
				contactPosition: "",
				contactEmail: "",
				contactPhone: "",
			},

			errors: {
				title: "",
				address: "",
				contactName: "",
				contactPosition: "",
				contactEmail: "",
				contactPhone: "",
			},

			hasErrors: false,

			validationDebounce: null,
		};
	},

	computed: {
		hasPendingValidations() {
			return this.validationDebounce !== null;
		},
	},

	created() {
		//NOTE: ff has initial data is editing some office, else is creating
		if (this.initialData) {
			this.formTitle = formTitles.edit;
			this.formData = { ...this.formData, ...this.initialData };
		} else {
			this.formTitle = formTitles.create;
			this.hasErrors = true;
		}
	},

	methods: {
		handleSubmit(event) {
			event.preventDefault();
			const isValid = this.validateForm();

			if (isValid) {
				const {
					title,
					address,
					contactName: name,
					contactPosition: position,
					contactEmail: email,
					contactPhone: phone,
				} = this.formData;

				const parsedOffice = {
					title,
					address,
					contact: {
						name,
						position,
						email,
						phone,
					},
				};

				this.$emit("onSubmit", parsedOffice);
			} else {
				for (const field in this.formData) {
					this.validateField(field);
				}
			}
		},

		validateForm() {
			return validationSchema.isValidSync(this.formData);
		},

		validateField(fieldId) {
			// NOTE: debounce prevent run validations on every keypress
			clearTimeout(this.validationDebounce);
			this.validationDebounce = setTimeout(() => {
				validationSchema
					.validateAt(fieldId, this.formData)
					.then(() => {
						this.errors[fieldId] = "";

						const otherErrors = validationSchema.isValidSync(
							this.formData
						);

						this.hasErrors = !otherErrors;
					})
					.catch((err) => {
						this.errors[fieldId] = err.message;
						this.hasErrors = true;
					});

				this.validationDebounce = null;
			}, 500);
		},

		handleAbort() {
			this.$emit("onCancel");
		},
	},
};
</script>

<style scoped lang="css">
.formSection {
	@apply flex flex-col gap-6;
}
</style>
