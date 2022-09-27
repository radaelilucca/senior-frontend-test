<template>
	<div class="flex flex-col justify-center items-center h-full w-full pt-40">
		<OperationFeedback
			:show="confirmationPopupOpen"
			:message="confirmationMessage"
			@forceClose="handleCloseConfirmationPopup"
		/>
		<header>
			<h1 class="text-accent-blue font-light text-6xl">Offices</h1>
		</header>

		<div class="flex flex-col items-center mt-12 gap-[25px] w-[19.875rem]">
			<OfficeForm
				v-if="isAddingNewOffice"
				@onCancel="handleCancelAdding"
				@onSubmit="handleAddOffice"
			/>
			<button
				v-if="!isAddingNewOffice"
				@click="handleStartAdding"
				class="w-full flex items-center justify-between bg-accent-blue leading-6 rounded-lg text-primary-lightGray py-4 px-6"
			>
				Add New Location <PlusIcon />
			</button>

			<ul class="flex flex-col gap-[25px] w-full">
				<li v-for="(office, index) in offices" :key="office.title">
					<OfficeCard
						v-bind:office="office"
						v-bind:isOpen="openCardIndex === index"
						@onOpenStateChangeRequest="handleToggleCard(index)"
						@onDeleteRequest="handleRemoveOffice(index)"
						@onEdit="(data) => handleUpdateOffice(index, data)"
					/>
				</li>
			</ul>
		</div>

		<footer class="mt-[25px] flex flex-col gap-2 items-center pb-20">
			<span class="leading-6 text-primary-gray text-center"
				>This project is for test purpose only.</span
			>
			<a
				class="text-xs text-accent-blue uppercase tracking-wide"
				href="https://www.dogandponystudios.com"
				target="_blank"
				>www.dogandponystudios.com</a
			>
		</footer>
	</div>
</template>

<script>
import PlusIcon from "~/assets/svg/icons/plus.svg";

import { OfficeCard, OfficeForm, OperationFeedback } from "~/components";

import initialOffices from "~/data/offices.json";

export default {
	components: {
		OfficeCard,
		PlusIcon,
		OfficeForm,
		OperationFeedback,
	},

	data() {
		return {
			offices: initialOffices,
			openCardIndex: -1,
			isAddingNewOffice: false,
			confirmationMessage: "",
			confirmationPopupOpen: false,
			confirmationMessageRepeated: 1,
			confirmationCloseTimeout: null,
		};
	},

	methods: {
		handleToggleCard(index) {
			const isOpen = this.openCardIndex === index;

			if (!isOpen) this.openCardIndex = index;
			else this.openCardIndex = -1;
		},

		handleAddOffice(newOffice) {
			this.offices.push(newOffice);
			this.isAddingNewOffice = false;

			this.handleShowConfirmationPopup("the location has been saved.");
		},

		handleStartAdding() {
			this.isAddingNewOffice = true;
		},

		handleCancelAdding() {
			this.isAddingNewOffice = false;
		},

		handleRemoveOffice(cardIndex) {
			const newOffices = this.offices;
			newOffices.splice(cardIndex, 1);
			this.offices.newOffices;
			this.openCardIndex = -1;
			this.handleShowConfirmationPopup("the location has been removed.");
		},

		handleShowConfirmationPopup(message) {
			if (this.confirmationPopupOpen) {
				const isMessageRepeated =
					this.confirmationMessage.includes(message);
				if (isMessageRepeated) this.confirmationMessageRepeated++;
				if (this.confirmationMessageRepeated > 1) {
					const repeatCountText = `x${this.confirmationMessageRepeated}`;
					this.confirmationMessage = `${message} ${repeatCountText}`;
				}
			} else {
				this.confirmationMessage = message;
				this.confirmationMessageRepeated = 1;
			}

			clearTimeout(this.confirmationCloseTimeout);

			setTimeout(() => {
				this.confirmationPopupOpen = true;
			}, 500);

			this.confirmationCloseTimeout = setTimeout(() => {
				this.handleCloseConfirmationPopup();
			}, 4000);
		},

		handleCloseConfirmationPopup() {
			this.confirmationPopupOpen = false;
			clearTimeout(this.confirmationCloseTimeout);
		},

		handleUpdateOffice(officeIndex, updatedData) {
			const newOffices = [...this.offices];
			newOffices[officeIndex] = updatedData;
			this.offices = newOffices;
			this.openCardIndex = -1;
			this.handleShowConfirmationPopup("the location has been updated.");
		},
	},
};
</script>
