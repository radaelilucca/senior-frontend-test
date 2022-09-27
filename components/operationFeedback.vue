<template>
	<div
		class="w-full transition-all duration-1000 translate-y-[0%] bg-background-white fixed top-0 z-10 flex gap-4 justify-center items-center p-8 border-accent-blue border-t-2 border-solid"
		:class="{
			'translate-y-[-100%]': !show,
		}"
	>
		<CheckmarkIcon class="ml-auto" />
		<span class="text-primary-darkBlue uppercase text-xs">{{
			message
		}}</span>
		<button
			type="button"
			title="close confirmation message"
			@click="handleForceCloseRequest"
			class="ml-auto"
		>
			<CloseIcon />
		</button>
	</div>
</template>

<script>
import CheckmarkIcon from "~/assets/svg/icons/checkmark.svg";
import CloseIcon from "~/assets/svg/icons/close.svg";

export default {
	name: "OperationFeedback",

	props: {
		message: {
			required: true,
			type: String,
		},
		show: Boolean,
	},

	methods: {
		handleForceCloseRequest() {
			this.$emit("forceClose");
		},
	},

	components: {
		CheckmarkIcon,
		CloseIcon,
	},
};
</script>
