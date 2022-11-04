
export default function viewService () {
    function getClonedView ( id ) {
        return document.getElementById(id).cloneNode(true).content;
    }

    
    function pushViews () {
        const viewPromises = [];
    
        const includeHTML = (el, url) => {
            viewPromises.push(
            new Promise ((res, rej) => {
                window.fetch(url)
                .then(response => response.text())
                .then(htmlContent => {
                    el.outerHTML = htmlContent;
                    res();
                }).catch(err => {
                    rej(err);
                });
            }))
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