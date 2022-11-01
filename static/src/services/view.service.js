
export default function viewService () {
    function getClonedView ( id ) {
        return document.getElementById(id).cloneNode(true).content;
    }

    
    function pushViews () {
        const viewPromises = [];
    
        const includeHTML = (el, url) => {
            const xhr = new XMLHttpRequest();
    
            viewPromises.push(
            new Promise ((res, rej) => {
                xhr.addEventListener("readystatechange", e=>{
                    if(xhr.readyState !== 4) return;
        
                    if (xhr.status >= 200 && xhr.status < 300) {
                        el.outerHTML = xhr.responseText;
                        res(xhr.status);
                    } else {
                        const msg = xhr.statusText;
                        console.error(msg);
                        rej(xhr.status);
                    }
                });
            }))
    
            xhr.open("GET", url)
            xhr.setRequestHeader("Content-type", 'text/html;charset=utf-8');
            xhr.send();
        }
    
        document
        .querySelectorAll("[data-include]")
        .forEach(dataContainer => includeHTML(dataContainer, dataContainer.getAttribute('data-include')) )
        

        return Promise.all(viewPromises)
    }

    return {
        'getClonedView': getClonedView,
        'pushViews': pushViews
    }
}