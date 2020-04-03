import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
Nprogress.inc(0.2);
Nprogress.configure({ easing: 'ease', speed: 500, showSpinner: false });
export default ({ app }) => {
    app.router.beforeEach((to, from, next) => {

        Nprogress.start();
        next()
    });

    app.router.afterEach(() => {
        Nprogress.done()
    });

}

