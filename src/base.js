import Rebase from 're-base';
import firebase from 'firebase/app';
import 'firebase/database';

var app = firebase.initializeApp({
    apiKey: 'AIzaSyCGziM8ZF5AUvrJKPy2gB5Y5Hm2fSYa-SM',
    authDomain: 'ads-186107.firebaseapp.com',
    databaseURL: 'https://ads-186107.firebaseio.com',
    projectId: 'youtubeads-186107',
    storageBucket: 'youtubeads-186107.appspot.com',
    messagingSenderId: '796180200883'
});

var db = firebase.database(app);
var base = Rebase.createClass(db);

export default base;