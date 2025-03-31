document.addEventListener("DOMContentLoaded", () => {
    function clearText() {
        document.querySelectorAll('[data-clear="yes"]').forEach(element => {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.value = '';
            }
        });
    }

    function removeDark() {
        const textareaStart = document.getElementById('start');
        const textareaResult = document.getElementById('result');

        if (!textareaStart || !textareaResult) {
            console.error('One or both textareas not found');
            return;
        }

        const modifiedSnippet = textareaStart.value
            // Удаляем все dark-классы
            .replace(/\bdark:[^\s"'`]+/g, '')
            // Удаляем одиночные пробелы между кавычками
            .replace(/(class=(["'])\s*)\s+(\s*\2)/g, '$1$3')
            // Убираем пустые атрибуты class
            .replace(/\s*class=(["'])\s*\1/g, '')
            // Чистим лишние пробелы
            .replace(/\s{2,}/g, ' ')
            // Удаляем пробелы перед кавычками
            .replace(/ "/g, '"')
            .trim();

        textareaResult.value = modifiedSnippet;
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