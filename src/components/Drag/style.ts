import { css } from '@emotion/css';

export const DragAndDropContainer = css`
	#profile-pic {
		width: 200px;
		height: 200px;
	}
`;

export const uploadContainer = css`
	width: 200px;
	height: 200px;
	border: 1px solid fuchsia;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	button {
		width: 150px;
		height: 50px;
		border: none;
	}

	input {
		visibility: hidden;
	}
`;
