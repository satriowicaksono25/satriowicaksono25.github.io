var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BJ4XMo8CB3nPX_imIqPNsgN8xv8ruzJ_zIIg0uynvmY-ms05mCY1_Cob74ivZcvaJu1i_-UPsI1eyEfm9zWZ_Y0",
    "privateKey": "6E7bPefWXlbYysZkwQjASHqYUvizik5jTZkVfq0mYTo"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/eGZamztgwyQ:APA91bHUU2mfgN3QRrakcvRLYrDExyo2SI0vzpBlMUKUvk5wAazEKISwrZQEEKmYuA4aWycir5AkMvGUfbERfQAr1QtyVJKEPi6pj6MvzoA1OGsdlMiSnI3kfo7XwmguY1yQtFEQPF1B",
    "keys": {
        "p256dh": "BDoMLTPt8MymhggbC3px6dTMrhOiF2QhEHuyV2+WZSegbKm65DZRsSl/D0H3Yrn21mNq25tkE3rG0dR8+fQHU5c=",
        "auth": "uBnpnFTCORWg5R7sxcpJ+A=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
    gcmAPIKey: '7786257642',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);