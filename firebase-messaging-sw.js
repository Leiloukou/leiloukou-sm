import { getMessaging, getToken } from 'firebase/messaging';

// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
const messaging = getMessaging();
getToken(messaging, {
	vapidKey:
		'BBmtZ7fgQsZLm-89Qr6vWbggr3L2ocG2ENks8FdlSW7RgYZCRRu6TWQ6UAVR4qFn0xuxnkeMs6v39pSJje5J8-8'
})
	.then((currentToken) => {
		if (currentToken) {
		} else {
			console.log(
				'No registration token available. Request permission to generate one.'
			);
		}
	})
	.catch((err) => {
		console.log('An error occurred while retrieving token. ', err);
	});