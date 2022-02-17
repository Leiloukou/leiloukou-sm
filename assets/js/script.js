/** @format */

if ('serviceWorker' in navigator) {
	window.navigator.serviceWorker
		.register('/sw.js')
		.catch((err) => console.error('ServiceWorker error: ', err));
}

// install prompting

if (localStorage.getItem('installImpressions') === null) {
	localStorage.setItem('installImpressions', 1);
}

let deferredPrompt, showInstallPromo, installCard, installBtn, installClose;

installCard = document.querySelector('#install-card');
installBtn = document.querySelector('#install-button');
installClose = document.querySelector('#install-close');

showInstallPromo = () => {
	window.navigator.vibrate([200, 100, 200, 100, 200]);
	installCard.style.display = 'block';
	setTimeout(() => {
		installCard.style.transform = 'translate(0)';
	}, 100);
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
				if (localStorage.getItem('installImpressions') <= 8) {
					showInstallPromo();
					localStorage.setItem(
						'installImpressions',
						localStorage.getItem('installImpressions') + 1
					);
				}
			}, 1200000);
		}
	}
});

installClose.addEventListener('click', () => {
	if (window.matchMedia('(max-width: 642px)').matches) {
		installCard.style.transform = 'translateY(100%)';
		return;
	} else {
		installCard.style.transform = 'translateX(calc(-100% - 30px))';
		return;
	}
});

if (localStorage.getItem('installedApp') !== 'yes') {
	window.addEventListener('beforeinstallprompt', (e) => {
		deferredPrompt = e;
		console.log('Install Leiloukou Please...');
		setTimeout(() => {
			showInstallPromo();
		}, 4000);
		if (
			/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
				navigator.userAgent
			) ||
			/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
				navigator.userAgent.substr(0, 4)
			)
		) {
			e.preventDefault();
		}
	});
}

window.addEventListener('appinstalled', (evt) => {
	localStorage.setItem('installedApp', 'yes');
});

// firebase

import {
	initializeApp
} from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js';

const firebaseConfig = {
	apiKey: 'AIzaSyC55Pyo9cqAURnbcAo_pXZ2fF7z_4c5gK0',
	authDomain: 'leiloukou-okpfdvkjoiaffjmewikf.firebaseapp.com',
	projectId: 'leiloukou-okpfdvkjoiaffjmewikf',
	storageBucket: 'leiloukou-okpfdvkjoiaffjmewikf.appspot.com',
	messagingSenderId: '145139690375',
	appId: '1:145139690375:web:9dfba80a0d4293994a4122',
	measurementId: 'G-MCZSY125PV'
};

const app = initializeApp(firebaseConfig);

// add swipe detection

let body, startingX, startingY, movingX, movingY;
body = document.body;

body.addEventListener('touchstart', (e) => {
	startingX = e.touches[0].clientX;
	startingY = e.touches[0].clientY;
});

body.addEventListener('touchmove', (e) => {
	movingX = e.touches[0].clientX;
	movingY = e.touches[0].clientY;
});

body.addEventListener('touchend', () => {
	if (startingX + 100 < movingX) {
		// right
		// alert('right')
		if (
			window.location.pathname === '/dashboard' ||
			window.location.pathname === '/dashboard/'
		) {
			window.location.href = '/';
		} else if (window.location.pathname === '/') {
			window.location.href = '/dashboard';
		} else if (
			window.location.pathname === '/settings' ||
			window.location.pathname === '/settings/'
		) {
			window.location.href = '/dashboard';
		}
	} else if (startingX - 100 > movingX) {
		// left
		// alert('left')
		if (
			window.location.pathname === '/dashboard' ||
			window.location.pathname === '/dashboard/'
		) {
			window.location.href = '/';
		} else if (window.location.pathname === '/') {
			window.location.href = '/dashboard';
		} else if (
			window.location.pathname === '/settings' ||
			window.location.pathname === '/settings/'
		) {
			window.location.href = '/dashboard';
		}
	} else if (startingY + 100 < movingY) {
		// down
		// alert('down')
	} else if (startingX - 100 > movingY) {
		// up
		// alert('up')
	}
});

// render posts

// let post = [];
// let ifUndefinedPost;
// let generatePosts;

// ifUndefinedPost = (i) => {
// 	if (post[i] === undefined) {
// 		return 'Leiloukou is best! <br>Leiloukou is so awesome that you should download this app rn.';
// 	} else {
// 		return post[i];
// 	}
// }

// for (let i = 0; i < 20; i++) {
// 	fetch('https://api.quotable.io/random')
// 		.then(data => {
// 			return data.json();
// 		})
// 		.then(data => {
// 			post.push(data.content);
// 		})
// 		.catch(err => {
// 			console.log(err);
// 		});
// }

