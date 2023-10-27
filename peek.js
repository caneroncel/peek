/*
    Peek Toast Notification
    Author: Caner Oncel (@caneroncel)
    https://github.com/caneroncel/peek

    Kullanım:
    peek.info("Bilgi", "İşlem hakkında bilgi");
    peek.success("Başarılı", "İşlem başarıyla tamamlandı");
    peek.warning("Uyarı", "İşlem sırasında bir hata meydana geldi");
    peek.error("Hata", "İşlem başarısız!");

    Parametreler:
    title, content, timer (MS / false), progressbar (true / false)
*/

window.peekconfig = {
    "type"        : "info",
    "multiple"    : true,
    "maxitem"     : 5,
    "progressbar" : true,
    "timeout"     : 5000,       // MS or false
    "position" : {
        "vertical"   : "top",   // top, middle, bottom
        "horizontal" : "center",  // left, center, right
    },
};

/* Create Peek*/
class peek {

    static info(title, content, timer, progressbar) {
        this.createPeek("info", title, content, timer, progressbar);
    }

    static success(title, content, timer, progressbar) {
        this.createPeek("success", title, content, timer, progressbar);
    }

    static warning(title, content, timer, progressbar) {
        this.createPeek("warning", title, content, timer, progressbar);
    }

    static error(title, content, timer, progressbar) {
        this.createPeek("error", title, content, timer, progressbar);
    }

    /* Create Peek */
    static createPeek(type = "info", title, content, timer, progressbar = true) {
        // console.log(`Type: ${type}\nTitle: ${title}\nContent: ${content}\nTimer: ${timer}\nTimer: ${progressbar}`);

        // Check #peek
        if(document.getElementById("peek") === null) {
            var peekcontainer = '<div id="peek" class="peek-'+ peekconfig.position.vertical +' peek-'+ peekconfig.position.horizontal +'">' + '</div>';
            document.body.insertAdjacentHTML("beforeend", peekcontainer);
        }

        var peekdiv = document.getElementById("peek");

        // Timeout
        if(typeof timer === "undefined") {
            timer = peekconfig.timeout;
        }

        // Progressbar
        var noprogressbar = "";

        if(peekconfig.progressbar === false || progressbar === false) {
            noprogressbar = "peek-noprogressbar";
        }

        if(progressbar === true) {
            noprogressbar = "";
        }

        // TPL
        var peekitemid = generatePeekID(6),
            peektpl = '<div class="peek-item ' + noprogressbar + ' peek-' + type + '" id="' + peekitemid + '">' +
            '        <div class="peek-wrapper">' +
            '            <div class="peek-title">' + title + '</div>' +
            '            <div class="peek-content">' + content + '</div>' +
            '            <div class="peek-icon"></div>' +
            '            <div class="peek-progress">' +
            '               <div class="peek-bar"></div>' +
            '           </div>' +
            '            <a href="javascript:;" class="peek-close" title="Kapat" onclick="closePeekItem(\'' + peekitemid + '\')"><span>Kapat</span></a>' +
            '        </div>' +
            '       </div>';

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

        if(peekconfig.timeout !== false) {

            // Progress Bars
            if(progressbar === true) {
                var peekbars = peekdiv.querySelectorAll(".peek-bar");

                peekbars.forEach(function (item, index) {

                    if (item.classList.contains("working") === false) {

                        item.classList.add("working");

                        item.style.transition = "all " + (timer / 1000) + "s linear";

                        setTimeout(function () {
                            item.style.width = '0%';
                        }, 100);

                    }

                });
            }

            // Timeout
            setTimeout(function (){
                closePeekItem(peekitemid);
            }, timer+100);

        }

        setTimeout(function (){
            document.getElementById(peekitemid).classList.add("peek-active");
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
        }, 300);

    }

    if(peekdiv !== null) {
        if (peekdiv.hasChildNodes()) {
            // console.log('Div has child or children');
        } else {
            peekdiv.remove();
        }
    }

}