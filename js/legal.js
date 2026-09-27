document.addEventListener("DOMContentLoaded", () => {

    const topButton = document.getElementById("legalTop");

    const tocLinks = document.querySelectorAll(
        ".legal-toc a"
    );

    tocLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId || !targetId.startsWith("#")) {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            history.pushState(
                null,
                "",
                targetId
            );

        });

    });

    function updateTopButton() {

        if (!topButton) {
            return;
        }

        if (window.scrollY > 400) {

            topButton.classList.add("visible");

        } else {

            topButton.classList.remove("visible");

        }

    }


    window.addEventListener(
        "scroll",
        updateTopButton,
        { passive: true }
    );


    if (topButton) {

        topButton.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key !== "Escape") {
                return;
            }

            if (document.activeElement?.matches("a, input, button")) {
                return;
            }

            history.back();

        }
    );

    if (window.location.hash) {

        const target = document.querySelector(
            window.location.hash
        );

        if (target) {

            setTimeout(() => {

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }, 100);

        }

    }


    updateTopButton();

});