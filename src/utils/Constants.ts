export class Constants {
    static firebaseConfig() {
        return {
            apiKey: "AIzaSyCrydR88tj4E8CkGTGlAqtcPdFrpZvX8Zg",
            authDomain: "fabrirex-204f3.firebaseapp.com",
            databaseURL: "https://fabrirex-204f3.firebaseio.com",
            projectId: "fabrirex-204f3",
            storageBucket: "fabrirex-204f3.appspot.com",
            messagingSenderId: "852493913575"
        };
    }
    static get firebaseOpts() {
        return {
            WEB_CLIENT_ID: '852493913575-8u94m15prfmdtiui5ghuhbqifmqrq050.apps.googleusercontent.com'
        }
    }
    static get storage() {
        return {
            CURRENT_USER: 'current-user'
        }
    }
}