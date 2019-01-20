const callback = function(mutationsList) {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            if (mutation.target.nodeName === 'DIV') {
            	if (mutation.removedNodes.length === 0) {
            		return;
				}
                mutation.removedNodes.forEach(function(node) {
                	if (node.childNodes[0] !== undefined && node.childNodes[0] !== null && node.childNodes[0].className === 'player-loading') {
                        autoSkipObserver();
					}
                });
            }
        }
    }
};


window.addEventListener('load', function () {
    const targetNode = document.getElementsByClassName("nf-kb-nav-wrapper")[0];
    const config = { attributes: true, childList: true, subtree: true };

    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
});


function autoSkipObserver() {
        const targetNode = document.getElementsByClassName("PlayerControlsNeo__layout")[0];
        const config = { attributes: true, childList: true, subtree: true };

        const callback = function(mutationsList) {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    if (mutation.target.nodeName === 'DIV') {
                        mutation.addedNodes.forEach(function(node) {
                            if (node.className === 'skip-credits') {
                            	autoSkip();
							}
                        });
                    }
                }
            }
        };

        const observer = new MutationObserver(callback);
        observer.observe(targetNode, config);

}

let lastCalled = new Date() + 365 * 86400000;
function autoSkip() {
    const getAutoSkip = getSetting("auto-skip");

    Promise.resolve(getAutoSkip).then(autoSkip => {
        if(!autoSkip)
            return;

        if (new Date() - lastCalled < 1000) {
        	return;
		}

        const skipCreditsSpan = document.getElementsByClassName('skip-credits')[0];
        const skipCreditsAnchor = skipCreditsSpan.getElementsByTagName('a')[0];
        fireUIEvent();
        skipCreditsAnchor.click();
        lastCalled = new Date();
    });
}

function fireUIEvent() {
    let event = document.createEvent("HTMLEvents");
    event.initEvent('mousemove', true, true);
    let el = document.getElementsByClassName('VideoContainer')[0];
    el.dispatchEvent(event);
}
