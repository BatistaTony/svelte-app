<script>
	import { DragAndDropContainer, uploadContainer } from './style';

	let /** @type {string | ArrayBuffer | null } */ profilePic = '';
	let overedElement = '';
	let pics = [
		{
			id: '43s',
			pic: ''
		},
		{
			id: '2s',
			pic: ''
		},
		{
			id: '123s',
			pic: ''
		},
		{
			id: '436s',
			pic: ''
		}
	];
	$: {
		if (profilePic) {
			pics[0].pic = profilePic;
		}
	}

	const noPic =
		'data:image/webp;base64,UklGRuIBAABXRUJQVlA4INYBAACQEgCdASp7AIQAPpFEnkmlpCMhKVYaMLASCWkAFtLezqXdmb0ABejbVBvGHbEIFzKzdcQ1LkPnbV25Zd1Hnl68kYQlFDjs4SX5l51tIxup75bZ2euR3lSLq63qfb26tZ+O2P8dhaIp8/6lI75GA5wOXH0cMpSg97tKpzuJSsSPwlrY7ffUF8+2A9ZRL172TxZayFNJQeGemFsdBXwAAP749LwcGsc+3YwyCVuEm8EbzBDIbJTKQXMKVHan0VYMYFFmPQ5zrHdHEaojtuLO4A75H7d+b3Q+yZKz5ZQCQKt1yV3dc/ovlilKJLqjp3WZsr/LiI7YNO2b1CI5XuIPeYkBK1Rg5V0d2pObTyBgpcbx9aqVSNczBJm/2ziwRdE5ef1SBQdc2g4b0Sb+3s+HBpPjtFr5ZYYzv+l480Gil3PckoqmtJePtqCv232rUiOfW9samFjvkHoC63NIuO9NiAMrPF0QBknvFSAm+YBahOHmY9DcVdkNSCnU+QUTZ9n0lUVJ2PmfMv8MCKofsP81WmszyayXK9Ewu/pWTAq09DGE353RlkiafMzm49MaLoMVhWrkaV17hpl34vnWwjGa9iiWQHQCN2O0OFrRl6o3gEPoO3uCYAAAAA==';

	const handleInputFileChange = (/** @type {{ target: any; }} */ event) => {
		const file = event.target.files[0];
		convertFileToReadable(file);
	};

	const convertFileToReadable = (/** @type {File} */ file) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);

		reader.onload = function () {
			profilePic = reader.result;
		};
	};

	const clickOnUpload = () => {
		document.getElementById('ipt-upload')?.click();
	};

	const handleDragOver = (/** @type {any} */ event, /** @type {string} */ id) => {
		event.preventDefault();
		if (!profilePic) return;
		const hasPic = pics.find((pic) => pic.id === id);
		if (hasPic?.pic.length) return;
		overedElement = id;
	};

	const handleDrop = (/** @type { any }} */ event, /** @type {string | undefined} */ id) => {
		event.preventDefault();
		if (overedElement) {
			const picIndex = pics.findIndex((pic) => pic.id === overedElement);
			pics[picIndex].pic = profilePic;

			pics.map((pic) => {
				if (pic.id !== overedElement) {
					pic.pic = '';
				}
			});
		}
	};
</script>

<div class={DragAndDropContainer}>
	<h1>I got some place to drop {overedElement}</h1>

	<div class={uploadContainer}>
		<button on:click={clickOnUpload}>upload</button>
		<input id="ipt-upload" type="file" on:change={handleInputFileChange} />
	</div>

	{#each pics as pic}
		<img
			id="profile-pic"
			draggable={!!profilePic}
			on:dragover={(event) => handleDragOver(event, pic.id)}
			on:dragend={(event) => handleDragEnd(event, pic.id)}
			on:drop={handleDrop}
			on:dragleave={() => (overedElement = '')}
			src={pic.pic ? pic.pic : noPic}
			alt=""
		/>
	{/each}
</div>

<style>
</style>
