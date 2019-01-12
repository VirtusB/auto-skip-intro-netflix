function saveSetting(setting, bool)
{
	chrome.storage.local.set({ [setting]: bool }, function() { 
	});
}

function getSetting(setting)
{
	return new Promise((resolve, reject) => {
		chrome.storage.local.get(setting, function(result) {
			var res = result[setting];
			if(typeof res === "undefined")
			{
				saveSetting(setting, true);
				resolve(true);
			}
			else
				resolve(res);
		});
	});
}
