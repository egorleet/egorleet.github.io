document.addEventListener("DOMContentLoaded", () => {
    function clearText() {
        document.querySelectorAll('[data-clear="yes"]').forEach(element => {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.value = '';
            }
        });
    }

    function removeDark() {
        let textareaStart = document.getElementById('start');
        let textareaResult = document.getElementById('result');

        if (!textareaStart || !textareaResult) {
            console.error('One or both textareas not found');
            return;
        }

        let htmlSnippet = textareaStart.value;
        let modifiedSnippet = htmlSnippet
            .replace(/\bdark:[a-zA-Z0-9-]+\b/g, '')
            .replace(/\s{2,}/g, ' ')
            .trim();

        textareaResult.value = modifiedSnippet.trim();
    }

    function copyText(id) {
        var el = document.getElementById(id);
        if (el && el.tagName === "TEXTAREA") {
            var textToCopy = el.value;
            var tempTextarea = document.createElement("textarea");

            tempTextarea.style.position = "absolute";
            tempTextarea.style.left = "-9999px";
            tempTextarea.value = textToCopy;

            document.body.appendChild(tempTextarea);

            tempTextarea.select();
            document.execCommand("copy");
            document.body.removeChild(tempTextarea);
        } else {
            console.error("Id " + id + " - not found");
        }
        return false;
    }

    const runBtn = document.getElementById("run_btn");
    if (runBtn) {
        document.getElementById("run_btn").addEventListener("click", removeDark);
    }
    const clearBtn = document.getElementById("clear_btn");
    if (clearBtn) {
        document.getElementById("clear_btn").addEventListener("click", clearText);
    }
    const copyBtn = document.getElementById("clear_btn");
    if (copyBtn) {
        document.getElementById("copy_btn").addEventListener("click", function () {
            var idToCopy = this.getAttribute("data-copy");
            if (idToCopy) {
                copyText(idToCopy);
            } else {
                console.error("Attr \"data-copy\" not set");
            }
        });
    }
});