/*
    Peek Toast Notification
    Author: Caner Oncel (@caneroncel)
    https://github.com/caneroncel/peek

    Kullanım:
    peek.info("Bilgi", "İşlem hakkında bilgi");
    peek.success("Başarılı", "İşlem başarıyla tamamlandı");
    peek.warning("Uyarı", "İşlem sırasında bir hata meydana geldi");
    peek.error("Hata", "İşlem başarısız!");

    Parameters:
    title, content, timer (MS / false), progressbar (true / false)
*/

window.peekconfig = {
    "multiple"    : true,
    "maxitem"     : 5,
    "progressbar" : true,       // true, false (Optional)
    "timeout"     : 6000,       // MS or false (Optional)
    "position" : {
        "vertical"   : "top",   // top, middle, bottom
        "horizontal" : "center",  // left, center, right
    },
};

/* Create Peek*/
class peek {

    static info(title, content, timeout, progressbar) {
        this.createPeek("info", title, content, timeout, progressbar);
    }

    static success(title, content, timeout, progressbar) {
        this.createPeek("success", title, content, timeout, progressbar);
    }

    static warning(title, content, timeout, progressbar) {
        this.createPeek("warning", title, content, timeout, progressbar);
    }

    static error(title, content, timeout, progressbar) {
        this.createPeek("error", title, content, timeout, progressbar);
    }

    /* Create Peek */
    static createPeek(type, title, content, timeout, progressbar = true) {

        // Create #peek Container
        if(document.getElementById("peek") === null) {
            var peekcontainer = '<div id="peek" class="peek-'+ peekconfig.position.vertical +' peek-'+ peekconfig.position.horizontal +'">' + '</div>';
            document.body.insertAdjacentHTML("beforeend", peekcontainer);
        }

        var peekdiv = document.getElementById("peek");

        // Peek Item TPL
        var peekitemid = generatePeekID(6),
            peektpl = '<div class="peek-item peek-' + type + '" id="' + peekitemid + '">' +
            '<div class="peek-wrapper">' +
            '    <div class="peek-title">' + title + '</div>' +
            '    <div class="peek-content">' + content + '</div>' +
            '    <div class="peek-icon"></div>' +
            '    <div class="peek-progress">' +
            '       <div class="peek-bar"></div>' +
            '   </div>' +
            '    <a href="javascript:;" class="peek-close" title="Kapat" onclick="closePeekItem(\'' + peekitemid + '\')"><span>Kapat</span></a>' +
            '   </div>' +
            '</div>';

        if(peekconfig.multiple) {

            peekdiv.insertAdjacentHTML("afterbegin", peektpl);

            var peekchilds = peekdiv.querySelectorAll(".peek-item");

            peekchilds.forEach(function(item, index) {
                if(Number(index) >= Number(peekconfig.maxitem)) {
                    item.remove();
                }
            });

        }
        else {
            peekdiv.innerHTML = peektpl;
        }

        var peekitem = document.getElementById(peekitemid);

        if(typeof timeout === "undefined") {
            if(peekconfig.timeout === false) {
                timeout = false;
            }
            else {
                timeout = peekconfig.timeout;
            }
        }

        if(timeout !== false) {

            // Progress Bar
            if(typeof progressbar === "undefined") {
                progressbar = peekconfig.progressbar !== false;
            }

            if(progressbar !== false) {

                var peekbar = peekitem.querySelector(".peek-bar");
                peekbar.style.transition = "all " + (timeout / 1000) + "s linear";

                setTimeout(function () {
                    peekbar.style.width = '0%';
                }, 100);

            }
            else {
                peekNoProgressBar(peekitem);
            }

            setTimeout(function (){
                closePeekItem(peekitemid);
            }, timeout + 100);

        }
        else {
            peekNoProgressBar(peekitem);
        }

        setTimeout(function (){
            peekitem.classList.add("peek-active");
        },100);

    }

}

/* Generate Peek Item ID */
function generatePeekID(length) {

    var key = "",
        characters = 'abcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        key += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return "peek-item-" + key;

}

/* Close Peek Item */
function closePeekItem(id) {

    var peekdiv = document.getElementById("peek"),
        peekitem = document.getElementById(id);

    if(peekitem !== null) {

        peekitem.classList.remove("peek-active");

        setTimeout(function (){

            peekitem.remove();

            if (peekdiv.hasChildNodes()) {
                // console.log('Div has child or children');
            } else {
                peekdiv.remove();
            }

        }, 300);

    }

}

/* Peek No Progressbar */
function peekNoProgressBar(peekitem) {
    peekitem.classList.add("peek-border");
    peekitem.classList.add("peek-noprogressbar");
}