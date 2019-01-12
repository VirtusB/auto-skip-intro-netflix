const targetNode = document.getElementsByClassName("nf-kb-nav-wrapper")[0];
const config = { attributes: true, childList: true, subtree: true };

const callback = function(mutationsList) {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            if (mutation.target.nodeName === 'DIV') {
            	if (mutation.removedNodes.length === 0) {
            		return;
				}
                mutation.removedNodes.forEach(function(node) {
                	if (node.childNodes[0].className === 'player-loading') {
                        autoSkipObserver();
					}
                });
            }
        }
    }
};

const observer = new MutationObserver(callback);
observer.observe(targetNode, config);



function autoSkipObserver() {
        const targetNode = document.getElementsByClassName("PlayerControlsNeo__layout")[0];
        const config = { attributes: true, childList: true, subtree: true };

        const callback = function(mutationsList) {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    if (mutation.target.nodeName === 'DIV') {
                        mutation.addedNodes.forEach(function(node) {
                            if (node.className === 'skip-credits') {
                            	autSkip();
							}
                        });
                    }
                }
            }
        };

        const observer = new MutationObserver(callback);
        observer.observe(targetNode, config);

}


function autSkip() {
    const getAutoSkip = getSetting("auto-skip");

    Promise.resolve(getAutoSkip).then(autoSkip => {
        if(!autoSkip)
            return;

        const skipCreditsSpan = document.getElementsByClassName('skip-credits')[0];
        const skipCreditsAnchor = skipCreditsSpan.getElementsByTagName('a')[0];
        skipCreditsAnchor.click();
    });
}