// generatePosts = () => {
// 	for (let i = 0; i < 20; i = i + 1) {
// 		fetch('https://randomuser.me/api/')
// 			.then(user => {
// 				return user.json();
// 			}).then(data => {
// 				document.getElementById('article').innerHTML =
// 					document.getElementById('article').innerHTML +
// 					`<section class="post">
// 	                                    <div class="author">
// 	                                          <div class="author__title">
// 	                                                <a href="/profiles/${
// 														data.results[0].login
// 															.username
// 													}/">@${
// 						data.results[0].login.username
// 					}</a>
// 	                                          </div>
// 	                                          <div class="author__time">
// 	                                                <i class="material-icons">
// 	                                                      schedule
// 	                                                </i>
// 	                                                Jan 1 2022, 12:00am
// 	                                          </div>
// 	                                    </div>
// 	                                    <h3 class="post__title">A great quote to live by: </h3><p>${ifUndefinedPost(
// 											i
// 										)}</p>
// 	                              </section>`;
// 				console.log(data.results[0]);
// 			})
// 			.catch(err => console.log(err));
// 	}
// 	document.querySelectorAll('.loading').forEach(post => {
// 		post.remove()
// 	})
// }

// generatePosts()

setTimeout(() => {
	let posts = [
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/goldengoose634/">@goldengoose634</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>Being entirely honest with oneself is a good exercise.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/goldengoose634/">@goldengoose634</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>Being entirely honest with oneself is a good exercise.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/orangeduck488/">@orangeduck488</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>The greatest danger for most of us is not that our aim is too high, and we miss it, but that it is too low, and we reach it.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/goldengoose634/">@goldengoose634</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>Being entirely honest with oneself is a good exercise.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/orangeduck488/">@orangeduck488</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>The greatest danger for most of us is not that our aim is too high, and we miss it, but that it is too low, and we reach it.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/smallbird952/">@smallbird952</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>How wonderful it is that nobody need wait a single moment before starting to improve the world.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/goldengoose634/">@goldengoose634</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>Being entirely honest with oneself is a good exercise.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/orangeduck488/">@orangeduck488</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>The greatest danger for most of us is not that our aim is too high, and we miss it, but that it is too low, and we reach it.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/smallbird952/">@smallbird952</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>How wonderful it is that nobody need wait a single moment before starting to improve the world.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/angrydog108/">@angrydog108</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>I have always thought the actions of men the best interpreters of their thoughts.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/goldengoose634/">@goldengoose634</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>Being entirely honest with oneself is a good exercise.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/orangeduck488/">@orangeduck488</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>The greatest danger for most of us is not that our aim is too high, and we miss it, but that it is too low, and we reach it.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/smallbird952/">@smallbird952</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>How wonderful it is that nobody need wait a single moment before starting to improve the world.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/angrydog108/">@angrydog108</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>I have always thought the actions of men the best interpreters of their thoughts.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/whitekoala273/">@whitekoala273</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>Forgiveness is choosing to love. It is the first skill of self-giving love.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/goldengoose634/">@goldengoose634</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>Being entirely honest with oneself is a good exercise.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/orangeduck488/">@orangeduck488</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>The greatest danger for most of us is not that our aim is too high, and we miss it, but that it is too low, and we reach it.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/smallbird952/">@smallbird952</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>How wonderful it is that nobody need wait a single moment before starting to improve the world.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/angrydog108/">@angrydog108</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>I have always thought the actions of men the best interpreters of their thoughts.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/whitekoala273/">@whitekoala273</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>Forgiveness is choosing to love. It is the first skill of self-giving love.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/angrymouse472/">@angrymouse472</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>Life is a travelling to the edge of knowledge, then a leap taken.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/goldengoose634/">@goldengoose634</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>Being entirely honest with oneself is a good exercise.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/orangeduck488/">@orangeduck488</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>The greatest danger for most of us is not that our aim is too high, and we miss it, but that it is too low, and we reach it.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/smallbird952/">@smallbird952</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>How wonderful it is that nobody need wait a single moment before starting to improve the world.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/angrydog108/">@angrydog108</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>I have always thought the actions of men the best interpreters of their thoughts.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/whitekoala273/">@whitekoala273</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>Forgiveness is choosing to love. It is the first skill of self-giving love.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/angrymouse472/">@angrymouse472</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>Life is a travelling to the edge of knowledge, then a leap taken.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/purplewolf865/">@purplewolf865</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>Courage is what it takes to stand up and speak; courage is also what it takes to sit down and listen.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/goldengoose634/">@goldengoose634</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>Being entirely honest with oneself is a good exercise.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/orangeduck488/">@orangeduck488</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>The greatest danger for most of us is not that our aim is too high, and we miss it, but that it is too low, and we reach it.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/smallbird952/">@smallbird952</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>How wonderful it is that nobody need wait a single moment before starting to improve the world.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/angrydog108/">@angrydog108</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>I have always thought the actions of men the best interpreters of their thoughts.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/whitekoala273/">@whitekoala273</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>Forgiveness is choosing to love. It is the first skill of self-giving love.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/angrymouse472/">@angrymouse472</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>Life is a travelling to the edge of knowledge, then a leap taken.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/purplewolf865/">@purplewolf865</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>Courage is what it takes to stand up and speak; courage is also what it takes to sit down and listen.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/brownladybug748/">@brownladybug748</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>God has given you one face, and you make yourself another.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/goldengoose634/">@goldengoose634</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>Being entirely honest with oneself is a good exercise.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/orangeduck488/">@orangeduck488</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>The greatest danger for most of us is not that our aim is too high, and we miss it, but that it is too low, and we reach it.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/smallbird952/">@smallbird952</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>How wonderful it is that nobody need wait a single moment before starting to improve the world.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/angrydog108/">@angrydog108</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>I have always thought the actions of men the best interpreters of their thoughts.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/whitekoala273/">@whitekoala273</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>Forgiveness is choosing to love. It is the first skill of self-giving love.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/angrymouse472/">@angrymouse472</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>Life is a travelling to the edge of knowledge, then a leap taken.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/purplewolf865/">@purplewolf865</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>Courage is what it takes to stand up and speak; courage is also what it takes to sit down and listen.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/brownladybug748/">@brownladybug748</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>God has given you one face, and you make yourself another.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/smallgorilla281/">@smallgorilla281</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>Of course there is no formula for success except perhaps an unconditional acceptance of life and what it brings.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/goldengoose634/">@goldengoose634</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>Being entirely honest with oneself is a good exercise.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/orangeduck488/">@orangeduck488</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>The greatest danger for most of us is not that our aim is too high, and we miss it, but that it is too low, and we reach it.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/smallbird952/">@smallbird952</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>How wonderful it is that nobody need wait a single moment before starting to improve the world.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/angrydog108/">@angrydog108</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>I have always thought the actions of men the best interpreters of their thoughts.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/whitekoala273/">@whitekoala273</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>Forgiveness is choosing to love. It is the first skill of self-giving love.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/angrymouse472/">@angrymouse472</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>Life is a travelling to the edge of knowledge, then a leap taken.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/purplewolf865/">@purplewolf865</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>Courage is what it takes to stand up and speak; courage is also what it takes to sit down and listen.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/brownladybug748/">@brownladybug748</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>God has given you one face, and you make yourself another.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/smallgorilla281/">@smallgorilla281</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>Of course there is no formula for success except perhaps an unconditional acceptance of life and what it brings.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/smallkoala159/">@smallkoala159</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>The minute you settle for less than you deserve, you get even less than you settled for.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/goldengoose634/">@goldengoose634</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>Being entirely honest with oneself is a good exercise.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/orangeduck488/">@orangeduck488</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>The greatest danger for most of us is not that our aim is too high, and we miss it, but that it is too low, and we reach it.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/smallbird952/">@smallbird952</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>How wonderful it is that nobody need wait a single moment before starting to improve the world.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/angrydog108/">@angrydog108</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>I have always thought the actions of men the best interpreters of their thoughts.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/whitekoala273/">@whitekoala273</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>Forgiveness is choosing to love. It is the first skill of self-giving love.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/angrymouse472/">@angrymouse472</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>Life is a travelling to the edge of knowledge, then a leap taken.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/purplewolf865/">@purplewolf865</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>Courage is what it takes to stand up and speak; courage is also what it takes to sit down and listen.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/brownladybug748/">@brownladybug748</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>God has given you one face, and you make yourself another.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/smallgorilla281/">@smallgorilla281</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>Of course there is no formula for success except perhaps an unconditional acceptance of life and what it brings.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/smallkoala159/">@smallkoala159</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>The minute you settle for less than you deserve, you get even less than you settled for.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/brownzebra310/">@brownzebra310</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>Many of life's failures are people who did not realize how close they were to success when they gave up.</p>
</section>`,
		`<section class="post">
<div class="author">
<div class="author__title">
<a href="/profiles/goldengoose634/">@goldengoose634</a>
</div>
<div class="author__time">
<i class="material-icons">
schedule
</i>
Jan 1 2022, 12:00am
</div>
</div>
<h3 class="post__title">A great quote to live by: </h3><p>Being entirely honest with oneself is a good exercise.</p>
</section>`
	];

	posts = posts
		.map((value) => ({
			value,
			sort: Math.random()
		}))
		.sort((a, b) => a.sort - b.sort)
		.map(({ value }) => value);

	posts.forEach((post) => {
		document.getElementById('article').innerHTML =
			document.getElementById('article').innerHTML + post;
	});
	document.querySelectorAll('.loading').forEach((post) => {
		post.remove();
	});
}, 600);
// clear the console

setTimeout(() => {
	console.clear();
}, 20000);
