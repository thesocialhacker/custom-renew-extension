function parseUri (str) 
{
	var	o   = parseUri.options,
		m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
		uri = {},
		i   = 14;

	while (i--) uri[o.key[i]] = m[i] || "";

	uri[o.q.name] = {};
	uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
		if ($1) uri[o.q.name][$1] = $2;
	});

	return uri;
};

parseUri.options = 
{
	strictMode: false,
	key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
	q:   {
		name:   "queryKey",
		parser: /(?:^|&)([^&=]*)=?([^&]*)/g
	},
	parser: {
		strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
		loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
	}
};

function startsWith(s, str){
    return (s.indexOf(str) === 0);
}

function getFileExt(filename) 
{
	return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined; 
}

function newTab(newUrl)
{       //load new tab
        newTabs.push(newUrl);
}

function getAllLinksOnPage(page)
{
	var links = new Array();	
	/*//This would have found Tags using src Attribute.
         $(page).find('[src]').each(
            function(){ 
                if($(this).html()=='renew'){
                    links.push($(this).attr('src'));
                }
            }
        );*/	
    
	$(page).find('a').each(
            function(){
                if($(this).html()=='renew'){
                    var thisUrl = $(this).attr('href')
                    //add to list
                    links.push(thisUrl);
                    //add to list of urls to load
                    newTab(thisUrl);
                }
            }
        );	
	return links;
}

/*
function getInterestingFileTypes()
{
	var types = (localStorage["interesting-file-types"]?localStorage["interesting-file-types"]:"flv,mk4,avi,mp3,zip,png,gif,jpg").split(",");
	for (var i in types) { types[i] = $.trim(types[i]);	 }
	return types;
}
*/

function isInArr(arr,val)
{
	for (var i in arr)
	{
		if(arr[i]==val){ return true; }
	}
	return false;
}