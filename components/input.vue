<template>
	<fieldset class="flex flex-col w-full text-primary-darkBlue">
		<label v-if="label">
			{{ label }}
			<span v-if="isRequired" class="text-primary-gray">*</span></label
		>
		<div class="flex items-center relative">
			<input
				:id="name"
				:name="name"
				:type="type"
				:value="value"
				:placeholder="placeholder"
				class="w-full h-10 px-3 rounded-[0.25rem] bg-transparent border-solid border border-primary-darkBlue"
				:class="{ 'border-accent-red': error }"
				@input="handleInput"
			/>
			<ErrorIcon v-if="!!error" class="absolute right-3" />
		</div>
		<span v-if="!!error" class="text-accent-red text-xs leading-5">{{
			error
		}}</span>
	</fieldset>
</template>

<script>
import ErrorIcon from "~/assets/svg/icons/error.svg";

export default {
	name: "Input",

	components: {
		ErrorIcon,
	},

	props: {
		type: { required: true },
		label: { required: true },
		name: { required: true },
		value: { required: true },
		error: { required: true },
		isRequired: {
			type: Boolean,
			default() {
				return true;
			},
		},
		placeholder: String,
	},

	data() {
		return {
			content: this.value,
			debounce: null,
		};
	},

	methods: {
		handleInput(event) {
			this.$emit("input", event.target.value);
			this.handleValidation();
		},

		handleValidation() {
			this.$emit("validate");
		},
	},
};
</script>
