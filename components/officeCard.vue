<template>
	<div>
		<button
			@focus="handleFocus"
			@mouseenter="handleFocus"
			@mouseleave="handleBlur"
			@blur="handleBlur"
			class="card-button flex items-center justify-between w-full rounded-lg p-6 list-none rounded-t-lg"
			v-bind:class="{
				'card-button-open': isOpen,
				'card-button-focused': isFocused,
			}"
			@click="handleClick"
		>
			<div class="flex flex-col items-start">
				<strong class="card-title text-2xl leading-8 w-fit">
					{{ office.title }}
				</strong>
				<span class="card-address text-primary-gray leading-6">{{
					office.address
				}}</span>
			</div>
			<ArrowIcon />
		</button>

		<div class="card-panel overflow-hidden max-h-0" ref="panel">
			<div class="bg-background-white rounded-b-lg py-6 px-12">
				<div class="flex flex-col gap-2 text-primary-darkBlue">
					<strong class="text-xl">{{ office.contact.name }}</strong>
					<span>{{ office.contact.position }}</span>
					<a
						:href="`mailto:${office.contact.email}`"
						class="text-accent-blue"
						>{{ office.contact.email }}</a
					>
					<span>{{ office.contact.phone }}</span>
				</div>

				<hr class="mt-4 mb-5" />
				<div class="flex items-center justify-between">
					<button
						class="flex items-center gap-3 text-xs text-primary-gray"
					>
						<EditIcon /> EDIT
					</button>
					<button
						@click="handleDelete"
						class="flex items-center gap-3 text-xs text-accent-red"
					>
						<DeleteIcon />DELETE
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ArrowIcon from "~/assets/svg/icons/arrow.svg";
import EditIcon from "~/assets/svg/icons/edit.svg";
import DeleteIcon from "~/assets/svg/icons/delete.svg";

export default {
	props: {
		office: {
			title: String,
			address: String,
			contact: {
				name: String,
				position: String,
				email: String,
				phone: String,
			},
		},
		isOpen: {
			type: Boolean,
			default() {
				return false;
			},
		},
	},
	data() {
		return {
			isFocused: false,
		};
	},

	components: {
		ArrowIcon,
		EditIcon,
		DeleteIcon,
	},

	watch: {
		isOpen: {
			handler() {
				this.handleTogglePanelOpen();
			},
		},
	},

	methods: {
		handleClick() {
			this.$emit("onOpenStateChangeRequest");
		},

		handleFocus() {
			this.isFocused = true;
		},

		handleBlur() {
			this.isFocused = false;
		},

		handleTogglePanelOpen() {
			const panel = this.$refs.panel;

			if (!this.isOpen) {
				panel.style.maxHeight = null;
			} else {
				panel.style.maxHeight = panel.scrollHeight + "px";
			}
		},

		handleDelete() {
			this.$emit("onDeleteRequest");
		},
	},
};
</script>

<style scoped lang="css">
.card-button {
	--background-color: theme(colors.background.white);
	--title-color: theme(colors.primary.darkBlue);
	--address-color: theme(colors.primary.gray);
	--icon-color: theme(colors.accent.blue);

	--transition-duration: 250ms;

	background-color: var(--background-color);
}

.card-button * {
	transition: all var(--transition-duration);
}

.card-button svg path {
	stroke: var(--icon-color);
}

.card-button-focused,
.card-button-open {
	--background-color: theme(colors.primary.gray);
	--title-color: theme(colors.background.white);
	--address-color: theme(colors.background.white);
}

.card-button-open {
	@apply rounded-b-none;
}
.card-button-open svg {
	transform: rotate(-180deg);
}

.card-button-open svg path,
.card-button-focused svg path {
	--icon-color: theme(colors.background.white);
}

.card-title {
	color: var(--title-color);
}

.card-address {
	color: var(--address-color);
}

.card-panel {
	will-change: max-height;
	transition: max-height 200ms;
}
</style>
