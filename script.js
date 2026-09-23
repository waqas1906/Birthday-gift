/* =====================================
   PAGE NAVIGATION
===================================== */

function showPage(pageName) {

    const pages =
        document.querySelectorAll(".page");


    pages.forEach(page => {

        page.classList.remove(
            "active-page"
        );

    });


    const selectedPage =
        document.getElementById(pageName);


    if (selectedPage) {

        selectedPage.classList.add(
            "active-page"
        );

    }


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });


    /* Small confetti when changing pages */

    createConfetti(30);

}



/* =====================================
   CONFETTI
===================================== */

const canvas =
    document.getElementById("confetti");


const ctx =
    canvas.getContext("2d");


let pieces = [];


function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

}


resizeCanvas();


window.addEventListener(
    "resize",
    resizeCanvas
);



/* =====================================
   CREATE CONFETTI
===================================== */

function createConfetti(amount) {

    for (
        let i = 0;
        i < amount;
        i++
    ) {

        pieces.push({

            x:
                window.innerWidth / 2,

            y:
                window.innerHeight / 2,

            size:
                Math.random() * 8 + 4,

            speed:
                Math.random() * 8 + 3,

            angle:
                Math.random() *
                Math.PI *
                2,

            rotation:
                Math.random() * 360,

            rotationSpeed:
                Math.random() * 10 - 5,

            gravity:
                0.15,

            color:
                `hsl(
                    ${Math.random() * 360},
                    100%,
                    65%
                )`

        });

    }

}



/* =====================================
   CONFETTI ANIMATION
===================================== */

function animateConfetti() {

    ctx.clearRect(

        0,
        0,
        canvas.width,
        canvas.height

    );


    pieces.forEach(
        (piece, index) => {

            piece.x +=
                Math.cos(piece.angle)
                * piece.speed;

            piece.y +=
                Math.sin(piece.angle)
                * piece.speed;

            piece.speed *=
                0.98;

            piece.y +=
                piece.gravity;

            piece.rotation +=
                piece.rotationSpeed;


            ctx.save();


            ctx.translate(
                piece.x,
                piece.y
            );


            ctx.rotate(
                piece.rotation *
                Math.PI /
                180
            );


            ctx.fillStyle =
                piece.color;


            ctx.fillRect(

                -piece.size / 2,

                -piece.size / 2,

                piece.size,

                piece.size

            );


            ctx.restore();


            if (

                piece.y >
                    canvas.height + 50 ||

                piece.x <
                    -50 ||

                piece.x >
                    canvas.width + 50

            ) {

                pieces.splice(
                    index,
                    1
                );

            }

        }
    );


    requestAnimationFrame(
        animateConfetti
    );

}


animateConfetti();



/* =====================================
   GIFT
===================================== */

function openGift() {

    const gift =
        document.getElementById("gift");


    const message =
        document.getElementById(
            "gift-message"
        );


    if (!gift || !message) {

        return;

    }


    if (
        gift.classList.contains(
            "opened"
        )
    ) {

        return;

    }


    gift.classList.add(
        "opened"
    );


    createConfetti(150);


    setTimeout(() => {

        message.style.display =
            "block";

    }, 500);

}



/* =====================================
   FINAL CONFETTI
===================================== */

function finalConfetti() {

    createConfetti(250);


    setTimeout(() => {

        createConfetti(150);

    }, 700);


    setTimeout(() => {

        createConfetti(150);

    }, 1400);

}



/* =====================================
   AUTOMATIC WELCOME CONFETTI
===================================== */

window.addEventListener(
    "load",
    () => {

        createConfetti(120);

    }
);