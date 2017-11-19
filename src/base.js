import Rebase from 're-base';
import firebase from 'firebase/app';
import 'firebase/database';

var app = firebase.initializeApp({
    apiKey: 'AIzaSyCV8ACvEgwdWGTnZYbvciYRO_ESPPVrkGE',
    authDomain: 'dhadrianwale-kirtan-onli-3bb89.firebaseapp.com',
    databaseURL: 'https://dhadrianwale-kirtan-onli-3bb89.firebaseio.com',
    projectId: 'dhadrianwale-kirtan-onli-3bb89',
    storageBucket: 'dhadrianwale-kirtan-onli-3bb89.appspot.com',
    messagingSenderId: '512292602448'
});

var db = firebase.database(app);
var base = Rebase.createClass(db);

export default base;