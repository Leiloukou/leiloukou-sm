// if ('serviceWorker' in navigator) {
// 	window.navigator.serviceWorker
// 		.register('/sw.js')
// 		.catch((err) => console.error('ServiceWorker error: ', err));
// }

// install prompting

if (localStorage.getItem('installed') === 'true' || localStorage.getItem('installed') !== 'false') {
	localStorage.setItem('installed', 'false')
}

if (localStorage.getItem('installable') === 'true' || localStorage.getItem('installable') !== 'false') {
	localStorage.setItem('installable', 'false')
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
		const {
			outcome
		} = await deferredPrompt.userChoice;
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

// firebase

// Import the functions you need from the SDKs you need
import {
	initializeApp
} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import {
	getAnalytics
} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-analytics.js";
import { getMessaging, getToken } from 'firebase/messaging';

const firebaseConfig = {
	apiKey: "AIzaSyC55Pyo9cqAURnbcAo_pXZ2fF7z_4c5gK0",
	authDomain: "leiloukou-okpfdvkjoiaffjmewikf.firebaseapp.com",
	projectId: "leiloukou-okpfdvkjoiaffjmewikf",
	storageBucket: "leiloukou-okpfdvkjoiaffjmewikf.appspot.com",
	messagingSenderId: "145139690375",
	appId: "1:145139690375:web:9dfba80a0d4293994a4122",
	measurementId: "G-MCZSY125PV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app)
const messaging = getMessaging();

messaging.getToken({
	vapidKey:
		'BBmtZ7fgQsZLm-89Qr6vWbggr3L2ocG2ENks8FdlSW7RgYZCRRu6TWQ6UAVR4qFn0xuxnkeMs6v39pSJje5J8-8'
});

setTimeout(() => {
	console.clear();
}, 20000);