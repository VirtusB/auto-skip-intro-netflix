function restoreSetting(setting)
{
	getSetting(setting).then((setVal) => {
		document.getElementById(setting).checked = setVal;
	});
}

function toggleSetting(setting)
{
	var el = document.getElementById(setting);

	saveSetting(setting, el.checked);
}

document.addEventListener("DOMContentLoaded", () => {
	restoreSetting("auto-skip");
});

document.getElementById("auto-skip").addEventListener("click", () => toggleSetting("auto-skip"));

