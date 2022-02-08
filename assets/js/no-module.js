/** @format */

// if ('serviceWorker' in navigator) {
// 	window.navigator.serviceWorker
// 		.register('/sw.js')
// 		.catch((err) => console.error('ServiceWorker error: ', err));
// }

// install prompting

if (
	localStorage.getItem('installed') === 'true' ||
	localStorage.getItem('installed') !== 'false'
) {
	localStorage.setItem('installed', 'false');
}

if (
	localStorage.getItem('installable') === 'true' ||
	localStorage.getItem('installable') !== 'false'
) {
	localStorage.setItem('installable', 'false');
}

let deferredPrompt;
let showInstallPromo;
let installCard;
let installBtn;
let installClose;

installCard = document.querySelector('#install-card');
installBtn = document.querySelector('#install-button');
installClose = document.querySelector('#install-close');

showInstallPromo = () => {
	window.navigator.vibrate([200, 100, 200, 100, 200]);
	installCard.style.display = 'block';
	installCard.style.transform = 'translateX(0)';
};

installBtn.addEventListener('click', async () => {
	if (deferredPrompt !== null) {
		setTimeout(() => {
			deferredPrompt.prompt();
		}, 5000);
		const { outcome } = await deferredPrompt.userChoice;
		if (outcome === 'accepted') {
			deferredPrompt = null;
		} else {
			setTimeout(() => {
				showInstallPromo();
			}, 1200000);
		}
	}
});

installClose.addEventListener('click', () => {
	installCard.style.transform = 'translateX(calc(-100% - 30px))';
});

window.addEventListener('beforeinstallprompt', (e) => {
	deferredPrompt = e;
	console.log('Install Leiloukou Please...');
	setTimeout(() => {
		showInstallPromo();
	}, 4000);
});

window.addEventListener('appinstalled', (evt) => {});

setTimeout(() => {
	console.clear();
}, 20000);
