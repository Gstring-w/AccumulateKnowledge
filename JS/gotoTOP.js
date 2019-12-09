function goToTop() {
    let scrollToTop;

    if (
        window.getComputedStyle &&
        window.getComputedStyle(document.body).scrollBehavior
    ) {
        scrollToTop = () =>
            document.querySelector('body').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
    } else {
        if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = function(callback) {
                return setTimeout(callback, 1000 / 60);
            };
        }

        scrollToTop = () => {
            const c =
                document.documentElement.scrollTop || document.body.scrollTop;
            if (c > 0) {
                window.requestAnimationFrame(scrollToTop);
                window.scrollTo(0, c - c / 8);
            }
        };
    }
    scrollToTop();
}